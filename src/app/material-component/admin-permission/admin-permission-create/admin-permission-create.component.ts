import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddPermissionRequestModel } from '../../../../interfaces/adminPermission/admin-permission-model';
import { AdminPermissionService } from '../../../../services/admin/admin-permission.service';

@Component({
  selector: 'app-admin-permission-create',
  templateUrl: './admin-permission-create.component.html',
  styleUrls: ['./admin-permission-create.component.css']
})
export class AdminPermissionCreateComponent implements OnInit {
  addForm!: FormGroup;
  parentData:any;
  addPermissionRequestModel: AddPermissionRequestModel

 

  constructor(public fb: FormBuilder, public adminPermissionService:AdminPermissionService,) { 
    this.forms();
    this.addPermissionRequestModel = {
      controller: '',
      action: '',
      pid: '',
      display_name: '',
      description: '',
    }
  }

  forms() {
    this.addForm = this.fb.group({
      controller: ['', [Validators.required]],
      action: ['',[Validators.required]],
      pid: ['',],
      display_name: ['',[Validators.required]],
      description: ['',]
    })
  }
  ngOnInit(): void {
    this.adminPermissionService.permissionParentList().subscribe((result: any) => {
        console.log("权限父级列表接口返回什么", result);
        this.parentData =result.data
      });
  }

  

 

  setValue() {
    console.log('this.addForm.value',this.addForm.value)
    this.addPermissionRequestModel.controller = this.addForm.value.controller;
    this.addPermissionRequestModel.action = this.addForm.value.action;
    if (this.addForm.value.pid !== "") {
      this.addPermissionRequestModel.pid = this.addForm.value.pid;
    }else {
      this.addPermissionRequestModel.pid = "0";
    }
    this.addPermissionRequestModel.display_name = this.addForm.value.display_name;
    this.addPermissionRequestModel.description = this.addForm.value.description;
  }
  submitForm() {
    this.setValue();
    console.log('this.addPermissionRequestModel',this.addPermissionRequestModel)
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {
      this.adminPermissionService.addPermission(this.addPermissionRequestModel).subscribe(res => {
        console.log("res结果", res);
        // if (res.message) {
        //   // alert("创建成功");

        // }
        // else {
        //   // alert("创建失败，请重新填写");
        // }
      })

    }
  }
}
