import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreLoginComponent } from './store-login.component';
import { StoreLoginRoutingModule } from './store-login-routing.module';


@NgModule({
  declarations: [StoreLoginComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreLoginRoutingModule,
  
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class StoreLoginModule { }
