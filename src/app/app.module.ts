import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersComponent } from './components/users/users.component';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
// Login

import { LoginComponent } from './components/login/login.component';
// Rective form
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// Alert
// @ts-ignore
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormComponent } from './components/users/form/form.component';

// bootstrap
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    UsersComponent,
    AppComponent,
    LoginComponent,
    AppComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn',
    }),
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
