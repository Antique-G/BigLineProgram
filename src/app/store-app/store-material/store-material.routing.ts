import { Routes } from '@angular/router';
import { FullComponent } from '../../../app/layouts/full/full.component';
import { StoreAdminComponent } from './store-admin/store-admin.component';
import { StoreProductManagementComponent } from './store-product-management/store-product-management.component';


export const StoreMaterialRoutes: Routes = [

  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'admin',
        component: StoreAdminComponent
      },
      
      {
        path: 'storeProduct',
        component: StoreProductManagementComponent
      },
      // {
      //   path: 'tabs',
      //   component: TabsComponent
      // },
      // {
      //   path: 'button',
      //   component: ButtonsComponent
      // }
    ]
  }
];
