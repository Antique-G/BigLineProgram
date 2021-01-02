import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreProductService } from '../../../../services/store/store-product/store-product.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


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


  constructor(public fb: FormBuilder, public storeProductService: StoreProductService, public router: Router,
    public dialog: MatDialog) {
    this.searchForm = this.fb.group({
      checkStatus: ['' ],
      title: ['' ],
      few_days: ['' ],
      few_nights: ['' ],
    })
  }


  ngOnInit(): void {
    this.getProductList();
  }


  getProductList() {
    this.loading = true;
    this.storeProductService.getProduct(this.page, this.per_page, this.checkStatus, this.title, this.few_days, this.few_nights).subscribe(res => {
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


  // 添加
  addProduct() {
    this.router.navigate(['/store/main/storeProduct/create']);
  }


  // 查看详情
  edit(data: any) {
    this.router.navigate(['/store/main/storeFreeTravel/detail'], { queryParams: { detailId: data.id } });
  }


  // 报价
  goToQuoteClick(data: any) {
    console.log(data);
    this.router.navigate(['/store/main/storeFreeTravel/storeQuote'], { queryParams: { productId: data.id ,type:'freeTravel'} });
  }


  up(data: any) {
    console.log("nadao", data);

  }

  down(data: any) {
    console.log("nadao", data);
  }




  addStep(){
    this.router.navigate(['/store/main/storeProduct/createByStep']);
  }

}