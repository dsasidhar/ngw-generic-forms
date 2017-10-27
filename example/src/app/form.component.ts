import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms'

@Component({
  selector: 'form',
  template: `
  Sample forms
  <generic-form #formVar [config]="myConfig"></generic-form>
  <button type="button" (click)="setRandomForm()"> Set random form values</button>
  `
})
export class FormComponent implements AfterViewInit {
  @ViewChild('formVar')
  private formVar;

  setRandomForm() {
    this.formVar.setValues({
      name: `Name ${Math.round(Math.random() * 20)}`,
      age: Math.round(Math.random() * 30)
    })
  }
  ngAfterViewInit() {
    //formVar is available for use here
    console.log(this.formVar);
  }

  errorMessages = {
    name: {
      required: "Name is a required field"
    }
  };
  myConfig = {
    type: 'container',
    cssClass: 'parent-container',
    errorMap: this.errorMessages,
    children: [
      {
        type: 'input',
        name: 'name',
        inputType: 'text',
        placeholder: 'Full name',
        cssClass: 'input-name',
        validators: [Validators.compose([
          Validators.required,
        ])]
      },
      // {
      //     type: 'template-field',
      //     name: 'hello',
      //     template: this.template
      // },
      {
        type: 'select',
        name: 'food',
        cssClass: 'select-food',
        options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
        placeholder: 'Favourite food'
      },
      {
        type: 'container',
        cssClass: 'firstChild',
        children: [
          {
            type: 'input',
            name: 'age',
            placeholder: 'Age',
            cssClass: 'age-holder'
          },
          {
              type: 'textarea',
              name: 'bio',
              placeholder: 'enter your bio',
              cssClass: 'bio'
          },
          {
            type: 'button',
            name: 'next',
            buttonText: 'Next',
            cssClass: 'next-btn btn',
            onClick: (event) => {
              console.log('button clicked', event, this);
            }
          }
        ]
      }
    ]
  };
}
