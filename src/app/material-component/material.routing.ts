import { Routes } from '@angular/router';
import { FullComponent } from '../layouts/full/full.component';
import { AdminStoreComponent } from './admin-store/admin-store.component';
import { AdminComponent } from './admin/admin.component';
import { TabsComponent } from './tabs/tabs.component';

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
        path: 'tabs',
        component: TabsComponent
      },
      
    ]
  }
];
