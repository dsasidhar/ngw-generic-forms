import {
    ComponentFactoryResolver, ComponentRef,
    Directive, Input, OnInit, ViewContainerRef,
    OnDestroy, OnChanges, SimpleChanges
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormInputComponent } from './form-input.component';
import { FormSelectComponent } from './form-select.component';
import { FormTemplateComponent } from './form-template.component';
import { FormButtonComponent } from './form-button.component';
import { FormTextBoxComponent } from './form-textarea.component';
import { FormCheckboxComponent } from './form-checkbox.component';
import { FormRadioComponent } from './form-radio.component';

const components = {
    input: FormInputComponent,
    select: FormSelectComponent,
    //template is not added to the form
    template: FormTemplateComponent,
    //template field is added to the form
    'template-field': FormTemplateComponent,
    button: FormButtonComponent,
    textarea: FormTextBoxComponent,
    checkbox: FormCheckboxComponent,
    radio: FormRadioComponent
};

@Directive({
    selector: '[genericField]'
})
export class GenericFieldDirective implements OnInit, OnDestroy, OnChanges {
    @Input()
    config;

    @Input()
    group: FormGroup;

    private component: ComponentRef<any>;

    constructor(
        private resolver: ComponentFactoryResolver,
        private container: ViewContainerRef,
        private fb: FormBuilder
    ) { }


    ngOnInit() {
        if (this.config.type !== 'factory') {
            const component = components[this.config.type];
            const factory = this.resolver.resolveComponentFactory<any>(component);
            this.component = this.container.createComponent(factory);
            this.component.instance.config = this.config;
            this.component.instance.group = this.group;
            // updating context might be necessary for template types
            this.component.instance.updateContext && this.component.instance.updateContext();
        } else {
            // Config is expected to have a factory to create component.
            if (!this.config.factory) {
                throw new Error(`factory type elements 
                is expected to have a factory to create component`);
            }
            this.component = this.container.createComponent(this.config.factory);
            this.component.instance.config = this.config;
            this.component.instance.group = this.group;
            Object.keys(this.config.data).forEach(key => {
                (<any>this.component.instance)[key] = this.config.data[key];
            });
        }
        if (!this.config.doNotAddtoForm &&
            this.config.type !== 'container' &&
            this.config.type !== 'template') {
        // If this control needs to be added to the form we add it
            this.group.addControl(this.config.name, this.fb.control(
                {
                    value: this.config.value,
                    disabled: this.config.disabled
                },
                this.config.validators
            ));
        }
    }

    ngOnDestroy() {
        if (this.config.name && this.group.controls[this.config.name]) {
            //There is a form element with this name we need to remove it from the form.
            this.group.removeControl(this.config.name);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        // Since ngOnChanges is not triggered on dynamically created components
        // we should do some of the heavy lifting.

        // What if the type of element is changed ? huh??
        // This opens up a whole new can of worms.
        if(changes.type.previousValue !== changes.type.currentValue){
            throw new Error('Change in form elment type is not yet supported');
        }

        this.component.instance.config = this.config;
        this.component.instance.group = this.group;
    }

}