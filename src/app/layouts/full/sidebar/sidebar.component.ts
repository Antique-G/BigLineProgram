import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../../../shared/menu-items/menu-items';
import { AdminLoginService } from '../../../../services/admin-login/admin-login.service';
import { Router } from '@angular/router';
import { StoreLoginService } from '../../../../services/store/store-login/store-login.service';
import { MatDialog } from '@angular/material/dialog';
import { AccountDetailComponent } from '../../../../app/material-component/admin-common/account-detail/account-detail.component';
import { AdminAdminService } from '../../../../services/admin/admin-admin.service';
import { StoreAccountDetailComponent } from '../../../../app/store-app/store-material/common/store-account-detail/store-account-detail.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})

export class AppSidebarComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  public pathName: any;

  userName: any;
  mobile: any;


  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    public adminLoginService: AdminLoginService, public router: Router, public adminAdminService: AdminAdminService,
    public storeLoginService: StoreLoginService,
    public dialog: MatDialog
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }


  ngOnInit(): void {
    // console.log('url地址', location)
    // console.log('获取值', location.pathname);
    this.pathName = (location.pathname).slice(1, 6);
    // console.log("this.pathName",this.pathName);
    this.userName = localStorage.getItem("account");
    this.mobile = localStorage.getItem("mobile");
  }


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  logOut() {
    this.adminLoginService.logout().subscribe(res => {
      this.adminLoginService.removeToken();
      localStorage.removeItem('account');
      localStorage.removeItem('adminId');
      this.router.navigate(['/admin/login']);
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
    })
  }


  accountDetail() {
    this.adminAdminService.accountDetail(localStorage.getItem('adminId')).subscribe(res => {
      if (res) {
        const dialogRef = this.dialog.open(AccountDetailComponent, {
          width: '550px',
          data: res
        });
        dialogRef.afterClosed().subscribe(result => {
        });
      }

    })

  }


  storeAccountDetail() {
    const dialogRef = this.dialog.open(StoreAccountDetailComponent, {
      width: '550px',
      
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
