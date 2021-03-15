import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { StoreProductTreeTravelService } from '../../../../services/store/store-product-free-travel/store-product-tree-travel.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { format } from 'date-fns';


@Component({
  selector: 'app-store-product-free-travel',
  templateUrl: './store-product-free-travel.component.html',
  styleUrls: ['./store-product-free-travel.component.css']
})
export class StoreProductFreeTravelComponent implements OnInit {
  searchForm: FormGroup;
  checkStatus: any;
  title: any;
  few_days: any;
  few_nights: any;
  code: any;
  status: any;

  dataSource: any[] = [];   //1.4将数据添加到dataSource
  loading = true;
  page = 1;
  per_page = 20;
  total = 1;

  
  newDay: any
  newHour: any;
  newMin: any;

  isEar: any;

  constructor(public fb: FormBuilder, private freeTrvelService: StoreProductTreeTravelService, public router: Router,
    public dialog: MatDialog, private modal: NzModalService) {
    this.searchForm = this.fb.group({
      checkStatus: [''],
      title: [''],
      few_days: [''],
      few_nights: [''],
      code: [''],
      status: [''],

    })
  }


  ngOnInit(): void {
    this.getProductList();
  }


  getProductList() {
    this.loading = true;
    this.freeTrvelService.GetFreeTravelList(this.page, this.per_page, this.checkStatus, this.title, this.few_days, this.few_nights, this.code, this.status).subscribe(res => {
      this.loading = false;
      console.log("结果是", res);
      this.total = res.total;   //总页数
      this.dataSource = res.data;

    })
  }

  changePageSize(per_page: number) {
    this.per_page = per_page;
    this.getProductList();
  }

  changePageIndex(page: number) {
    console.log("当前页", page);
    this.page = page;
    this.getProductList();
  }

  search() {
    this.checkStatus = this.searchForm.value.checkStatus;
    this.title = this.searchForm.value.title;
    this.few_days = this.searchForm.value.few_days;
    this.few_nights = this.searchForm.value.few_nights;
    this.code = this.searchForm.value.code;
    this.status = this.searchForm.value.status;
    this.getProductList();

  }

  // 审核
  checkStatusClick(data: any) {
    this.modal.confirm({
      nzTitle: '<h5>请确认操作?</h5>',
      nzContent: '提交审核',
      nzOnOk: () => {
        this.freeTrvelService.checkStatusFreeTravel(data.id, 1).subscribe(res => {
          console.log(res);
          this.getProductList();
        })
      }
    });
  }

  // 撤销审核
  revokeStatus(data: any) {
    this.modal.confirm({
      nzTitle: '<h5>请确认操作?</h5>',
      nzContent: '撤销审核',
      nzOnOk: () => {
        this.freeTrvelService.checkStatusFreeTravel(data.id, 0).subscribe(res => {
          console.log(res);
          this.getProductList();
        })
      }
    });
  }


  // 添加
  addProduct() {
    this.router.navigate(['/store/main/storeFreeTravel/create']);
  }


  // 查看详情
  edit(data: any) {
    this.router.navigate(['/store/main/storeFreeTravel/detail'], { queryParams: { detailId: data.id } });
  }


  // 报价
  goToQuoteClick(data: any) {
    console.log('data', data);
    // 处理时间，预计多久报名
    let minutes =data.earlier;
    this.newMin = Math.floor(minutes % 60);
    if (this.newMin === 0) {
      this.newHour = Math.floor(24 - minutes / 60 % 24);
    }
    else if (this.newMin != 0) {
      this.newMin = 60 - this.newMin;
      this.newHour = Math.floor(24 - minutes / 60 % 24);
    }
    this.newDay = format(new Date(), 'HH');
    console.log('2423423', this.newHour, new Date(), this.newMin, this.newDay, this.newHour <= this.newDay)
    if (this.newHour <= this.newDay) {
      this.isEar = Math.floor(minutes / 60 / 24) + 1;
    }
    else {
      this.isEar = Math.floor(minutes / 60 / 24);
    }
    this.router.navigate(['/store/main/storeFreeTravel/storeQuote'], { queryParams: { productId: data.id, type: 'freeTravel', earlier: this.isEar, proName: data.title } });
  }


  // 上下架操作
  up(data: any) {
    console.log("nadao", data);
    this.modal.confirm({
      nzTitle: '<h4>提示</h4>',
      nzContent: '<h6>请确认操作</h6>',
      nzOnOk: () =>
        this.freeTrvelService.UpDownFreeTravel(data.id).subscribe(res => {
          this.getProductList();
        })
    });
  }


}
