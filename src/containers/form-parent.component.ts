import {
    Component, Input, OnChanges, HostBinding,
    EventEmitter, Output, ElementRef, Renderer2, ChangeDetectorRef
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
export class FormParentComponent implements OnChanges {
    @Input()
    formParent: any = {};
    @Input()
    group: FormGroup;
    constructor(private el: ElementRef, private renderer: Renderer2,
        private cdr: ChangeDetectorRef) { }
    ngOnChanges() {
        let cssClass = (this.formParent.cssClass || '') + ' gen-parent';
        cssClass.split(' ').filter(className => !!className)
            .forEach(className => this.renderer.addClass(this.el.nativeElement, className));
        this.cdr.detectChanges();

    }
}