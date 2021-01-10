/*
 * @Author: your name
 * @Date: 2020-12-09 16:59:34
 * @LastEditTime: 2021-01-03 11:44:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \angular\src\services\store\store-quote-bydate\store-quote-bydate.service.ts
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { StoreUrls } from '../../../api';
import {StoreQuoteBydateRsponseListModel,StoreQuoteBydateRequestModel,FreeTraveRsponseListModel,FreeTraveQuoteBydateModel} from '../../../interfaces/store/storeQuote/store-quote-bydate';
import { letProto } from 'rxjs-compat/operator/let';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};


@Injectable({
  providedIn: 'root'
})
export class StoreQuoteBydateService {
  public urls = StoreUrls;
  constructor(public httpClient: HttpClient) { }

   // 获取产品列表
   getQuoteDateList(id:number,type:string,page?:any,date?:any,per_page?:any):Observable<StoreQuoteBydateRsponseListModel>{
    let params = new HttpParams().set('product_id', id.toString())
    .set('page', page.toString())
    .set('date', date)
    .set('per_page', per_page)
   
    console.log(page,date,per_page,params);
    const findhttpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: params
    };

     if(type == 'management'){
        return this.httpClient.get<StoreQuoteBydateRsponseListModel>(this.urls.GetStoreQuoteByDate, findhttpOptions)
        .pipe(
        )
     }else{
      return this.httpClient.get<StoreQuoteBydateRsponseListModel>(this.urls.GetStoreFreeTravelQuote, findhttpOptions)
      .pipe(
      )
     }
    
  }

   // 添加报价信息
   createQuoteInfo(quoteBydateRequestModel: StoreQuoteBydateRequestModel,id:number) {
    return this.httpClient.post(this.urls.PostStoreQuoteByDate, quoteBydateRequestModel.data, httpOptions)
      .pipe(
      )
  }

  // 产品删除
  deleteQuoteInfo(id:any){
    return this.httpClient.delete(this.urls.DelStoreQuoteByDate+id, httpOptions)
    .pipe(
    )
  }
    // 获取自由行产品报价详情
    getFreeTravelQuoteDateDetail(id:any):Observable<FreeTraveRsponseListModel>{
      return this.httpClient.get<FreeTraveRsponseListModel>(this.urls.GetStoreFreeTravelQuoteDetail+id, httpOptions)
      .pipe(
      )
    }
  
    // 自由行产品修改报价日期
    updateFreeTravelQuteDate(freeTraveQuoteBydateModel:FreeTraveQuoteBydateModel[],id:any):Observable<any>{
      return this.httpClient.put(this.urls.PutStoreFreeTravelQuoteInfo+id,freeTraveQuoteBydateModel, httpOptions)
      .pipe()
    }

    // 自由行产品添加报价日期
    createFreeTravelQuteDate(freeTraveQuoteBydateModel:FreeTraveQuoteBydateModel[]):Observable<any>{
      return this.httpClient.post(this.urls.PostStoreFreeTravelQuote,freeTraveQuoteBydateModel, httpOptions)
      .pipe()
    }
    
    // 自由行删除
    delQuoteInfo(id:any):Observable<any>{
      return this.httpClient.delete(this.urls.PutStoreFreeTravelQuoteInfo+id,httpOptions)
      .pipe()
    }


}
