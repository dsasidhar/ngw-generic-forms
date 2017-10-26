import { Component, ViewContainerRef } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { FormFieldBase } from './form-field-base';

@Component({
    selector: 'form-button',
    styles: [
        ``
    ],
    template: `
    <field-base [formGroup]="group" [group]="group" [config]="config" 
        [internalClasses]="'form-button'">
    <button [attr.placeholder]="config.placeholder" 
        [formControlName]="config.name">{{config.buttonText}}
        </button>
    </field-base>
  `
})
export class FormButtonComponent extends FormFieldBase {
}