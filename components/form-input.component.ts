import { Component, ViewContainerRef } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { FormFieldBase } from './form-field-base';

@Component({
    selector: 'form-input',
    styles: [
        ``
    ],
    template: `
    <field-base [formGroup]="group" [group]="group" [config]="config" 
        [internalClasses]="'form-input'">
    <input [type]="config.inputType" [attr.placeholder]="config.placeholder" 
        [formControlName]="config.name" />
    </field-base>
  `
})
export class FormInputComponent extends FormFieldBase {
}