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
import { ChooseGoodsGalleryComponent } from './common/choose-goods-gallery/choose-goods-gallery.component';
import { AgreeComponent } from './common/common-model/agree/agree.component';
import { CommonModelComponent } from './common/common-model/common-model.component';
import { DeleteComfirmComponent } from './common/delete-comfirm/delete-comfirm.component';
import { SetCommissionComponent } from './common/set-commission/set-commission.component';
import { StoreAccountDetailComponent } from './common/store-account-detail/store-account-detail.component';
import { UploadGoodsImgComponent } from './common/upload-goods-img/upload-goods-img.component';
import { UploadGoodsVideoComponent } from './common/upload-goods-video/upload-goods-video.component';
import { UploadVideoComponent } from './common/upload-video/upload-video.component';
import { StoreCerticationComponent } from './store-certication/store-certication.component';
import { AtoreCertifiChangeJobNumComponent } from './store-certication/store-certifi-basic-info/atore-certifi-change-job-num/atore-certifi-change-job-num.component';
import { StoreCertifiBasicInfoComponent } from './store-certication/store-certifi-basic-info/store-certifi-basic-info.component';
import { StoreCertifiChangeComponent } from './store-certication/store-certifi-basic-info/store-certifi-change/store-certifi-change.component';
import { StoreCertifiDoneComponent } from './store-certication/store-certifi-done/store-certifi-done.component';
import { StoreCertifiHistoryComponent } from './store-certication/store-certifi-progress/store-certifi-history/store-certifi-history.component';
import { StoreCertifiProgressComponent } from './store-certication/store-certifi-progress/store-certifi-progress.component';
import { StoreCertificationDetailComponent } from './store-certication/store-certification-detail/store-certification-detail.component';
import { UploadCertificationComponent } from './store-certication/store-certification-detail/upload-certification/upload-certification.component';
import { UploadPdfComponent } from './store-certication/store-certification-detail/upload-pdf/upload-pdf.component';
import { StoreContractCreateComponent } from './store-contract/store-contract-create/store-contract-create.component';
import { StoreContractComponent } from './store-contract/store-contract.component';
import { StoreCostTypeCreateComponent } from './store-cost-type/store-cost-type-create/store-cost-type-create.component';
import { StoreCostTypeDetailComponent } from './store-cost-type/store-cost-type-detail/store-cost-type-detail.component';
import { StoreCostTypeComponent } from './store-cost-type/store-cost-type.component';
import { StoreGoodsOrderAddFreightComponent } from './store-goods-order/store-goods-order-detail/store-goods-order-add-freight/store-goods-order-add-freight.component';
import { StoreGoodsOrderDetailModifyComponent } from './store-goods-order/store-goods-order-detail/store-goods-order-detail-modify/store-goods-order-detail-modify.component';
import { StoreGoodsOrderDetailComponent } from './store-goods-order/store-goods-order-detail/store-goods-order-detail.component';
import { StoreGoodsOrderMergeShipComponent } from './store-goods-order/store-goods-order-detail/store-goods-order-merge-ship/store-goods-order-merge-ship.component';
import { StoreGoodsOrderComponent } from './store-goods-order/store-goods-order.component';
import { StoreGoodsProCreateBystepComponent } from './store-goods-pro/store-goods-pro-create-bystep/store-goods-pro-create-bystep.component';
import { StoreGoodsProEditdetailComponent } from './store-goods-pro/store-goods-pro-create-bystep/store-goods-pro-editdetail/store-goods-pro-editdetail.component';
import { StoreGoodsProEditimgComponent } from './store-goods-pro/store-goods-pro-create-bystep/store-goods-pro-editimg/store-goods-pro-editimg.component';
import { StoreGoodsProEditnoticeComponent } from './store-goods-pro/store-goods-pro-create-bystep/store-goods-pro-editnotice/store-goods-pro-editnotice.component';
import { StoreGoodsProEditpostComponent } from './store-goods-pro/store-goods-pro-create-bystep/store-goods-pro-editpost/store-goods-pro-editpost.component';
import { StoreGoodsProInfoComponent } from './store-goods-pro/store-goods-pro-create-bystep/store-goods-pro-info/store-goods-pro-info.component';
import { StoreGoodsProDetaiImgComponent } from './store-goods-pro/store-goods-pro-detail/store-goods-pro-detai-img/store-goods-pro-detai-img.component';
import { StoreGoodsProDetaiInfoComponent } from './store-goods-pro/store-goods-pro-detail/store-goods-pro-detai-info/store-goods-pro-detai-info.component';
import { StoreGoodsProDetaiPostComponent } from './store-goods-pro/store-goods-pro-detail/store-goods-pro-detai-post/store-goods-pro-detai-post.component';
import { StoreGoodsProDetailComponent } from './store-goods-pro/store-goods-pro-detail/store-goods-pro-detail.component';
import { StoreGoodsProComponent } from './store-goods-pro/store-goods-pro.component';
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
import { StoreOrderRequestMoneyComponent } from './store-order-group/store-order-group-detail/store-order-request-money/store-order-request-money.component';
import { StoreOrderGroupComponent } from './store-order-group/store-order-group.component';
import { StoreOrderGroupMoneyComponent } from './store-order-grouptravel/store-order-group-money/store-order-group-money.component';
import { StoreOrderGroupOperateLogComponent } from './store-order-grouptravel/store-order-group-operate-log/store-order-group-operate-log.component';
import { StoreOrderGroupChangeDateComponent } from './store-order-grouptravel/store-order-grouptravel-detail/store-order-group-change-date/store-order-group-change-date.component';
import { StoreOrderGroupChangePriceComponent } from './store-order-grouptravel/store-order-grouptravel-detail/store-order-group-change-price/store-order-group-change-price.component';
import { StoreOrderGrouptravelDetailComponent } from './store-order-grouptravel/store-order-grouptravel-detail/store-order-grouptravel-detail.component';
import { StoreOrderMemberComponent } from './store-order-grouptravel/store-order-grouptravel-detail/store-order-member/store-order-member.component';
import { StoreOrderGrouptravelOrderComponent } from './store-order-grouptravel/store-order-grouptravel-order/store-order-grouptravel-order.component';
import { StoreOrderGrouptravelComponent } from './store-order-grouptravel/store-order-grouptravel.component';
import { StoreOrderRefundTurnoverDetailComponent } from './store-order-refund-turnover/store-order-refund-turnover-detail/store-order-refund-turnover-detail.component';
import { StoreOrderRefundTurnoverComponent } from './store-order-refund-turnover/store-order-refund-turnover.component';
import { StoreOrderRefundDetailComponent } from './store-order-refund/store-order-refund-detail/store-order-refund-detail.component';
import { StoreOrderRefundComponent } from './store-order-refund/store-order-refund.component';
import { StorePreFreeAppointDetailComponent } from './store-pre-free-appoint/store-pre-free-appoint-detail/store-pre-free-appoint-detail.component';
import { StorePreFreeAppointComponent } from './store-pre-free-appoint/store-pre-free-appoint.component';
import { StorePreFreeSaleListDetailComponent } from './store-pre-free-sale-list/store-pre-free-sale-list-detail/store-pre-free-sale-list-detail.component';
import { StorePreFreeSaleListComponent } from './store-pre-free-sale-list/store-pre-free-sale-list.component';
import { StoreFreeCreateBystepComponent } from './store-product-free-travel/store-free-create-bystep/store-free-create-bystep.component';
import { StoreFreeDescComponent } from './store-product-free-travel/store-free-create-bystep/store-free-desc/store-free-desc.component';
import { StoreFreeFeatureComponent } from './store-product-free-travel/store-free-create-bystep/store-free-feature/store-free-feature.component';
import { StoreFreeImageComponent } from './store-product-free-travel/store-free-create-bystep/store-free-image/store-free-image.component';
import { StoreFreeInfoComponent } from './store-product-free-travel/store-free-create-bystep/store-free-info/store-free-info.component';
import { StoreFreeNoticeComponent } from './store-product-free-travel/store-free-create-bystep/store-free-notice/store-free-notice.component';
import { StoreFreePostComponent } from './store-product-free-travel/store-free-create-bystep/store-free-post/store-free-post.component';
import { StoreFreePresellComponent } from './store-product-free-travel/store-free-create-bystep/store-free-presell/store-free-presell.component';
import { StoreFreeUploadStrokeComponent } from './store-product-free-travel/store-free-create-bystep/store-free-upload-stroke/store-free-upload-stroke.component';
// import { StorePreFreeInfoComponent } from './store-product-free-travel/store-free-create-bystep/store-pre-free-info/store-pre-free-info.component';
import { StoreFreeQuoteCreateComponent } from './store-product-free-travel/store-free-quote/store-free-quote-create/store-free-quote-create.component';
import { StoreFreeQuoteComponent } from './store-product-free-travel/store-free-quote/store-free-quote.component';
import { StoreFreeDetailPostComponent } from './store-product-free-travel/store-product-free-travel-detail/store-free-detail-post/store-free-detail-post.component';
import { StoreFreeDetailUploadStrokeComponent } from './store-product-free-travel/store-product-free-travel-detail/store-free-detail-upload-stroke/store-free-detail-upload-stroke.component';
// import { StorePreTravelDetailComponent } from './store-product-free-travel/store-product-free-travel-detail/store-pre-travel-detail/store-pre-travel-detail.component';
import { StoreProductFreeTravelDetailComponent } from './store-product-free-travel/store-product-free-travel-detail/store-product-free-travel-detail.component';
import { StoreTravelDetailDescComponent } from './store-product-free-travel/store-product-free-travel-detail/store-travel-detail-desc/store-travel-detail-desc.component';
import { StoreTravelDetailFeatureComponent } from './store-product-free-travel/store-product-free-travel-detail/store-travel-detail-feature/store-travel-detail-feature.component';
import { StoreTravelDetailImageComponent } from './store-product-free-travel/store-product-free-travel-detail/store-travel-detail-image/store-travel-detail-image.component';
import { StoreTravelDetailNoticeComponent } from './store-product-free-travel/store-product-free-travel-detail/store-travel-detail-notice/store-travel-detail-notice.component';
import { StoreTravelDetailPresellComponent } from './store-product-free-travel/store-product-free-travel-detail/store-travel-detail-presell/store-travel-detail-presell.component';
import { StoreTravelDetailProinfoComponent } from './store-product-free-travel/store-product-free-travel-detail/store-travel-detail-proinfo/store-travel-detail-proinfo.component';
import { StoreProductFreeTravelOperateLogComponent } from './store-product-free-travel/store-product-free-travel-operate-log/store-product-free-travel-operate-log.component';
import { StoreProductFreeTravelComponent } from './store-product-free-travel/store-product-free-travel.component';
import { StoreProductCreateBystepComponent } from './store-product-management/store-product-create-bystep/store-product-create-bystep.component';
import { StoreProductDescComponent } from './store-product-management/store-product-create-bystep/store-product-desc/store-product-desc.component';
import { StoreProductEditordetailComponent } from './store-product-management/store-product-create-bystep/store-product-editordetail/store-product-editordetail.component';
import { StoreProductEditornoticeComponent } from './store-product-management/store-product-create-bystep/store-product-editornotice/store-product-editornotice.component';
import { StoreProductFeatureComponent } from './store-product-management/store-product-create-bystep/store-product-feature/store-product-feature.component';
import { StoreInsuranceDetailComponent } from './store-product-management/store-product-create-bystep/store-product-info/store-insurance-detail/store-insurance-detail.component';
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
import { StoreProductManagementOperateLogComponent } from './store-product-management/store-product-management-operate-log/store-product-management-operate-log.component';
import { StoreProductManagementComponent } from './store-product-management/store-product-management.component';
import { StoreProductMiniCodeComponent } from './store-product-management/store-product-mini-code/store-product-mini-code.component';
import { StoreProductPreFreeTravelComponent } from './store-product-pre-free-travel/store-product-pre-free-travel.component';
import { StoreQuoteBydateCreateComponent } from './store-quote-bydate/store-quote-bydate-create/store-quote-bydate-create.component';
import { StoreQuoteBydateComponent } from './store-quote-bydate/store-quote-bydate.component';
import { StoreRequestMoneyComponent } from './store-request-money/store-request-money.component';
import { StoreTermManagementReviewComponent } from './store-terms-management/store-term-management-review/store-term-management-review.component';
import { StoreTemplateExampleComponent } from './store-terms-management/store-terms-management-create/store-template-example/store-template-example.component';
import { StoreTermsManagementCreateComponent } from './store-terms-management/store-terms-management-create/store-terms-management-create.component';
import { StoreTermsManagementDetailComponent } from './store-terms-management/store-terms-management-detail/store-terms-management-detail.component';
import { StoreTermsManagementComponent } from './store-terms-management/store-terms-management.component';
import { StoreTouristCreateComponent } from './store-tourist/store-tourist-create/store-tourist-create.component';
import { StoreTouristDetailComponent } from './store-tourist/store-tourist-detail/store-tourist-detail.component';
import { StoreTouristComponent } from './store-tourist/store-tourist.component';
import { StoreGoodsOrderRequestMoneyComponent } from './store-goods-order/store-goods-order-detail/store-goods-order-request-money/store-goods-order-request-money.component';


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
        StoreFreePresellComponent,
        StoreTravelDetailPresellComponent,
        StorePreFreeSaleListComponent,
        StorePreFreeSaleListDetailComponent,
        StoreCostTypeComponent,
        StoreCostTypeCreateComponent,
        StoreCostTypeDetailComponent,
        StoreOrderRequestMoneyComponent,
        StoreRequestMoneyComponent,
        StorePreFreeAppointComponent,
        StoreProductMiniCodeComponent,
        StorePreFreeAppointDetailComponent,
        StoreProductManagementOperateLogComponent,
        StoreProductFreeTravelOperateLogComponent,
        StoreOrderGroupOperateLogComponent,
        AtoreCertifiChangeJobNumComponent,
        StoreGoodsProComponent,
        StoreGoodsProCreateBystepComponent,
        StoreGoodsProInfoComponent,
        StoreGoodsProEditdetailComponent,
        StoreGoodsProEditnoticeComponent,
        StoreGoodsProEditimgComponent,
        StoreGoodsProEditpostComponent,
        StoreGoodsProDetailComponent,
        StoreGoodsProDetaiInfoComponent,
        StoreGoodsProDetaiImgComponent,
        StoreGoodsProDetaiPostComponent,
        ChooseGoodsGalleryComponent,
        UploadGoodsImgComponent,
        UploadGoodsVideoComponent,
        StoreGoodsOrderComponent,
        StoreGoodsOrderDetailComponent,
        StoreGoodsOrderMergeShipComponent,
        StoreGoodsOrderDetailModifyComponent,
        StoreGoodsOrderAddFreightComponent,
        StoreGoodsOrderRequestMoneyComponent,
    ]
})
export class StoreMaterialComponentsModule { }
