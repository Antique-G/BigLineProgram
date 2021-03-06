import { Routes } from '@angular/router';
import { FullComponent } from '../layouts/full/full.component';
import { AdminCommissionWithdrawComponent } from './admin-commission/admin-commission-withdraw/admin-commission-withdraw.component';
import { UserCommissionListComponent } from './admin-commission/user-commission-list/user-commission-list.component';
import { UserMoneyLogListComponent } from './admin-commission/user-money-log-list/user-money-log-list.component';
import { AdminContractComponent } from './admin-contract/admin-contract.component';
import { AdminProSupplyComponent } from './admin-cost-manage/admin-pro-supply/admin-pro-supply.component';
import { AdminFinanceFreeReqCashComponent } from './admin-finance/admin-finance-free-req-cash/admin-finance-free-req-cash.component';
import { AdminFinanceFreeTravelDetailComponent } from './admin-finance/admin-finance-free-travel/admin-finance-free-travel-detail/admin-finance-free-travel-detail.component';
import { AdminFinanceFreeTravelComponent } from './admin-finance/admin-finance-free-travel/admin-finance-free-travel.component';
import { AdminFinanceGoodsOrderDetailComponent } from './admin-finance/admin-finance-goods-order/admin-finance-goods-order-detail/admin-finance-goods-order-detail.component';
import { AdminFinanceGoodsOrderComponent } from './admin-finance/admin-finance-goods-order/admin-finance-goods-order.component';
import { AdminFinanceGoodsRequestMoneyComponent } from './admin-finance/admin-finance-goods-request-money/admin-finance-goods-request-money.component';
import { AdminFinanceGroupReqMoneyComponent } from './admin-finance/admin-finance-group-req-money/admin-finance-group-req-money.component';
import { AdminFinanceGroupTravelDetailComponent } from './admin-finance/admin-finance-group-travel/admin-finance-group-travel-detail/admin-finance-group-travel-detail.component';
import { AdminFinanceGroupTravelComponent } from './admin-finance/admin-finance-group-travel/admin-finance-group-travel.component';
import { AdminFinanceOrderReportComponent } from './admin-finance/admin-finance-order-report/admin-finance-order-report.component';
import { AdminFinancePreFreeOrderDetailComponent } from './admin-finance/admin-finance-pre-free-order/admin-finance-pre-free-order-detail/admin-finance-pre-free-order-detail.component';
import { AdminFinancePreFreeOrderComponent } from './admin-finance/admin-finance-pre-free-order/admin-finance-pre-free-order.component';
import { AdminMiniWithdrawalRecordListComponent } from './admin-finance/admin-mini-withdrawal-record-list/admin-mini-withdrawal-record-list.component';
import { AdminMiniWithdrawalReviewComponent } from './admin-finance/admin-mini-withdrawal-review/admin-mini-withdrawal-review.component';
import { AdminFreeAddOrderByQuoteComponent } from './admin-free-travel-add-order/admin-free-add-order-by-quote/admin-free-add-order-by-quote.component';
import { AdminFreeTravelAddOrderDetailComponent } from './admin-free-travel-add-order/admin-free-travel-add-order-detail/admin-free-travel-add-order-detail.component';
import { AdminFreeTravelAddOrderComponent } from './admin-free-travel-add-order/admin-free-travel-add-order.component';
import { AdminGoodsCateComponent } from './admin-goods/admin-goods-cate/admin-goods-cate.component';
import { AdminGoodsExpressCompanyComponent } from './admin-goods/admin-goods-express-company/admin-goods-express-company.component';
import { AdminGoodsProAddOrderDetailComponent } from './admin-goods/admin-goods-pro-add-order/admin-goods-pro-add-order-detail/admin-goods-pro-add-order-detail.component';
import { AdminGoodsProAddOrderComponent } from './admin-goods/admin-goods-pro-add-order/admin-goods-pro-add-order.component';
import { AdminGoodsProOrderDetailComponent } from './admin-goods/admin-goods-pro-order/admin-goods-pro-order-detail/admin-goods-pro-order-detail.component';
import { AdminGoodsProOrderComponent } from './admin-goods/admin-goods-pro-order/admin-goods-pro-order.component';
import { AdminGoodsProDetailComponent } from './admin-goods/admin-goods-pro/admin-goods-pro-detail/admin-goods-pro-detail.component';
import { AdminGoodsProComponent } from './admin-goods/admin-goods-pro/admin-goods-pro.component';
import { AdminGroupAddOrderDetailComponent } from './admin-group-add-order/admin-group-add-order-detail/admin-group-add-order-detail.component';
import { AdminGroupAddOrderComponent } from './admin-group-add-order/admin-group-add-order.component';
import { AdminInsuranceHistoryComponent } from './admin-insurance-history/admin-insurance-history.component';
import { AdminInsuranceComponent } from './admin-insurance/admin-insurance.component';
import { AdminLotteryComponent } from './admin-lottery/admin-lottery.component';
import { AdminNullComponent } from './admin-null/admin-null.component';
import { AOFreetravelOrderComponent } from './admin-order-free-travel/a-o-freetravel-order/a-o-freetravel-order.component';
import { AdminOrderFreeTravelDetailComponent } from './admin-order-free-travel/admin-order-free-travel-detail/admin-order-free-travel-detail.component';
import { AdminOrderFreeTravelComponent } from './admin-order-free-travel/admin-order-free-travel.component';
import { AdminOrderPreFreeTravelDetailComponent } from './admin-order-free-travel/admin-order-pre-free-travel-detail/admin-order-pre-free-travel-detail.component';
import { AdminEditContractComponent } from './admin-order-group-travel/admin-edit-contract/admin-edit-contract.component';
import { AdminOrderGroupOrderComponent } from './admin-order-group-travel/admin-order-group-order/admin-order-group-order.component';
import { AdminOrderGroupSupplementaryInfoComponent } from './admin-order-group-travel/admin-order-group-travel-detail/admin-order-group-supplementary-info/admin-order-group-supplementary-info.component';
import { AdminOrderGroupTravelDetailComponent } from './admin-order-group-travel/admin-order-group-travel-detail/admin-order-group-travel-detail.component';
import { AdminOrderGroupTravelComponent } from './admin-order-group-travel/admin-order-group-travel.component';
import { AdminOrderRefundReviewDetailComponent } from './admin-order-refund-review/admin-order-refund-review-detail/admin-order-refund-review-detail.component';
import { AdminOrderRefundReviewEditComponent } from './admin-order-refund-review/admin-order-refund-review-edit/admin-order-refund-review-edit.component';
import { AdminOrderRefundReviewComponent } from './admin-order-refund-review/admin-order-refund-review.component';
import { AdminOrderRefundSaleApprovalDetailComponent } from './admin-order-refund-sale-approval/admin-order-refund-sale-approval-detail/admin-order-refund-sale-approval-detail.component';
import { AdminOrderRefundSaleApprovalComponent } from './admin-order-refund-sale-approval/admin-order-refund-sale-approval.component';
import { AdminOrderRefundTurnoverComponent } from './admin-order-refund-turnover/admin-order-refund-turnover.component';
import { AdminOrderRefundChangeComponent } from './admin-order-refund/admin-order-refund-change/admin-order-refund-change.component';
import { AdminOrderRefundDetailComponent } from './admin-order-refund/admin-order-refund-detail/admin-order-refund-detail.component';
import { AdminOrderRefundEditComponent } from './admin-order-refund/admin-order-refund-edit/admin-order-refund-edit.component';
import { AdminOrderRefundComponent } from './admin-order-refund/admin-order-refund.component';
import { AdminOrderDetailComponent } from './admin-order/admin-order-detail/admin-order-detail.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AdminPermissionComponent } from './admin-permission/admin-permission.component';
import { AdminPreAppointDetailComponent } from './admin-pre-sale/admin-pre-appoint/admin-pre-appoint-detail/admin-pre-appoint-detail.component';
import { AdminPreAppointComponent } from './admin-pre-sale/admin-pre-appoint/admin-pre-appoint.component';
import { AdminPreSaleDetailComponent } from './admin-pre-sale/admin-pre-sale-list/admin-pre-sale-detail/admin-pre-sale-detail.component';
import { AdminPreSaleListComponent } from './admin-pre-sale/admin-pre-sale-list/admin-pre-sale-list.component';
import { AdminProducFreeTravelComponent } from './admin-product/admin-produc-free-travel/admin-produc-free-travel.component';
import { AdminProductFreeTravelDetailComponent } from './admin-product/admin-produc-free-travel/admin-product-free-travel-detail/admin-product-free-travel-detail.component';
import { AdminProductFreeTravelQutedateComponent } from './admin-product/admin-produc-free-travel/admin-product-free-travel-qutedate/admin-product-free-travel-qutedate.component';
import { AdminProductManagementDetailComponent } from './admin-product/admin-product-management/admin-product-management-detail/admin-product-management-detail.component';
import { AdminProductManagementComponent } from './admin-product/admin-product-management/admin-product-management.component';
import { AdminProductQutedateComponent } from './admin-product/admin-product-management/admin-product-qutedate/admin-product-qutedate.component';
import { AdminProductPreFreeComponent } from './admin-product/admin-product-pre-free/admin-product-pre-free.component';
import { AdminProductTagComponent } from './admin-product/admin-product-tag/admin-product-tag.component';
import { AdminRoleComponent } from './admin-role/admin-role.component';
import { AdminSaleTitleComponent } from './admin-sale-title/admin-sale-title.component';
import { AdminServicerComponent } from './admin-servicer/admin-servicer.component';
import { AdminStoreAccountComponent } from './admin-store-account/admin-store-account.component';
import { AdminStoreBankAccountComponent } from './admin-store-bank-account/admin-store-bank-account.component';
import { AdminStoreManageScheduleComponent } from './admin-store-manage-schedule/admin-store-manage-schedule.component';
import { AdminStoreManageComponent } from './admin-store-manage/admin-store-manage.component';
import { AdminStoreCertifiComponent } from './admin-store/admin-store-certifi/admin-store-certifi.component';
import { AdminStoreComponent } from './admin-store/admin-store.component';
import { AdminSystemAreaComponent } from './admin-system-area/admin-system-area.component';
import { AdminTermTemplateCreateComponent } from './admin-term-template/admin-term-template-create/admin-term-template-create.component';
import { AdminTermTemplateEditComponent } from './admin-term-template/admin-term-template-edit/admin-term-template-edit.component';
import { AdminTermTemplateComponent } from './admin-term-template/admin-term-template.component';
import { AdminTermsManageComponent } from './admin-terms-manage/admin-terms-manage.component';
import { AdminTouristComponent } from './admin-tourist/admin-tourist.component';
import { AdminUserinfoEditComponent } from './admin-userinfo/admin-userinfo-edit/admin-userinfo-edit.component';
import { AdminUserinfoComponent } from './admin-userinfo/admin-userinfo.component';
import { AdminWechatPageblockCreateComponent } from './admin-wechat-pageconfig/admin-wechat-pageblock/admin-wechat-pageblock-create/admin-wechat-pageblock-create.component';
import { AdminWechatPageblockDetailComponent } from './admin-wechat-pageconfig/admin-wechat-pageblock/admin-wechat-pageblock-detail/admin-wechat-pageblock-detail.component';
import { AdminWechatPageblockComponent } from './admin-wechat-pageconfig/admin-wechat-pageblock/admin-wechat-pageblock.component';
import { AdminWechatPageconfigComponent } from './admin-wechat-pageconfig/admin-wechat-pageconfig.component';
import { AdminWelcomeComponent } from './admin-welcome/admin-welcome.component';
import { AdminComponent } from './admin/admin.component';



export const MaterialRoutes: Routes = [

    {
        path: '',
        component: FullComponent,
        children: [
            {
                path: 'welcome',
                component: AdminWelcomeComponent,
                data: {
                    breadcrumb: 'welcome'
                }
            },
            {
                path: 'null',
                component: AdminNullComponent,
                data: {
                    breadcrumb: '????????????'
                }
            },
            {
                path: 'adminAccount',
                component: AdminComponent,
                data: {
                    breadcrumb: '?????????????????????'
                }
            },
            {
                path: 'adminPermission',
                component: AdminPermissionComponent,
                data: {
                    breadcrumb: '??????????????????'
                }
            },
            {
                path: 'adminRole',
                component: AdminRoleComponent,
                data: {
                    breadcrumb: '????????????'
                }
            },
            {
                path: 'settingArea',
                component: AdminSystemAreaComponent,
                data: {
                    breadcrumb: '????????????'
                }
            },
            {
                path: 'store',
                component: AdminStoreComponent,
                data: {
                    breadcrumb: '????????????'
                }
            },
            {
                path: 'store/certifi',
                component: AdminStoreCertifiComponent,
                data: {
                    breadcrumb: '??????????????????'
                }
            },
            {
                path: 'store/storeAccount',
                component: AdminStoreAccountComponent,
                data: {
                    breadcrumb: '??????????????????'
                }
            },
            {
                path: 'store/storeBankAccount',
                component: AdminStoreBankAccountComponent,
                data: {
                    breadcrumb: '????????????????????????'
                }
            },
            {
                path: 'productTag',
                component: AdminProductTagComponent,
                data: {
                    breadcrumb: '??????????????????'
                }
            },
            {
                path: 'productManagement',
                component: AdminProductManagementComponent,
                data: {
                    breadcrumb: '????????????'
                }
            },
            {
                path: 'productManagement/detail',
                component: AdminProductManagementDetailComponent,
                data: {
                    breadcrumb: '????????????'
                }
            },
            {
                path: 'productManagement/qutedate',
                component: AdminProductQutedateComponent,
                data: {
                    breadcrumb: '???????????????'
                }
            },
            {
                path: 'freeTravel',
                component: AdminProducFreeTravelComponent,
                data: {
                    breadcrumb: '???????????????'
                }
            },
            {
                path: 'freeTravel/detail',
                component: AdminProductFreeTravelDetailComponent,
                data: {
                    breadcrumb: '???????????????'
                }
            },
            {
                path: 'freeTravel/qutedate',
                component: AdminProductFreeTravelQutedateComponent,
                data: {
                    breadcrumb: '???????????????'
                }
            },
            {
                path: 'termsManage',
                component: AdminTermsManageComponent,
                data: {
                    breadcrumb: '????????????'
                }
            },
            {
                path: 'termTemplate',
                component: AdminTermTemplateComponent,
                data: {
                    breadcrumb: '??????????????????'
                }
            },
            {
                path: 'termTemplate/create',
                component: AdminTermTemplateCreateComponent,
                data: {
                    breadcrumb: '??????????????????'
                }
            },
            {
                path: 'termTemplate/detail',
                component: AdminTermTemplateEditComponent,
                data: {
                    breadcrumb: '??????????????????'
                }
            },
            {
                path: 'orderList',
                component: AdminOrderComponent,
                data: {
                    breadcrumb: '???????????????'
                }
            },
            {
                path: 'orderList/detail',
                component: AdminOrderDetailComponent,
                data: {
                    breadcrumb: '???????????????'
                }
            },
            {
                path: 'groupTravelOrder',
                component: AdminOrderGroupTravelComponent,
                data: {
                    breadcrumb: '?????????????????????'
                }
            },
            {
                path: 'groupTravelOrder/editContract',
                component: AdminEditContractComponent,
                data: {
                    breadcrumb: '???????????????????????????'
                }
            },
            // ??????
            {
                path: 'groupTravelOrder/adminOrdergroupTravelAddOrder',
                component: AdminOrderGroupOrderComponent,
                data: {
                    breadcrumb: '??????????????????'
                }
            },


            {
                path: 'groupTravelOrder/detail',
                component: AdminOrderGroupTravelDetailComponent,
                data: {
                    breadcrumb: '?????????????????????'
                }
            },
            {
                path: 'groupTravelOrder/detail/supplementaryInfo',
                component: AdminOrderGroupSupplementaryInfoComponent,
                data: {
                    breadcrumb: '?????????????????????'
                }
            },


            {
                path: 'addGroupOrder',
                component: AdminGroupAddOrderComponent,
                data: {
                    breadcrumb: '?????????????????????'
                }
            },
            {
                path: 'addGroupOrder/add',
                component: AdminGroupAddOrderDetailComponent,
                data: {
                    breadcrumb: '????????????'
                }
            },



            {
                path: 'freeTravelOrder',
                component: AdminOrderFreeTravelComponent,
                data: {
                    breadcrumb: '?????????????????????'
                }
            },
            {
                path: 'freeTravelOrder/detail',
                component: AdminOrderFreeTravelDetailComponent,
                data: {
                    breadcrumb: '?????????????????????'
                }
            },
            {
                path: 'freeTravelOrder/pre/detail',
                component: AdminOrderPreFreeTravelDetailComponent,
                data: {
                    breadcrumb: '???????????????????????????'
                }
            },

            // ??????
            {
                path: 'freeTravelOrder/order',
                component: AOFreetravelOrderComponent,
                data: {
                    breadcrumb: '??????????????????'
                }
            },


            {
                path: 'addFreeOrder',
                component: AdminFreeTravelAddOrderComponent,
                data: {
                    breadcrumb: '?????????????????????'
                }
            },
            {
                path: 'addFreeOrder/add',
                component: AdminFreeTravelAddOrderDetailComponent,
                data: {
                    breadcrumb: '????????????'
                }
            },
            {
                path: 'addFreeOrder/add/byQuote',
                component: AdminFreeAddOrderByQuoteComponent,
                data: {
                    breadcrumb: '????????????'
                }
            },
            {
                path: 'refund',
                component: AdminOrderRefundComponent,
                data: {
                    breadcrumb: '????????????????????????'
                }
            },
            {
                path: 'refund/edit',
                component: AdminOrderRefundEditComponent,
                data: {
                    breadcrumb: '????????????????????????'
                }
            },
            {
                path: 'refund/detail',
                component: AdminOrderRefundDetailComponent,
                data: {
                    breadcrumb: '????????????????????????'
                }
            },
            {
                path: 'refund/change',
                component: AdminOrderRefundChangeComponent,
                data: {
                    breadcrumb: '??????????????????'
                }
            },
            {
                path: 'salesApproval',
                component: AdminOrderRefundSaleApprovalComponent,
                data: {
                    breadcrumb: '??????????????????????????????'
                }
            },
            {
                path: 'salesApproval/detail',
                component: AdminOrderRefundDetailComponent,
                data: {
                    breadcrumb: '??????????????????????????????'
                }
            },
            {
                path: 'salesApproval/edit',
                component: AdminOrderRefundSaleApprovalDetailComponent,
                data: {
                    breadcrumb: '??????????????????????????????'
                }
            },
            {
                path: 'refundReview',
                component: AdminOrderRefundReviewComponent,
                data: {
                    breadcrumb: '??????????????????'
                }
            },
            {
                path: 'refundReview/edit',
                component: AdminOrderRefundReviewEditComponent,
                data: {
                    breadcrumb: '??????????????????'
                }
            },
            {
                path: 'refundReview/detail',
                component: AdminOrderRefundReviewDetailComponent,
                data: {
                    breadcrumb: '?????????????????????'
                }
            },
            
            {
                path: 'refundTurnOver',
                component: AdminOrderRefundTurnoverComponent,
                data: {
                    breadcrumb: '????????????????????????'
                }
            },

            {
                path: 'adminTourist',
                component: AdminTouristComponent,
                data: {
                    breadcrumb: '????????????'
                }
            },


            {
                path: 'saleTitle',
                component: AdminSaleTitleComponent,
                data: {
                    breadcrumb: '??????????????????'
                }
            },
            {
                path: 'insurance',
                component: AdminInsuranceComponent,
                data: {
                    breadcrumb: '??????????????????'
                }
            },
            {
                path: 'insuranceHistory',
                component: AdminInsuranceHistoryComponent,
                data: {
                    breadcrumb: '??????????????????'
                }
            },

            {
                path: 'user',
                component: AdminUserinfoComponent,
                data: {
                    breadcrumb: '??????????????????'
                }
            },
            {
                path: 'user/detail',
                component: AdminUserinfoEditComponent,
                data: {
                    breadcrumb: '??????????????????'
                }
            },
            {
                path: 'customerService',
                component: AdminServicerComponent,
                data: {
                    breadcrumb: '????????????????????????'
                }
            },


            {
                path: 'pageConfig',
                component: AdminWechatPageconfigComponent,
                data: {
                    breadcrumb: '???????????????????????????'
                }
            },
            {
                path: 'pageBlock',
                component: AdminWechatPageblockComponent,
                data: {
                    breadcrumb: '?????????????????????????????????'
                }
            },
            {
                path: 'pageBlock/create',
                component: AdminWechatPageblockCreateComponent,
                data: {
                    breadcrumb: '?????????????????????????????????'
                }
            },
            {
                path: 'pageBlock/detail',
                component: AdminWechatPageblockDetailComponent,
                data: {
                    breadcrumb: '?????????????????????????????????'
                }
            },
            {
                path: 'contract',
                component: AdminContractComponent,
                data: {
                    breadcrumb: '????????????'
                }
            },
            {
                path: 'userCommission',
                component: UserCommissionListComponent,
                data: {
                    breadcrumb: '????????????????????????'
                }
            },
            {
                path: 'commissionWithdraw',
                component: AdminCommissionWithdrawComponent,
                data: {
                    breadcrumb: '????????????'
                }
            },
            {
                path: 'userMoneyLog',
                component: UserMoneyLogListComponent,
                data: {
                    breadcrumb: '??????????????????'
                }
            },
            {
                path: 'adminStoreManage',
                component: AdminStoreManageComponent,
                data: {
                    breadcrumb: '??????????????????'
                }
            },
            {
                path: 'adminStoreManage/schedule',
                component: AdminStoreManageScheduleComponent,
                data: {
                    breadcrumb: '????????????'
                }
            },
            {
                path: 'financeGroupTravel',
                component: AdminFinanceGroupTravelComponent,
                data: {
                    breadcrumb: '?????????'
                }
            },
            {
                path: 'financeGroupTravel/detail',
                component: AdminFinanceGroupTravelDetailComponent,
                data: {
                    breadcrumb: '???????????????'
                }
            },
            {
                path: 'financefreeDTravel',
                component: AdminFinanceFreeTravelComponent,
                data: {
                    breadcrumb: '?????????'
                }
            },
            {
                path: 'financefreeDTravel/detail',
                component: AdminFinanceFreeTravelDetailComponent,
                data: {
                    breadcrumb: '???????????????'
                }
            },
            {
                path: 'lottery',
                component: AdminLotteryComponent,
                data: {
                    breadcrumb: '????????????'
                }
            },
            {
                path: 'preFree',
                component: AdminProductPreFreeComponent,
                data: {
                    breadcrumb: '???????????????????????????'
                }
            },
            {
                path: 'preFree/detail',
                component: AdminProductFreeTravelDetailComponent,
                data: {
                    breadcrumb: '???????????????????????????'
                }
            },
            {
                path: 'preFree/qutedate',
                component: AdminProductFreeTravelQutedateComponent,
                data: {
                    breadcrumb: '???????????????????????????'
                }
            },
            // {
            //     path: 'costType',
            //     component: AdminCostTypeComponent,
            //     data: {
            //         breadcrumb: '??????????????????'
            //     }
            // },
            {
                path: 'proSupply',
                component: AdminProSupplyComponent,
                data: {
                    breadcrumb: '?????????????????????'
                }
            },
            {
                path: 'financeGroupCashReq',
                component: AdminFinanceGroupReqMoneyComponent,
                data: {
                    breadcrumb: '???????????????'
                }
            },
            {
                path: 'preSaleList',
                component: AdminPreSaleListComponent,
                data: {
                    breadcrumb: '???????????????????????????'
                }
            },
            //
            {
                path: 'preSaleList/detail',
                component: AdminPreSaleDetailComponent,
                data: {
                    breadcrumb: '???????????????????????????'
                }
            },
            {
                path: 'preSaleRecord',
                component: AdminPreAppointComponent,
                data: {
                    breadcrumb: '????????????????????????'
                }
            },
            {
                path: 'preSaleRecord/detail',
                component: AdminPreAppointDetailComponent,
                data: {
                    breadcrumb: '????????????????????????'
                }
            },
            {
                path: 'financePreSaleList',
                component: AdminFinancePreFreeOrderComponent,
                data: {
                    breadcrumb: '???????????????????????????'
                }
            },
            {
                path: 'financePreSaleList/detail',
                component: AdminFinancePreFreeOrderDetailComponent,
                data: {
                    breadcrumb: '???????????????????????????'
                }
            },
            {
                path: 'financeFreeCash',
                component: AdminFinanceFreeReqCashComponent,
                data: {
                    breadcrumb: '?????????????????????'
                }
            },
            {
                path: 'miniWithdrawalReview',
                component: AdminMiniWithdrawalReviewComponent,
                data: {
                    breadcrumb: '?????????????????????????????????'
                }
            },
            {
                path: 'miniWithdrawalRecordList',
                component: AdminMiniWithdrawalRecordListComponent,
                data: {
                    breadcrumb: '?????????????????????????????????'
                }
            },
            {
                path: 'financeOrderReport',
                component: AdminFinanceOrderReportComponent,
                data: {
                    breadcrumb: '??????????????????'
                }
            },
            


            // ????????????
            {
                path: 'goodsCate',
                component: AdminGoodsCateComponent,
                data: {
                    breadcrumb: '??????????????????'
                }
            },
            {
                path: 'goodsList',
                component: AdminGoodsProComponent,
                data: {
                    breadcrumb: '????????????'
                }
            },
            {
                path: 'goodsList/detail',
                component: AdminGoodsProDetailComponent,
                data: {
                    breadcrumb: '????????????'
                }
            },
            {
                path: 'goodsAddOrder',
                component: AdminGoodsProAddOrderComponent,
                data: {
                    breadcrumb: '???????????????????????????'
                }
            },
            {
                path: 'goodsAddOrder/add',
                component: AdminGoodsProAddOrderDetailComponent,
                data: {
                    breadcrumb: '??????????????????'
                }
            },
            {
                path: 'goodsOrderList',
                component: AdminGoodsProOrderComponent,
                data: {
                    breadcrumb: '??????????????????'
                }
            },
            {
                path: 'goodsOrderList/detail',
                component: AdminGoodsProOrderDetailComponent,
                data: {
                    breadcrumb: '??????????????????'
                }
            },
            {
                path: 'expressCompany',
                component: AdminGoodsExpressCompanyComponent,
                data: {
                    breadcrumb: '??????????????????'
                }
            },
            {
                path: 'financeGoods',
                component: AdminFinanceGoodsOrderComponent,
                data: {
                    breadcrumb: '??????????????????'
                }
            },
            {
                path: 'financeGoods/detail',
                component: AdminFinanceGoodsOrderDetailComponent,
                data: {
                    breadcrumb: '??????????????????'
                }
            },
            {
                path: 'financeGoodsCash',
                component: AdminFinanceGoodsRequestMoneyComponent,
                data: {
                    breadcrumb: '????????????'
                }
            },
            
        ]
    }
];
