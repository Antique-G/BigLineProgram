import { Routes } from '@angular/router';
import { FullComponent } from '../layouts/full/full.component';
import { AdminStoreAccountComponent } from './admin-store-account/admin-store-account.component';
import { AdminStoreBankAccountComponent } from './admin-store-bank-account/admin-store-bank-account.component';
import { AdminStoreComponent } from './admin-store/admin-store.component';
import { AdminComponent } from './admin/admin.component';

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
      
    ]
  }
];
