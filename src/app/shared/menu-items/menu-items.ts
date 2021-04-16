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
    children: [
      { state: 'adminAccount', name: '管理员账号' },
      { state: 'adminStoreManage', name: '门店管理' },
      // { state: 'adminSchedule', name: '排班管理' },

      // { state: 'adminPermission', name: '管理权限' }
      // { state: 'adminRole', name: '角色' }
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
      { state: 'orderList', name: '团列表' },
      { state: 'groupTravelOrder', name: '跟团游订单列表' },
      { state: 'freeTravelOrder', name: '自由行订单列表' },
      { state: 'addGroupOrder', name: '跟团游添加订单' },
      { state: 'addFreeOrder', name: '自由行添加订单' },
      { state: 'refund', name: '订单退款处理' },
      { state: 'refundReview', name: '订单审核退款' },
      { state: 'refundTurnOver', name: '订单退款流水列表' },
    ]
  },
  {
    title: '佣金模块', icon: 'pound',
    children: [
      { state: 'userCommission', name: '用户分销佣金' },
      // { state: 'commissionWithdraw', name: '提现列表' },
      { state: 'userMoneyLog', name: '金额变动记录' }
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
    title: '导游管理模块', icon: 'flag',
    children: [{ state: 'adminTourist', name: '导游列表' }]
  },

  {
    title: '区域模块', icon: 'environment',
    children: [
      { state: 'settingArea', name: '区域' },
      { state: 'customerService', name: '区域客服' }
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
      // { state: 'insuranceHistory', name: '保险购买记录' },

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
    title: '订单管理模块', icon: 'ordered-list',
    children: [
      { state: 'storeOrderGroup', name: '团订单列表' },
      { state: 'storeOrdergroupTravel', name: '跟团游订单列表' },
      { state: 'storeOrderFreeTravel', name: '自由行订单列表' },
      { state: 'storeRefund', name: '订单退款记录列表' },
      { state: 'storeRefundTurnOver', name: '订单退款流水' },
    ]
  },
  {
    title: '合同管理', icon: 'file',
    children: [
      { state: 'storeContract', name: '合同' },

    ]
  },
  {
    title: '账户管理', icon: 'user',
    children: [
      { state: 'storeCertification', name: '账户信息' },
    ]
  },

];

// 未认证

const DisStoreMenu = [
  {
    title: '账户管理', icon: 'user',
    children: [
      { state: 'storeCertification', name: '账户信息' },
    ]
  },
]

@Injectable()
export class MenuItems {

  getMenuitem(): Menu[] {
    return MENUITEMS;
  }


  getStoreMenuitem(): StoreMenu[] {
    return StoreMENUITEMS;
  }


  // 未认证
  getDisStoreMenu(): StoreMenu[] {
    return DisStoreMenu;
  }
}
