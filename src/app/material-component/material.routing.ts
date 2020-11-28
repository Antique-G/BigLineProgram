import { Routes } from '@angular/router';
import { FullComponent } from '../layouts/full/full.component';
import { AdminProductAreaFirstComponent } from './admin-product-area/admin-product-area-first/admin-product-area-first.component';
import { AdminProductAreaSecondComponent } from './admin-product-area/admin-product-area-second/admin-product-area-second.component';
import { AdminProductAreaComponent } from './admin-product-area/admin-product-area.component';
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
      {
        path: 'area',
        component: AdminProductAreaComponent,
      },
      {
        path: 'areaFirst',     //暂定 需修改
        component: AdminProductAreaFirstComponent
      },
      {
        path: 'areaSecond',     //暂定 需修改
        component: AdminProductAreaSecondComponent
      },
      
    ]
  }
];
