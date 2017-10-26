import { Component, ViewContainerRef } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';


export class FormFieldBase {
    public config;
    public group: FormGroup;
    protected control: AbstractControl;
}
