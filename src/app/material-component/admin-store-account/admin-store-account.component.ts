import { Pagination } from './../../../interfaces/store/storeTermsManagement/store-terms-management-model';
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

  dataSource = [];   //1.4接收数据的参数
  page = 1;    //页数，默认设置为1
  per_page = 10;   //每页显示数据数量，默认设置为10
  total = 1;   //总页数，默认设置为1
  loading = false;   //loading动画
  store_id : any ;  //商户id
  
  // adminStoreAccountListRequestModel:AdminStoreAccountListRequestModel;  //引入定义的店铺的账号列表请求参数模块
  
  // displayedColumns:string[] = ['account_id','name','mobile','email','status','action'];   //1.3每个列需要渲染的行内容
  
  
  
  // dialogRef: any;    //弹出框组件接收数据类型
 
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
        this.search();    //创建店铺成功后传回结果为1时调用search()更新页面展示数据
      }
    });
  }

  //搜索帐号列表
  search(): void{  
    this.loading = true;
    this.store_id = this.nameForm.value.store_id  //输入的帐号id赋值给接口请求参数帐号id
    console.log("获取搜索表单输入值", this.store_id);
    this.adminStoreAccountService.storeAccountList(this.store_id, this.page, this.per_page).subscribe((result: any) => {
      this.loading = false;
      this.total = result.meta.pagination.total;   //总页数
      console.log("搜索帐号接口返回什么列表结果呀", result.data, this.total)
      this.dataSource = result.data;

    })
  };

  changePageIndex(page: number){
    console.log("当前页", page);
    this.page = page;
    this.search()
  };
  changePageSize(per_page: number) {
    console.log("一页显示多少条数据", per_page);
    this.per_page = per_page;
    this.search();
  }

  //打开(商铺帐号详情编辑)对话框
  edit(element:any):void{
    const dialogRef =this.dialog.open(AdminStoreAccountDetailComponent,{
      width: '550px',
      data: element
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('修改成功返回的结果',result)
      if (result === 1){
        this.search();    //创建店铺成功后传回结果为1时调用search()更新页面展示数据
        console.log("页面刷新成功")
      }
    })
  }

}


