import { Routes } from '@angular/router';
import { FullComponent } from '../../../app/layouts/full/full.component';
import { StoreProductFreeTravelComponent } from './store-product-free-travel/store-product-free-travel.component';
import { StoreProductCreateBystepComponent } from './store-product-management/store-product-create-bystep/store-product-create-bystep.component';
import { StoreProductManagementDetailComponent } from './store-product-management/store-product-management-detail/store-product-management-detail.component';
import { StoreProductManagementComponent } from './store-product-management/store-product-management.component';
import { StoreQuoteBydateComponent } from './store-quote-bydate/store-quote-bydate.component';
import { StoreTermsManagementComponent } from './store-terms-management/store-terms-management.component';
import { StoreTermsManagementDetailComponent } from './store-terms-management/store-terms-management-detail/store-terms-management-detail.component';
import { StoreProductFreeTravelDetailComponent } from './store-product-free-travel/store-product-free-travel-detail/store-product-free-travel-detail.component';
import { StoreFreeCreateBystepComponent } from './store-product-free-travel/store-free-create-bystep/store-free-create-bystep.component';
import { StoreMeetingPlaceComponent } from './store-meeting-place/store-meeting-place.component';
import { StoreTermsManagementCreateComponent } from './store-terms-management/store-terms-management-create/store-terms-management-create.component';
import { StoreTouristComponent } from './store-tourist/store-tourist.component';
import { StoreOrderGroupComponent } from './store-order-group/store-order-group.component';
import { StoreOrderGroupDetailComponent } from './store-order-group/store-order-group-detail/store-order-group-detail.component';
import { StoreOrderFreetravelComponent } from './store-order-freetravel/store-order-freetravel.component';
import { StoreOrderFreetravelDetailComponent } from './store-order-freetravel/store-order-freetravel-detail/store-order-freetravel-detail.component';
import { StoreOrderGrouptravelComponent } from './store-order-grouptravel/store-order-grouptravel.component';
import { StoreOrderGrouptravelDetailComponent } from './store-order-grouptravel/store-order-grouptravel-detail/store-order-grouptravel-detail.component';
import { StoreContractComponent } from './store-contract/store-contract.component';

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
        runGuardsAndResolvers: 'always' ,
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
        path: 'storeContract',
        component: StoreContractComponent,
        data: {
          breadcrumb: '合同列表'
        }
      }
      
    ]
  }
];
