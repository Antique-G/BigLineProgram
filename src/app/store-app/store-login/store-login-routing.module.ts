import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreForgetPasswordComponent } from './store-forget-password/store-forget-password.component';
import { StoreNewPasswordSuccessComponent } from './store-forget-password/store-new-password-success/store-new-password-success.component';
import { StoreSetNewPasswordComponent } from './store-forget-password/store-set-new-password/store-set-new-password.component';
import { StoreLoginComponent } from './store-login.component';
import { StoreRegisteredSuccessComponent } from './store-registered/store-registered-success/store-registered-success.component';
import { StoreRegisteredComponent } from './store-registered/store-registered.component';

const routes: Routes = [

  {
    path: '',
    component: StoreLoginComponent,
    children: [
      {
        path: 'login',
        component: StoreLoginComponent
      },
    ]
  },
  {
    path: 'forgetPassword',
    component: StoreForgetPasswordComponent
  },
  {
    path: 'forgetPassword/setNewPassword',
    component: StoreSetNewPasswordComponent
  },
  {
    path: 'registered',
    component: StoreRegisteredComponent
  },
  {
    path: 'registered/success',
    component: StoreRegisteredSuccessComponent
  },
  {
    path: 'newPassword/success',
    component: StoreNewPasswordSuccessComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreLoginRoutingModule { }
