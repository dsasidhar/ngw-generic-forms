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


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    GenericFormComponent,
    GenericFieldDirective,
    FormInputComponent,
    FormSelectComponent,
    FormChildrenComponent,
    FormParentComponent,
    FormTemplateComponent,
    FieldBaseComponent,
    FormButtonComponent
  ],
  exports: [
    GenericFormComponent
  ],
  entryComponents: [
    FormInputComponent,
    FormSelectComponent,
    FormTemplateComponent,
    FormButtonComponent
  ]
})
export class GenericFormModule {}
