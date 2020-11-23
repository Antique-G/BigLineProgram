import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreLoginComponent } from './store-login.component';

const routes: Routes = [

  {
    path: '',
    component: StoreLoginComponent,
    children: [
      {
        path: 'login',
        component: StoreLoginComponent
      },
  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreLoginRoutingModule { }
