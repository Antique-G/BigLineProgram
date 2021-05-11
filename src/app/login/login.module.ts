import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { DemoMaterialModule } from '../demo-material-module';
import { MaterialComponentsModule } from '../material-component/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DemoNgZorroAntdModule } from '../ng-zorro-antd.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { AdminBannerComponent } from './admin-banner/admin-banner.component';
import { AdminForgotPasswordComponent } from './admin-forgot-password/admin-forgot-password.component';
import { AdminSetNewPasswordComponent } from './admin-forgot-password/admin-set-new-password/admin-set-new-password.component';
import { AdminSetPassswordSuccessComponent } from './admin-forgot-password/admin-set-passsword-success/admin-set-passsword-success.component';


@NgModule({
  declarations: [LoginComponent, AdminBannerComponent,AdminForgotPasswordComponent, AdminSetNewPasswordComponent, AdminSetPassswordSuccessComponent], 
  imports: [
    CommonModule,
    HttpClientModule,
    LoginRoutingModule,
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    CdkTableModule,
    DemoNgZorroAntdModule,
    NzTimePickerModule,
    ScrollingModule,
    DragDropModule
    
  ]
})
export class LoginModule { }
