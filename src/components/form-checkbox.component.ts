import { Component, ViewContainerRef } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { FormFieldBase } from './form-field-base';

@Component({
    selector: 'form-checkbox',
    styles: [
        ``
    ],
    template: `
    <field-base [formGroup]="group" [group]="group" [config]="config" [showLabel]="false"
        [internalClasses]="'form-checkbox'">
    <input type="checkbox" [attr.placeholder]="config.placeholder" 
        [formControlName]="config.name" />
    <label *ngIf="config.label">{{config.label}}</label>
    </field-base>
  `
})
export class FormCheckboxComponent extends FormFieldBase {
}