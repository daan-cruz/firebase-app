import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';


const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
    ]),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
