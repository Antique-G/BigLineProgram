import { Routes } from '@angular/router';
import { FullComponent } from '../../../app/layouts/full/full.component';
import { StoreMeetingPlaceComponent } from './store-meeting-place/store-meeting-place.component';
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
        path: 'storeQuote',
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
