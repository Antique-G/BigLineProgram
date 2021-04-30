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

  validateForm!: FormGroup;

  nodes: any[] = [];
  permission: any;
  defaultCheckedKeys: any[] = [];
  defaultExpandedKeys: any[] = [];
 
  @Input() data:any;
  roleDetailModel!:RoleDetailModel
  updateRoleRequestModel: UpdateRoleRequestModel

  constructor(public fb: FormBuilder, public adminRoleService:AdminRoleService) {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      display_name: ['', [Validators.required]],
      description: ['',],
      status: ['', [Validators.required]]
    });
    this.updateRoleRequestModel = {
      name: '',
      display_name: '',
      description: '',
      permission: '',
      status: 1,
    }
  }

  ngOnInit(): void {
    this.roleDetailModel = this.data;
    console.log('event.roleDetailModel',this.roleDetailModel);
    this.treeNodes();
  }

  treeNodes(){
    this.adminRoleService.permissionTreeList().subscribe((result: any) => {
      let checkedId:any[] = [];
      let roleId:any[] = [];
      for ( let i of this.roleDetailModel.permission) {
        checkedId.push(i.id)
        roleId.push(i.pid)
      }
      this.defaultCheckedKeys = checkedId;   //选中
      this.defaultExpandedKeys = roleId;     //展开
      console.log("权限的树状列表", result,"选中",this.defaultCheckedKeys);
      this.nodes = result;
      for (let obj of this.nodes){
        for(let i of obj.children) {
          if (i.hasOwnProperty('children') === false) {
            i.isLeaf = true;
          }else{
            for(let f of i.children){
              if (f.hasOwnProperty('children') === false){
                f.isLeaf = true;
              };
            }
          }
        }
      }
    });
  }

  nzEvent(event: NzFormatEmitEvent): void {
  
  }

  updatKeys(){
    let updatKeys:any = [];
    for (let item of this.nodes) {
      if(item.checked == true){
        for (let i of item.children) {
          for(let f of i.children){
            updatKeys.push(item.key,i.key,f.key)
            console.log('一级',item.key,i.key,f.key)
          }
        }
      }else{
        for (let i of item.children) {
          if(i.checked == true){
            for(let f of i.children){
              updatKeys.push(item.key,i.key,f.key)
              console.log('二级',item.key,i.key,f.key)
            }
          }else{
            for(let f of i.children){
              if(f.checked == true){
                updatKeys.push(item.key,i.key,f.key)
                console.log('三级',item.key,i.key,f.key)
              }
            }
          }
        }
      }
    }
    let newKeys:any[] = [];
    for (var i = 0; i < updatKeys.length; i++) {
      for (var j = i + 1; j < updatKeys.length; j++) {
        if (updatKeys[i] === updatKeys[j]) {
          i++
          j = i
        }
      }
      newKeys.push(updatKeys[i])
    }
    console.log('去重后数组',newKeys) 
    this.permission = newKeys;
  }

  setValue(){
    this.updatKeys()
    this.updateRoleRequestModel.name = this.validateForm.value.name;
    this.updateRoleRequestModel.display_name = this.validateForm.value.display_name;
    this.updateRoleRequestModel.description = this.validateForm.value.description;
    this.updateRoleRequestModel.permission = this.permission;
    this.updateRoleRequestModel.status = this.validateForm.value.status;
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
        console.log("更新结果", res);
      })
    }
  }
}


