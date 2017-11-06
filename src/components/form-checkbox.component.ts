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
    <input [attr.id]="config.id" type="checkbox" [attr.placeholder]="config.placeholder" 
        [formControlName]="config.name" />
    <ng-container *ngIf="!config.labelTemplate">
        <label *ngIf="config.label">{{config.label}}</label>
    </ng-container>
    <ng-container *ngIf="config.labelTemplate">
        <ng-container *ngTemplateOutlet="config.labelTemplate;context:config.labelContext">
        </ng-container>
    </ng-container>
    </field-base>
  `
})
export class FormCheckboxComponent extends FormFieldBase {
}
