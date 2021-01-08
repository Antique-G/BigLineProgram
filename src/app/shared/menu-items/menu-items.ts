import { Injectable } from '@angular/core';

export interface Menu {
  title: string;
  icon: string;
  children: Menus[]
}

export interface Menus {
  state: string;
  name: string;
}


const MENUITEMS = [
  {
    title: '系统设置模块', icon: 'user',
    children: [{ state: 'adminAccount', name: '管理员账号' }
    ]
  },
  {
    title: '店铺模块', icon: 'appstore',
    children: [{ state: 'store', name: '店铺管理' },
    ]
  },
  {
    title: '产品模块', icon: 'project',
    children: [
      { state: 'productTag', name: '产品标签' },
      { state: 'productManagement', name: '跟团游管理' },
      { state: 'freeTravel', name: "自由行管理" }
    ]
  },
  {
    title: '区域模块', icon: 'environment',
    children: [
      { state: 'settingArea', name: '区域' }
    ]
  },
  {
    title: '条款管理', icon: 'file',
    children: [
      { state: 'termsManage', name: '条款审核' },
      // { state: 'termTemplate', name: '条款模板' }
    ]
  },

];


export interface StoreMenu {
  title: string;
  icon: string;
  children: StoreMenus[]
}

export interface StoreMenus {
  state: string;
  name: string;
}

const StoreMENUITEMS = [
  {
    title: '产品模块', icon: 'project',
    children: [
      { state: 'storeProduct', name: '跟团游' },
      { state: 'storeFreeTravel', name: '自由行' }
    ]
  },
  {
    title: '集合地点', icon: 'environment',
    children: [{ state: 'storeMeetingPlace', name: '集合地点' }]
  },
  {
    title: '条款管理模块', icon: 'file',
    children: [{ state: 'storeTermsManage', name: '条款管理' }]
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
