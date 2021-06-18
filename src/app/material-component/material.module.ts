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
import { AdminOrderRefundEditComponent } from './admin-order-refund/admin-order-refund-edit/admin-order-refund-edit.component';
import { AdminOrderRefundTurnoverDetailComponent } from './admin-order-refund-turnover/admin-order-refund-turnover-detail/admin-order-refund-turnover-detail.component';
import { AdminServicerComponent } from './admin-servicer/admin-servicer.component';
import { AdminOrderRefundConfirmComponent } from './admin-order-refund-review/admin-order-refund-review-edit/admin-order-refund-ways/admin-order-refund-confirm/admin-order-refund-confirm.component';
import { AdminServicerCreateComponent } from './admin-servicer/admin-servicer-create/admin-servicer-create.component';
import { AdminServicerDetailComponent } from './admin-servicer/admin-servicer-detail/admin-servicer-detail.component';
import { UserMoneyLogListComponent } from './admin-commission/user-money-log-list/user-money-log-list.component';
import { AdminGroupAddOrderComponent } from './admin-group-add-order/admin-group-add-order.component';
import { AdminGroupAddOrderDetailComponent } from './admin-group-add-order/admin-group-add-order-detail/admin-group-add-order-detail.component';
import { AdminUploadIdCardComponent } from './admin-common/admin-upload-id-card/admin-upload-id-card.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { AdminChangePasswordComponent } from './admin/admin-change-password/admin-change-password.component';
import { AdminProductMiniCodeComponent } from './admin-product/admin-product-management/admin-product-mini-code/admin-product-mini-code.component';
import { AdminStoreCommissComponent } from './admin-store/admin-store-commiss/admin-store-commiss.component';
import { AdminStoreCertifiComponent } from './admin-store/admin-store-certifi/admin-store-certifi.component';
import { AdminStoreCertifiBasicComponent } from './admin-store/admin-store-certifi/admin-store-certifi-basic/admin-store-certifi-basic.component';
import { AdminStoreCertifiDataComponent } from './admin-store/admin-store-certifi/admin-store-certifi-data/admin-store-certifi-data.component';
import { AdminStoreCertifiProgressComponent } from './admin-store/admin-store-certifi/admin-store-certifi-progress/admin-store-certifi-progress.component';
import { AdminStoreCertifiContracrComponent } from './admin-store/admin-store-certifi/admin-store-certifi-contracr/admin-store-certifi-contracr.component';
import { AdminStoreCertifiCheckComponent } from './admin-store/admin-store-certifi/admin-store-certifi-data/admin-store-certifi-check/admin-store-certifi-check.component';
import { AdminStoreCertifiHistoryComponent } from './admin-store/admin-store-certifi/admin-store-certifi-progress/admin-store-certifi-history/admin-store-certifi-history.component';
import { AdminFreeTravelAddOrderComponent } from './admin-free-travel-add-order/admin-free-travel-add-order.component';
import { AdminFreeTravelAddOrderDetailComponent } from './admin-free-travel-add-order/admin-free-travel-add-order-detail/admin-free-travel-add-order-detail.component';
import { AdminPermissionComponent } from './admin-permission/admin-permission.component';
import { APMBIIDComponent } from './admin-product/admin-product-management/admin-product-management-detail/admin-product-management-basic-info/a-p-m-b-i-i-d/a-p-m-b-i-i-d.component';
import { AdminInsuranceHistoryComponent } from './admin-insurance-history/admin-insurance-history.component';
import { AdminInsuredListComponent } from './admin-insurance-history/admin-insured-list/admin-insured-list.component';
import { AdminPermissionCreateComponent } from './admin-permission/admin-permission-create/admin-permission-create.component';
import { AdminPermissionDetailComponent } from './admin-permission/admin-permission-detail/admin-permission-detail.component';
import { AOGTDPartRefundComponent } from './admin-order-group-travel/admin-order-group-travel-detail/a-o-g-t-d-part-refund/a-o-g-t-d-part-refund.component';
import { AOFTDChangePriceComponent } from './admin-order-free-travel/admin-order-free-travel-detail/a-o-f-t-d-change-price/a-o-f-t-d-change-price.component';
import { AdminProductManagementPostComponent } from './admin-product/admin-product-management/admin-product-management-detail/admin-product-management-post/admin-product-management-post.component';
import { AdminTravelDetailPostComponent } from './admin-product/admin-produc-free-travel/admin-product-free-travel-detail/admin-travel-detail-post/admin-travel-detail-post.component';
import { AdminStoreManageComponent } from './admin-store-manage/admin-store-manage.component';
import { AdminStoreManageAddComponent } from './admin-store-manage/admin-store-manage-add/admin-store-manage-add.component';
import { AdminStoreManageDetailComponent } from './admin-store-manage/admin-store-manage-detail/admin-store-manage-detail.component';
import { AdminRoleComponent } from './admin-role/admin-role.component';
import { AdminRoleCreateComponent } from './admin-role/admin-role-create/admin-role-create.component';
import { AdminRoleDetailComponent } from './admin-role/admin-role-detail/admin-role-detail.component';
import { AOGTDChangePriceComponent } from './admin-order-group-travel/admin-order-group-travel-detail/a-o-g-t-d-change-price/a-o-g-t-d-change-price.component';
import { FreePriceDetailComponent } from './admin-free-travel-add-order/admin-free-travel-add-order-detail/free-price-detail/free-price-detail.component';
import { GroupPriceDetailComponent } from './admin-group-add-order/admin-group-add-order-detail/group-price-detail/group-price-detail.component';
import { AdminStoreManageScheduleComponent } from './admin-store-manage-schedule/admin-store-manage-schedule.component';
import { AdminStoreManageSetScheduleComponent } from './admin-store-manage-schedule/admin-store-manage-set-schedule/admin-store-manage-set-schedule.component';
import { AdminFreeAddOrderByQuoteComponent } from './admin-free-travel-add-order/admin-free-add-order-by-quote/admin-free-add-order-by-quote.component';
import { FeeByQuoteComponent } from './admin-free-travel-add-order/admin-free-add-order-by-quote/fee-by-quote/fee-by-quote.component';
import { AdminOrderRefundChangStatusComponent } from './admin-order-refund-turnover/admin-order-refund-chang-status/admin-order-refund-chang-status.component';
import { AOFTRefundByquoteComponent } from './admin-order-free-travel/admin-order-free-travel-detail/a-o-f-t-refund-byquote/a-o-f-t-refund-byquote.component';
import { AdminStoreManageEmployeeComponent } from './admin-store-manage/admin-store-manage-employee/admin-store-manage-employee.component';
import { AdminNullComponent } from './admin-null/admin-null.component';
import { AdminFinanceFreeTravelComponent } from './admin-finance/admin-finance-free-travel/admin-finance-free-travel.component';
import { AdminFinanceGroupTravelComponent } from './admin-finance/admin-finance-group-travel/admin-finance-group-travel.component';
import { AdminFinanceGroupTravelDetailComponent } from './admin-finance/admin-finance-group-travel/admin-finance-group-travel-detail/admin-finance-group-travel-detail.component';
import { AdminFinanceFreeTravelDetailComponent } from './admin-finance/admin-finance-free-travel/admin-finance-free-travel-detail/admin-finance-free-travel-detail.component';
import { AdminWelcomeComponent } from './admin-welcome/admin-welcome.component';
import { AdminOrderDSInsComponent } from './admin-order/admin-order-detail/admin-order-detail-subgroup/admin-order-d-s-ins/admin-order-d-s-ins.component';
import { AdminOrderSurrenderComponent } from './admin-order-group-travel/admin-order-group-travel-detail/admin-order-surrender/admin-order-surrender.component';
import { AdminMemberComponent } from './admin-order-group-travel/admin-order-group-travel-detail/admin-member/admin-member.component';
import { AdminLotteryComponent } from './admin-lottery/admin-lottery.component';
import { AdminFinanceChangeTransComponent } from './admin-finance/admin-finance-group-travel/admin-finance-change-trans/admin-finance-change-trans.component';
import { AdminProductPreFreeDetailComponent } from './admin-product/admin-produc-free-travel/admin-product-free-travel-detail/admin-product-pre-free-detail/admin-product-pre-free-detail.component';
import { AdminProductPreFreeComponent } from './admin-product/admin-product-pre-free/admin-product-pre-free.component';
import { AdminSelectRefundComponent } from './admin-order-group-travel/admin-order-group-travel-detail/admin-select-refund/admin-select-refund.component';
import { AdminPreTravelSaleRecordComponent } from './admin-pre-travel-sale-record/admin-pre-travel-sale-record.component';
import { AdminEditContractComponent } from './admin-order-group-travel/admin-edit-contract/admin-edit-contract.component';
import { AdminTravelDetailPresellComponent } from './admin-product/admin-produc-free-travel/admin-product-free-travel-detail/admin-travel-detail-presell/admin-travel-detail-presell.component';
import { AdminOrderCancelComponent } from './admin-order-group-travel/admin-order-group-travel-detail/admin-order-cancel/admin-order-cancel.component';
import { AdminOrderPreFreeTravelDetailComponent } from './admin-order-free-travel/admin-order-pre-free-travel-detail/admin-order-pre-free-travel-detail.component';
import { AdminCostTypeComponent } from './admin-cost-manage/admin-cost-type/admin-cost-type.component';
import { AdminCostTypeCreateComponent } from './admin-cost-manage/admin-cost-type/admin-cost-type-create/admin-cost-type-create.component';
import { AdminCostTypeDetailComponent } from './admin-cost-manage/admin-cost-type/admin-cost-type-detail/admin-cost-type-detail.component';
import { AdminProSupplyComponent } from './admin-cost-manage/admin-pro-supply/admin-pro-supply.component';
import { AdminProSupplyCreateComponent } from './admin-cost-manage/admin-pro-supply/admin-pro-supply-create/admin-pro-supply-create.component';
import { AdminProSupplyDetailComponent } from './admin-cost-manage/admin-pro-supply/admin-pro-supply-detail/admin-pro-supply-detail.component';
import { AdminFinanceGroupReqMoneyComponent } from './admin-finance/admin-finance-group-req-money/admin-finance-group-req-money.component';
import { AdminFinanceGroupReqReviewComponent } from './admin-finance/admin-finance-group-req-money/admin-finance-group-req-review/admin-finance-group-req-review.component';
import { AdminOrderRefundSaleApprovalComponent } from './admin-order-refund-sale-approval/admin-order-refund-sale-approval.component';
import { AdminOrderRefundSaleApprovalDetailComponent } from './admin-order-refund-sale-approval/admin-order-refund-sale-approval-detail/admin-order-refund-sale-approval-detail.component';
import { AdminOrderRefundSaleApprovalRejectComponent } from './admin-order-refund-sale-approval/admin-order-refund-sale-approval-detail/admin-order-refund-sale-approval-reject/admin-order-refund-sale-approval-reject.component';
import { AdminOrderRefundChangeComponent } from './admin-order-refund/admin-order-refund-change/admin-order-refund-change.component';
import { AdminFinanceFreeReqCashComponent } from './admin-finance/admin-finance-free-req-cash/admin-finance-free-req-cash.component';
import { AdminFinanceFreeReqCashReviewComponent } from './admin-finance/admin-finance-free-req-cash/admin-finance-free-req-cash-review/admin-finance-free-req-cash-review.component';
import { AdminProductManagementSchedultComponent } from './admin-product/admin-product-management/admin-product-management-detail/admin-product-management-schedult/admin-product-management-schedult.component';
import { AdminMiniWithdrawalReviewComponent } from './admin-finance/admin-mini-withdrawal-review/admin-mini-withdrawal-review.component';
import { AdminMiniWithdrawalOperateComponent } from './admin-finance/admin-mini-withdrawal-review/admin-mini-withdrawal-operate/admin-mini-withdrawal-operate.component';
import { AdminMiniWithdrawalRecordListComponent } from './admin-finance/admin-mini-withdrawal-record-list/admin-mini-withdrawal-record-list.component';





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
    NgxQRCodeModule
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
    AdminOrderRefundEditComponent,
    AdminOrderRefundTurnoverDetailComponent,
    AdminServicerComponent,
    AdminOrderRefundConfirmComponent,
    AdminServicerCreateComponent,
    AdminServicerDetailComponent,
    UserMoneyLogListComponent,
    AdminGroupAddOrderComponent,
    AdminGroupAddOrderDetailComponent,
    AdminUploadIdCardComponent,
    AdminChangePasswordComponent,
    AdminProductMiniCodeComponent,
    AdminStoreCommissComponent,
    AdminStoreCertifiComponent,
    AdminStoreCertifiBasicComponent,
    AdminStoreCertifiDataComponent,
    AdminStoreCertifiProgressComponent,
    AdminStoreCertifiContracrComponent,
    AdminStoreCertifiCheckComponent,
    AdminStoreCertifiHistoryComponent,
    AdminFreeTravelAddOrderComponent,
    AdminFreeTravelAddOrderDetailComponent,
    AdminPermissionComponent,
    APMBIIDComponent,
    AdminInsuranceHistoryComponent,
    AdminInsuredListComponent,
    AdminPermissionCreateComponent,
    AdminPermissionDetailComponent,
    AOGTDPartRefundComponent,
    AOFTDChangePriceComponent,
    AOGTDChangePriceComponent,
    FreePriceDetailComponent,
    GroupPriceDetailComponent,
    AdminProductManagementPostComponent,
    AdminTravelDetailPostComponent,
    AdminStoreManageComponent,
    AdminStoreManageAddComponent,
    AdminStoreManageDetailComponent,
    AdminRoleComponent,
    AdminRoleCreateComponent,
    AdminRoleDetailComponent,
    AdminStoreManageScheduleComponent,
    AdminStoreManageSetScheduleComponent,
    AdminFreeAddOrderByQuoteComponent,
    FeeByQuoteComponent,
    AdminOrderRefundChangStatusComponent,
    AOFTRefundByquoteComponent,
    AdminStoreManageEmployeeComponent,
    AdminNullComponent,
    AdminFinanceFreeTravelComponent,
    AdminFinanceGroupTravelComponent,
    AdminFinanceGroupTravelDetailComponent,
    AdminFinanceFreeTravelDetailComponent,
    AdminWelcomeComponent,
    AdminOrderDSInsComponent,
    AdminOrderSurrenderComponent,
    AdminMemberComponent,
    AdminWelcomeComponent,
    AdminLotteryComponent,
    AdminFinanceChangeTransComponent,
    AdminProductPreFreeDetailComponent,
    AdminProductPreFreeComponent,
    AdminSelectRefundComponent,
    AdminPreTravelSaleRecordComponent,
    AdminEditContractComponent,
    AdminTravelDetailPresellComponent,
    AdminOrderCancelComponent,
    AdminOrderPreFreeTravelDetailComponent,
    AdminCostTypeComponent,
    AdminCostTypeCreateComponent,
    AdminCostTypeDetailComponent,
    AdminProSupplyComponent,
    AdminProSupplyCreateComponent,
    AdminProSupplyDetailComponent,
    AdminEditContractComponent,
    AdminTravelDetailPresellComponent,
    AdminOrderCancelComponent,
    AdminOrderPreFreeTravelDetailComponent,
    AdminFinanceGroupReqMoneyComponent,
    AdminFinanceGroupReqReviewComponent,
    AdminOrderRefundSaleApprovalComponent,
    AdminOrderRefundSaleApprovalDetailComponent,
    AdminOrderRefundSaleApprovalRejectComponent,
    AdminOrderRefundChangeComponent,
    AdminFinanceFreeReqCashComponent,
    AdminFinanceFreeReqCashReviewComponent,
    AdminProductManagementSchedultComponent,
    AdminMiniWithdrawalReviewComponent,
    AdminMiniWithdrawalOperateComponent,
    AdminMiniWithdrawalRecordListComponent,

  ]
})
export class MaterialComponentsModule {}
