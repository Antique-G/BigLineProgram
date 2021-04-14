import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataProductDetailModel } from '../../../../../interfaces/adminProduct/product-management-model';
import { AdminProductManagementService } from '../../../../../services/admin/admin-product-management.service';

@Component({
  selector: 'app-admin-product-management-detail',
  templateUrl: './admin-product-management-detail.component.html',
  styleUrls: ['./admin-product-management-detail.component.css']
})
export class AdminProductManagementDetailComponent implements OnInit {
  selectedTabIndex = 0;    //选中的tab 默认第一个

  detailId: any;
  adminProductDetailModel!: DataProductDetailModel;
  productName: any;


  constructor(public fb: FormBuilder, public adminProductManagementService: AdminProductManagementService,
    public activatedRoute: ActivatedRoute,) {

  }


  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.detailId = params?.detailDataId;
    });
    this.getProductDetail();
  }


  getProductDetail() {
    this.adminProductManagementService.productDetail(this.detailId).subscribe(res => {
      this.adminProductDetailModel = res.data;
      this.productName = this.adminProductDetailModel?.title;
      localStorage.setItem("few_days", res.data.few_days.toString());
      console.log('父组件', this.adminProductDetailModel);
    })
  }



  onTabChange(event: any) {
    this.selectedTabIndex = event;
    this.getProductDetail();
  }





}


