import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreProductService } from '../../../../services/store/store-product/store-product.service';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-store-tourist',
  templateUrl: './store-tourist.component.html',
  styleUrls: ['./store-tourist.component.css']
})
export class StoreTouristComponent implements OnInit {
  searchForm: FormGroup;
  status: any;
  name: any;
  mobile: any;
  dataSource: any[] = [];  
  loading = true;
  page = 1;
  per_page = 20;
  total:any;
  
  constructor(public fb: FormBuilder, public storeProductService: StoreProductService, public router: Router,
    private modal: NzModalService) {
      this.searchForm = this.fb.group({
        status: ['' ],
        name: ['' ],
        mobile: ['' ]
      })
    }


  ngOnInit(): void {
  }

  getProductList() {}

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
    this.status = this.searchForm.value.status;
    this.name = this.searchForm.value.name;
    this.mobile = this.searchForm.value.mobile;
    this.getProductList();

  }

  // 查看详情
  edit(data: any) {
    this.router.navigate(['/store/main/storeProduct/detail'], { queryParams: { detailDataId: data.id } });
  }

  addStep(){}

}
