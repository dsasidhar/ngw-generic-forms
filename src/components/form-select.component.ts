import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormFieldBase } from './form-field-base';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'form-select',
  styles: [``],
  template: `
    <field-base [formGroup]="group" [group]="group" [config]="config" 
      [internalClasses]="'form-select'">
      
      <select [attr.id]="config.id" [formControlName]="config.name">

        <option [disabled]="config.disablePlaceHolderOption" value="">{{ config.placeholder }}</option>
        <option [value]="option?.value"
          *ngFor="let option of isObservable() ? (config.options | async): (config.options)">
          {{ option?.label }}
        </option>

      </select>

    </field-base>
  `
})
export class FormSelectComponent extends FormFieldBase{
  isObservable(){
    return !!(this.config.options instanceof Observable);
  }
}
