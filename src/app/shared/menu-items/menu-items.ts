import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'admin', type: 'link', name: '管理员账号模块', icon: 'view_headline' },
  { state: 'store', type: 'link', name: '店铺管理模块', icon: 'view_list' },
  { state: 'storeAccount', type: 'link', name: '店铺账号管理模块', icon: 'view_headline' },
  { state: 'storeBankAccount', type: 'link', name: '店铺银行账号管理模块', icon: 'view_headline' }

];


export interface StoreMenu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const StoreMENUITEMS = [
  { state: 'admin', type: 'link', name: 'Admin', icon: 'view_headline' }
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }


  getStoreMenuitem(): StoreMenu[] {
    return StoreMENUITEMS;
  }
}
