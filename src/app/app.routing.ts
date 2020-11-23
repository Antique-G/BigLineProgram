import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './login/login.component';

export const AppRoutes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'main',
    loadChildren:
    () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
