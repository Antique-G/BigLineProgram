import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialRoutes } from './material.routing';
import { AdminComponent } from './admin/admin.component';
import { AdminDetailComponent } from './admin/admin-detail/admin-detail.component';
import { AdminStoreComponent } from './admin-store/admin-store.component';
import { AdminStoreCreateComponent } from './admin-store/admin-store-create/admin-store-create.component';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { DemoNgZorroAntdModule } from '../ng-zorro-antd.module';
import { AdminCreateComponent } from './admin/admin-create/admin-create.component';
import { AdminStoreAccountComponent } from './admin-store-account/admin-store-account.component';
import { AdminStoreBankAccountComponent } from './admin-store-bank-account/admin-store-bank-account.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    NzCascaderModule,
    DemoNgZorroAntdModule
  ],
  providers: [],
  entryComponents: [
    AdminDetailComponent,
    AdminCreateComponent,
    AdminStoreCreateComponent
  ],
  declarations: [
    AdminComponent,
    AdminDetailComponent,
    AdminStoreComponent,
    AdminStoreCreateComponent,
    AdminCreateComponent,
    AdminStoreAccountComponent,
    AdminStoreBankAccountComponent
  ]
})
export class MaterialComponentsModule {}
