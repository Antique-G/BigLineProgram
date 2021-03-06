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
                    breadcrumb: '没有权限'
                }
            },
            {
                path: 'adminAccount',
                component: AdminComponent,
                data: {
                    breadcrumb: '管理员账号列表'
                }
            },
            {
                path: 'adminPermission',
                component: AdminPermissionComponent,
                data: {
                    breadcrumb: '管理权限列表'
                }
            },
            {
                path: 'adminRole',
                component: AdminRoleComponent,
                data: {
                    breadcrumb: '角色列表'
                }
            },
            {
                path: 'settingArea',
                component: AdminSystemAreaComponent,
                data: {
                    breadcrumb: '区域列表'
                }
            },
            {
                path: 'store',
                component: AdminStoreComponent,
                data: {
                    breadcrumb: '店铺列表'
                }
            },
            {
                path: 'store/certifi',
                component: AdminStoreCertifiComponent,
                data: {
                    breadcrumb: '店铺审核认证'
                }
            },
            {
                path: 'store/storeAccount',
                component: AdminStoreAccountComponent,
                data: {
                    breadcrumb: '店铺账号列表'
                }
            },
            {
                path: 'store/storeBankAccount',
                component: AdminStoreBankAccountComponent,
                data: {
                    breadcrumb: '店铺银行账号列表'
                }
            },
            {
                path: 'productTag',
                component: AdminProductTagComponent,
                data: {
                    breadcrumb: '产品标签列表'
                }
            },
            {
                path: 'productManagement',
                component: AdminProductManagementComponent,
                data: {
                    breadcrumb: '产品列表'
                }
            },
            {
                path: 'productManagement/detail',
                component: AdminProductManagementDetailComponent,
                data: {
                    breadcrumb: '产品详情'
                }
            },
            {
                path: 'productManagement/qutedate',
                component: AdminProductQutedateComponent,
                data: {
                    breadcrumb: '跟团游报价'
                }
            },
            {
                path: 'freeTravel',
                component: AdminProducFreeTravelComponent,
                data: {
                    breadcrumb: '自由行列表'
                }
            },
            {
                path: 'freeTravel/detail',
                component: AdminProductFreeTravelDetailComponent,
                data: {
                    breadcrumb: '自由行详情'
                }
            },
            {
                path: 'freeTravel/qutedate',
                component: AdminProductFreeTravelQutedateComponent,
                data: {
                    breadcrumb: '自由行报价'
                }
            },
            {
                path: 'termsManage',
                component: AdminTermsManageComponent,
                data: {
                    breadcrumb: '条款列表'
                }
            },
            {
                path: 'termTemplate',
                component: AdminTermTemplateComponent,
                data: {
                    breadcrumb: '条款模板列表'
                }
            },
            {
                path: 'termTemplate/create',
                component: AdminTermTemplateCreateComponent,
                data: {
                    breadcrumb: '条款模板添加'
                }
            },
            {
                path: 'termTemplate/detail',
                component: AdminTermTemplateEditComponent,
                data: {
                    breadcrumb: '条款模板详情'
                }
            },
            {
                path: 'orderList',
                component: AdminOrderComponent,
                data: {
                    breadcrumb: '团订单列表'
                }
            },
            {
                path: 'orderList/detail',
                component: AdminOrderDetailComponent,
                data: {
                    breadcrumb: '团订单详情'
                }
            },
            {
                path: 'groupTravelOrder',
                component: AdminOrderGroupTravelComponent,
                data: {
                    breadcrumb: '跟团游订单列表'
                }
            },
            {
                path: 'groupTravelOrder/editContract',
                component: AdminEditContractComponent,
                data: {
                    breadcrumb: '跟团游订单修改合同'
                }
            },
            // 注销
            {
                path: 'groupTravelOrder/adminOrdergroupTravelAddOrder',
                component: AdminOrderGroupOrderComponent,
                data: {
                    breadcrumb: '添加订单内容'
                }
            },


            {
                path: 'groupTravelOrder/detail',
                component: AdminOrderGroupTravelDetailComponent,
                data: {
                    breadcrumb: '跟团游订单详情'
                }
            },
            {
                path: 'groupTravelOrder/detail/supplementaryInfo',
                component: AdminOrderGroupSupplementaryInfoComponent,
                data: {
                    breadcrumb: '后补出行人信息'
                }
            },


            {
                path: 'addGroupOrder',
                component: AdminGroupAddOrderComponent,
                data: {
                    breadcrumb: '添加跟团游订单'
                }
            },
            {
                path: 'addGroupOrder/add',
                component: AdminGroupAddOrderDetailComponent,
                data: {
                    breadcrumb: '添加订单'
                }
            },



            {
                path: 'freeTravelOrder',
                component: AdminOrderFreeTravelComponent,
                data: {
                    breadcrumb: '自由行订单列表'
                }
            },
            {
                path: 'freeTravelOrder/detail',
                component: AdminOrderFreeTravelDetailComponent,
                data: {
                    breadcrumb: '自由行订单详情'
                }
            },
            {
                path: 'freeTravelOrder/pre/detail',
                component: AdminOrderPreFreeTravelDetailComponent,
                data: {
                    breadcrumb: '自由行预售订单详情'
                }
            },

            // 注销
            {
                path: 'freeTravelOrder/order',
                component: AOFreetravelOrderComponent,
                data: {
                    breadcrumb: '添加订单内容'
                }
            },


            {
                path: 'addFreeOrder',
                component: AdminFreeTravelAddOrderComponent,
                data: {
                    breadcrumb: '添加自由行订单'
                }
            },
            {
                path: 'addFreeOrder/add',
                component: AdminFreeTravelAddOrderDetailComponent,
                data: {
                    breadcrumb: '添加订单'
                }
            },
            {
                path: 'addFreeOrder/add/byQuote',
                component: AdminFreeAddOrderByQuoteComponent,
                data: {
                    breadcrumb: '添加订单'
                }
            },
            {
                path: 'refund',
                component: AdminOrderRefundComponent,
                data: {
                    breadcrumb: '订单申请退款列表'
                }
            },
            {
                path: 'refund/edit',
                component: AdminOrderRefundEditComponent,
                data: {
                    breadcrumb: '订单退款申请页面'
                }
            },
            {
                path: 'refund/detail',
                component: AdminOrderRefundDetailComponent,
                data: {
                    breadcrumb: '订单退款详情页面'
                }
            },
            {
                path: 'refund/change',
                component: AdminOrderRefundChangeComponent,
                data: {
                    breadcrumb: '订单退款修改'
                }
            },
            {
                path: 'salesApproval',
                component: AdminOrderRefundSaleApprovalComponent,
                data: {
                    breadcrumb: '销售主管审核退款列表'
                }
            },
            {
                path: 'salesApproval/detail',
                component: AdminOrderRefundDetailComponent,
                data: {
                    breadcrumb: '销售主管审核详情页面'
                }
            },
            {
                path: 'salesApproval/edit',
                component: AdminOrderRefundSaleApprovalDetailComponent,
                data: {
                    breadcrumb: '销售主管审核退款详情'
                }
            },
            {
                path: 'refundReview',
                component: AdminOrderRefundReviewComponent,
                data: {
                    breadcrumb: '财务退款列表'
                }
            },
            {
                path: 'refundReview/edit',
                component: AdminOrderRefundReviewEditComponent,
                data: {
                    breadcrumb: '财务退款审核'
                }
            },
            {
                path: 'refundReview/detail',
                component: AdminOrderRefundReviewDetailComponent,
                data: {
                    breadcrumb: '财务退款已完成'
                }
            },
            
            {
                path: 'refundTurnOver',
                component: AdminOrderRefundTurnoverComponent,
                data: {
                    breadcrumb: '订单退款流水列表'
                }
            },

            {
                path: 'adminTourist',
                component: AdminTouristComponent,
                data: {
                    breadcrumb: '导游列表'
                }
            },


            {
                path: 'saleTitle',
                component: AdminSaleTitleComponent,
                data: {
                    breadcrumb: '销售头衔列表'
                }
            },
            {
                path: 'insurance',
                component: AdminInsuranceComponent,
                data: {
                    breadcrumb: '保险管理列表'
                }
            },
            {
                path: 'insuranceHistory',
                component: AdminInsuranceHistoryComponent,
                data: {
                    breadcrumb: '保险购买记录'
                }
            },

            {
                path: 'user',
                component: AdminUserinfoComponent,
                data: {
                    breadcrumb: '用户信息列表'
                }
            },
            {
                path: 'user/detail',
                component: AdminUserinfoEditComponent,
                data: {
                    breadcrumb: '用户信息详情'
                }
            },
            {
                path: 'customerService',
                component: AdminServicerComponent,
                data: {
                    breadcrumb: '区域客服设置列表'
                }
            },


            {
                path: 'pageConfig',
                component: AdminWechatPageconfigComponent,
                data: {
                    breadcrumb: '小程序页面设置列表'
                }
            },
            {
                path: 'pageBlock',
                component: AdminWechatPageblockComponent,
                data: {
                    breadcrumb: '小程序页面模块设置列表'
                }
            },
            {
                path: 'pageBlock/create',
                component: AdminWechatPageblockCreateComponent,
                data: {
                    breadcrumb: '小程序页面模块设置添加'
                }
            },
            {
                path: 'pageBlock/detail',
                component: AdminWechatPageblockDetailComponent,
                data: {
                    breadcrumb: '小程序页面模块设置修改'
                }
            },
            {
                path: 'contract',
                component: AdminContractComponent,
                data: {
                    breadcrumb: '合同列表'
                }
            },
            {
                path: 'userCommission',
                component: UserCommissionListComponent,
                data: {
                    breadcrumb: '用户分销佣金列表'
                }
            },
            {
                path: 'commissionWithdraw',
                component: AdminCommissionWithdrawComponent,
                data: {
                    breadcrumb: '提现列表'
                }
            },
            {
                path: 'userMoneyLog',
                component: UserMoneyLogListComponent,
                data: {
                    breadcrumb: '金额变动记录'
                }
            },
            {
                path: 'adminStoreManage',
                component: AdminStoreManageComponent,
                data: {
                    breadcrumb: '门店管理列表'
                }
            },
            {
                path: 'adminStoreManage/schedule',
                component: AdminStoreManageScheduleComponent,
                data: {
                    breadcrumb: '排班管理'
                }
            },
            {
                path: 'financeGroupTravel',
                component: AdminFinanceGroupTravelComponent,
                data: {
                    breadcrumb: '跟团游'
                }
            },
            {
                path: 'financeGroupTravel/detail',
                component: AdminFinanceGroupTravelDetailComponent,
                data: {
                    breadcrumb: '跟团游详情'
                }
            },
            {
                path: 'financefreeDTravel',
                component: AdminFinanceFreeTravelComponent,
                data: {
                    breadcrumb: '自由行'
                }
            },
            {
                path: 'financefreeDTravel/detail',
                component: AdminFinanceFreeTravelDetailComponent,
                data: {
                    breadcrumb: '自由行详情'
                }
            },
            {
                path: 'lottery',
                component: AdminLotteryComponent,
                data: {
                    breadcrumb: '抽奖活动'
                }
            },
            {
                path: 'preFree',
                component: AdminProductPreFreeComponent,
                data: {
                    breadcrumb: '自由行预售产品列表'
                }
            },
            {
                path: 'preFree/detail',
                component: AdminProductFreeTravelDetailComponent,
                data: {
                    breadcrumb: '自由行预售产品详情'
                }
            },
            {
                path: 'preFree/qutedate',
                component: AdminProductFreeTravelQutedateComponent,
                data: {
                    breadcrumb: '自由行预售产品报价'
                }
            },
            // {
            //     path: 'costType',
            //     component: AdminCostTypeComponent,
            //     data: {
            //         breadcrumb: '成本类型列表'
            //     }
            // },
            {
                path: 'proSupply',
                component: AdminProSupplyComponent,
                data: {
                    breadcrumb: '供应商管理列表'
                }
            },
            {
                path: 'financeGroupCashReq',
                component: AdminFinanceGroupReqMoneyComponent,
                data: {
                    breadcrumb: '团请款列表'
                }
            },
            {
                path: 'preSaleList',
                component: AdminPreSaleListComponent,
                data: {
                    breadcrumb: '自由行预售订单列表'
                }
            },
            //
            {
                path: 'preSaleList/detail',
                component: AdminPreSaleDetailComponent,
                data: {
                    breadcrumb: '自由行预售订单详情'
                }
            },
            {
                path: 'preSaleRecord',
                component: AdminPreAppointComponent,
                data: {
                    breadcrumb: '自由行预约码列表'
                }
            },
            {
                path: 'preSaleRecord/detail',
                component: AdminPreAppointDetailComponent,
                data: {
                    breadcrumb: '自由行预约码详情'
                }
            },
            {
                path: 'financePreSaleList',
                component: AdminFinancePreFreeOrderComponent,
                data: {
                    breadcrumb: '自由行预售订单列表'
                }
            },
            {
                path: 'financePreSaleList/detail',
                component: AdminFinancePreFreeOrderDetailComponent,
                data: {
                    breadcrumb: '自由行预售订单详情'
                }
            },
            {
                path: 'financeFreeCash',
                component: AdminFinanceFreeReqCashComponent,
                data: {
                    breadcrumb: '自由行请款列表'
                }
            },
            {
                path: 'miniWithdrawalReview',
                component: AdminMiniWithdrawalReviewComponent,
                data: {
                    breadcrumb: '小程序钱包提现审核列表'
                }
            },
            {
                path: 'miniWithdrawalRecordList',
                component: AdminMiniWithdrawalRecordListComponent,
                data: {
                    breadcrumb: '小程序钱包提现流水列表'
                }
            },
            {
                path: 'financeOrderReport',
                component: AdminFinanceOrderReportComponent,
                data: {
                    breadcrumb: '财务统计报表'
                }
            },
            


            // 生鲜商城
            {
                path: 'goodsCate',
                component: AdminGoodsCateComponent,
                data: {
                    breadcrumb: '商品分类列表'
                }
            },
            {
                path: 'goodsList',
                component: AdminGoodsProComponent,
                data: {
                    breadcrumb: '商品列表'
                }
            },
            {
                path: 'goodsList/detail',
                component: AdminGoodsProDetailComponent,
                data: {
                    breadcrumb: '商品详情'
                }
            },
            {
                path: 'goodsAddOrder',
                component: AdminGoodsProAddOrderComponent,
                data: {
                    breadcrumb: '添加商品可下单列表'
                }
            },
            {
                path: 'goodsAddOrder/add',
                component: AdminGoodsProAddOrderDetailComponent,
                data: {
                    breadcrumb: '添加商品订单'
                }
            },
            {
                path: 'goodsOrderList',
                component: AdminGoodsProOrderComponent,
                data: {
                    breadcrumb: '商品订单列表'
                }
            },
            {
                path: 'goodsOrderList/detail',
                component: AdminGoodsProOrderDetailComponent,
                data: {
                    breadcrumb: '商品订单详情'
                }
            },
            {
                path: 'expressCompany',
                component: AdminGoodsExpressCompanyComponent,
                data: {
                    breadcrumb: '快递公司列表'
                }
            },
            {
                path: 'financeGoods',
                component: AdminFinanceGoodsOrderComponent,
                data: {
                    breadcrumb: '商品订单列表'
                }
            },
            {
                path: 'financeGoods/detail',
                component: AdminFinanceGoodsOrderDetailComponent,
                data: {
                    breadcrumb: '商品订单详情'
                }
            },
            {
                path: 'financeGoodsCash',
                component: AdminFinanceGoodsRequestMoneyComponent,
                data: {
                    breadcrumb: '商品请款'
                }
            },
            
        ]
    }
];
