import { Component, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'form-generic-template',
    styles: [
        ``
    ],
    template: `
    <ng-container *ngTemplateOutlet="config.template;context:ctx"></ng-container>
  `
})
export class FormTemplateComponent {
    config;
    group: FormGroup;
    ctx: any = {};
    updateContext() {
        this.ctx = {
            group: this.group,
            config: this.config
        };
    }
}