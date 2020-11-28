import { MatTableDataSource } from '@angular/material/table';
// import { PeriodicElement } from './../admin/admin.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';


export interface PeriodicElement {   //1.1导出数据接口,定义了数据类型
  position:string;
  name:string;
  weight:string;
  symbol:string;
}

const ELEMENT_DATA: PeriodicElement[] = [   //1.2声明一个常量数据表，传输数据
  {position:'1',name:'kobin',weight:'20',symbol:'@'},
  {position:'2',name:'anya',weight:'20',symbol:'@'},
  {position:'3',name:'Odyn',weight:'20',symbol:'@'},
  {position:'4',name:'Harley',weight:'20',symbol:'@'},
  {position:'5',name:'yannie',weight:'20',symbol:'@'},
]

@Component({
  selector: 'app-admin-store-account',
  templateUrl: './admin-store-account.component.html',
  styleUrls: ['./admin-store-account.component.css']
})
export class AdminStoreAccountComponent implements OnInit {  //导出类AdminStoreAccountComponen实现OnInit
  displayedColumns:string[] = ['position','name','weight','symbol'];   //1.3每个列需要渲染的行内容
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);   //1.4将数据添加到dataSource
  
  // @ViewChild(MatPaginator) paginator: MatPaginator | any;
  // resultslength = 0;
  // isLoadingResults = true;
  // isRateLlimitReachted = false;
  constructor() { }

  ngOnInit(): void {
    // this.dataSource.paginator = this.paginator;
  }

}
