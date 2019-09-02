import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
{
  path: 'users',
    component: UsersComponent
    }
    ];

@NgModule({
  imports: [
  RouterModule.forRoot(routes),
  RouterModule.forRoot( [
	{ path : 'users', component : UsersComponent },
  ]),

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
