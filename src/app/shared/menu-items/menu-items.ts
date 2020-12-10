import { Injectable } from '@angular/core';

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
    header: '系统设置模块',
    menulist: [{ state: 'adminAccount', type: 'link', name: '管理员账号', icon: 'view_headline' }
    ]
  },
  {
    header: '店铺模块',
    menulist: [{ state: 'store', type: 'link', name: '店铺管理', icon: 'view_list' },
    // { state: 'storeAccount', type: 'link', name: '店铺账号管理', icon: 'view_headline' },
    // { state: 'storeBankAccount', type: 'link', name: '店铺银行账号管理', icon: 'view_headline' }
    ]
  },
  {
    header: '产品模块',
    menulist: [
      { state: 'productTag', type: 'link', name: '产品标签', icon: 'view_headline' },
      { state: 'productManagement', type: 'link', name: '产品管理', icon: 'view_headline' },
    ]
  },
  {
    header: '区域模块',
    menulist: [
      { state: 'settingArea', type: 'link', name: '区域', icon: 'view_headline' }
    ]
  },
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
    storeHeader: '产品模块',
    storeMenulist: [
      { state: 'storeProduct', type: 'link', name: '产品管理', icon: 'view_headline' },

    ]
  },
  {
    storeHeader: '集合地点',
    storeMenulist: [{ state: 'storeMeetingPlace', type: 'link', name: '集合地点', icon: 'view_headline' }]
  },
  {
    storeHeader: '条款管理模块',
    storeMenulist: [{ state: 'storeTermsManage', type: 'link', name: '条款管理', icon: 'view_headline' }]
  },


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
