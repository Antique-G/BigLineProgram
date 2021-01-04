import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DemoNgZorroAntdModule } from '../../ng-zorro-antd.module';
import { DemoMaterialModule } from '../../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreMaterialRoutes } from './store-material.routing';
import { StoreProductManagementComponent } from './store-product-management/store-product-management.component';
import { StoreProductManagementCreateComponent } from './store-product-management/store-product-management-create/store-product-management-create.component';
import { StoreMeetingPlaceComponent } from './store-meeting-place/store-meeting-place.component';
import { StoreMeetingPlaceCreateComponent } from './store-meeting-place/store-meeting-place-create/store-meeting-place-create.component';
import { StoreMeetingPlaceDetailComponent } from './store-meeting-place/store-meeting-place-detail/store-meeting-place-detail.component';
import { StoreTermsManagementComponent } from './store-terms-management/store-terms-management.component';
import { StoreTermsManagementCreateComponent } from './store-terms-management/store-terms-management-create/store-terms-management-create.component';
import { StoreTermsManagementDetailComponent } from './store-terms-management/store-terms-management-detail/store-terms-management-detail.component';
import { StoreQuoteBydateComponent } from './store-quote-bydate/store-quote-bydate.component';
import { StoreQuoteBydateCreateComponent } from './store-quote-bydate/store-quote-bydate-create/store-quote-bydate-create.component';
import { StoreProductManagementDetailComponent } from './store-product-management/store-product-management-detail/store-product-management-detail.component';
import { StoreTermManagementReviewComponent } from './store-terms-management/store-term-management-review/store-term-management-review.component';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { DeleteComfirmComponent } from './common/delete-comfirm/delete-comfirm.component';
import { StoreAccountDetailComponent } from './common/store-account-detail/store-account-detail.component';
import { StoreProductCreateBystepComponent } from './store-product-management/store-product-create-bystep/store-product-create-bystep.component';
import { StoreProductInfoComponent } from './store-product-management/store-product-create-bystep/store-product-info/store-product-info.component';
import { StoreProductDescComponent } from './store-product-management/store-product-create-bystep/store-product-desc/store-product-desc.component';
import { StoreProductFreeTravelComponent } from './store-product-free-travel/store-product-free-travel.component';
import { StoreProductFreeTravelDetailComponent } from './store-product-free-travel/store-product-free-travel-detail/store-product-free-travel-detail.component';
import { StoreTravelDetailProinfoComponent } from './store-product-free-travel/store-product-free-travel-detail/store-travel-detail-proinfo/store-travel-detail-proinfo.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(StoreMaterialRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    DemoNgZorroAntdModule,
    NzTimePickerModule
  ],
  providers: [],
  entryComponents: [
    StoreProductManagementCreateComponent,
    StoreMeetingPlaceCreateComponent,
    StoreMeetingPlaceDetailComponent,
    StoreTermsManagementCreateComponent,
    StoreTermsManagementDetailComponent,
    StoreProductManagementDetailComponent,
    StoreTermManagementReviewComponent
  ],
  declarations: [
    StoreProductManagementComponent,
    StoreProductManagementCreateComponent,
    StoreMeetingPlaceComponent,
    StoreMeetingPlaceCreateComponent,
    StoreMeetingPlaceDetailComponent,
    StoreTermsManagementComponent,
    StoreTermsManagementCreateComponent,
    StoreTermsManagementDetailComponent,
    StoreQuoteBydateComponent,
    StoreQuoteBydateCreateComponent,
    StoreProductManagementDetailComponent,
    StoreTermManagementReviewComponent,
    DeleteComfirmComponent,
    StoreAccountDetailComponent,
    StoreProductCreateBystepComponent,
    StoreProductInfoComponent,
    StoreProductDescComponent,
    StoreProductFreeTravelComponent,
    StoreProductFreeTravelDetailComponent,
    StoreTravelDetailProinfoComponent
  ]
})
export class StoreMaterialComponentsModule { }
