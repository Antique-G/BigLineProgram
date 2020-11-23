import { Routes } from '@angular/router';
import { FullComponent } from '../layouts/full/full.component';
import { AdminComponent } from './admin/admin.component';

import { ButtonsComponent } from './buttons/buttons.component';
import { TabsComponent } from './tabs/tabs.component';

export const MaterialRoutes: Routes = [

  {
    path: 'main',
    component: FullComponent,
    children: [
      {
        path: 'admin',
        component: AdminComponent
      },
      {
        path: 'tabs',
        component: TabsComponent
      },
      {
        path: 'button',
        component: ButtonsComponent
      }
    ]
  }
];
