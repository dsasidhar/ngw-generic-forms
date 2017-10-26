# ngw-generic-forms
Forms that can be generated from a json object

Install with 
`npm install --save 'ngw-generic-forms'`
or 
`yarn add ngw-generic-form`

# What is ngw-generic-forms module

Use it if:

 * You need forms.
 * You need them quick.
 * All the forms you have follow more or less the same structure.

Here is a example of how you can use it:
```html
 <generic-form #formVar [config]="myConfig"></generic-form>
 ...
 <ng-template #randomTemplate let-groupVar="group" let-config="config">
 <p>For some crazy reason I want this in the middle of my form</p>
 <div [formGroup]="groupVar">
 <input type="text" (change)="fileInputChanged()" [formControlName]="config.name" >
</div>
</ng-template>
```
In your component code prepare a config object that does the magic for you:

```javascript
 this.myConfig = {
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
                        ValidationUtil.userNameValidator,
                    ])]
                },
                {
                    type: 'template-field',
                    name: 'hello',
                    template: this.template
                },
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
                        }
                    ]
                }
            ]
        };
```

You can nest it any levels deep, to go a level deeper add a object of type `container` that will create a new container DOM node.


| Parameters | Allowed values and interpretation                                                      |
|------------|----------------------------------------------------------------------------------------|
| type       | Describe the type of form element needed Allowed types: ``container``,`input`,`select` |
|            |                                                                                        |
|            |                                                                                        |
