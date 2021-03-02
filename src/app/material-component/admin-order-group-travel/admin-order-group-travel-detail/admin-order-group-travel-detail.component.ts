import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminOrderGroupTravelService } from '../../../../services/admin/admin-order-group-travel.service';
import { DetailsModel } from '../../../../interfaces/store/storeOrder/store-order-group-travel-model';
import { format } from 'date-fns';



@Component({
  selector: 'app-admin-order-group-travel-detail',
  templateUrl: './admin-order-group-travel-detail.component.html',
  styleUrls: ['./admin-order-group-travel-detail.component.css']
})
export class AdminOrderGroupTravelDetailComponent implements OnInit {
  public isSpinning = false;
  addForm!: FormGroup;
  detailId: any;
  detailModel!: DetailsModel;
  dataMember: any;
  isAssemblinTime: any;



  constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute, public router: Router,
    public adminOrderGroupTravelService: AdminOrderGroupTravelService,private modal: NzModalService) {
    this.addForm = this.fb.group({
      order_id: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      assembling_place: ['', [Validators.required]],
      assembling_time: ['', [Validators.required]],
      contact_name: ['', [Validators.required]],
      contact_phone: ['', [Validators.required]],
    });
  
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log("params", params)
      this.detailId = JSON.parse(params["detailId"]);
      // 详情
      this.adminOrderGroupTravelService.getgroupTravelDetail(this.detailId).subscribe(res => {
        console.log("结果是", res);
        this.detailModel = res.data;
        this.dataMember = res.data?.member?.data;
        if (this.detailModel?.assembling_time === '00:00:00') {
          this.isAssemblinTime = '待定';
        }
        else {
          let i='2021-01-01'+' '+ this.detailModel?.assembling_time;
          let newDate= new Date(i);
          console.log('object :>> ', newDate,i);
          this.isAssemblinTime =format(new Date(newDate), 'HH:mm');
        }
      })
    });
  }






}

