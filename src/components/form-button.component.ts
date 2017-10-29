import { Component, ViewContainerRef } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { FormFieldBase } from './form-field-base';

@Component({
    selector: 'form-button',
    styles: [
        ``
    ],
    template: `
    <field-base [group]="group" [config]="config" 
        [internalClasses]="'form-button'">
        <button [attr.type]="config.buttonType" [disabled]="config.enableOnValid && !group.valid"
            (click)="buttonClick($event)" (hover)="buttonHover($event)">
            {{config.buttonText}}
        </button>
    </field-base>
  `
})
export class FormButtonComponent extends FormFieldBase {
    buttonClick($event) {
        if (this.config.onClick) {
            this.isFunction(this.config.onClick);
            this.config.onClick.call(null, $event);
        }
    }
    buttonHover($event){
        if (this.config.onHover) {
            this.isFunction(this.config.onHover);
            this.config.onHover.call(null, $event);
        }
    }
}