import { NgModule } from '@angular/core'
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { GenericFormModule } from "ngw-generic-forms";
import { RouterModule } from '@angular/router';
import { OtherComponent } from './other.component';
import { FormComponent } from './form.component';


@NgModule({
  declarations: [
    AppComponent,
    OtherComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    GenericFormModule,
    RouterModule.forRoot([{
      path: 'other', component: OtherComponent,
    },{
      path: 'form', component: FormComponent
    }])
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
