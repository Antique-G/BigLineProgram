import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { StoreProductTreeTravelService } from '../../../../services/store/store-product-free-travel/store-product-tree-travel.service';
import { NzModalService } from 'ng-zorro-antd/modal';
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

  dataSource: any[] = [];   //1.4将数据添加到dataSource
  loading = true;
  page = 1;
  per_page = 20;
  total = 1;


  constructor(public fb: FormBuilder, private freeTrvelService: StoreProductTreeTravelService, public router: Router,
    public dialog: MatDialog, private modal: NzModalService) {
    this.searchForm = this.fb.group({
      checkStatus: [''],
      title: [''],
      few_days: [''],
      few_nights: [''],
    })
  }


  ngOnInit(): void {
    this.getProductList();
  }


  getProductList() {
    this.loading = true;
    this.freeTrvelService.GetFreeTravelList(this.page, this.per_page, this.checkStatus, this.title, this.few_days, this.few_nights).subscribe(res => {
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
    this.getProductList();

  }

  checkStatusClick(data:any){
    this.modal.confirm({
      nzTitle: '<h5>请确认操作?</h5>',
      nzContent: '提交审核',
      nzOnOk: () =>{
        this.freeTrvelService.checkStatusFreeTravel(data.id,1).subscribe(res=>{
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
      let ear=Math.floor( data.earlier / 60 / 24);
      this.router.navigate(['/store/main/storeFreeTravel/storeQuote'], { queryParams: { productId: data.id, type: 'freeTravel', earlier: ear  } }); 
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
