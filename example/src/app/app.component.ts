import { Component,} from '@angular/core';

@Component({
  selector: 'app',
  template: `
  
  <a [routerLink]="['./form']">form</a>
  <a [routerLink]="['./other']">Other</a>
  <router-outlet></router-outlet>
  `
})
export class AppComponent {
}