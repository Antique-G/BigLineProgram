import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-store-product-upload-stroke',
  templateUrl: './store-product-upload-stroke.component.html',
  styleUrls: ['./store-product-upload-stroke.component.css']
})
export class StoreProductUploadStrokeComponent implements OnInit {
  @Input() addDataDetailModel: any;
 


  constructor() { }

  ngOnInit(): void {
  }

}
