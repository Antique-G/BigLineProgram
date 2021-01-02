import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { StoreUrls } from '../../../api';
import {StoreQuoteBydateRsponseListModel,StoreQuoteBydateRequestModel,FreeTraveRsponseListModel,FreeTraveQuoteBydateModel} from '../../../interfaces/store/storeQuote/store-quote-bydate';

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
   getQuoteDateList(id:number,type:string):Observable<StoreQuoteBydateRsponseListModel>{
     if(type == 'management'){
        return this.httpClient.get<StoreQuoteBydateRsponseListModel>(this.urls.GetStoreQuoteByDate+id+'/date_quote', httpOptions)
        .pipe(
        )
     }else{
     
      const params = new HttpParams().set('product_id', id.toString())
      const findhttpOptions = {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        params: params
      };
      return this.httpClient.get<StoreQuoteBydateRsponseListModel>(this.urls.GetStoreFreeTravel, findhttpOptions)
      .pipe(
      )
     }
    
  }

   // 添加报价信息
   createQuoteInfo(quoteBydateRequestModel: StoreQuoteBydateRequestModel,id:number) {
    return this.httpClient.post(this.urls.PostStoreQuoteByDate+id+'/date_quote', quoteBydateRequestModel.data, httpOptions)
      .pipe(
      )
  }

    // 获取自由行产品报价详情
    getFreeTravelQuoteDateDetail(id:any):Observable<FreeTraveRsponseListModel>{
      return this.httpClient.get<FreeTraveRsponseListModel>(this.urls.GetStoreFreeTravelDetail+id, httpOptions)
      .pipe(
      )
    }
  
    // 自由行产品修改报价日期
    updateFreeTravelQuteDate(freeTraveQuoteBydateModel:FreeTraveQuoteBydateModel):Observable<any>{
      return this.httpClient.put(this.urls.PutStoreFreeTravelInfo+freeTraveQuoteBydateModel.id,freeTraveQuoteBydateModel, httpOptions)
      .pipe()
    }

    // 自由行产品添加报价日期
    createFreeTravelQuteDate(freeTraveQuoteBydateModel:FreeTraveQuoteBydateModel):Observable<any>{
      return this.httpClient.post(this.urls.PostStoreFreeTravel,freeTraveQuoteBydateModel, httpOptions)
      .pipe()
    }
  


}
