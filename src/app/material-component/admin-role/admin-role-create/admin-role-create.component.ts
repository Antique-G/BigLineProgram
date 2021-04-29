import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { AddRoleRequestModel } from '../../../../interfaces/admin-role/admin-role-model';
import { AdminRoleService } from '../../../../services/admin/admin-role.service';

@Component({
  selector: 'app-admin-role-create',
  templateUrl: './admin-role-create.component.html',
  styleUrls: ['./admin-role-create.component.css']
})
export class AdminRoleCreateComponent implements OnInit {
  addForm!: FormGroup;

  nodes: any[] = [];
  permission: any;

  addRoleRequestModel: AddRoleRequestModel

  constructor(public fb: FormBuilder, public adminRoleService:AdminRoleService) {
    
    this.addForm = this.fb.group({
      name: ['',[Validators.required]],
      display_name: ['',[Validators.required]],
      description: ['',],
      status: ['', [Validators.required]]
    })
    this.addRoleRequestModel = {
      name: '',
      display_name: '',
      description: '',
      permission: '',
      status: 1,
    }
  }

  ngOnInit(): void {
    this.treeNodes();
  }

  treeNodes(){
    this.adminRoleService.permissionTreeList().subscribe((result: any) => {
      console.log("权限的树状列表", result);
      this.nodes = result;
      for (let obj of this.nodes){
        for(let item of obj.children) {
          if (item.hasOwnProperty('children') === false) {
            item.isLeaf = true;
          }else{
            for(let i of item.children){
              if (i.hasOwnProperty('children') === false){
                i.isLeaf = true;
              }
            }
          }
        }
      }
    }); 
  }

  nzEvent(event: NzFormatEmitEvent): void {
    console.log('event.checkedKeys',event,event.checkedKeys,);
    let checkedData:any;
    checkedData = event.checkedKeys
    let checkedKeys:any[] = [];
    for (let item of checkedData){
      if( item.level === 0 ) {
        for (let i of item._children){
          for (let f of i._children) {
            checkedKeys.push(item.key,i.key,f.key)
            console.log('一级',item.key,i.key,f.key)
          }
        }
      }
      else if( item.level === 1 ){
        for (let i of item._children) {
            checkedKeys.push(item.parentNode.key,item.key,i.key)
            console.log('二级',item.parentNode.key,item.key,i.key)
        }
      }
      else if( item.level === 2 ){
        checkedKeys.push(item.key,item.parentNode.key,item.parentNode.parentNode.key)
        console.log('三级',item.key,item.parentNode.key,item.parentNode.parentNode.key)
      }
    }
    console.log('所以选中的当前和上级和上上级',checkedKeys)

    let newKeys:any[] = [];
    for (var i = 0; i < checkedKeys.length; i++) {
      for (var j = i + 1; j < checkedKeys.length; j++) {
        if (checkedKeys[i] === checkedKeys[j]) {
          i++
          j = i
        }
      }
      newKeys.push(checkedKeys[i])
    }
    console.log('去重后数组',newKeys) 
    this.permission = newKeys;
  }

  

  setValue(){
    this.addRoleRequestModel.name = this.addForm.value.name;
    this.addRoleRequestModel.display_name = this.addForm.value.display_name;
    this.addRoleRequestModel.description = this.addForm.value.description;
    this.addRoleRequestModel.permission = this.permission;
    this.addRoleRequestModel.status = this.addForm.value.status;
  }

  submitForm() {
    this.setValue();
    console.log('this.addPermissionRequestModel',this.addRoleRequestModel)
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {
      this.adminRoleService.addRole(this.addRoleRequestModel).subscribe(res => {
        console.log("添加", res);
      })
    }
  }
}
