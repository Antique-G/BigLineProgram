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
import { StoreProductManagementUpComponent } from './store-product-management/store-product-management-up/store-product-management-up.component';
import { StoreTermManagementReviewComponent } from './store-terms-management/store-term-management-review/store-term-management-review.component';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { StoreTermsManagementUpComponent } from './store-terms-management/store-terms-management-up/store-terms-management-up.component';
import { DeleteComfirmComponent } from './common/delete-comfirm/delete-comfirm.component';
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
    StoreProductManagementUpComponent,
    StoreTermManagementReviewComponent,
    StoreTermsManagementUpComponent,
    DeleteComfirmComponent
  ]
})
export class StoreMaterialComponentsModule { }
