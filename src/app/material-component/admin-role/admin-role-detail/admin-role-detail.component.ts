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

  checkedKeys:any=[];        //选中

  validateForm!: FormGroup;

  nodes: any[] = [];
  children: any[] = [];
  permission: any;
 
  @Input() data:any;
  roleDetailModel!:RoleDetailModel
  updateRoleRequestModel: UpdateRoleRequestModel

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
    this.treeNodes();
   
     
  }
  treeNodes(){
    this.adminRoleService.permissionTreeList().subscribe((result: any) => {
      console.log("权限的树状列表", result);
      
      let arrs:any[]=[];
      for (let i of result) {
        let childrenArr:any[] = [];
        for (let f of i.son) {
          let b = {title: f.display_name, key: f.id.toString(), isLeaf: true }
          childrenArr.push(b)
        }
        this.children = childrenArr;
        let a = { title: i.display_name, key: i.id.toString(),children:this.children}; // expanded: false,checked: false
        arrs.push(a);
      }
      this.nodes = arrs  //Tree
      console.log('this.nodes',this.nodes)

      let ids:any = [];
      for ( let i of this.roleDetailModel.permission){
        ids.push(i.id)
      }
      this.checkedKeys = ids;
      this.nodes.forEach((ele:any)=>{   
        if(this.checkedKeys.indexOf(Number(ele.key))!=-1){
          ele.checked=true;
          ele.expanded=true; 
        }
        ele.children.forEach((item:any)=>{
          if(this.checkedKeys.indexOf(Number(item.key))!=-1){
            item.checked=true;     
            ele.expanded=true; 
          }
        })
      })
      
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


