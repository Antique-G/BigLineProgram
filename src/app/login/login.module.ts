import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { DemoMaterialModule } from '../demo-material-module';
import { MaterialComponentsModule } from '../material-component/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialComponentsModule
  ]
})
export class LoginModule { }
