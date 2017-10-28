import { Component, Input, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { FormFieldBase } from './form-field-base';

@Component({
    selector: 'field-base',
    styles: [
        ``
    ],
    template: `
    <div 
      class="generic-field" [ngClass]="allClasses">
      <label *ngIf="showLabel && label">{{ label }}</label>
      <ng-content></ng-content>
      <div class="error-container">
        <ng-container *ngIf="control?.dirty || control?.touched">
          <ng-container *ngFor="let err of objectKeys(control.errors)">
            <div class="errormessage" >
                {{errorDescription(err,name)}}
            </div>
          </ng-container>
          </ng-container>
          <div class="errormessage other" *ngIf="control?.errors?.__ngw_custom">
              {{control.errors['__ngw_custom']}}
          </div>
        </div>
    </div>
  `
})
export class FieldBaseComponent implements OnChanges, OnInit, OnDestroy {
    errorMap;
    control: FormControl;
    @Input() group;
    @Input() internalClasses;
    @Input() config;
    @Input() showLabel = true;
    public label = '';
    public name = '';
    private cssClass = '';
    public allClasses: String = '';
    private changeSubscription;
    private disableSubscription;
    ngOnChanges() {
        this.errorMap = (<any>this.group).__ngw_error;
        if (this.config) {
            this.label = this.config.label;
            this.name = this.config.name;
            this.cssClass = (this.config.cssClass || '') +
                (this.config.disabled ? ' disabled-element ' : '');
            this.control = this.group.controls[this.name];
        }
        this.allClasses = `${this.cssClass} ${this.internalClasses}`;
        this.label = this.config ? this.config.label : null;
    }
    ngOnInit() {
        if (this.control) {
            this.changeSubscription = this.control.valueChanges.subscribe(_ => {
                return this.control.errors && delete this.control.errors.__ngw_custom;
            });
            this.control.registerOnDisabledChange(isDisabled => {
                if (isDisabled) {
                    if (/ disabled-element /.test(this.allClasses.toString())) {
                        return;
                    }
                    this.allClasses += ' disabled-element ';
                } else {
                    this.allClasses = this.allClasses.replace(/ disabled-element /g, '');
                }
            });
        }
    }
    objectKeys(obj) {
        if (!obj) {
            return [];
        }
        return Object.keys(obj).filter(key => key !== '__ngw_custom');
    }
    errorDescription(err, name) {
        if (err === '__ngw_custom') {
            return '';
        }
        return this.errorMap[name][err];
    }

    ngOnDestroy() {
        if (this.changeSubscription && this.changeSubscription.unsubscribe) {
            this.changeSubscription.unsubscribe();
        }
    }
}
