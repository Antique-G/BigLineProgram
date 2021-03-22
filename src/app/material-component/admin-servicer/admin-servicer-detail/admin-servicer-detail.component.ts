import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { AdminServicerService } from '../../../../services/admin/admin-servicer.service';
import { AdminRegionServiceModel } from '../../../../interfaces/admin-servicer/admin-servicer-model';

@Component({
  selector: 'app-admin-servicer-detail',
  templateUrl: './admin-servicer-detail.component.html',
  styleUrls: ['./admin-servicer-detail.component.css']
})
export class AdminServicerDetailComponent implements OnInit {
  isSpinning = false;
  addForm!: FormGroup;
  nzOptions: any[] | null = null;  // 城市
  idRegion: any;
  adminRegionServiceModel: AdminRegionServiceModel;
  @Input() data: any;
  destinationPalce: any[] = [];


  constructor(public fb: FormBuilder, public adminServicerService: AdminServicerService) {
    this.addForm = fb.group({
      region_code: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      contact_name: [''],
    });
    this.adminRegionServiceModel = {
      region_code: '',
      phone: '',
      contact_name: '',
      id:''
    }
  }

  ngOnInit(): void {
    this.adminServicerService.getAllRegionList().subscribe(res => {
      this.nzOptions = res;
      const strDest = this.data.region_code;
      for (let i = 0; i < strDest.length / 4; i++) {
        let temp = this.destinationPalce[i] || '' + strDest.substr(0, 4 * (i + 1))
        this.destinationPalce.push(temp);
      }
      this.addForm.get('region_code')?.setValue(this.destinationPalce);   //区域
      this.addForm.get('phone')?.setValue(this.data.phone);
      this.addForm.get('contact_name')?.setValue(this.data.contact_name);
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
    this.adminRegionServiceModel.id = this.data.id;
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {
      this.adminServicerService.updateRegionService(this.adminRegionServiceModel).subscribe(res => {

      },
        error => {

        })
    }
  }
}