import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminRegionService } from '../../../../services/admin/admin-region.service';


const options = [
  {
    value: '浙江',
    label: '浙江',
    children: [
      {
        value: '杭州',
        label: '杭州',
        children: [
          {
            value: '西湖',
            label: '西湖',
            isLeaf: true
          }
        ]
      },
      {
        value: '宁波',
        label: '宁波',
        isLeaf: true
      }
    ]
  },
  {
    value: '广东',
    label: '广东',
    children: [
      {
        value: '深圳',
        label: '深圳',
        children: [
          {
            value: '南山区',
            label: '南山区',
            isLeaf: true
          }
        ]
      }
    ]
  }
];

@Component({
  selector: 'app-admin-store-create',
  templateUrl: './admin-store-create.component.html',
  styleUrls: ['./admin-store-create.component.css']
})
export class AdminStoreCreateComponent implements OnInit {

  nzOptions: any[] | null = null;
  values: any[] | null = null;


  validateForm!: FormGroup;
  status = '1';

  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<AdminStoreCreateComponent>,
    public adminRegionService: AdminRegionService) {
  }

  ngOnInit(): void {
   this.adminRegionService.getAllRegionList().subscribe(res=>{
     console.log("结果是",res);
   })

    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      regionCode: [{ value: '' }, [Validators.required]],
      address: [null, [Validators.required]],
      fax: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      status: [null, [Validators.required]]
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  onChanges(values: any): void {
    console.log(values, this.values);
  }



  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }
}
