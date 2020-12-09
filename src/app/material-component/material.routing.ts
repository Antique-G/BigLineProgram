import { Routes } from '@angular/router';
import { FullComponent } from '../layouts/full/full.component';
import { AdminStoreAccountComponent } from './admin-store-account/admin-store-account.component';
import { AdminStoreBankAccountComponent } from './admin-store-bank-account/admin-store-bank-account.component';
import { AdminStoreComponent } from './admin-store/admin-store.component';
import { AdminSystemAreaComponent } from './admin-system-area/admin-system-area.component';
import { AdminComponent } from './admin/admin.component';
import {AdminProductTagComponent} from './admin-product/admin-product-tag/admin-product-tag.component';
import { AdminProductManagementComponent } from './admin-product/admin-product-management/admin-product-management.component';

export const MaterialRoutes: Routes = [

  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'admin',
        component: AdminComponent
      },
      {
        path: 'settingArea',
        component: AdminSystemAreaComponent,
      },
      {
        path: 'store',
        component: AdminStoreComponent
      },
      {
        path: 'storeAccount',
        component: AdminStoreAccountComponent
      },
      {
        path: 'storeBankAccount',
        component: AdminStoreBankAccountComponent
      },
      {
        path: 'productTag',
        component: AdminProductTagComponent
      },
      {
        path: 'productManagement',
        component: AdminProductManagementComponent
      },
      
     

      
    ]
  }
];
