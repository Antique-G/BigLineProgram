import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { StoreUrls } from '../../../api';
import {StoreQuoteBydateRsponseListModel,StoreQuoteBydateRequestModel} from '../../../interfaces/store/storeQuote/store-quote-bydate';

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
   getQuoteDateList(id:number):Observable<StoreQuoteBydateRsponseListModel>{
    return this.httpClient.get<StoreQuoteBydateRsponseListModel>(this.urls.GetStoreQuoteByDate+id+'/date_quote', httpOptions)
      .pipe(
      )
  }

   // 添加报价信息
   createQuoteInfo(quoteBydateRequestModel: StoreQuoteBydateRequestModel,id:number) {
    return this.httpClient.post(this.urls.PostStoreQuoteByDate+id+'/date_quote', quoteBydateRequestModel.data, httpOptions)
      .pipe(
      )
  }

  


}
