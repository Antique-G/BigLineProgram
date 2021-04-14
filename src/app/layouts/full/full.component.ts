import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StoreAccountDetailComponent } from '../../../app/store-app/store-material/common/store-account-detail/store-account-detail.component';
import { AdminLoginService } from '../../../services/admin-login/admin-login.service';
import { AdminAdminService } from '../../../services/admin/admin-admin.service';
import { StoreLoginService } from '../../../services/store/store-login/store-login.service';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { AdminChangePasswordComponent } from '../../../app/material-component/admin/admin-change-password/admin-change-password.component';
import { StoreApplyService } from '../../../services/store/store-apply/store-apply.service';


// 面包屑
interface IBreadcrumb {
  label: string;
  params: Params;
  url: string;
}

/** @title Responsive sidenav */
@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  styleUrls: ['full.component.css']
})


export class FullComponent implements OnInit {
  public breadcrumbs: IBreadcrumb[] = [];

  isCollapsed = false;
  public pathName: any;
  userName: any;
  mobile: any;
  // 认证
  is_approve = 0;



  constructor(public menuItems: MenuItems, private modal: NzModalService,
    public router: Router, private activatedRoute: ActivatedRoute,
    public adminLoginService: AdminLoginService, public adminAdminService: AdminAdminService,
    public storeLoginService: StoreLoginService, public storeApplyService: StoreApplyService) {
    this.breadcrumbs = [];
  }

  ngOnInit(): void {
    const root: ActivatedRoute = this.activatedRoute.root;
    this.breadcrumbs = this.getBreadcrumbs(root);
  
    this.pathName = (location.pathname).slice(1, 6);
    this.userName = localStorage.getItem("account");
    this.mobile = localStorage.getItem("mobile");

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      const root: ActivatedRoute = this.activatedRoute.root;
      // console.log('切换路由后', root);
      this.breadcrumbs = this.getBreadcrumbs(root);
    });

    console.log('this.pathName111111 :>> ', this.pathName);
    if (this.pathName === 'store') {
      // 认证状态
      this.storeApplyService.storeDetail().subscribe(res => {
        this.is_approve = Number(res?.store?.is_approve);

        // 将供应商的类型存到缓存中
        localStorage.setItem("supplierType",res?.store?.type.toString());
      
      })
    }


  }






  logOut() {
    this.adminLoginService.logout().subscribe(res => {
      this.adminLoginService.removeToken();
      localStorage.removeItem('account');
      localStorage.removeItem('adminId');
      this.router.navigate(['/admin/login']);
      window.localStorage.clear(); //清除缓存
    })
  }


  storeLogOut() {
    this.storeLoginService.storeLogout().subscribe(res => {
      console.log("jieguo ", res);
      this.adminLoginService.removeToken();
      localStorage.removeItem('mobile');
      localStorage.removeItem('storeRegion');
      localStorage.removeItem('lastRegion');
      localStorage.removeItem('storeAccountId');
      this.router.navigate(['/store/login']);
      window.localStorage.clear(); //清除缓存
    })
  }


  accountDetail() {
    const addmodal = this.modal.create({
      nzTitle: '修改密码',
      nzContent: AdminChangePasswordComponent,
      nzFooter: [
        {
          label: '提交',
          type: 'primary',
          onClick: componentInstance => {
            componentInstance?.update()
          }
        }
      ]
    })
    addmodal.afterClose.subscribe((res: any) => {
    })

  }


  storeAccountDetail() {
    const addmodal = this.modal.create({
      nzTitle: '修改密码',
      nzContent: StoreAccountDetailComponent,
      nzFooter: [
        {
          label: '提交',
          type: 'primary',
          onClick: componentInstance => {
            componentInstance?.update()
          }
        }
      ]
    })
    addmodal.afterClose.subscribe((res: any) => {
    })

  }



  /**
  * 返回表示面包屑的IBreadcrumb对象的数组
  */
  getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadcrumb[] = []): any {
    const ROUTE_DATA_BREADCRUMB = 'breadcrumb';
    const children: ActivatedRoute[] = route.children;     // 得到子路由
    // console.log('=== 有多少子路由 ===', children);
    // 如果没有子路由返回
    if (children.length === 0) {
      // console.log('=== janine.没有子路由是 ===', breadcrumbs);
      return breadcrumbs;
    }

    // 遍历每个子元素
    for (const child of children) {
      // 验证主路由
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }
      // 验证路由上指定的自定义数据属性'breadcrumb'
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      // 获取路由的URL进行分割
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      // append route URL to URL 追加路由的url到url
      if (routeURL) {
        // console.log('=== janine.routeURL ===', routeURL);
        url += `/${routeURL}`;
      }

      // 添加面包屑
      const breadcrumb: IBreadcrumb = {
        label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        params: child.snapshot.params,
        url: url
      };
      // 此处的 component 如果为 undefined，可能是因为懒加载，在查找时，没有找到 component 的值，
      // 所以当 component 为 undefined 的时候，就会又往数组里再追加一次，会重复
      if (child.component) {
        breadcrumbs.push(breadcrumb);
      }
      console.log('breadcrumb是什么', breadcrumb);
      // 递归
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
  }




}


