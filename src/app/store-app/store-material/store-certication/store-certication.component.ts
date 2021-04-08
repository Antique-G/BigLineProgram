import { Component, OnInit } from '@angular/core';
import { StoreApplyService } from '../../../../services/store/store-apply/store-apply.service';

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

  constructor(public storeApplyService: StoreApplyService) { }

  ngOnInit(): void {
    this.storeApplyService.storeDetail().subscribe(res => {
      console.log('1212121 ', res);
      localStorage.setItem('storeAccountDetail', JSON.stringify(res))
      localStorage.setItem('storeApprove', res?.store?.is_approve.toString());
      this.detailModel = res;
      this.is_approve = Number(res?.store?.is_approve);
    })
  }


  onTabChange(event: any) {
    this.selectedTabIndex = event;
    this.is_approve = Number(localStorage.getItem("storeApprove"));
  }



  getTabIndex(event: any) {
    // 获取子组件传回来的index
    console.log("子组件传过来的值", event)
    this.is_approve = Number(localStorage.getItem("storeApprove"));
    this.selectedTabIndex = event.tabIndex;
  }
}
