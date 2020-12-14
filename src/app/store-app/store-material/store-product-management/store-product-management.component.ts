import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { StoreProductService } from '../../../../services/store/store-product/store-product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-store-product-management',
  templateUrl: './store-product-management.component.html',
  styleUrls: ['./store-product-management.component.css']
})

export class StoreProductManagementComponent implements OnInit {
  dataSource: any[] = [];   //1.4将数据添加到dataSource
  loading = true;
  page = 1;
  per_page = 20;
  total = 1;


  constructor(public fb: FormBuilder, public storeProductService: StoreProductService, public router: Router) { }


  ngOnInit(): void {
    this.getProductList();
  }


  getProductList() {
    this.loading = true;
    this.storeProductService.getProduct(this.page, this.per_page).subscribe(res => {
      this.loading = false;
      console.log("结果是", res);
      this.total = res.meta.pagination.total;   //总页数
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


  // 添加
  addProduct() {
    this.router.navigate(['/store/main/storeProduct/create']);
  }


  // 查看详情
  edit(data: any) {
    this.router.navigate(['/store/main/storeProduct/detail'], { queryParams: { detailDataId: data.id } });
  }


  // 报价
  goToQuoteClick(data: any) {
    console.log(data);
    this.router.navigate(['/store/main/storeProduct/storeQuote'], { queryParams: { productId: data.id } });
  }


}
