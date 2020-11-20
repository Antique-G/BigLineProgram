import { Routes } from '@angular/router';

import { ButtonsComponent } from './buttons/buttons.component';
import { MenuComponent } from './menu/menu.component';
import { TabsComponent } from './tabs/tabs.component';

export const MaterialRoutes: Routes = [
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
];
