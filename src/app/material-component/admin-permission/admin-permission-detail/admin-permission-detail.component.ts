import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PermissionDetailtModel, UpdatePermissionRequestModel } from '../../../../interfaces/adminPermission/admin-permission-model';
import { AdminPermissionService } from '../../../../services/admin/admin-permission.service';

@Component({
  selector: 'app-admin-permission-detail',
  templateUrl: './admin-permission-detail.component.html',
  styleUrls: ['./admin-permission-detail.component.css']
})
export class AdminPermissionDetailComponent implements OnInit {
  validateForm!: FormGroup;
  parentData:any;
  permissionDetailtModel!: PermissionDetailtModel;
  updatePermissionRequestModel: UpdatePermissionRequestModel

  @Input() data:any;
  constructor(public fb: FormBuilder, public adminPermissionService:AdminPermissionService,) { 
    
    this.validateForm = this.fb.group({
      controller: ['', [Validators.required]],
      action: ['', [Validators.required]],
      display_name: ['', [Validators.required]],
      pid: ['',],
      description: ['',]
    });
    this.updatePermissionRequestModel = {
      controller: '',
      action: '',
      display_name: '',
      pid: '',
      description: '',
    }
  }

  ngOnInit(): void {
    this.permissionDetailtModel = this.data;
    this.adminPermissionService.permissionParentList().subscribe((result: any) => {
      console.log("权限父级列表接口返回什么", result);
      this.parentData =result.data
    });
    
  }

  setValue() {
    this.updatePermissionRequestModel.controller = this.validateForm.value.controller;
    this.updatePermissionRequestModel.action = this.validateForm.value.action;
    this.updatePermissionRequestModel.display_name = this.validateForm.value.display_name;
    this.updatePermissionRequestModel.pid = this.validateForm.value.pid;
    this.updatePermissionRequestModel.description = this.validateForm.value.description;
    this.updatePermissionRequestModel.id = this.permissionDetailtModel.id;
  
  }

  update(){
    this.setValue();
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if ( this.validateForm.valid ) {

      this.adminPermissionService.updatePermission(this.updatePermissionRequestModel).subscribe(res => {
        console.log('res结果',res)
        if (res === null) {

        } else {
          
        }
      })
    }
  }
}

