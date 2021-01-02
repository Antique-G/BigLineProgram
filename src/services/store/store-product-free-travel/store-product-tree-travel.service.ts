/*
 * @Author: your name
 * @Date: 2021-01-02 14:26:25
 * @LastEditTime: 2021-01-02 16:45:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \angular\src\services\store\store-product-free-travel\store-product-tree-travel.service.ts
 */
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StoreFreeTravelModel,ProductTabListModel } from '../../../interfaces/store/storeProductFreeTravel/storeProductFreeTravel';
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


}
