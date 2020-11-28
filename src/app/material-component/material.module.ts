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
import { AdminStoreBankAccountCreateComponent } from './admin-store-bank-account/admin-store-bank-account-create/admin-store-bank-account-create.component';
import { AdminStoreBankAccountDetailComponent } from './admin-store-bank-account/admin-store-bank-account-detail/admin-store-bank-account-detail.component';
import { AdminStoreAccountCreateComponent } from './admin-store-account/admin-store-account-create/admin-store-account-create.component';
import { AdminProductAreaComponent } from './admin-product-area/admin-product-area.component';
import { AdminProductAreaFirstComponent } from './admin-product-area/admin-product-area-first/admin-product-area-first.component';
import { AdminProductAreaCreateComponent } from './admin-product-area/admin-product-area-create/admin-product-area-create.component';
import { AdminProductAreaSecondComponent } from './admin-product-area/admin-product-area-second/admin-product-area-second.component';

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
    AdminStoreCreateComponent,
    AdminStoreBankAccountCreateComponent,
    AdminStoreBankAccountDetailComponent,
    AdminStoreAccountCreateComponent,
    AdminProductAreaCreateComponent
  ],
  declarations: [
    AdminComponent,
    AdminDetailComponent,
    AdminStoreComponent,
    AdminStoreCreateComponent,
    AdminCreateComponent,
    AdminStoreAccountComponent,
    AdminStoreBankAccountComponent,
    AdminStoreBankAccountCreateComponent,
    AdminStoreBankAccountDetailComponent,
    AdminStoreAccountCreateComponent,
    AdminProductAreaComponent,
    AdminProductAreaFirstComponent,
    AdminProductAreaCreateComponent,
    AdminProductAreaSecondComponent,
  ]
})
export class MaterialComponentsModule {}
