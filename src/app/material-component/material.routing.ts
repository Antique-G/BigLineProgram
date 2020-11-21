import { Routes } from '@angular/router';
import { FullComponent } from '../layouts/full/full.component';

import { ButtonsComponent } from './buttons/buttons.component';
import { MenuComponent } from './menu/menu.component';
import { TabsComponent } from './tabs/tabs.component';

export const MaterialRoutes: Routes = [

  {
    path: 'main',
    component: FullComponent,
    children: [
      {
        path: 'menu',
        component: MenuComponent
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
