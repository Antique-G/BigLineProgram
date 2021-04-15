import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { RoleDetailModel, UpdateRoleRequestModel } from '../../../../interfaces/admin-role/admin-role-model';
import { AdminRoleService } from '../../../../services/admin/admin-role.service';

@Component({
  selector: 'app-admin-role-detail',
  templateUrl: './admin-role-detail.component.html',
  styleUrls: ['./admin-role-detail.component.css']
})
export class AdminRoleDetailComponent implements OnInit {

  defaultCheckedKeys = [17, 4];
  defaultSelectedKeys = [4];
  defaultExpandedKeys = [17, 4];;
  

  validateForm!: FormGroup;
  roleDetailModel!:RoleDetailModel
  updateRoleRequestModel: UpdateRoleRequestModel

  nodes: any[] = [];
  children: any[] = [];
  permission: any;

  @Input() data:any;

  constructor(public fb: FormBuilder, public adminRoleService:AdminRoleService) {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      display_name: ['', [Validators.required]],
      description: ['',]
    });
    this.updateRoleRequestModel = {
      name: '',
      display_name: '',
      description: '',
      permission: '',
    }
  }

  ngOnInit(): void {
    this.roleDetailModel = this.data;
    console.log('详情',this.roleDetailModel)
    this.adminRoleService.permissionTreeList().subscribe((result: any) => {
      console.log("权限的树状列表", result);
      let arrs:any[]=[];
      for (let i of result) {
        let childrenArr:any[] = [];
        for (let f of i.son) {
          let b = {title: f.display_name, key: f.id, isLeaf: true }
          childrenArr.push(b)
        }
        this.children = childrenArr;
        let a = { title: i.display_name, key: i.id,children:this.children};
        arrs.push(a);
      }

      this.nodes=arrs
      console.log('this.nodes',this.nodes)
      
    }); 
  }
  
  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
    
    if (event.eventName =="check") {
      
      this.permission=event.keys;
      console.log(event.keys)
    }
  }

  setValue(){
    this.updateRoleRequestModel.name = this.validateForm.value.name;
    this.updateRoleRequestModel.display_name = this.validateForm.value.display_name;
    this.updateRoleRequestModel.description = this.validateForm.value.description;
    this.updateRoleRequestModel.permission = this.permission;
    this.updateRoleRequestModel.id = this.roleDetailModel.id;

  }

  update(){
    this.setValue();
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if ( this.validateForm.valid ) {

      this.adminRoleService.updateRole(this.updateRoleRequestModel).subscribe(res => {
        console.log('res结果',res)
        if (res === null) {

        } else {
          
        }
      })
    }
  }
}


