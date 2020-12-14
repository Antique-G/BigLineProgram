import { Routes } from '@angular/router';
import { FullComponent } from '../../../app/layouts/full/full.component';
import { StoreMeetingPlaceComponent } from './store-meeting-place/store-meeting-place.component';
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
        component: StoreProductManagementComponent
      },
      {
        path: 'storeProduct/create',
        component: StoreProductManagementCreateComponent
      },
      {
        path: 'storeProduct/detail',
        component: StoreProductManagementDetailComponent
      },
      {
        path: 'storeProduct/storeQuote',
        component: StoreQuoteBydateComponent
      },
      
      {
        path: 'storeMeetingPlace',
        component: StoreMeetingPlaceComponent
      },
      {
        path: 'storeTermsManage',
        component: StoreTermsManagementComponent
      },
    ]
  }
];
