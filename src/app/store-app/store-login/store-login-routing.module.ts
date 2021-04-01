import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreForgetPasswordComponent } from './store-forget-password/store-forget-password.component';
import { StoreSetNewPasswordComponent } from './store-forget-password/store-set-new-password/store-set-new-password.component';
import { StoreLoginComponent } from './store-login.component';
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreLoginRoutingModule { }
