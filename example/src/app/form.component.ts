import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms'

@Component({
  selector: 'form',
  styles: [`
  /deep/ field-base{
    display: block;
    margin: 10px 2px;
    border: 1px solid rgba(128, 128, 128, 0.29);
  }
  `],
  template: `
  Sample forms
  <b>Resultant form value</b><i>{{formVar.value | json}}</i>
  <generic-form #formVar [config]="myConfig"></generic-form>
  <ng-template #myTemplate>
   This <em>is</em> a stupid template and I want to sit in the middle for no <h4>real</h4>reason
  </ng-template>
  <br/>
  `
})
export class FormComponent implements AfterViewInit {
  @ViewChild('formVar')
  private formVar;

  @ViewChild('myTemplate')
  private templateVar;

  setRandomForm() {
    this.formVar.setValues({
      name: `Name ${Math.round(Math.random() * 20)}`,
      age: Math.round(Math.random() * 30)
    })
  }
  ngAfterViewInit() {
    (<any>this.myConfig.children[5]).template = this.templateVar;
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
      {
        type: 'input',
        name: 'formFieldName',
        inputType: 'text',
        label: 'Change disable status of the form element with the name:'
      },
      {
        type: 'button',
        buttonText: 'Enable',
        buttonType: 'button', //just regular button don't trigger form submit
        onClick: _ => {
          this.formVar.setDisableStatus(this.formVar.value.formFieldName, false);
        }
      },
      {
        type: 'button',
        buttonText: 'Disable',
        buttonType: 'button', //just regular button don't trigger form submit
        onClick: _ => {
          this.formVar.setDisableStatus(this.formVar.value.formFieldName, true);
        }
      },
      {
        type: 'checkbox',
        name: 'doYouAgree',
        value: true,
        label: 'Do you Agree to use this component?'
      },
      {
          type: 'template',
          name: 'hello',
          template: this.templateVar
      },
      {
        type: 'select',
        name: 'food',
        id: 'selectid',
        cssClass: 'select-food',
        value: "",
        options: [
          { label: 'Pizza', value: 4 },
          { label: 'Samosa', value: 2 },
          { label: 'Panner', value: 6 },
          { label: 'Chicken', value: 9 },
        ],
        placeholder: 'Favourite food',
        disablePlaceHolderOption: true
      },
      {
        type: 'textarea',
        name: 'moreFormElements',
        value: `{"type":"input","name": "iAmTheNewGuy","inputType": "number","cssClass": "iAmTheNewGuy"}`,
        label: 'add a valid json here to add it to form'
      },
      {
        type: 'button',
        buttonType: 'button',
        buttonText: 'Add to form',
        onClick: _=>{
          this.myConfig.children= [
            ...this.myConfig.children,
            JSON.parse(this.formVar.value.moreFormElements)
          ]
        }
      },
      {
        type: 'radio',
        name: 'radio',
        cssClass: 'radio-btn',
        value: 3,
        options: [
          { label: 'label1', value: 1 },
          { label: 'label2', value: 2 },
          { label: 'label3', value: 3 },
          { label: 'label4', value: 4 }
        ],
        label: 'radio label',
        optionClass: 'radio-option-class'
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
            type: 'button', //no button type, this will trigger form submit
            name: 'next',
            buttonText: 'Next',
            cssClass: 'next-btn btn',
            onClick: (event) => {
              console.log('button clicked', event, this);
            }
          },
          {
            type: 'button',
            buttonText: 'Set random values',
            buttonType: 'button', //just regular button don't trigger form submit
            onClick: _ => {
              this.setRandomForm();
            }
          }
        ]
      }
    ]
  };
}
