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


@NgModule({
  declarations: [LoginComponent], 
  imports: [
    CommonModule,
    HttpClientModule,
    LoginRoutingModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CdkTableModule,
    DemoNgZorroAntdModule,
    NzTimePickerModule,
    ScrollingModule,
    DragDropModule,
    FlexLayoutModule,
    MaterialComponentsModule

  ]
})
export class LoginModule { }
