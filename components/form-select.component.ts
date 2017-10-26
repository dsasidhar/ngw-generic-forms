import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormFieldBase } from './form-field-base';

@Component({
  selector: 'form-select',
  styles: [``],
  template: `
    <field-base [formGroup]="group" [group]="group" [config]="config" 
      [internalClasses]="'form-select'">
      
      <select [formControlName]="config.name">

        <option value="">{{ config.placeholder }}</option>
        <option *ngFor="let option of config.options">
          {{ option }}
        </option>

      </select>

    </field-base>
  `
})
export class FormSelectComponent extends FormFieldBase {
}
