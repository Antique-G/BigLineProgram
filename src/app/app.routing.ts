import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  {
    path: 'store',
    loadChildren:() => import('./store-app/store-login/store-login.module').then(m => m.StoreLoginModule), 
    data : { title : "店铺平台"}
   
  },
  {
    path: 'store/main',
    loadChildren:
    () => import('./store-app/store-material/store-material.module').then(m => m.StoreMaterialComponentsModule), data : { title : "店铺平台" }
  },
  {
    path: '',
    redirectTo: 'store/login',
    pathMatch: 'full'
  },
  {
    path: 'admin/login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule), data : { title : "管理后台" }
  },
  {
    path: 'admin/main',
    loadChildren:
    () => import('./material-component/material.module').then(m => m.MaterialComponentsModule), data : { title : "管理后台" }
  },
 
];
