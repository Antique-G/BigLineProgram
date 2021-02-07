import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-product-management-detail-post',
  templateUrl: './store-product-management-detail-post.component.html',
  styleUrls: ['./store-product-management-detail-post.component.css']
})
export class StoreProductManagementDetailPostComponent implements OnInit {
  @Input() dataDetailModel: any;


  constructor() { }

  ngOnInit(): void {
  }


  upload(){}

  nextTab(){}
}
