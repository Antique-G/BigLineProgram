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
import { AdminTermsManageUpComponent } from './admin-terms-manage/admin-terms-manage-up/admin-terms-manage-up.component';
import { AdminDeleteComponent } from './admin-common/admin-delete/admin-delete.component';
import { AccountDetailComponent } from './admin-common/account-detail/account-detail.component';
import { AdminProducFreeTravelComponent } from './admin-product/admin-produc-free-travel/admin-produc-free-travel.component';
import { AdminProductFreeTravelDetailComponent } from './admin-product/admin-produc-free-travel/admin-product-free-travel-detail/admin-product-free-travel-detail.component';
import { AdminTravelDetailProinfoComponent } from './admin-product/admin-produc-free-travel/admin-product-free-travel-detail/admin-travel-detail-proinfo/admin-travel-detail-proinfo.component';
import { AdminChooseImgComponent } from './admin-product/admin-produc-free-travel/admin-product-free-travel-detail/admin-choose-img/admin-choose-img.component';
import { AdminProductManagementBasicInfoComponent } from './admin-product/admin-product-management/admin-product-management-detail/admin-product-management-basic-info/admin-product-management-basic-info.component';
import { AdminPeoductManagementFeatureComponent } from './admin-product/admin-product-management/admin-product-management-detail/admin-peoduct-management-feature/admin-peoduct-management-feature.component';
import { AdminPeoductManagementEditordetailComponent } from './admin-product/admin-product-management/admin-product-management-detail/admin-peoduct-management-editordetail/admin-peoduct-management-editordetail.component';
import { AdminTravelDetailFeatureComponent } from './admin-product/admin-produc-free-travel/admin-product-free-travel-detail/admin-travel-detail-feature/admin-travel-detail-feature.component';
import { AdminTravelDetailEditordetailComponent } from './admin-product/admin-produc-free-travel/admin-product-free-travel-detail/admin-travel-detail-editordetail/admin-travel-detail-editordetail.component';
import { AdminTravelDetailEditornoticeComponent } from './admin-product/admin-produc-free-travel/admin-product-free-travel-detail/admin-travel-detail-editornotice/admin-travel-detail-editornotice.component';
import { AdminProductFreeTravelQutedateComponent } from './admin-product/admin-produc-free-travel/admin-product-free-travel-qutedate/admin-product-free-travel-qutedate.component';
import { AdminProductQutedateComponent } from './admin-product/admin-product-management/admin-product-qutedate/admin-product-qutedate.component';
import { AdminTermTemplateCreateComponent } from './admin-term-template/admin-term-template-create/admin-term-template-create.component';
import { AdminTermTemplateEditComponent } from './admin-term-template/admin-term-template-edit/admin-term-template-edit.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AdminProductManagementEditornoticeComponent } from './admin-product/admin-product-management/admin-product-management-detail/admin-product-management-editornotice/admin-product-management-editornotice.component';
import { AdminTermTemplateComponent } from './admin-term-template/admin-term-template.component';
import { AdminProductManagementImgComponent } from './admin-product/admin-product-management/admin-product-management-detail/admin-product-management-img/admin-product-management-img.component';
import { AdminSaleTitleComponent } from './admin-sale-title/admin-sale-title.component';
import { AdminSaleTitleCreateComponent } from './admin-sale-title/admin-sale-title-create/admin-sale-title-create.component';
import { AdminSaleTitleDetailComponent } from './admin-sale-title/admin-sale-title-detail/admin-sale-title-detail.component';
import { AdminSaleTitleStatusComponent } from './admin-sale-title/admin-sale-title-status/admin-sale-title-status.component';
import { AdminInsuranceComponent } from './admin-insurance/admin-insurance.component';
import { AdminProductFreeReviewComponent } from './admin-product/admin-produc-free-travel/admin-product-free-review/admin-product-free-review.component';
import { AdminWechatPageconfigComponent } from './admin-wechat-pageconfig/admin-wechat-pageconfig.component';
import { AdminWechatPageconfigCreateComponent } from './admin-wechat-pageconfig/admin-wechat-pageconfig-create/admin-wechat-pageconfig-create.component';
import { AdminWechatPageconfigDetailComponent } from './admin-wechat-pageconfig/admin-wechat-pageconfig-detail/admin-wechat-pageconfig-detail.component';
import { AdminWechatPageblockComponent } from './admin-wechat-pageconfig/admin-wechat-pageblock/admin-wechat-pageblock.component';
import { AdminWechatPageblockCreateComponent } from './admin-wechat-pageconfig/admin-wechat-pageblock/admin-wechat-pageblock-create/admin-wechat-pageblock-create.component';
import { AdminWechatPageblockDetailComponent } from './admin-wechat-pageconfig/admin-wechat-pageblock/admin-wechat-pageblock-detail/admin-wechat-pageblock-detail.component';

import { AdminInsuranceDetailComponent } from './admin-insurance/admin-insurance-detail/admin-insurance-detail.component';
import { AdminInsuranceStatusComponent } from './admin-insurance/admin-insurance-status/admin-insurance-status.component';
import { AdminInsuranceCreateComponent } from './admin-insurance/admin-insurance-create/admin-insurance-create.component';
import { AdminUserinfoComponent } from './admin-userinfo/admin-userinfo.component';
import { AdminWechatPageblockUploadComponent } from './admin-wechat-pageconfig/admin-wechat-pageblock/admin-wechat-pageblock-create/admin-wechat-pageblock-upload/admin-wechat-pageblock-upload.component';
import { AdminWechatPageblockProlistComponent } from './admin-wechat-pageconfig/admin-wechat-pageblock/admin-wechat-pageblock-create/admin-wechat-pageblock-prolist/admin-wechat-pageblock-prolist.component';
import { AdminOrderDetailComponent } from './admin-order/admin-order-detail/admin-order-detail.component';
import { AdminOrderDetailSubgroupComponent } from './admin-order/admin-order-detail/admin-order-detail-subgroup/admin-order-detail-subgroup.component';
import { AdminUserinfoDetailComponent } from './admin-userinfo/admin-userinfo-detail/admin-userinfo-detail.component';

import { AdminOrderGroupTravelComponent } from './admin-order-group-travel/admin-order-group-travel.component';
import { AdminOrderGroupTravelDetailComponent } from './admin-order-group-travel/admin-order-group-travel-detail/admin-order-group-travel-detail.component';
import { AdminOrderFreeTravelComponent } from './admin-order-free-travel/admin-order-free-travel.component';
import { AdminOrderFreeTravelDetailComponent } from './admin-order-free-travel/admin-order-free-travel-detail/admin-order-free-travel-detail.component';
import { AdminContractComponent } from './admin-contract/admin-contract.component';
import { AdminContractCreateComponent } from './admin-contract/admin-contract-create/admin-contract-create.component';
import { AdminOrderGroupOrderComponent } from './admin-order-group-travel/admin-order-group-order/admin-order-group-order.component';
import { AOFreetravelOrderComponent } from './admin-order-free-travel/a-o-freetravel-order/a-o-freetravel-order.component';
import { AdminOrderGroupMoneyComponent } from './admin-order-group-travel/admin-order-group-money/admin-order-group-money.component';
import { AODChangeNumsComponent } from './admin-order/admin-order-detail/a-o-d-change-nums/a-o-d-change-nums.component';
import { AODShutOffComponent } from './admin-order/admin-order-detail/a-o-d-shut-off/a-o-d-shut-off.component';
import { AODSubgroupMoveorderComponent } from './admin-order/admin-order-detail/admin-order-detail-subgroup/a-o-d-subgroup-moveorder/a-o-d-subgroup-moveorder.component';
import { AODSubgroupSendsmsComponent } from './admin-order/admin-order-detail/admin-order-detail-subgroup/a-o-d-subgroup-sendsms/a-o-d-subgroup-sendsms.component';
import { AODSubgroupSetguideComponent } from './admin-order/admin-order-detail/admin-order-detail-subgroup/a-o-d-subgroup-setguide/a-o-d-subgroup-setguide.component';
import { AOGTDetailChangeDataComponent } from './admin-order-group-travel/admin-order-group-travel-detail/a-o-g-t-detail-change-data/a-o-g-t-detail-change-data.component';
import { UploadIdCardComponent } from './admin-order-group-travel/admin-order-group-order/upload-id-card/upload-id-card.component';
import { AdminOrderRefundComponent } from './admin-order-refund/admin-order-refund.component';
import { AdminOrderRefundReviewComponent } from './admin-order-refund-review/admin-order-refund-review.component';
import { AdminOrderRefundTurnoverComponent } from './admin-order-refund-turnover/admin-order-refund-turnover.component';
import { AdminOrderRefundDetailComponent } from './admin-order-refund/admin-order-refund-detail/admin-order-refund-detail.component';
import { AdminTouristComponent } from './admin-tourist/admin-tourist.component';
import { AdminTouristCreateComponent } from './admin-tourist/admin-tourist-create/admin-tourist-create.component';
import { AdminTouristDetailComponent } from './admin-tourist/admin-tourist-detail/admin-tourist-detail.component';
import { UserCommissionListComponent } from './admin-commission/user-commission-list/user-commission-list.component';
import { AdminCommissionWithdrawComponent } from './admin-commission/admin-commission-withdraw/admin-commission-withdraw.component';
import { AdminOrderRefundReviewDetailComponent } from './admin-order-refund-review/admin-order-refund-review-detail/admin-order-refund-review-detail.component';
import { AdminOrderRefundReviewEditComponent } from './admin-order-refund-review/admin-order-refund-review-edit/admin-order-refund-review-edit.component';
import { AdminOrderRefundWaysComponent } from './admin-order-refund-review/admin-order-refund-review-edit/admin-order-refund-ways/admin-order-refund-ways.component';
import { UserCommissionAuditComponent } from './admin-commission/user-commission-list/user-commission-audit/user-commission-audit.component';


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
    AdminTermsManageUpComponent,
    AdminDeleteComponent,
    AccountDetailComponent,
    AdminProducFreeTravelComponent,
    AdminProductFreeTravelDetailComponent,
    AdminTravelDetailProinfoComponent,
    AdminChooseImgComponent,
    AdminProductManagementBasicInfoComponent,
    AdminPeoductManagementFeatureComponent,
    AdminPeoductManagementEditordetailComponent,
    AdminTravelDetailFeatureComponent,
    AdminTravelDetailEditordetailComponent,
    AdminTravelDetailEditornoticeComponent,
    AdminProductManagementEditornoticeComponent,
    AdminTermTemplateComponent,
    AdminProductManagementImgComponent,
    AdminProductFreeTravelQutedateComponent,
    AdminProductQutedateComponent,
    AdminTermTemplateCreateComponent,
    AdminTermTemplateEditComponent,
    AdminOrderComponent,
    AdminSaleTitleComponent,
    AdminSaleTitleCreateComponent,
    AdminSaleTitleDetailComponent,
    AdminSaleTitleStatusComponent,
    AdminInsuranceComponent,
    AdminProductFreeReviewComponent,
    AdminWechatPageconfigComponent,
    AdminWechatPageconfigCreateComponent,
    AdminWechatPageconfigDetailComponent,
    AdminWechatPageblockComponent,
    AdminWechatPageblockCreateComponent,
    AdminWechatPageblockDetailComponent,
    AdminInsuranceDetailComponent,
    AdminInsuranceStatusComponent,
    AdminInsuranceCreateComponent,
    AdminUserinfoComponent,
    AdminWechatPageblockUploadComponent,
    AdminWechatPageblockProlistComponent,
    AdminOrderDetailComponent,
    AdminOrderDetailSubgroupComponent,
    AdminUserinfoDetailComponent,
    AdminOrderGroupTravelComponent,
    AdminOrderGroupTravelDetailComponent,
    AdminOrderFreeTravelComponent,
    AdminOrderFreeTravelDetailComponent,
    AdminContractComponent,
    AdminContractCreateComponent,
    AdminOrderGroupOrderComponent,
    AOFreetravelOrderComponent,
    AdminOrderGroupMoneyComponent,
    AODChangeNumsComponent,
    AODShutOffComponent,
    AODSubgroupMoveorderComponent,
    AODSubgroupSendsmsComponent,
    AODSubgroupSetguideComponent,
    AOGTDetailChangeDataComponent,
    UploadIdCardComponent,
    AdminOrderRefundComponent,
    AdminOrderRefundReviewComponent,
    AdminOrderRefundTurnoverComponent,
    AdminOrderRefundDetailComponent,
    AdminTouristComponent,
    AdminTouristCreateComponent,
    AdminTouristDetailComponent,
    UserCommissionListComponent,
    AdminCommissionWithdrawComponent,
    AdminOrderRefundReviewDetailComponent,
    AdminOrderRefundReviewEditComponent,
    AdminOrderRefundWaysComponent,
    UserCommissionAuditComponent,
  ]
})
export class MaterialComponentsModule {}
