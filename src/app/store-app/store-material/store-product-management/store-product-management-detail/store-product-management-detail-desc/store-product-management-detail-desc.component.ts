import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-product-management-detail-desc',
  templateUrl: './store-product-management-detail-desc.component.html',
  styleUrls: ['./store-product-management-detail-desc.component.css']
})
export class StoreProductManagementDetailDescComponent implements OnInit {
  dataSource: any[] = [];   //1.4将数据添加到dataSource
  page = 1;
  per_page = 20;
  total = 1;
  checked = false;


  constructor() { }

  ngOnInit(): void {
  }


  changePageSize(per_page: number) {
    this.per_page = per_page;
    // this.getProductList();
  }

  changePageIndex(page: number) {
    console.log("当前页", page);
    this.page = page;
    // this.getProductList();
  }

  onItemChecked(id: number, checked: boolean): void {
    // this.updateCheckedSet(id, checked);
    // this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    // this.listOfCurrentPageData.filter(({ disabled }) => !disabled).forEach(({ id }) => this.updateCheckedSet(id, checked));
    // this.refreshCheckedStatus();
  }


  nextTab(){}

}
