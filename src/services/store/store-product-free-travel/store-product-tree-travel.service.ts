/*
 * @Author: your name
 * @Date: 2021-01-02 14:26:25
 * @LastEditTime: 2021-01-03 15:12:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \angular\src\services\store\store-product-free-travel\store-product-tree-travel.service.ts
 */
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StoreFreeTravelModel,ProductTabListModel,FreeTravelListModel } from '../../../interfaces/store/storeProductFreeTravel/storeProductFreeTravel';
import { StoreUrls } from '../../../api';
import { AssemblingPlaceListModel } from '../../../interfaces/store/storeProduct/ProductModel';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};


@Injectable({
  providedIn: 'root'
})
export class StoreProductTreeTravelService {

  public urls = StoreUrls;

  constructor(public httpClient: HttpClient) { }

  GetFreeTravelList(page: number, per_page: number,check_status:any,title:any,few_days:any,few_nights:any): Observable<FreeTravelListModel> {
   console.log(123);
    const params = new HttpParams().set('page', page.toString())
    .set('per_page', per_page.toString())
    .set('check_status', check_status ? check_status : '')
    .set('title', title ? title : '')
    .set('few_days', few_days ? few_days : '')
    .set('few_nights', few_nights ? few_nights : '')

    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<FreeTravelListModel>(this.urls.GetStoreFreeTravelList, findhttpOptions)
      .pipe(
        
      )
  }

  // 详情
  GetFreeTravelDetail(id:any): Observable<StoreFreeTravelModel> {
    return this.httpClient.get<StoreFreeTravelModel>(this.urls.GetStoreFreeTravelDetail+id, httpOptions)
      .pipe(
        
      )
  }
  // 产品标签列表
   // 产品标签
  GetProductTagList(): Observable<AssemblingPlaceListModel> {
    return this.httpClient.get<AssemblingPlaceListModel>(this.urls.GetStoreTagList, httpOptions)
      .pipe(
      
      )
  }
  
  // 修改自由行产品报价
  UpdateFreeTravelInfo(freeTravelModel:StoreFreeTravelModel): Observable<any>{
    return this.httpClient.put<any>(this.urls.PostStoreFreeTravelInfo+freeTravelModel.id,freeTravelModel, httpOptions)
    .pipe(
    
    )
  }

  // 添加自由行产品
  SaveFreeTravelInfo(freeTravelModel:StoreFreeTravelModel): Observable<any>{
    return this.httpClient.post<any>(this.urls.PostSaveStoreFreeTravelInfo,freeTravelModel, httpOptions)
    .pipe(
    
    )
  }

  // 自由行产品上下架
  UpDownFreeTravel(id:any):Observable<any>{
    return this.httpClient.post<any>(this.urls.PostUpDownFreeTravelInfo,{id},httpOptions)
  }

}
