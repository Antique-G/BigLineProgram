import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { StoreProductService } from '../../../../../services/store/store-product/store-product.service';


@Component({
  selector: 'app-store-product-mini-code',
  templateUrl: './store-product-mini-code.component.html',
  styleUrls: ['./store-product-mini-code.component.css']
})
export class StoreProductMiniCodeComponent implements OnInit {
    @Input() data: any;
    addForm!: FormGroup;
    product_id: any;
    product_type: any;
    imgUrl: any;
    isShow = false;
    isLoadingBtn = false;
  
  
    constructor(public fb: FormBuilder, public storeProductService: StoreProductService) {
      this.addForm = this.fb.group({
        title: [''],
      })
    }
  
    ngOnInit(): void {
      console.log('object :>> ', this.data);
      this.product_id = this.data[0].id;
      this.product_type = this.data[1];
    }
  
  
  
    getCode() {
      this.isLoadingBtn = true;
      this.storeProductService.getStoreProductMiniCode(this.product_id, this.product_type).subscribe(res => {
        console.log('res :>> ', res);
        this.imgUrl = res?.image;
        this.isShow = true;
        this.isLoadingBtn = false;
      },
      error => {
          this.isLoadingBtn = false;
      })
    }
  }
  