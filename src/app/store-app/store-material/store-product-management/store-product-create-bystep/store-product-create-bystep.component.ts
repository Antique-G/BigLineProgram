import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreProductService } from '../../../../../services/store/store-product/store-product.service';

@Component({
  selector: 'app-store-product-create-bystep',
  templateUrl: './store-product-create-bystep.component.html',
  styleUrls: ['./store-product-create-bystep.component.css']
})
export class StoreProductCreateBystepComponent implements OnInit {
  isIndex = 0;     //tab的index
  selectedTabIndex = 0;    //选中的tab 默认第一个
  infoId: any;

  addDataDetailModel: any;
  isId: any;
  isShowId = true;
  productName: any;


  constructor(public fb: FormBuilder, public storeProductService: StoreProductService,) {

  }

  ngOnInit(): void {
  }


  onTabChange(event: any) {
    this.selectedTabIndex = event;
    console.log("this.selectedTabIndex", this.selectedTabIndex)
    if (this.selectedTabIndex === 0) {
      this.getOneTab();
    }

  }

  getOneTab() {
    this.isId = this.infoId;
    if (this.isId === undefined) {
      this.isShowId = true;
    }
    else {
      this.isShowId = false;
    }
  }



  getTabIndex(event: any) {
    // 获取子组件传回来的index
    console.log("子组件传过来的值", event)
    this.selectedTabIndex = event.tabIndex;
    this.isIndex = event.tabIndex;
    this.infoId = event.id;
    this.getProductDetail();
  }


  getProductDetail() {
    this.storeProductService.getProductDetail(this.infoId).subscribe(res => {
      this.addDataDetailModel = res.data;
      this.productName = this.addDataDetailModel?.title;
      localStorage.setItem("few_days", this.addDataDetailModel.few_days);
      console.log('父组件', this.addDataDetailModel);
    })
  }

}
