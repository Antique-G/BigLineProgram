import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-store-product-desc',
  templateUrl: './store-product-desc.component.html',
  styleUrls: ['./store-product-desc.component.css']
})
export class StoreProductDescComponent implements OnInit {
  @Output() tabIndex = new EventEmitter;     //往父组件穿下一个tab值



  constructor() { }

  ngOnInit(): void {
  }


  nextTab(){
    this.tabIndex.emit(2)
  }
}
