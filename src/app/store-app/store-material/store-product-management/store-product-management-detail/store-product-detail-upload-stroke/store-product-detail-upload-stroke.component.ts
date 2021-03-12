import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-product-detail-upload-stroke',
  templateUrl: './store-product-detail-upload-stroke.component.html',
  styleUrls: ['./store-product-detail-upload-stroke.component.css']
})
export class StoreProductDetailUploadStrokeComponent implements OnInit {
  @Input() dataDetailModel: any;

  constructor() { }

  ngOnInit(): void {
  }

}
