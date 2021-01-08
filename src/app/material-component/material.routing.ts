import { Routes } from '@angular/router';
import { FullComponent } from '../layouts/full/full.component';
import { AdminStoreAccountComponent } from './admin-store-account/admin-store-account.component';
import { AdminStoreBankAccountComponent } from './admin-store-bank-account/admin-store-bank-account.component';
import { AdminStoreComponent } from './admin-store/admin-store.component';
import { AdminSystemAreaComponent } from './admin-system-area/admin-system-area.component';
import { AdminComponent } from './admin/admin.component';
import {AdminProductTagComponent} from './admin-product/admin-product-tag/admin-product-tag.component';
import { AdminProductManagementComponent } from './admin-product/admin-product-management/admin-product-management.component';
import { AdminProductManagementDetailComponent } from './admin-product/admin-product-management/admin-product-management-detail/admin-product-management-detail.component';
import { AdminTermsManageComponent } from './admin-terms-manage/admin-terms-manage.component';
import { AdminProducFreeTravelComponent } from './admin-product/admin-produc-free-travel/admin-produc-free-travel.component';
import { AdminProductFreeTravelDetailComponent } from './admin-product/admin-produc-free-travel/admin-product-free-travel-detail/admin-product-free-travel-detail.component';
import { AdminTermTemplateComponent } from './admin-term-template/admin-term-template.component';
import { AdminProductFreeTravelQutedateComponent } from './admin-product/admin-produc-free-travel/admin-product-free-travel-qutedate/admin-product-free-travel-qutedate.component';

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
       
    ]
  }
];
