import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-product-free-travel-detail',
  templateUrl: './admin-product-free-travel-detail.component.html',
  styleUrls: ['./admin-product-free-travel-detail.component.css']
})
export class AdminProductFreeTravelDetailComponent implements OnInit {
  isIndex = 0;     //tab的index
  selectedTabIndex = 0;    //选中的tab 默认第一个


  constructor(public fb: FormBuilder,) {

  }

  ngOnInit(): void {
  }


  onTabChange(event: any) {
    this.selectedTabIndex = event;
  }



  // getTabIndex(event: any) {
  //   // 获取子组件传回来的index
  //   console.log("子组件传过来的值", event)
  //   this.selectedTabIndex = event;
  //   this.isIndex = event;
  // }


}

