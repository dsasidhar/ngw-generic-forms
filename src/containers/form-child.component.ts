import { Component, Input, EventEmitter, Output,ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'generic-form-child',
    styles: [``],
    template: `
        <ng-container *ngFor="let field of children;">
            <ng-container *ngIf="field?.type!=='container'">
              <ng-container genericField [config]="field" [group]="group"></ng-container>
            </ng-container>
            <ng-container *ngIf="field?.type==='container'">
                <generic-form-parent [formParent]="field" [group]="group">
                </generic-form-parent>
            </ng-container>
      </ng-container>
  `
})
export class FormChildrenComponent {
    @Input()
    children: any[] = [];
    @Input()
    group: FormGroup;

    constructor(private fb: FormBuilder) { }
}