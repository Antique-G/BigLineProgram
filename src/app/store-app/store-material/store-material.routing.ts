import { Routes } from '@angular/router';
import { FullComponent } from '../../../app/layouts/full/full.component';
import { StoreCerticationComponent } from './store-certication/store-certication.component';
import { StoreContractComponent } from './store-contract/store-contract.component';
import { StoreCostTypeComponent } from './store-cost-type/store-cost-type.component';
import { StoreGoodsProCreateBystepComponent } from './store-goods-pro/store-goods-pro-create-bystep/store-goods-pro-create-bystep.component';
import { StoreGoodsProDetailComponent } from './store-goods-pro/store-goods-pro-detail/store-goods-pro-detail.component';
import { StoreGoodsProComponent } from './store-goods-pro/store-goods-pro.component';
import { StoreMeetingPlaceComponent } from './store-meeting-place/store-meeting-place.component';
import { SOFreetravelOrderComponent } from './store-order-freetravel/s-o-freetravel-order/s-o-freetravel-order.component';
import { StoreOrderFreetravelDetailComponent } from './store-order-freetravel/store-order-freetravel-detail/store-order-freetravel-detail.component';
import { StoreOrderFreetravelComponent } from './store-order-freetravel/store-order-freetravel.component';
import { StoreOrderGroupDetailComponent } from './store-order-group/store-order-group-detail/store-order-group-detail.component';
import { StoreOrderGroupComponent } from './store-order-group/store-order-group.component';
import { StoreOrderGrouptravelDetailComponent } from './store-order-grouptravel/store-order-grouptravel-detail/store-order-grouptravel-detail.component';
import { StoreOrderGrouptravelOrderComponent } from './store-order-grouptravel/store-order-grouptravel-order/store-order-grouptravel-order.component';
import { StoreOrderGrouptravelComponent } from './store-order-grouptravel/store-order-grouptravel.component';
import { StoreOrderRefundTurnoverComponent } from './store-order-refund-turnover/store-order-refund-turnover.component';
import { StoreOrderRefundDetailComponent } from './store-order-refund/store-order-refund-detail/store-order-refund-detail.component';
import { StoreOrderRefundComponent } from './store-order-refund/store-order-refund.component';
import { StorePreFreeSaleListDetailComponent } from './store-pre-free-sale-list/store-pre-free-sale-list-detail/store-pre-free-sale-list-detail.component';
import { StorePreFreeSaleListComponent } from './store-pre-free-sale-list/store-pre-free-sale-list.component';
import { StoreFreeCreateBystepComponent } from './store-product-free-travel/store-free-create-bystep/store-free-create-bystep.component';
import { StoreFreeQuoteComponent } from './store-product-free-travel/store-free-quote/store-free-quote.component';
import { StoreProductFreeTravelDetailComponent } from './store-product-free-travel/store-product-free-travel-detail/store-product-free-travel-detail.component';
import { StoreProductFreeTravelComponent } from './store-product-free-travel/store-product-free-travel.component';
import { StoreProductCreateBystepComponent } from './store-product-management/store-product-create-bystep/store-product-create-bystep.component';
import { StoreProductManagementDetailComponent } from './store-product-management/store-product-management-detail/store-product-management-detail.component';
import { StoreProductManagementComponent } from './store-product-management/store-product-management.component';
import { StoreProductPreFreeTravelComponent } from './store-product-pre-free-travel/store-product-pre-free-travel.component';
import { StoreQuoteBydateComponent } from './store-quote-bydate/store-quote-bydate.component';
import { StoreRequestMoneyComponent } from './store-request-money/store-request-money.component';
import { StoreTermsManagementCreateComponent } from './store-terms-management/store-terms-management-create/store-terms-management-create.component';
import { StoreTermsManagementDetailComponent } from './store-terms-management/store-terms-management-detail/store-terms-management-detail.component';
import { StoreTermsManagementComponent } from './store-terms-management/store-terms-management.component';
import { StoreTouristComponent } from './store-tourist/store-tourist.component';



export const StoreMaterialRoutes: Routes = [

    {
        path: '',
        component: FullComponent,
        children: [
            {
                path: 'storeProduct',
                component: StoreProductManagementComponent,
                data: {
                    breadcrumb: '产品列表'
                }
            },
            {
                path: 'storeProduct/createByStep',
                component: StoreProductCreateBystepComponent,
                data: {
                    breadcrumb: '产品添加'
                }
            },
            {
                path: 'storeProduct/detail',
                component: StoreProductManagementDetailComponent,
                data: {
                    breadcrumb: '产品详情'
                }
            },
            {
                path: 'storeFreeTravel',
                component: StoreProductFreeTravelComponent,
                data: {
                    breadcrumb: '自由行'
                }
            },
            {
                path: 'storeFreeTravel/storeQuote',
                component: StoreQuoteBydateComponent,
                data: {
                    breadcrumb: '按日期报价'
                }
            },
            {
                path: 'storeFreeTravel/storeQuote/byPack',
                component: StoreFreeQuoteComponent,
                data: {
                    breadcrumb: '按日期报价'
                }
            },
            {
                path: 'storeFreeTravel/detail',
                component: StoreProductFreeTravelDetailComponent,
                data: {
                    breadcrumb: '自由行产品详情'
                }
            },
            {
                path: 'storeFreeTravel/create',
                component: StoreFreeCreateBystepComponent,
                data: {
                    breadcrumb: '自由行产品详情'
                }
            },

            {
                path: 'storeProduct/storeQuote',
                component: StoreQuoteBydateComponent,
                data: {
                    breadcrumb: '按日期报价'
                }
            },

            {
                path: 'storeMeetingPlace',
                component: StoreMeetingPlaceComponent,
                data: {
                    breadcrumb: '集合地点'
                }
            },
            {
                path: 'storeTermsManage',
                component: StoreTermsManagementComponent,
                data: {
                    breadcrumb: '条款列表'
                }
            },
            {
                path: 'storeTermsManage/create',
                component: StoreTermsManagementCreateComponent,
                data: {
                    breadcrumb: '条款添加'
                }
            },
            {
                path: 'storeTermsManage/detail',
                component: StoreTermsManagementDetailComponent,
                data: {
                    breadcrumb: '条款详情'
                }
            },
            {
                path: 'storeTourist',
                component: StoreTouristComponent,
                data: {
                    breadcrumb: '导游列表'
                }
            },
            {
                path: 'storeOrderGroup',
                component: StoreOrderGroupComponent,
                data: {
                    breadcrumb: '团订单列表'
                }
            },
            {
                path: 'storeOrderGroup/detail',
                component: StoreOrderGroupDetailComponent,
                runGuardsAndResolvers: 'always',
                data: {
                    breadcrumb: '团订单详情'
                }
            },
            {
                path: 'storeOrderFreeTravel',
                component: StoreOrderFreetravelComponent,
                data: {
                    breadcrumb: '自由行订单列表'
                }
            },
            {
                path: 'storeOrderFreeTravel/detail',
                component: StoreOrderFreetravelDetailComponent,
                data: {
                    breadcrumb: '自由行订单详情'
                }
            },
            {
                path: 'storeOrderFreeTravel/addOrder',
                component: SOFreetravelOrderComponent,
                data: {
                    breadcrumb: '添加订单内容'
                }
            },
            {
                path: 'storeOrdergroupTravel',
                component: StoreOrderGrouptravelComponent,
                data: {
                    breadcrumb: '跟团游订单列表'
                }
            },
            {
                path: 'storeOrdergroupTravel/detail',
                component: StoreOrderGrouptravelDetailComponent,
                data: {
                    breadcrumb: '跟团游订单详情'
                }
            },
            {
                path: 'storeOrdergroupTravel/storeOrdergroupTravelAddOrder',
                component: StoreOrderGrouptravelOrderComponent,
                data: {
                    breadcrumb: '添加订单内容'
                }
            },
            {
                path: 'storeContract',
                component: StoreContractComponent,
                data: {
                    breadcrumb: '合同列表'
                }
            },
            {
                path: 'storeRefund',
                component: StoreOrderRefundComponent,
                data: {
                    breadcrumb: '订单退款记录列表'
                }
            },
            {
                path: 'storeRefund/detail',
                component: StoreOrderRefundDetailComponent,
                data: {
                    breadcrumb: '订单退款记录详情'
                }
            },
            {
                path: 'storeRefundTurnOver',
                component: StoreOrderRefundTurnoverComponent,
                data: {
                    breadcrumb: '订单退款流水'
                }
            },
            {
                path: 'storeCertification',
                component: StoreCerticationComponent,
                data: {
                    breadcrumb: '账户信息'
                }
            },
            {
                path: 'storePreFree',
                component: StoreProductPreFreeTravelComponent,
                data: {
                    breadcrumb: '自由行预售产品列表'
                }
            },
            {
                path: 'storePreFree/create',
                component: StoreFreeCreateBystepComponent,
                data: {
                    breadcrumb: '添加自由行预售产品'
                }
            },
            {
                path: 'storePreFree/detail',
                component: StoreProductFreeTravelDetailComponent,
                data: {
                    breadcrumb: '自由行预售产品详情'
                }
            },
            {
                path: 'storePreFree/quote',
                component: StoreFreeQuoteComponent,
                data: {
                    breadcrumb: '自由行预售产品报价'
                }
            },
            {
                path: 'storePreFreeSaleList',
                component: StorePreFreeSaleListComponent,
                data: {
                    breadcrumb: '自由行预售抢购记录列表'
                }
            },
            {
                path: 'storePreFreeSaleList/detail',
                component: StorePreFreeSaleListDetailComponent,
                data: {
                    breadcrumb: '自由行预售抢购记录详情'
                }
            },
            {
                path: 'storeCostType',
                component: StoreCostTypeComponent,
                data: {
                    breadcrumb: '成本类型列表'
                }
            },
            {
                path: 'storeReqMoney',
                component: StoreRequestMoneyComponent,
                data: {
                    breadcrumb: '请款记录列表'
                }
            },
            {
                path: 'storeGoods',
                component: StoreGoodsProComponent,
                data: {
                    breadcrumb: '生鲜商品列表'
                }
            },
            {
                path: 'storeGoods/create',
                component: StoreGoodsProCreateBystepComponent,
                data: {
                    breadcrumb: '添加生鲜商品'
                }
            },
            {
                path: 'storeGoods/detail',
                component: StoreGoodsProDetailComponent,
                data: {
                    breadcrumb: '生鲜商品详情'
                }
            },
            
        ]
    }
];
