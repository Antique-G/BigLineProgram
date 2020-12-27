import { Routes } from '@angular/router';
import { FullComponent } from '../../../app/layouts/full/full.component';
import { StoreMeetingPlaceComponent } from './store-meeting-place/store-meeting-place.component';
import { StoreProductCreateBystepComponent } from './store-product-management/store-product-create-bystep/store-product-create-bystep.component';
import { StoreProductManagementCreateComponent } from './store-product-management/store-product-management-create/store-product-management-create.component';
import { StoreProductManagementDetailComponent } from './store-product-management/store-product-management-detail/store-product-management-detail.component';
import { StoreProductManagementComponent } from './store-product-management/store-product-management.component';
import { StoreQuoteBydateComponent } from './store-quote-bydate/store-quote-bydate.component';
import { StoreTermsManagementComponent } from './store-terms-management/store-terms-management.component';

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
        path: 'storeProduct/create',
        component: StoreProductManagementCreateComponent,
        data: {
          breadcrumb: '产品添加'
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
    ]
  }
];
