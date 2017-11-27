import {
  Component, Input, OnInit,
  EventEmitter, Output, ChangeDetectorRef
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'ngw-generic-form',
  styles: [``],
  template: `
    <form class="generic-form" (submit)="onSubmit($event)" [formGroup]="form">
      <generic-form-parent [formParent]="config" [group]="form"></generic-form-parent>
    </form>
  `
})
export class GenericFormComponent implements OnInit {
  @Input()
  config: any = {};

  @Output()
  submit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  private subscriptions: any[] = [];

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.form = this.fb.group({});
  }
  ngOnChanges(){
    // This looks like its not too bright an idea, but makes access very easy
    // especially on long forms with many nesting levels. So hanging on to it for the moment.
    let controls = flattenArray(this.config);
    Object.defineProperty(this.config,'__',{
      enumerable:false,
      configurable: false,
      writable: true,
      value: {}
    });
    controls.forEach(control=>this.config.__[control.name]=control);
  }

  ngOnInit() {
    // Hacky, but works for now, I don't see this failing any time soon
    // don't want to use a service for just this.
    if(this.config){
      (<any>this.form).__ngw_error = this.config.errorMap;
    }
  }
  get value() {
    return this.form.value;
  }
  get valid() {
    return this.form.valid;
  }
  get status(){
    return this.form.status;
  }
  get dirty(){
    return this.form.dirty;
  }
  get controls() {
    return this.form.controls;
  }
  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.submit.emit(this.value);
  }
  setError(fieldName, error) {
    if (!this.form.controls[fieldName]) {
      throw new Error(`Cannot find field ${fieldName} in the form`);
    }
    this.form.controls[fieldName].setErrors({
      '__ngw_custom': error
    }, { emitEvent: true });
  }
  setCustomError(fieldName, error) {
    if (!this.form.controls[fieldName]) {
      throw new Error(`Cannot find field ${fieldName} in the form`);
    }
    this.form.controls[fieldName].setErrors({
      ...this.form.controls[fieldName].errors, ...{ __ngw_custom: error }
    }, { emitEvent: true });
  }
  setValues(valuesObj, dontThrowError = true) {
    if (!valuesObj) return;
    Object.keys(valuesObj).forEach(key => {
      if (this.form.controls[key]) {
        this.form.controls[key].setValue(valuesObj[key]);
      } else if (!dontThrowError) {
        throw new Error(`Can't find form field with name ${key}`);
      }
    });
    //Some time setting values creates ExpressionChangedAfteritsChecked error in dev mode.
    //This is to avoid that
    this.cdr.detectChanges();
  }

  setDisableStatus(name, disable, options = {}) {
    if (this.form.controls[name]) {
      this.form.controls[name][ disable ? 'disable' : 'enable'](options);
    }
  }

}

function flattenArray(arr) {
  console.log('flattening', arr);
  if (!arr.children) return [];
  return [
    ...arr.children.filter(child => (child.type !== 'container' && child.type !== 'template')),
    ...arr.children.filter(child => child.type === 'container')
      .reduce((prev, child) => prev.concat([...flattenArray(child)]), [])
  ];
}