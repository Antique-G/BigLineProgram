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
  children: any[] = [];
  permission: any;

  addRoleRequestModel: AddRoleRequestModel

  constructor(public fb: FormBuilder, public adminRoleService:AdminRoleService) {
    
    this.addForm = this.fb.group({
      name: ['',[Validators.required]],
      display_name: ['',[Validators.required]],
      description: ['',]
    })
    this.addRoleRequestModel = {
      name: '',
      display_name: '',
      description: '',
      permission: '',
    }
  }

  ngOnInit(): void {
    this.treeNodes();
  }

  treeNodes(){
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
        
        // arrs.map(((item, index)=>{
        //   if (index === 0){
        //      item.expanded= true;
        //   }
        // }))
      }
      
      this.nodes = arrs
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
    this.addRoleRequestModel.name = this.addForm.value.name;
    this.addRoleRequestModel.display_name = this.addForm.value.display_name;
    this.addRoleRequestModel.description = this.addForm.value.description;
    this.addRoleRequestModel.permission = this.permission;
    

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
        console.log("res结果", res);
       
      })

    }
  }

}
