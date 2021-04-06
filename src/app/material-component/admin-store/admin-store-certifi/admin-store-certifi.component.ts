import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminStoreService } from '../../../../services/admin/admin-store.service';

@Component({
  selector: 'app-admin-store-certifi',
  templateUrl: './admin-store-certifi.component.html',
  styleUrls: ['./admin-store-certifi.component.css']
})
export class AdminStoreCertifiComponent implements OnInit {
  isIndex = 0;     //tab的index
  selectedTabIndex = 0;    //选中的tab 默认第一个
  detailModel: any;
  is_approve = 0;

  constructor(public activatedRoute: ActivatedRoute, public adminStoreService: AdminStoreService) { }

  ngOnInit(): void {
    this.detailModel = JSON.parse(localStorage.getItem("certification")!);
    this.is_approve = Number(localStorage.getItem("certifiApprove"));
  }


  onTabChange(event: any) {
    this.selectedTabIndex = event;
  }



  getTabIndex(event: any) {
    // 获取子组件传回来的index
    console.log("子组件传过来的值", event);
    this.selectedTabIndex = event.tabIndex;
  }
}
