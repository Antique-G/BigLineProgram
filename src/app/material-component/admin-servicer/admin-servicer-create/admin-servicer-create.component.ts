import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AdminServicerService } from '../../../../services/admin/admin-servicer.service';
import { AdminRegionServiceModel } from '../../../../interfaces/admin-servicer/admin-servicer-model';

@Component({
  selector: 'app-admin-servicer-create',
  templateUrl: './admin-servicer-create.component.html',
  styleUrls: ['./admin-servicer-create.component.css']
})
export class AdminServicerCreateComponent implements OnInit {
  isSpinning = false;
  addForm!: FormGroup;
  nzOptions: any[] | null = null;  // 城市
  idRegion: any;
  adminRegionServiceModel: AdminRegionServiceModel;

  constructor(public fb: FormBuilder, public adminServicerService: AdminServicerService) {
    this.addForm = fb.group({
      region_code: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      contact_name: [''],
    });
    this.adminRegionServiceModel = {
      region_code: '',
      phone: '',
      contact_name: ''
    }
  }

  ngOnInit(): void {
    this.adminServicerService.getAllRegionList().subscribe(res => {
      this.nzOptions = res;
    })
  }



  onDestChange(data: any): void {
    console.log("点击的结果是", data);
    if (data !== null) {
      this.idRegion = data[data.length - 1];
    }
  }

  setValue() {
    this.adminRegionServiceModel.region_code = this.idRegion;
    this.adminRegionServiceModel.contact_name = this.addForm.value.contact_name;
    this.adminRegionServiceModel.phone = this.addForm.value.phone;
  }


  add() {
    this.setValue();
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {
      this.adminServicerService.addRegionService(this.adminRegionServiceModel).subscribe(res=>{

      },
      error=>{

      })
    }
  }
}
