import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreProductService } from '../../../../../services/store/store-product/store-product.service';


@Component({
  selector: 'app-store-terms-management-up',
  templateUrl: './store-terms-management-up.component.html',
  styleUrls: ['./store-terms-management-up.component.css']
})
export class StoreTermsManagementUpComponent implements OnInit {
  status: any;
  id: any;


  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<StoreTermsManagementUpComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    public storeProductService: StoreProductService) {
    console.log("返回的值", data);
    this.status = data.status;
    this.id = data.id;
  }




  ngOnInit(): void {

  }



  update() {
    this.storeProductService.patchProductStatus(this.id).subscribe(res => {
      console.log("res结果", res);
      if (res === null) {
        this.dialogRef.close(1);
      }
      else {
      }
    })
  }


  close(): void {
    this.dialogRef.close();
  }


  cancel(): void {
    this.dialogRef.close();
  }



}


