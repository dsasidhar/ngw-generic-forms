import { Component, ViewContainerRef } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';


export class FormFieldBase {
    public config;
    public group: FormGroup;
    protected control: AbstractControl;
    isFunction(functionObject){
        let type = typeof functionObject;
        if(type === 'function') return true;
        throw new Error(`Illegal type function expected, got ${type}`);
    }
}
