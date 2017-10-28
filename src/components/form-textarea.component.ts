import { Component, ViewContainerRef } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { FormFieldBase } from './form-field-base';

@Component({
    selector: 'form-textarea',
    styles: [
        ``
    ],
    template: `
    <field-base [formGroup]="group" [group]="group" [config]="config" 
        [internalClasses]="'form-textarea'">
    <textarea [attr.id]="config.id" [attr.placeholder]="config.placeholder" 
        [formControlName]="config.name" >
        {{config.value}}
        </textarea>
    </field-base>
  `
})
export class FormTextBoxComponent extends FormFieldBase {
}