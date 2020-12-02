import { MatTableDataSource } from '@angular/material/table';
// import { PeriodicElement } from './../admin/admin.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AdminStoreAccountCreateComponent } from './admin-store-account-create/admin-store-account-create.component';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';



export interface PeriodicElement {   //1.1导出数据接口,定义了数据类型
  name:string;
  mobile:string;
  store_id:string;
  level:string;
  status:string
}
const ELEMENT_DATA: PeriodicElement[] = [   //1.2声明一个常量数据表，传输数据
  {name:'kobin',mobile:'13011112222',store_id:'11',level:'@',status:'1'},
  {name:'anya',mobile:'13011112222',store_id:'22',level:'@',status:'0'},
  {name:'carl',mobile:'13011112222',store_id:'33',level:'@',status:'1'},
  {name:'yannie',mobile:'13011112222',store_id:'33',level:'@',status:'1'}
]

@Component({
  selector: 'app-admin-store-account',
  templateUrl: './admin-store-account.component.html',
  styleUrls: ['./admin-store-account.component.css']
})
export class AdminStoreAccountComponent implements OnInit {  //导出类AdminStoreAccountComponen实现OnInit
  
  nameForm: FormGroup;  //2.1 实例化一个时FormGroup，传入子控件的集合作为第一个参数。每个子项（每个input都有FormControl）的键都会注册控件的名称。
  
  displayedColumns:string[] = ['name','mobile','store_id','level','status'];   //1.3每个列需要渲染的行内容
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);   //1.4将数据添加到dataSource
  
  dialogRef: any;    //弹出框组件接收数据类型
  
  // @ViewChild(MatPaginator) paginator: MatPaginator | any;
  // resultslength = 0;
  // isLoadingResults = true;
  // isRateLlimitReachted = false;
  
  constructor(public dialog: MatDialog,public fb:FormBuilder) { 
    this.nameForm = fb.group({  //2.2 跟踪一组FormControl实例的值和有效性状态
      name: new FormControl(' ')  
    })
  }

  ngOnInit(): void {
    // this.dataSource.paginator = this.paginator;
  }

  
  add(){
    const dialogRef = this.dialog.open(AdminStoreAccountCreateComponent, {
      width: '550px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}
