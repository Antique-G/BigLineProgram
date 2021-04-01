import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreLoginComponent } from './store-login.component';
import { StoreLoginRoutingModule } from './store-login-routing.module';
import { DemoMaterialModule } from '../../../app/demo-material-module';
import { MaterialComponentsModule } from '../../../app/material-component/material.module';
import { StoreForgetPasswordComponent } from './store-forget-password/store-forget-password.component';
import { StoreRegisteredComponent } from './store-registered/store-registered.component';
import { StoreSetNewPasswordComponent } from './store-forget-password/store-set-new-password/store-set-new-password.component';


@NgModule({
  declarations: [StoreLoginComponent, StoreForgetPasswordComponent, StoreRegisteredComponent, StoreSetNewPasswordComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreLoginRoutingModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialComponentsModule
  ]
})
export class StoreLoginModule { }
