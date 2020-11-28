import { Injectable } from '@angular/core';
import { MenuService } from 'ng-zorro-antd/menu';

export interface Menu {
  header: string;
  menulist: Menus[];
}

export interface Menus {
  state: string;
  name: string;
  type: string;
  icon: string;
}


const MENUITEMS = [
  {
    header: '管理员账号模块',
    menulist: [{ state: 'admin', type: 'link', name: '管理员账号列表', icon: 'view_headline' }]
  },
  {
    header: '店铺模块',
    menulist: [{ state: 'store', type: 'link', name: '店铺管理', icon: 'view_list' },
    { state: 'storeAccount', type: 'link', name: '店铺账号管理', icon: 'view_headline' },
    { state: 'storeBankAccount', type: 'link', name: '店铺银行账号管理', icon: 'view_headline' }
    ]
  }
];


export interface StoreMenu {
  storeHeader: string;
  storeMenulist: StoreMenus[];
}

export interface StoreMenus {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const StoreMENUITEMS = [
  {
    storeHeader: '店铺页面',
    storeMenulist: [{ state: 'admin', type: 'link', name: 'Admin', icon: 'view_headline' }]
  }
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
