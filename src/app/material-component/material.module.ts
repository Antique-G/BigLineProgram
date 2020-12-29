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
import { AdminSystemAreaComponent } from './admin-system-area/admin-system-area.component';
import { AdminSystemAreaCreateComponent } from './admin-system-area/admin-system-area-create/admin-system-area-create.component';
import { AdminStoreDetailComponent } from './admin-store/admin-store-detail/admin-store-detail.component';
import { AdminProductTagComponent } from './admin-product/admin-product-tag/admin-product-tag.component';
import { AdminProductTagCreateComponent } from './admin-product/admin-product-tag/admin-product-tag-create/admin-product-tag-create.component';
import { AdminStoreAccountDetailComponent } from './admin-store-account/admin-store-account-detail/admin-store-account-detail.component';
import { AdminProductTagDetailComponent } from './admin-product/admin-product-tag/admin-product-tag-detail/admin-product-tag-detail.component';
import { AdminProductManagementComponent } from './admin-product/admin-product-management/admin-product-management.component';
import { AdminProductManagementDetailComponent } from './admin-product/admin-product-management/admin-product-management-detail/admin-product-management-detail.component';
import { AdminSystemAreaEditComponent } from './admin-system-area/admin-system-area-edit/admin-system-area-edit.component';
import { AdminProductReviewComponent } from './admin-product/admin-product-management/admin-product-review/admin-product-review.component';
import { AdminTermsManageComponent } from './admin-terms-manage/admin-terms-manage.component';
import { AdminTermsManageReviewComponent } from './admin-terms-manage/admin-terms-manage-review/admin-terms-manage-review.component';
import { AdminProductManagementUpComponent } from './admin-product/admin-product-management/admin-product-management-up/admin-product-management-up.component';
import { AdminTermsManageUpComponent } from './admin-terms-manage/admin-terms-manage-up/admin-terms-manage-up.component';
import { AdminDeleteComponent } from './admin-common/admin-delete/admin-delete.component';
import { AccountDetailComponent } from './admin-common/account-detail/account-detail.component';
import { AdminProducFreeTravelComponent } from './admin-product/admin-produc-free-travel/admin-produc-free-travel.component';
import { AdminProductFreeTravelDetailComponent } from './admin-product/admin-produc-free-travel/admin-product-free-travel-detail/admin-product-free-travel-detail.component';
import { AdminTravelDetailProinfoComponent } from './admin-product/admin-produc-free-travel/admin-product-free-travel-detail/admin-travel-detail-proinfo/admin-travel-detail-proinfo.component';
import { AdminChooseImgComponent } from './admin-product/admin-produc-free-travel/admin-product-free-travel-detail/admin-choose-img/admin-choose-img.component';

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
    DemoNgZorroAntdModule,
  ],
  providers: [],
  entryComponents: [
    AdminDetailComponent,
    AdminCreateComponent,
    AdminStoreCreateComponent,
    AdminStoreDetailComponent,
    AdminStoreBankAccountCreateComponent,
    AdminStoreBankAccountDetailComponent,
    AdminStoreAccountCreateComponent,
    AdminSystemAreaCreateComponent,
    AdminProductTagDetailComponent,
    AdminProductTagCreateComponent,
    AdminProductReviewComponent,
    AdminTermsManageReviewComponent
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
    AdminSystemAreaComponent,
    AdminSystemAreaCreateComponent,
    AdminStoreDetailComponent,
    AdminProductTagComponent,
    AdminProductTagCreateComponent,
    AdminStoreAccountDetailComponent,
    AdminProductTagDetailComponent,
    AdminProductManagementComponent,
    AdminProductManagementDetailComponent,
    AdminSystemAreaEditComponent,
    AdminProductReviewComponent,
    AdminTermsManageComponent,
    AdminTermsManageReviewComponent,
    AdminProductManagementUpComponent,
    AdminTermsManageUpComponent,
    AdminDeleteComponent,
    AccountDetailComponent,
    AdminProducFreeTravelComponent,
    AdminProductFreeTravelDetailComponent,
    AdminTravelDetailProinfoComponent,
    AdminChooseImgComponent,
  ]
})
export class MaterialComponentsModule {}
