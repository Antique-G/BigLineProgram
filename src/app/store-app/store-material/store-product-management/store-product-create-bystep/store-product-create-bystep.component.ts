import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-store-product-create-bystep',
  templateUrl: './store-product-create-bystep.component.html',
  styleUrls: ['./store-product-create-bystep.component.css']
})
export class StoreProductCreateBystepComponent implements OnInit {
  isIndex = 0;     //tab的index
  selectedTabIndex = 0;    //选中的tab 默认第一个
  infoId: any;

  constructor(public fb: FormBuilder,) {

  }

  ngOnInit(): void {
  }


  onTabChange(event: any) {
    this.selectedTabIndex = event;
  }



  getTabIndex(event: any) {
    // 获取子组件传回来的index
    console.log("子组件传过来的值", event)
    this.selectedTabIndex = event.tabIndex;
    this.isIndex = event.tabIndex;
    this.infoId = event.id;

  }


}
