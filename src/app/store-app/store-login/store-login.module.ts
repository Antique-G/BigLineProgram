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
import { StoreBannerComponent } from './store-banner/store-banner.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { DemoNgZorroAntdModule } from '../../../app/ng-zorro-antd.module';


@NgModule({
  declarations: [StoreLoginComponent, StoreForgetPasswordComponent, StoreRegisteredComponent, StoreSetNewPasswordComponent, StoreBannerComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreLoginRoutingModule,
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
export class StoreLoginModule { }
