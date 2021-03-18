import { Routes } from '@angular/router';
import { FullComponent } from '../layouts/full/full.component';
import { AdminStoreAccountComponent } from './admin-store-account/admin-store-account.component';
import { AdminStoreBankAccountComponent } from './admin-store-bank-account/admin-store-bank-account.component';
import { AdminStoreComponent } from './admin-store/admin-store.component';
import { AdminSystemAreaComponent } from './admin-system-area/admin-system-area.component';
import { AdminComponent } from './admin/admin.component';
import { AdminProductTagComponent } from './admin-product/admin-product-tag/admin-product-tag.component';
import { AdminProductManagementComponent } from './admin-product/admin-product-management/admin-product-management.component';
import { AdminProductManagementDetailComponent } from './admin-product/admin-product-management/admin-product-management-detail/admin-product-management-detail.component';
import { AdminTermsManageComponent } from './admin-terms-manage/admin-terms-manage.component';
import { AdminProducFreeTravelComponent } from './admin-product/admin-produc-free-travel/admin-produc-free-travel.component';
import { AdminProductFreeTravelDetailComponent } from './admin-product/admin-produc-free-travel/admin-product-free-travel-detail/admin-product-free-travel-detail.component';
import { AdminTermTemplateComponent } from './admin-term-template/admin-term-template.component';
import { AdminProductFreeTravelQutedateComponent } from './admin-product/admin-produc-free-travel/admin-product-free-travel-qutedate/admin-product-free-travel-qutedate.component';
import { AdminProductQutedateComponent } from './admin-product/admin-product-management/admin-product-qutedate/admin-product-qutedate.component';
import { AdminTermTemplateCreateComponent } from './admin-term-template/admin-term-template-create/admin-term-template-create.component';
import { AdminTermTemplateEditComponent } from './admin-term-template/admin-term-template-edit/admin-term-template-edit.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AdminSaleTitleComponent } from './admin-sale-title/admin-sale-title.component';
import { AdminInsuranceComponent } from './admin-insurance/admin-insurance.component';
import { AdminWechatPageconfigComponent } from './admin-wechat-pageconfig/admin-wechat-pageconfig.component';
import { AdminWechatPageblockComponent } from './admin-wechat-pageconfig/admin-wechat-pageblock/admin-wechat-pageblock.component';
import { AdminUserinfoComponent } from './admin-userinfo/admin-userinfo.component';
import { AdminWechatPageblockCreateComponent } from './admin-wechat-pageconfig/admin-wechat-pageblock/admin-wechat-pageblock-create/admin-wechat-pageblock-create.component';
import { AdminWechatPageblockDetailComponent } from './admin-wechat-pageconfig/admin-wechat-pageblock/admin-wechat-pageblock-detail/admin-wechat-pageblock-detail.component';
import { AdminOrderDetailComponent } from './admin-order/admin-order-detail/admin-order-detail.component';
import { AdminOrderGroupTravelComponent } from './admin-order-group-travel/admin-order-group-travel.component';
import { AdminOrderGroupTravelDetailComponent } from './admin-order-group-travel/admin-order-group-travel-detail/admin-order-group-travel-detail.component';
import { AdminOrderFreeTravelComponent } from './admin-order-free-travel/admin-order-free-travel.component';
import { AdminOrderFreeTravelDetailComponent } from './admin-order-free-travel/admin-order-free-travel-detail/admin-order-free-travel-detail.component';
import { AdminContractComponent } from './admin-contract/admin-contract.component';
import { AdminOrderGroupOrderComponent } from './admin-order-group-travel/admin-order-group-order/admin-order-group-order.component';
import { AOFreetravelOrderComponent } from './admin-order-free-travel/a-o-freetravel-order/a-o-freetravel-order.component';
import { AdminOrderRefundComponent } from './admin-order-refund/admin-order-refund.component';
import { AdminOrderRefundReviewComponent } from './admin-order-refund-review/admin-order-refund-review.component';
import { AdminOrderRefundTurnoverComponent } from './admin-order-refund-turnover/admin-order-refund-turnover.component';
import { AdminOrderRefundDetailComponent } from './admin-order-refund/admin-order-refund-detail/admin-order-refund-detail.component';
import { AdminTouristComponent } from './admin-tourist/admin-tourist.component';

export const MaterialRoutes: Routes = [

  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'adminAccount',
        component: AdminComponent,
        data: {
          breadcrumb: '管理员账号列表'
        }
      },
      {
        path: 'settingArea',
        component: AdminSystemAreaComponent,
        data: {
          breadcrumb: '区域列表'
        }
      },
      {
        path: 'store',
        component: AdminStoreComponent,
        data: {
          breadcrumb: '店铺列表'
        }
      },
      {
        path: 'store/storeAccount',
        component: AdminStoreAccountComponent,
        data: {
          breadcrumb: '店铺账号列表'
        }
      },
      {
        path: 'store/storeBankAccount',
        component: AdminStoreBankAccountComponent,
        data: {
          breadcrumb: '店铺银行账号列表'
        }
      },
      {
        path: 'productTag',
        component: AdminProductTagComponent,
        data: {
          breadcrumb: '产品标签列表'
        }
      },
      {
        path: 'productManagement',
        component: AdminProductManagementComponent,
        data: {
          breadcrumb: '产品列表'
        }
      },
      {
        path: 'productManagement/detail',
        component: AdminProductManagementDetailComponent,
        data: {
          breadcrumb: '产品详情'
        }
      },
      {
        path: 'productManagement/qutedate',
        component: AdminProductQutedateComponent,
        data: {
          breadcrumb: '跟团游报价'
        }
      },
      {
        path: 'freeTravel',
        component: AdminProducFreeTravelComponent,
        data: {
          breadcrumb: '自由行列表'
        }
      },
      {
        path: 'freeTravel/detail',
        component: AdminProductFreeTravelDetailComponent,
        data: {
          breadcrumb: '自由行详情'
        }
      },
      {
        path: 'freeTravel/qutedate',
        component: AdminProductFreeTravelQutedateComponent,
        data: {
          breadcrumb: '自由行报价'
        }
      },
      {
        path: 'termsManage',
        component: AdminTermsManageComponent,
        data: {
          breadcrumb: '条款列表'
        }
      },
      {
        path: 'termTemplate',
        component: AdminTermTemplateComponent,
        data: {
          breadcrumb: '条款模板列表'
        }
      },
      {
        path: 'termTemplate/create',
        component: AdminTermTemplateCreateComponent,
        data: {
          breadcrumb: '条款模板添加'
        }
      },
      {
        path: 'termTemplate/detail',
        component: AdminTermTemplateEditComponent,
        data: {
          breadcrumb: '条款模板详情'
        }
      },
      {
        path: 'orderList',
        component: AdminOrderComponent,
        data: {
          breadcrumb: '团订单列表'
        }
      },
      {
        path: 'orderList/detail',
        component: AdminOrderDetailComponent,
        data: {
          breadcrumb: '团订单详情'
        }
      },
      {
        path: 'groupTravelOrder',
        component: AdminOrderGroupTravelComponent,
        data: {
          breadcrumb: '跟团游订单列表'
        }
      },
      {
        path: 'groupTravelOrder/adminOrdergroupTravelAddOrder',
        component: AdminOrderGroupOrderComponent,
        data: {
          breadcrumb: '添加订单内容'
        }
      },
      {
        path: 'groupTravelOrder/detail',
        component: AdminOrderGroupTravelDetailComponent,
        data: {
          breadcrumb: '跟团游订单详情'
        }
      },
      {
        path: 'freeTravelOrder',
        component: AdminOrderFreeTravelComponent,
        data: {
          breadcrumb: '自由行订单列表'
        }
      },
      {
        path: 'freeTravelOrder/detail',
        component: AdminOrderFreeTravelDetailComponent,
        data: {
          breadcrumb: '自由行订单详情'
        }
      },
      {
        path: 'freeTravelOrder/order',
        component: AOFreetravelOrderComponent,
        data: {
          breadcrumb: '添加订单内容'
        }
      },
      {
        path: 'refund',
        component: AdminOrderRefundComponent,
        data: {
          breadcrumb: '订单退款列表'
        }
      },
      {
        path: 'refund/detail',
        component: AdminOrderRefundDetailComponent,
        data: {
          breadcrumb: '订单退款记录详情页面'
        }
      },
      {
        path: 'refundReview',
        component: AdminOrderRefundReviewComponent,
        data: {
          breadcrumb: '订单退款审核'
        }
      },
      {
        path: 'refundTurnOver',
        component: AdminOrderRefundTurnoverComponent,
        data: {
          breadcrumb: '订单退款流水列表'
        }
      },
      
      {
        path: 'adminTourist',
        component: AdminTouristComponent,
        data: {
          breadcrumb: '导游列表'
        }
      },


      {
        path: 'saleTitle',
        component: AdminSaleTitleComponent,
        data: {
          breadcrumb: '销售头衔列表'
        }
      },
      {
        path: 'insurance',
        component: AdminInsuranceComponent,
        data: {
          breadcrumb: '保险管理列表'
        }
      },
      {
        path: 'user',
        component: AdminUserinfoComponent,
        data: {
          breadcrumb: '用户信息列表'
        }
      },



      {
        path: 'pageConfig',
        component: AdminWechatPageconfigComponent,
        data: {
          breadcrumb: '小程序页面设置列表'
        }
      },
      {
        path: 'pageBlock',
        component: AdminWechatPageblockComponent,
        data: {
          breadcrumb: '小程序页面模块设置列表'
        }
      },
      {
        path: 'pageBlock/create',
        component: AdminWechatPageblockCreateComponent,
        data: {
          breadcrumb: '小程序页面模块设置添加'
        }
      },
      {
        path: 'pageBlock/detail',
        component: AdminWechatPageblockDetailComponent,
        data: {
          breadcrumb: '小程序页面模块设置修改'
        }
      },
      {
        path: 'contract',
        component: AdminContractComponent,
        data: {
          breadcrumb: '合同列表'
        }
      },
    ]
  }
];
