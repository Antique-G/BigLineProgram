import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../../../shared/menu-items/menu-items';
import { AdminLoginService } from '../../../../services/admin-login/admin-login.service';
import { Router } from '@angular/router';
import { StoreLoginService } from '../../../../services/store/store-login/store-login.service';
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
    public adminLoginService: AdminLoginService, public router: Router,
    public storeLoginService: StoreLoginService
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
      // console.log("jieguo ",res);
      // alert(res.message);
      this.adminLoginService.removeToken();
      localStorage.removeItem('account');
      this.router.navigate(['/admin/login']);
    })
  }


  storeLogOut() {
    this.storeLoginService.storeLogout().subscribe(res => {
      console.log("jieguo ", res);
      // alert(res.message);
      this.adminLoginService.removeToken();
      localStorage.removeItem('mobile');
      localStorage.removeItem('storeRegion');
      localStorage.removeItem('lastRegion');
      this.router.navigate(['/store/login']);
    })
  }

}
