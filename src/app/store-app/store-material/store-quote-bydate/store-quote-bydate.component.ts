import { Component, OnInit,ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// antd日历
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);
// 引用报价组件
import {StoreQuoteBydateCreateComponent} from './store-quote-bydate-create/store-quote-bydate-create.component';
// 接收传过来的参数
import { ActivatedRoute, Router } from '@angular/router';

import {StoreQuoteBydateService} from '../../../../services/store/store-quote-bydate/store-quote-bydate.service';

import {StoreQuoteBydateRsponseListModel} from '../../../../interfaces/store/storeQuote/store-quote-bydate';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';


@Component({
  selector: 'app-store-quote-bydate',
  templateUrl: './store-quote-bydate.component.html',
  styleUrls: ['./store-quote-bydate.component.css']
})
export class StoreQuoteBydateComponent implements OnInit {
  pageClick:any
  productId:any//修改信息
  toDay = new Date()
  listDataMap:StoreQuoteBydateRsponseListModel

  constructor(public dialog:MatDialog,public activatedRoute: ActivatedRoute,public quoteBydateService:StoreQuoteBydateService,private el:ElementRef) {
    this.listDataMap={
        data:[]
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.productId = JSON.parse(params["productId"]);
      this.getQuoteList();
    });

  }

  getQuoteList(){
    console.log(this.productId,'this.productId');
    this.quoteBydateService.getQuoteDateList(this.productId).subscribe(data=>{
      console.log('listDataMap',data);
      this.listDataMap = data
    })
  }

  onSelectChange(date:any){
    if(differenceInCalendarDays(date,this.toDay)<0) return
      const dialogRef = this.dialog.open(StoreQuoteBydateCreateComponent,{
        width:'500px',
        data:{
          date:date,
          productId:this.productId,
          listDataMap:this.listDataMap
        }
    })
    dialogRef.afterClosed().subscribe(result=>{
      console.log('result',result);
      this.getQuoteList()
    })
  }

  panelChange(e:any){
    console.log('panelChange',e);
  }

 
  // 批量报价
  quoteClick(){
    console.log(123);
    const dialogRef = this.dialog.open(StoreQuoteBydateCreateComponent,{
      width:'500px',
      data:{
        productId:this.productId,
        listDataMap:this.listDataMap
      }
    })
    dialogRef.afterClosed().subscribe(result=>{
      this.getQuoteList()
      console.log('result',result);
    
    })
  }
  
}
