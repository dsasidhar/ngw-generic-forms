import {
    ComponentFactoryResolver, ComponentRef,
    Directive, Input, OnInit, ViewContainerRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormInputComponent } from './form-input.component';
import { FormSelectComponent } from './form-select.component';
import { FormTemplateComponent } from './form-template.component';

const components = {
    input: FormInputComponent,
    select: FormSelectComponent,
    template: FormTemplateComponent,
    'template-field': FormTemplateComponent
};

@Directive({
    selector: '[genericField]'
})
export class GenericFieldDirective implements OnInit {
    @Input()
    config;

    @Input()
    group: FormGroup;

    private component: ComponentRef<any>;

    constructor(
        private resolver: ComponentFactoryResolver,
        private container: ViewContainerRef
    ) { }


    ngOnInit() {
        if (this.config.type !== 'factory') {
            const component = components[this.config.type];
            const factory = this.resolver.resolveComponentFactory<any>(component);
            this.component = this.container.createComponent(factory);
            this.component.instance.config = this.config;
            this.component.instance.group = this.group;
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
    }
}