import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminForgotPasswordComponent } from './admin-forgot-password/admin-forgot-password.component';
import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
  
    ]
  },
  {
    path: 'forgotPassword',
    component: AdminForgotPasswordComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
