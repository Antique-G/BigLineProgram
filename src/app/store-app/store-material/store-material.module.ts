import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import 'hammerjs';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { DemoMaterialModule } from '../../demo-material-module';
import { DemoNgZorroAntdModule } from '../../ng-zorro-antd.module';
import { AgreeComponent } from './common/common-model/agree/agree.component';
import { CommonModelComponent } from './common/common-model/common-model.component';
import { DeleteComfirmComponent } from './common/delete-comfirm/delete-comfirm.component';
import { SetCommissionComponent } from './common/set-commission/set-commission.component';
import { StoreAccountDetailComponent } from './common/store-account-detail/store-account-detail.component';
import { UploadVideoComponent } from './common/upload-video/upload-video.component';
import { StoreContractCreateComponent } from './store-contract/store-contract-create/store-contract-create.component';
import { StoreContractComponent } from './store-contract/store-contract.component';
import { StoreMaterialRoutes } from './store-material.routing';
import { StoreMeetingPlaceCreateComponent } from './store-meeting-place/store-meeting-place-create/store-meeting-place-create.component';
import { StoreMeetingPlaceDetailComponent } from './store-meeting-place/store-meeting-place-detail/store-meeting-place-detail.component';
import { StoreMeetingPlaceComponent } from './store-meeting-place/store-meeting-place.component';
import { SOFreetravelOrderComponent } from './store-order-freetravel/s-o-freetravel-order/s-o-freetravel-order.component';
import { StoreOrderFreeChangeDateComponent } from './store-order-freetravel/store-order-freetravel-detail/store-order-free-change-date/store-order-free-change-date.component';
import { StoreOrderFreeChangePriceComponent } from './store-order-freetravel/store-order-freetravel-detail/store-order-free-change-price/store-order-free-change-price.component';
import { StoreOrderFreetravelDetailComponent } from './store-order-freetravel/store-order-freetravel-detail/store-order-freetravel-detail.component';
import { StoreOrderFreetravelComponent } from './store-order-freetravel/store-order-freetravel.component';
import { StoreOrderGroupDetailChangeNumsComponent } from './store-order-group/store-order-group-detail/store-order-group-detail-change-nums/store-order-group-detail-change-nums.component';
import { StoreOrderGroupDetailShutoffComponent } from './store-order-group/store-order-group-detail/store-order-group-detail-shutoff/store-order-group-detail-shutoff.component';
import { StoreOrderGroupDetailSubgroupMoveorderComponent } from './store-order-group/store-order-group-detail/store-order-group-detail-subgroup/store-order-group-detail-subgroup-moveorder/store-order-group-detail-subgroup-moveorder.component';
import { StoreOrderGroupDetailSubgroupSentsmsComponent } from './store-order-group/store-order-group-detail/store-order-group-detail-subgroup/store-order-group-detail-subgroup-sentsms/store-order-group-detail-subgroup-sentsms.component';
import { StoreOrderGroupDetailSubgroupSetguideComponent } from './store-order-group/store-order-group-detail/store-order-group-detail-subgroup/store-order-group-detail-subgroup-setguide/store-order-group-detail-subgroup-setguide.component';
import { StoreOrderGroupDetailSubgroupComponent } from './store-order-group/store-order-group-detail/store-order-group-detail-subgroup/store-order-group-detail-subgroup.component';
import { StoreOrderGroupDetailComponent } from './store-order-group/store-order-group-detail/store-order-group-detail.component';
import { StoreOrderGroupComponent } from './store-order-group/store-order-group.component';
import { StoreOrderGroupMoneyComponent } from './store-order-grouptravel/store-order-group-money/store-order-group-money.component';
import { StoreOrderGroupChangeDateComponent } from './store-order-grouptravel/store-order-grouptravel-detail/store-order-group-change-date/store-order-group-change-date.component';
import { StoreOrderGroupChangePriceComponent } from './store-order-grouptravel/store-order-grouptravel-detail/store-order-group-change-price/store-order-group-change-price.component';
import { StoreOrderGrouptravelDetailComponent } from './store-order-grouptravel/store-order-grouptravel-detail/store-order-grouptravel-detail.component';
import { StoreOrderGrouptravelOrderComponent } from './store-order-grouptravel/store-order-grouptravel-order/store-order-grouptravel-order.component';
import { StoreOrderGrouptravelComponent } from './store-order-grouptravel/store-order-grouptravel.component';
import { StoreOrderRefundTurnoverComponent } from './store-order-refund-turnover/store-order-refund-turnover.component';
import { StoreOrderRefundDetailComponent } from './store-order-refund/store-order-refund-detail/store-order-refund-detail.component';
import { StoreOrderRefundComponent } from './store-order-refund/store-order-refund.component';
import { StoreFreeCreateBystepComponent } from './store-product-free-travel/store-free-create-bystep/store-free-create-bystep.component';
import { StoreFreeDescComponent } from './store-product-free-travel/store-free-create-bystep/store-free-desc/store-free-desc.component';
import { StoreFreeFeatureComponent } from './store-product-free-travel/store-free-create-bystep/store-free-feature/store-free-feature.component';
import { StoreFreeImageComponent } from './store-product-free-travel/store-free-create-bystep/store-free-image/store-free-image.component';
import { StoreFreeInfoComponent } from './store-product-free-travel/store-free-create-bystep/store-free-info/store-free-info.component';
import { StoreFreeNoticeComponent } from './store-product-free-travel/store-free-create-bystep/store-free-notice/store-free-notice.component';
import { StoreFreePostComponent } from './store-product-free-travel/store-free-create-bystep/store-free-post/store-free-post.component';
import { StoreFreeUploadStrokeComponent } from './store-product-free-travel/store-free-create-bystep/store-free-upload-stroke/store-free-upload-stroke.component';
import { StoreFreeDetailPostComponent } from './store-product-free-travel/store-product-free-travel-detail/store-free-detail-post/store-free-detail-post.component';
import { StoreFreeDetailUploadStrokeComponent } from './store-product-free-travel/store-product-free-travel-detail/store-free-detail-upload-stroke/store-free-detail-upload-stroke.component';
import { StoreProductFreeTravelDetailComponent } from './store-product-free-travel/store-product-free-travel-detail/store-product-free-travel-detail.component';
import { StoreTravelDetailDescComponent } from './store-product-free-travel/store-product-free-travel-detail/store-travel-detail-desc/store-travel-detail-desc.component';
import { StoreTravelDetailFeatureComponent } from './store-product-free-travel/store-product-free-travel-detail/store-travel-detail-feature/store-travel-detail-feature.component';
import { StoreTravelDetailImageComponent } from './store-product-free-travel/store-product-free-travel-detail/store-travel-detail-image/store-travel-detail-image.component';
import { StoreTravelDetailNoticeComponent } from './store-product-free-travel/store-product-free-travel-detail/store-travel-detail-notice/store-travel-detail-notice.component';
import { StoreTravelDetailProinfoComponent } from './store-product-free-travel/store-product-free-travel-detail/store-travel-detail-proinfo/store-travel-detail-proinfo.component';
import { StoreProductFreeTravelComponent } from './store-product-free-travel/store-product-free-travel.component';
import { StoreProductCreateBystepComponent } from './store-product-management/store-product-create-bystep/store-product-create-bystep.component';
import { StoreProductDescComponent } from './store-product-management/store-product-create-bystep/store-product-desc/store-product-desc.component';
import { StoreProductEditordetailComponent } from './store-product-management/store-product-create-bystep/store-product-editordetail/store-product-editordetail.component';
import { StoreProductEditornoticeComponent } from './store-product-management/store-product-create-bystep/store-product-editornotice/store-product-editornotice.component';
import { StoreProductFeatureComponent } from './store-product-management/store-product-create-bystep/store-product-feature/store-product-feature.component';
import { StoreProductInfoComponent } from './store-product-management/store-product-create-bystep/store-product-info/store-product-info.component';
import { StoreProductPostComponent } from './store-product-management/store-product-create-bystep/store-product-post/store-product-post.component';
import { StoreProUSCreateComponent } from './store-product-management/store-product-create-bystep/store-product-upload-stroke/store-pro-u-s-create/store-pro-u-s-create.component';
import { StoreProductUploadStrokeComponent } from './store-product-management/store-product-create-bystep/store-product-upload-stroke/store-product-upload-stroke.component';
import { StoreProductDetailUploadStrokeComponent } from './store-product-management/store-product-management-detail/store-product-detail-upload-stroke/store-product-detail-upload-stroke.component';
import { StoreProductManagementDetailDescComponent } from './store-product-management/store-product-management-detail/store-product-management-detail-desc/store-product-management-detail-desc.component';
import { StoreProductManagementDetailEditordetailComponent } from './store-product-management/store-product-management-detail/store-product-management-detail-editordetail/store-product-management-detail-editordetail.component';
import { StoreProductManagementDetailEditornoticeComponent } from './store-product-management/store-product-management-detail/store-product-management-detail-editornotice/store-product-management-detail-editornotice.component';
import { StoreProductManagementDetailFeatureComponent } from './store-product-management/store-product-management-detail/store-product-management-detail-feature/store-product-management-detail-feature.component';
import { StoreProductManagementDetailInfoComponent } from './store-product-management/store-product-management-detail/store-product-management-detail-info/store-product-management-detail-info.component';
import { StoreProductManagementDetailPostComponent } from './store-product-management/store-product-management-detail/store-product-management-detail-post/store-product-management-detail-post.component';
import { StoreProductManagementDetailComponent } from './store-product-management/store-product-management-detail/store-product-management-detail.component';
import { StoreProductManagementComponent } from './store-product-management/store-product-management.component';
import { StoreQuoteBydateCreateComponent } from './store-quote-bydate/store-quote-bydate-create/store-quote-bydate-create.component';
import { StoreQuoteBydateComponent } from './store-quote-bydate/store-quote-bydate.component';
import { StoreTermManagementReviewComponent } from './store-terms-management/store-term-management-review/store-term-management-review.component';
import { StoreTemplateExampleComponent } from './store-terms-management/store-terms-management-create/store-template-example/store-template-example.component';
import { StoreTermsManagementCreateComponent } from './store-terms-management/store-terms-management-create/store-terms-management-create.component';
import { StoreTermsManagementDetailComponent } from './store-terms-management/store-terms-management-detail/store-terms-management-detail.component';
import { StoreTermsManagementComponent } from './store-terms-management/store-terms-management.component';
import { StoreTouristCreateComponent } from './store-tourist/store-tourist-create/store-tourist-create.component';
import { StoreTouristDetailComponent } from './store-tourist/store-tourist-detail/store-tourist-detail.component';
import { StoreTouristComponent } from './store-tourist/store-tourist.component';
import { StoreOrderRefundTurnoverDetailComponent } from './store-order-refund-turnover/store-order-refund-turnover-detail/store-order-refund-turnover-detail.component';
import { StoreCerticationComponent } from './store-certication/store-certication.component';
import { StoreCertifiDoneComponent } from './store-certication/store-certifi-done/store-certifi-done.component';
import { StoreCertifiBasicInfoComponent } from './store-certication/store-certifi-basic-info/store-certifi-basic-info.component';
import { StoreCertifiProgressComponent } from './store-certication/store-certifi-progress/store-certifi-progress.component';
import { StoreCertificationDetailComponent } from './store-certication/store-certification-detail/store-certification-detail.component';
import { UploadCertificationComponent } from './store-certication/store-certification-detail/upload-certification/upload-certification.component';
import { UploadPdfComponent } from './store-certication/store-certification-detail/upload-pdf/upload-pdf.component';
import { StoreCertifiHistoryComponent } from './store-certication/store-certifi-progress/store-certifi-history/store-certifi-history.component';
import { StoreCertifiChangeComponent } from './store-certication/store-certifi-basic-info/store-certifi-change/store-certifi-change.component';
import { StoreInsuranceDetailComponent } from './store-product-management/store-product-create-bystep/store-product-info/store-insurance-detail/store-insurance-detail.component';
import { StoreFreeQuoteComponent } from './store-product-free-travel/store-free-quote/store-free-quote.component';
import { StoreFreeQuoteCreateComponent } from './store-product-free-travel/store-free-quote/store-free-quote-create/store-free-quote-create.component';
import { StoreOrderMemberComponent } from './store-order-grouptravel/store-order-grouptravel-detail/store-order-member/store-order-member.component';
import { StoreProductPreFreeTravelComponent } from './store-product-pre-free-travel/store-product-pre-free-travel.component';
import { StorePreFreeInfoComponent } from './store-product-free-travel/store-free-create-bystep/store-pre-free-info/store-pre-free-info.component';
import { StorePreTravelDetailComponent } from './store-product-free-travel/store-product-free-travel-detail/store-pre-travel-detail/store-pre-travel-detail.component';

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
    StoreTermManagementReviewComponent,
    SetCommissionComponent

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
    SetCommissionComponent,
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
    UploadVideoComponent,
    StoreProductUploadStrokeComponent,
    StoreProductDetailUploadStrokeComponent,
    StoreFreeUploadStrokeComponent,
    StoreFreeDetailUploadStrokeComponent,
    StoreOrderGrouptravelOrderComponent,
    StoreProUSCreateComponent,
    SOFreetravelOrderComponent,
    StoreOrderGroupMoneyComponent,
    StoreOrderRefundComponent,
    StoreOrderRefundDetailComponent,
    StoreOrderRefundTurnoverComponent,
    StoreOrderRefundTurnoverDetailComponent,
    StoreCerticationComponent,
    StoreCertifiDoneComponent,
    StoreCertifiBasicInfoComponent,
    StoreCertifiProgressComponent,
    StoreCertificationDetailComponent,
    UploadCertificationComponent,
    UploadPdfComponent,
    StoreCertifiHistoryComponent,
    StoreCertifiChangeComponent,
    StoreInsuranceDetailComponent,
    StoreFreeQuoteComponent,
    StoreFreeQuoteCreateComponent,
    StoreOrderMemberComponent,
    StoreProductPreFreeTravelComponent,
    StorePreFreeInfoComponent,
    StorePreTravelDetailComponent,
    
    
  ]
})
export class StoreMaterialComponentsModule { }
