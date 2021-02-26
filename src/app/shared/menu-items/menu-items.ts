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
    title: '系统设置模块', icon: 'setting',
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
    title: '订单模块', icon: 'ordered-list',
    children: [
      { state: 'orderList', name: '团订单列表' },
      { state: 'groupTravelOrder', name: '跟团游订单列表' },
      { state: 'freeTravelOrder', name: '自由行订单列表' },
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
      { state: 'termTemplate', name: '条款模板' }
    ]
  },
  {
    title: '用户管理', icon: 'user',
    children: [
      { state: 'saleTitle', name: '销售头衔' },
      { state: 'user', name: '用户信息' },
    ]
  },
  {
    title: '保险管理', icon: 'safety-certificate',
    children: [
      { state: 'insurance', name: '保险' },
      
    ]
  },
  {
    title: '合同管理', icon: 'file',
    children: [
      { state: 'contract', name: '合同' },
   
    ]
  },
  {
    title: '小程序模块', icon: 'wechat',
    children: [
      { state: 'pageConfig', name: '页面设置' },
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
  {
    title: '导游管理模块', icon: 'flag',
    children: [{ state: 'storeTourist', name: '导游列表' }]
  },
  {
    title: '订单管理模块', icon: 'ordered-list',
    children: [
      { state: 'storeOrderGroup', name: '团订单列表' },
      { state: 'storeOrdergroupTravel', name: '跟团游订单列表' },
      { state: 'storeOrderFreeTravel', name: '自由行订单列表' },
    ]
  },
  {
    title: '合同管理', icon: 'file',
    children: [
      { state: 'storeContract', name: '合同' },
   
    ]
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
