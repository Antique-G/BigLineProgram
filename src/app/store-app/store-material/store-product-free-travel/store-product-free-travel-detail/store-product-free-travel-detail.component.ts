import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-product-free-travel-detail',
  templateUrl: './store-product-free-travel-detail.component.html',
  styleUrls: ['./store-product-free-travel-detail.component.css']
})
export class StoreProductFreeTravelDetailComponent implements OnInit {
  isIndex = 0;     //tab的index
  selectedTabIndex = 0;    //选中的tab 默认第一个
  constructor() { }

  ngOnInit(): void {
  }

  
  onTabChange(event: any) {
    this.selectedTabIndex = event;
  }

}
