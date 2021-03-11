import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StoreProductService } from '../../../../../services/store/store-product/store-product.service';

@Component({
  selector: 'app-store-product-management-detail',
  templateUrl: './store-product-management-detail.component.html',
  styleUrls: ['./store-product-management-detail.component.css']
})
export class StoreProductManagementDetailComponent implements OnInit {
  selectedTabIndex = 0;    //选中的tab 默认第一个
  infoId: any;
  detailId: any;
  dataDetailModel: any;


  constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute,
    public storeProductService: StoreProductService,) {

  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.detailId = JSON.parse(params["detailDataId"]);
    });
    this.getProductDetail();
  }


  getProductDetail() {
    this.storeProductService.getProductDetail(this.detailId).subscribe(res => {
      this.dataDetailModel = res.data;
      console.log('父组件', this.dataDetailModel);
      console.log('几天的值', this.dataDetailModel.few_days);
      localStorage.setItem("few_days", this.dataDetailModel.few_days);
    })
  }


  onTabChange(event: any) {
    this.selectedTabIndex = event;
    this.getProductDetail();
  }



}
