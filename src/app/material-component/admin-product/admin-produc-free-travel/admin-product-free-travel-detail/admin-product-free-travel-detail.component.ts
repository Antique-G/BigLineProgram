import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataFreeTravelDetailModel } from '../../../../../interfaces/adminProduct/free-travel-model';
import { AdminProductFreeTravelService } from '../../../../../services/admin/admin-product-free-travel.service';

@Component({
  selector: 'app-admin-product-free-travel-detail',
  templateUrl: './admin-product-free-travel-detail.component.html',
  styleUrls: ['./admin-product-free-travel-detail.component.css']
})
export class AdminProductFreeTravelDetailComponent implements OnInit {
  isIndex = 0;     //tab的index
  selectedTabIndex = 0;    //选中的tab 默认第一个
  detailId: any;
  dataFreeDetailModel!: DataFreeTravelDetailModel;
  productName: any;


  constructor(public fb: FormBuilder, public adminProductFreeTravelService: AdminProductFreeTravelService,
    public activatedRoute: ActivatedRoute,) {

  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.detailId = params?.detailId;
    });
    this.getDetail();
  }


  // 查看详情的接口
  getDetail() {
    this.adminProductFreeTravelService.freeTravelDetail(this.detailId).subscribe(res => {
      console.log('详情拿到的model', res);
      this.dataFreeDetailModel = res.data;
      this.productName=this.dataFreeDetailModel?.title;
      localStorage.setItem("few_days", res.data.few_days.toString());

    })
  }


  onTabChange(event: any) {
    this.selectedTabIndex = event;
    this.getDetail();
  }






}

