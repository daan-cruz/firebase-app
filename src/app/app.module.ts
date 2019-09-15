import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

// Firebase
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule, AngularFireAuth} from '@angular/fire/auth';
// Login
import {LoginComponent} from './components/login/login.component';

// Rective form
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// Alert
// @ts-ignore
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';

// bootstrap
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MunicipalitiesComponent} from './components/municipalities/municipalities.component';
// maps
import {AgmCoreModule} from '@agm/core';
// icons
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppComponent,
    MunicipalitiesComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(environment.sweetAlert),
    BrowserAnimationsModule,
    AgmCoreModule.forRoot(environment.mapsKey),
    NgbModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
