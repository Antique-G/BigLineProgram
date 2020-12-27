import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-store-product-create-bystep',
  templateUrl: './store-product-create-bystep.component.html',
  styleUrls: ['./store-product-create-bystep.component.css']
})
export class StoreProductCreateBystepComponent implements OnInit {
  iscolor = "Primary";
  isbackgroundColor = "Primary"

  isIndex = 0;     //tab的index
  selectedTabIndex = 0;    //默认第一个tab
  tabIndexFirst: any;     //第一个tab传回来的值1


  constructor(public fb: FormBuilder,) {

  }

  ngOnInit(): void {
  }


  onTabChange(event: any) {
    this.selectedTabIndex = event;
  }



  getTabIndex(event: any) {
    this.tabIndexFirst = event;
    this.selectedTabIndex = this.tabIndexFirst;
    this.isIndex = event;
    console.log("子组件传过来的值",event)
  }


}
