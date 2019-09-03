import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UsersComponent} from './components/users/users.component';
import {LoginComponent} from './components/login/login.component';


const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forRoot([
      {path: 'users', component: UsersComponent},
    ]),
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
    ]),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
