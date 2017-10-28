import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { GenericFormComponent } from './containers/generic-form.component';
import { FormInputComponent } from './components/form-input.component';
import { FormSelectComponent } from './components/form-select.component';
import { GenericFieldDirective } from './components/generic-field.directive';
import { FormChildrenComponent } from './containers/form-child.component';
import { FormParentComponent } from './containers/form-parent.component';
import { FormTemplateComponent } from './components/form-template.component';
import { FieldBaseComponent } from './components/field-base.component';
import { FormButtonComponent } from './components/form-button.component';
import { FormTextBoxComponent } from './components/form-textarea.component';
import { FormCheckboxComponent } from './components/form-checkbox.component';
import { FormRadioComponent } from './components/form-radio.component';

const formComponents = [
  FormInputComponent,
  FormSelectComponent,
  FormTemplateComponent,
  FormButtonComponent,
  FormTextBoxComponent,
  FormCheckboxComponent,
  FormRadioComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    GenericFormComponent,
    GenericFieldDirective,
    FormChildrenComponent,
    FormParentComponent,
    FieldBaseComponent,
    ...formComponents
  ],
  exports: [
    GenericFormComponent,
    FieldBaseComponent
  ],
  entryComponents: [
    ...formComponents
  ]
})
export class GenericFormModule {}
