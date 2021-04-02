import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-certication',
  templateUrl: './store-certication.component.html',
  styleUrls: ['./store-certication.component.css']
})
export class StoreCerticationComponent implements OnInit {
  isIndex = 0;     //tab的index
  selectedTabIndex = 0;    //选中的tab 默认第一个


  detailModel: any;
  is_approve: any;

  constructor() { }

  ngOnInit(): void {
    this.detailModel = JSON.parse(localStorage.getItem("storeAccountDetail")!);
    this.is_approve = this.detailModel?.store?.is_approve;
  }


  onTabChange(event: any) {
    this.selectedTabIndex = event;
    console.log("this.selectedTabIndex", this.selectedTabIndex);
    console.log(' this.is_approve11111 ',  this.is_approve);
  }



  getTabIndex(event: any) {
    // 获取子组件传回来的index
    console.log("子组件传过来的值", event)
    this.is_approve = event.is_approve;
    this.selectedTabIndex = event.tabIndex;
  }
}
