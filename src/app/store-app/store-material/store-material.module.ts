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
import { StoreMeetingPlaceCreateComponent } from './store-meeting-place/store-meeting-place-create/store-meeting-place-create.component';
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
import { CommonModelComponent } from './common/common-model/common-model.component';
import { StoreProductFeatureComponent } from './store-product-management/store-product-create-bystep/store-product-feature/store-product-feature.component';
import { StoreProductEditornoticeComponent } from './store-product-management/store-product-create-bystep/store-product-editornotice/store-product-editornotice.component';
import { StoreProductEditordetailComponent } from './store-product-management/store-product-create-bystep/store-product-editordetail/store-product-editordetail.component';
import { StoreProductManagementDetailInfoComponent } from './store-product-management/store-product-management-detail/store-product-management-detail-info/store-product-management-detail-info.component';
import { StoreProductManagementDetailFeatureComponent } from './store-product-management/store-product-management-detail/store-product-management-detail-feature/store-product-management-detail-feature.component';
import { StoreProductManagementDetailEditornoticeComponent } from './store-product-management/store-product-management-detail/store-product-management-detail-editornotice/store-product-management-detail-editornotice.component';
import { StoreProductManagementDetailEditordetailComponent } from './store-product-management/store-product-management-detail/store-product-management-detail-editordetail/store-product-management-detail-editordetail.component';
import { StoreProductManagementDetailDescComponent } from './store-product-management/store-product-management-detail/store-product-management-detail-desc/store-product-management-detail-desc.component';
import { AgreeComponent } from './common/common-model/agree/agree.component';
import { StoreTravelDetailDescComponent } from './store-product-free-travel/store-product-free-travel-detail/store-travel-detail-desc/store-travel-detail-desc.component';
import { StoreTravelDetailFeatureComponent } from './store-product-free-travel/store-product-free-travel-detail/store-travel-detail-feature/store-travel-detail-feature.component';
import { StoreTravelDetailNoticeComponent } from './store-product-free-travel/store-product-free-travel-detail/store-travel-detail-notice/store-travel-detail-notice.component';
import { StoreFreeCreateBystepComponent } from './store-product-free-travel/store-free-create-bystep/store-free-create-bystep.component';
import { StoreFreeInfoComponent } from './store-product-free-travel/store-free-create-bystep/store-free-info/store-free-info.component';
import { StoreFreeDescComponent } from './store-product-free-travel/store-free-create-bystep/store-free-desc/store-free-desc.component';
import { StoreFreeFeatureComponent } from './store-product-free-travel/store-free-create-bystep/store-free-feature/store-free-feature.component';
import { StoreFreeNoticeComponent } from './store-product-free-travel/store-free-create-bystep/store-free-notice/store-free-notice.component';
import { StoreTravelDetailImageComponent } from './store-product-free-travel/store-product-free-travel-detail/store-travel-detail-image/store-travel-detail-image.component';
import { StoreFreeImageComponent } from './store-product-free-travel/store-free-create-bystep/store-free-image/store-free-image.component';
import { StoreMeetingPlaceDetailComponent } from './store-meeting-place/store-meeting-place-detail/store-meeting-place-detail.component';
import { StoreMeetingPlaceComponent } from './store-meeting-place/store-meeting-place.component';
import { StoreTemplateExampleComponent } from './store-terms-management/store-terms-management-create/store-template-example/store-template-example.component';
import { StoreTouristComponent } from './store-tourist/store-tourist.component';
import { StoreTouristCreateComponent } from './store-tourist/store-tourist-create/store-tourist-create.component';
import { StoreTouristDetailComponent } from './store-tourist/store-tourist-detail/store-tourist-detail.component';
import { StoreOrderGroupComponent } from './store-order-group/store-order-group.component';
import { StoreOrderGroupDetailComponent } from './store-order-group/store-order-group-detail/store-order-group-detail.component';
import { StoreOrderGroupDetailSubgroupComponent } from './store-order-group/store-order-group-detail/store-order-group-detail-subgroup/store-order-group-detail-subgroup.component';
import { StoreOrderGroupDetailSubgroupSetguideComponent } from './store-order-group/store-order-group-detail/store-order-group-detail-subgroup/store-order-group-detail-subgroup-setguide/store-order-group-detail-subgroup-setguide.component';
import { StoreOrderGroupDetailSubgroupMoveorderComponent } from './store-order-group/store-order-group-detail/store-order-group-detail-subgroup/store-order-group-detail-subgroup-moveorder/store-order-group-detail-subgroup-moveorder.component';
import { StoreOrderGroupDetailShutoffComponent } from './store-order-group/store-order-group-detail/store-order-group-detail-shutoff/store-order-group-detail-shutoff.component';
import { StoreOrderFreetravelComponent } from './store-order-freetravel/store-order-freetravel.component';
import { StoreOrderFreetravelDetailComponent } from './store-order-freetravel/store-order-freetravel-detail/store-order-freetravel-detail.component';
import { StoreOrderGroupDetailSubgroupSentsmsComponent } from './store-order-group/store-order-group-detail/store-order-group-detail-subgroup/store-order-group-detail-subgroup-sentsms/store-order-group-detail-subgroup-sentsms.component';
import { StoreProductPostComponent } from './store-product-management/store-product-create-bystep/store-product-post/store-product-post.component';
import { StoreProductManagementDetailPostComponent } from './store-product-management/store-product-management-detail/store-product-management-detail-post/store-product-management-detail-post.component';
import { StoreFreePostComponent } from './store-product-free-travel/store-free-create-bystep/store-free-post/store-free-post.component';
import { StoreFreeDetailPostComponent } from './store-product-free-travel/store-product-free-travel-detail/store-free-detail-post/store-free-detail-post.component';
import { StoreOrderGrouptravelComponent } from './store-order-grouptravel/store-order-grouptravel.component';
import { StoreOrderGrouptravelDetailComponent } from './store-order-grouptravel/store-order-grouptravel-detail/store-order-grouptravel-detail.component';
import { StoreOrderGroupChangePriceComponent } from './store-order-grouptravel/store-order-grouptravel-detail/store-order-group-change-price/store-order-group-change-price.component';
import { StoreOrderFreeChangePriceComponent } from './store-order-freetravel/store-order-freetravel-detail/store-order-free-change-price/store-order-free-change-price.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { StoreOrderGroupChangeDateComponent } from './store-order-grouptravel/store-order-grouptravel-detail/store-order-group-change-date/store-order-group-change-date.component';
import { StoreOrderFreeChangeDateComponent } from './store-order-freetravel/store-order-freetravel-detail/store-order-free-change-date/store-order-free-change-date.component';
import { StoreOrderGroupDetailChangeNumsComponent } from './store-order-group/store-order-group-detail/store-order-group-detail-change-nums/store-order-group-detail-change-nums.component';
import { StoreContractComponent } from './store-contract/store-contract.component';
import { StoreContractCreateComponent } from './store-contract/store-contract-create/store-contract-create.component';

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
    NzTimePickerModule,
    ScrollingModule,
    DragDropModule
  ],
  providers: [],
  entryComponents: [
    StoreMeetingPlaceCreateComponent,
    StoreMeetingPlaceDetailComponent,
    StoreTermsManagementCreateComponent,
    StoreTermsManagementDetailComponent,
    StoreProductManagementDetailComponent,
    StoreTermManagementReviewComponent
  ],
  declarations: [
    StoreProductManagementComponent,
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
    StoreTravelDetailProinfoComponent,
    CommonModelComponent,
    StoreProductFeatureComponent,
    StoreProductEditornoticeComponent,
    StoreProductEditordetailComponent,
    StoreProductManagementDetailInfoComponent,
    StoreProductManagementDetailFeatureComponent,
    StoreProductManagementDetailEditornoticeComponent,
    StoreProductManagementDetailEditordetailComponent,
    StoreProductManagementDetailDescComponent,
    AgreeComponent,
    StoreTravelDetailDescComponent,
    StoreTravelDetailFeatureComponent,
    StoreTravelDetailNoticeComponent,
    StoreFreeCreateBystepComponent,
    StoreFreeInfoComponent,
    StoreFreeDescComponent,
    StoreFreeFeatureComponent,
    StoreFreeNoticeComponent,
    StoreTravelDetailImageComponent,
    StoreFreeImageComponent,
    StoreTemplateExampleComponent,
    StoreTouristComponent,
    StoreTouristCreateComponent,
    StoreTouristDetailComponent,
    StoreOrderGroupComponent,
    StoreOrderGroupDetailComponent,
    StoreOrderGroupDetailSubgroupComponent,
    StoreOrderGroupDetailSubgroupSetguideComponent,
    StoreOrderGroupDetailSubgroupMoveorderComponent,
    StoreOrderGroupDetailShutoffComponent,
    StoreOrderFreetravelComponent,
    StoreOrderFreetravelDetailComponent,
    StoreOrderGroupDetailSubgroupSentsmsComponent,
    StoreProductPostComponent,
    StoreProductManagementDetailPostComponent,
    StoreFreePostComponent,
    StoreFreeDetailPostComponent,
    StoreOrderGrouptravelComponent,
    StoreOrderGrouptravelDetailComponent,
    StoreOrderGroupChangePriceComponent,
    StoreOrderFreeChangePriceComponent,
    StoreOrderGroupChangeDateComponent,
    StoreOrderFreeChangeDateComponent,
    StoreOrderGroupDetailChangeNumsComponent,
    StoreContractComponent,
    StoreContractCreateComponent,
    
  ]
})
export class StoreMaterialComponentsModule { }
