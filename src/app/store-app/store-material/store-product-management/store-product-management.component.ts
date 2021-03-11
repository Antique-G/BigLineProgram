import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreProductService } from '../../../../services/store/store-product/store-product.service';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-store-product-management',
  templateUrl: './store-product-management.component.html',
  styleUrls: ['./store-product-management.component.css']
})

export class StoreProductManagementComponent implements OnInit {
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
  total: any;

  isReason: any;


  constructor(public fb: FormBuilder, public storeProductService: StoreProductService, public router: Router,
    private modal: NzModalService) {
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
    this.storeProductService.getProduct(this.page, this.per_page, this.checkStatus, this.title, this.few_days, this.few_nights, this.code, this.status).subscribe(res => {
      this.loading = false;
      console.log("11111", res);
      this.total = res.meta.pagination.total;   //总页数
      console.log("页码", this.total);
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

  // 查看详情
  edit(data: any) {
    this.router.navigate(['/store/main/storeProduct/detail'], { queryParams: { detailDataId: data.id } });
  }

  // 提交审核
  checkStatusClick(data: any) {
    this.modal.confirm({
      nzTitle: '<h5>请确认操作?</h5>',
      nzContent: '提交审核',
      nzOnOk: () => {
        this.storeProductService.checkStatusFreeTravel(data.id, 1).subscribe(res => {
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
        this.storeProductService.checkStatusFreeTravel(data.id, 0).subscribe(res => {
          console.log(res);
          this.getProductList();
        })
      }
    });
  }


  // 报价
  goToQuoteClick(data: any) {
    console.log('data', data);
    this.storeProductService.getProductDetail(data.id).subscribe(res => {
      console.log("结果是", res.data.id, res.data.earlier)
      let ear = Math.floor(res.data.earlier / 60 / 24);
      this.router.navigate(['/store/main/storeProduct/storeQuote'], { queryParams: { productId: res.data.id, type: 'management', earlier: ear, proName: data.title } });
    })
  }


  // 上下架操作
  up(data: any) {
    console.log("nadao", data);
    this.modal.confirm({
      nzTitle: '<h4>提示</h4>',
      nzContent: '<h6>请确认操作</h6>',
      nzOnOk: () =>
        this.storeProductService.patchProductStatus(data.id).subscribe(res => {
          this.getProductList();
        })
    });
  }




  addStep() {
    this.router.navigate(['/store/main/storeProduct/createByStep']);
  }



  // 审核日志
  viewLog(data: any) {
    this.storeProductService.checkLog(data.id).subscribe(res => {
      console.log("122", res);
      console.log("24452", res[0]);
      this.isReason = res[0]?.reason;
    })
  }
}
