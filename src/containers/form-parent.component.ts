import {
    Component, Input, OnInit, HostBinding,
    EventEmitter, Output, ElementRef, Renderer2
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'generic-form-parent',
    styles: [``],
    template: `
    <ng-container *ngIf="formParent?.type==='container'">
        <generic-form-child [group]="group" [children]="formParent.children"></generic-form-child>
    </ng-container>
  `
})
export class FormParentComponent implements OnInit{
    @Input()
    formParent: any = {};
    @Input()
    group: FormGroup;
    constructor(private el: ElementRef, private renderer: Renderer2) { }
    ngOnInit() {
        this.renderer.addClass(this.el.nativeElement, this.formParent.cssClass || '');
    }
}