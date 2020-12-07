import { AdminStoreAccountService } from './../../../services/admin/admin-store-account.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminStoreAccountCreateComponent } from './admin-store-account-create/admin-store-account-create.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminStoreAccountDetailComponent } from './admin-store-account-detail/admin-store-account-detail.component';



@Component({
  selector: 'app-admin-store-account',
  templateUrl: './admin-store-account.component.html',
  styleUrls: ['./admin-store-account.component.css']
})
export class AdminStoreAccountComponent implements OnInit {  //导出类AdminStoreAccountComponen实现OnInit
  
  nameForm: FormGroup;  //2.1 实例化一个时FormGroup，传入子控件的集合作为第一个参数。每个子项（每个input都有FormControl）的键都会注册控件的名称。
<<<<<<< HEAD
=======

  dataSource = [];   //1.4接收数据的参数
  store_id : any ;
  
  // adminStoreAccountListRequestModel:AdminStoreAccountListRequestModel;  //引入定义的店铺的账号列表请求参数模块

>>>>>>> ee292d55b188e1221b88fb00bbd7a33ff2fb8806

  dataSource = [];   //1.4接收数据的参数
  store_id : any ;
  
  displayedColumns:string[] = ['account_id','name','mobile','email','status','action'];   //1.3每个列需要渲染的行内容
<<<<<<< HEAD
=======
  
  
  
  // dialogRef: any;    //弹出框组件接收数据类型
>>>>>>> ee292d55b188e1221b88fb00bbd7a33ff2fb8806
 
  constructor(public dialog: MatDialog, public fb:FormBuilder, public adminStoreAccountService:AdminStoreAccountService) { 
    this.nameForm = fb.group({  //2.2 跟踪一组FormControl实例的值和有效性状态验证
      store_id: ['',[Validators.required]]
    })
  }

  ngOnInit(): void {

  }

  //打开(创建商铺帐号)对话框
  add(){  
    const dialogRef = this.dialog.open(AdminStoreAccountCreateComponent, {
      width: '550px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result === 1){
<<<<<<< HEAD
        this.search();    //创建店铺成功后传回结果为1时调用search()更新页面展示数据
=======
        this.search();
>>>>>>> ee292d55b188e1221b88fb00bbd7a33ff2fb8806
      }
    });
  }

<<<<<<< HEAD
  //搜索帐号列表
  search(): void{  
    this.store_id = this.nameForm.value.store_id  //输入的帐号id赋值给接口请求参数帐号id
    console.log("获取表单输入的帐号id", this.store_id);
=======

  //搜索帐号列表
  search(): void{  
    this.store_id = this.nameForm.value.store_id  //输入的帐号id赋值给接口请求参数帐号id
    console.log("获取表单输入值", this.store_id);
>>>>>>> ee292d55b188e1221b88fb00bbd7a33ff2fb8806
    this.adminStoreAccountService.storeAccountList(this.store_id).subscribe((result: any) => {
      console.log("接口返回什么结果呀", result.data)
      this.dataSource = result.data;

    })
  }


  //打开(商铺帐号详情编辑)对话框
<<<<<<< HEAD
  edit(element:any):void{
=======
  edit(e:any):void{
>>>>>>> ee292d55b188e1221b88fb00bbd7a33ff2fb8806
    const dialogRef =this.dialog.open(AdminStoreAccountDetailComponent,{
      width: '550px',
      data: element
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        console.log('The dialog was closed');
      }
    })
  }

}


