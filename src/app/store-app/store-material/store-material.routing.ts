import { Routes } from '@angular/router';
import { FullComponent } from '../../../app/layouts/full/full.component';
import { StoreCerticationComponent } from './store-certication/store-certication.component';
import { StoreContractComponent } from './store-contract/store-contract.component';
import { StoreCostTypeComponent } from './store-cost-type/store-cost-type.component';
import { StoreGoodsOrderDetailComponent } from './store-goods-order/store-goods-order-detail/store-goods-order-detail.component';
import { StoreGoodsOrderComponent } from './store-goods-order/store-goods-order.component';
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
import { StorePreFreeAppointDetailComponent } from './store-pre-free-appoint/store-pre-free-appoint-detail/store-pre-free-appoint-detail.component';
import { StorePreFreeAppointComponent } from './store-pre-free-appoint/store-pre-free-appoint.component';
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
                    breadcrumb: '????????????'
                }
            },
            {
                path: 'storeProduct/createByStep',
                component: StoreProductCreateBystepComponent,
                data: {
                    breadcrumb: '????????????'
                }
            },
            {
                path: 'storeProduct/detail',
                component: StoreProductManagementDetailComponent,
                data: {
                    breadcrumb: '????????????'
                }
            },
            {
                path: 'storeFreeTravel',
                component: StoreProductFreeTravelComponent,
                data: {
                    breadcrumb: '?????????'
                }
            },
            {
                path: 'storeFreeTravel/storeQuote',
                component: StoreQuoteBydateComponent,
                data: {
                    breadcrumb: '???????????????'
                }
            },
            {
                path: 'storeFreeTravel/storeQuote/byPack',
                component: StoreFreeQuoteComponent,
                data: {
                    breadcrumb: '???????????????'
                }
            },
            {
                path: 'storeFreeTravel/detail',
                component: StoreProductFreeTravelDetailComponent,
                data: {
                    breadcrumb: '?????????????????????'
                }
            },
            {
                path: 'storeFreeTravel/create',
                component: StoreFreeCreateBystepComponent,
                data: {
                    breadcrumb: '?????????????????????'
                }
            },

            {
                path: 'storeProduct/storeQuote',
                component: StoreQuoteBydateComponent,
                data: {
                    breadcrumb: '???????????????'
                }
            },

            {
                path: 'storeMeetingPlace',
                component: StoreMeetingPlaceComponent,
                data: {
                    breadcrumb: '????????????'
                }
            },
            {
                path: 'storeTermsManage',
                component: StoreTermsManagementComponent,
                data: {
                    breadcrumb: '????????????'
                }
            },
            {
                path: 'storeTermsManage/create',
                component: StoreTermsManagementCreateComponent,
                data: {
                    breadcrumb: '????????????'
                }
            },
            {
                path: 'storeTermsManage/detail',
                component: StoreTermsManagementDetailComponent,
                data: {
                    breadcrumb: '????????????'
                }
            },
            {
                path: 'storeTourist',
                component: StoreTouristComponent,
                data: {
                    breadcrumb: '????????????'
                }
            },
            {
                path: 'storeOrderGroup',
                component: StoreOrderGroupComponent,
                data: {
                    breadcrumb: '???????????????'
                }
            },
            {
                path: 'storeOrderGroup/detail',
                component: StoreOrderGroupDetailComponent,
                runGuardsAndResolvers: 'always',
                data: {
                    breadcrumb: '???????????????'
                }
            },
            {
                path: 'storeOrderFreeTravel',
                component: StoreOrderFreetravelComponent,
                data: {
                    breadcrumb: '?????????????????????'
                }
            },
            {
                path: 'storeOrderFreeTravel/detail',
                component: StoreOrderFreetravelDetailComponent,
                data: {
                    breadcrumb: '?????????????????????'
                }
            },
            {
                path: 'storeOrderFreeTravel/addOrder',
                component: SOFreetravelOrderComponent,
                data: {
                    breadcrumb: '??????????????????'
                }
            },
            {
                path: 'storeOrdergroupTravel',
                component: StoreOrderGrouptravelComponent,
                data: {
                    breadcrumb: '?????????????????????'
                }
            },
            {
                path: 'storeOrdergroupTravel/detail',
                component: StoreOrderGrouptravelDetailComponent,
                data: {
                    breadcrumb: '?????????????????????'
                }
            },
            {
                path: 'storeOrdergroupTravel/storeOrdergroupTravelAddOrder',
                component: StoreOrderGrouptravelOrderComponent,
                data: {
                    breadcrumb: '??????????????????'
                }
            },
            {
                path: 'storeContract',
                component: StoreContractComponent,
                data: {
                    breadcrumb: '????????????'
                }
            },
            {
                path: 'storeRefund',
                component: StoreOrderRefundComponent,
                data: {
                    breadcrumb: '????????????????????????'
                }
            },
            {
                path: 'storeRefund/detail',
                component: StoreOrderRefundDetailComponent,
                data: {
                    breadcrumb: '????????????????????????'
                }
            },
            {
                path: 'storeRefundTurnOver',
                component: StoreOrderRefundTurnoverComponent,
                data: {
                    breadcrumb: '??????????????????'
                }
            },
            {
                path: 'storeCertification',
                component: StoreCerticationComponent,
                data: {
                    breadcrumb: '????????????'
                }
            },
            {
                path: 'storePreFree',
                component: StoreProductPreFreeTravelComponent,
                data: {
                    breadcrumb: '???????????????????????????'
                }
            },
            // {
            //     path: 'storePreFree/create',
            //     component: StoreFreeCreateBystepComponent,
            //     data: {
            //         breadcrumb: '???????????????????????????'
            //     }
            // },
            {
                path: 'storePreFree/detail',
                component: StoreProductFreeTravelDetailComponent,
                data: {
                    breadcrumb: '???????????????????????????'
                }
            },
            {
                path: 'storePreFree/quote',
                component: StoreFreeQuoteComponent,
                data: {
                    breadcrumb: '???????????????????????????'
                }
            },
            {
                path: 'storePreFreeSaleList',
                component: StorePreFreeSaleListComponent,
                data: {
                    breadcrumb: '???????????????????????????'
                }
            },
            {
                path: 'storePreFreeSaleList/detail',
                component: StorePreFreeSaleListDetailComponent,
                data: {
                    breadcrumb: '???????????????????????????'
                }
            },
            {
                path: 'storePreFreeAppointList',
                component: StorePreFreeAppointComponent,
                data: {
                    breadcrumb: '????????????????????????'
                }
            },
            {
                path: 'storePreFreeAppointList/detail',
                component: StorePreFreeAppointDetailComponent,
                data: {
                    breadcrumb: '????????????????????????'
                }
            },
            {
                path: 'storeCostType',
                component: StoreCostTypeComponent,
                data: {
                    breadcrumb: '??????????????????'
                }
            },
            {
                path: 'storeReqMoney',
                component: StoreRequestMoneyComponent,
                data: {
                    breadcrumb: '??????????????????'
                }
            },
            {
                path: 'storeGoods',
                component: StoreGoodsProComponent,
                data: {
                    breadcrumb: '????????????'
                }
            },
            {
                path: 'storeGoods/create',
                component: StoreGoodsProCreateBystepComponent,
                data: {
                    breadcrumb: '????????????'
                }
            },
            {
                path: 'storeGoods/detail',
                component: StoreGoodsProDetailComponent,
                data: {
                    breadcrumb: '????????????'
                }
            },
            {
                path: 'storeGoodsOrder',
                component: StoreGoodsOrderComponent,
                data: {
                    breadcrumb: '??????????????????'
                }
            },
            {
                path: 'storeGoodsOrder/detail',
                component: StoreGoodsOrderDetailComponent,
                data: {
                    breadcrumb: '??????????????????'
                }
            },

        ]
    }
];
