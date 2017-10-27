import { Component, ViewContainerRef } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { FormFieldBase } from './form-field-base';

@Component({
    selector: 'form-radio',
    styles: [
        ``
    ],
    template: `
    <field-base [formGroup]="group" [group]="group" [config]="config" 
        [internalClasses]="'form-radio'">
        <ng-container *ngFor="let option of config.options">
        <input  [type]="'radio'" [value]="option.value" [name]="config.name"
            [formControlName]="config.name" />
            <div class="field-radio-option"
                [ngClass]="config.optionClass">{{option.label}}</div>
        </ng-container>
    </field-base>
  `
})
export class FormRadioComponent extends FormFieldBase {
}