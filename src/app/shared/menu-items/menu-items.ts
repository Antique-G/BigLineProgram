import { Injectable } from '@angular/core';

export interface Menu {
    title: string;
    icon: string;
    permission_name: string;
    children: Menus[]
}

export interface Menus {
    state: string;
    name: string;
    permission_name: string;
}


const MENUITEMS = [
    {
        title: '系统设置模块', icon: 'setting', permission_name: 'system_admin',
        children: [
            { state: 'adminAccount', name: '管理员账号', permission_name: 'system_account' },
            { state: 'adminStoreManage', name: '门店管理', permission_name: 'system_store_mangement' },
            { state: 'adminPermission', name: '权限管理', permission_name: 'system_permission' },
            { state: 'adminRole', name: '角色管理', permission_name: 'system_role' }

        ]
    },
    {
        title: '店铺模块', icon: 'appstore', permission_name: 'shop_admin',
        children: [{ state: 'store', name: '店铺管理', permission_name: 'store_mangement_admin' },
        ]
    },
    {
        title: '产品模块', icon: 'project', permission_name: 'admin_product',
        children: [
            { state: 'productTag', name: '产品标签', permission_name: 'product_tag' },
            { state: 'productManagement', name: '跟团游管理', permission_name: 'product_group_mange' },
            { state: 'freeTravel', name: "自由行管理", permission_name: 'product_independent' },
            { state: 'preFree', name: '自由行预售', permission_name: 'indent_product_presell' }
        ]
    },
    {
        title: '订单模块', icon: 'ordered-list', permission_name: 'admin_order',
        children: [
            { state: 'orderList', name: '团列表', permission_name: 'order_group_list' },
            { state: 'groupTravelOrder', name: '跟团游订单列表', permission_name: 'order_group_product' },
            { state: 'freeTravelOrder', name: '自由行订单列表', permission_name: 'order_indent_product' },
            { state: 'addGroupOrder', name: '跟团游添加订单', permission_name: 'order_add_group_order' },
            { state: 'addFreeOrder', name: '自由行添加订单', permission_name: 'order_add_indent_order' },
            { state: 'refund', name: '订单退款处理', permission_name: 'order_refund' },
            { state: 'refundReview', name: '订单审核退款', permission_name: 'order_refund_check' },
            { state: 'refundTurnOver', name: '订单退款流水列表', permission_name: 'order_refund_log' },
        ]
    },
    {
        title: '佣金模块', icon: 'pound', permission_name: 'admin_dist',
        children: [
            { state: 'userCommission', name: '用户分销佣金', permission_name: 'dist_user_dist' },
            // { state: 'commissionWithdraw', name: '提现列表' },
            { state: 'userMoneyLog', name: '金额变动记录', permission_name: 'dist_money_log' }
        ]
    },
    {
        title: '条款管理', icon: 'file', permission_name: 'admin_terms',
        children: [
            { state: 'termsManage', name: '条款审核', permission_name: 'terms_check' },
            { state: 'termTemplate', name: '条款模板', permission_name: 'terms_template' }
        ]
    },
    {
        title: '导游管理模块', icon: 'flag', permission_name: 'admin_guide',
        children: [{ state: 'adminTourist', name: '导游列表', permission_name: 'guide_list' }]
    },

    {
        title: '区域模块', icon: 'environment', permission_name: 'admin_product_region',
        children: [
            { state: 'settingArea', name: '区域', permission_name: 'system_region' },
            { state: 'customerService', name: '区域客服', permission_name: 'region_region_service' }
        ]
    },

    {
        title: '用户管理', icon: 'user', permission_name: 'admin_user_mangement',
        children: [
            { state: 'saleTitle', name: '销售头衔', permission_name: 'user_sale_title' },
            { state: 'user', name: '用户信息', permission_name: 'user_user_list' },
        ]
    },
    {
        title: '保险管理', icon: 'safety-certificate', permission_name: 'admin_insurance',
        children: [
            { state: 'insurance', name: '保险', permission_name: 'insurance_list' },
            // { state: 'insuranceHistory', name: '保险购买记录' },

        ]
    },

    {
        title: '小程序模块', icon: 'wechat', permission_name: 'admin_mini_config',
        children: [
            { state: 'pageConfig', name: '页面设置', permission_name: 'mini_config_page' },
        ]
    },
    {
        title: '财务模块', icon: 'account-book', permission_name: 'admin_financial',
        children: [
            { state: 'financeGroupTravel', name: '跟团游订单列表', permission_name: 'financial_group_order' },
            { state: 'financefreeDTravel', name: '自由行订单列表', permission_name: 'financial_freedom_order' },
        ]
    },
    // {
    //   title: '其他', icon: 'compass', permission_name: 'admin_financial' ,
    //   children: [
    //     { state: 'lottery', name: '抽奖活动' , permission_name: 'financial_group_order' },
    //   ]
    // },


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
            { state: 'storeFreeTravel', name: '自由行' },
            { state: 'storePreFree', name: '自由行预售' }
        ]
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
        title: '集合地点', icon: 'environment',
        children: [{ state: 'storeMeetingPlace', name: '集合地点' }]
    },
    {
        title: '条款管理模块', icon: 'file',
        children: [{ state: 'storeTermsManage', name: '条款管理' }]
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
