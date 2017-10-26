import {
  Component, Input, OnInit,
  EventEmitter, Output
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'generic-form',
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

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({});
    (<any>this.form).__error = this.config.errorMap;
  }
  get value() {
    return this.form.value;
  }
  get valid() {
    return this.form.valid;
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