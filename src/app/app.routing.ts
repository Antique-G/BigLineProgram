import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  {
    path: 'admin/login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule), data : { title : "管理后台" }
  },
  {
    path: 'admin/main',
    loadChildren:
    () => import('./material-component/material.module').then(m => m.MaterialComponentsModule), data : { title : "管理后台" }
  },
  {
    path: 'store',
    loadChildren:
    () => import('./store-app/store-login/store-login.module').then(m => m.StoreLoginModule), data : { title : "店铺平台" }
  },
  {
    path: '',
    redirectTo: 'admin/login',
    pathMatch: 'full'
  }
];
