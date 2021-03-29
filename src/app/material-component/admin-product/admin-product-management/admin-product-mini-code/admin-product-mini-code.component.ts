import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { AdminProductManagementService } from '../../../../../services/admin/admin-product-management.service';

@Component({
  selector: 'app-admin-product-mini-code',
  templateUrl: './admin-product-mini-code.component.html',
  styleUrls: ['./admin-product-mini-code.component.css']
})
export class AdminProductMiniCodeComponent implements OnInit {
  @Input() data: any;
  addForm!: FormGroup;
  product_id: any;
  product_type: any;
  imgUrl: any;
  isShow = false;
  isLoadingBtn = false;


  constructor(public fb: FormBuilder, public adminProductManagementService: AdminProductManagementService) {
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
    this.adminProductManagementService.getProductMiniCode(this.product_id, this.product_type).subscribe(res => {
      console.log('res :>> ', res);
      this.imgUrl = res?.image;
      this.isShow = true;
      this.isLoadingBtn = false;
    })
  }
}
