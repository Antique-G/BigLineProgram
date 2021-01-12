/*
 * @Author: karl
 * @Date: 2021-01-02 16:05:39
 * @LastEditTime: 2021-01-02 16:22:42
 * @LastEditors: Please set LastEditors
 * @Description: 店铺公共service
 * @FilePath: \angular\src\services\store\common-service\common-service.service.ts
 */


import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { StoreUrls } from '../../../api';
import {GalleryResponseModel} from '../../../interfaces/store/common/common';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};


@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  private urls = StoreUrls;
  constructor(public httpClient: HttpClient) { }

  uploadImg(reqData: any): Observable<any> {
    const imgHttpOptions = {
      reportProgress: true,    // headers: new HttpHeaders().set('Content-Type', 'multipart/form-data')
    };
    return this.httpClient.post<any>(this.urls.PostStoreImgUpload, reqData, imgHttpOptions)
      .pipe(
      )
  }

  getGalleryList(page: number,keyword:string, per_page: number,region_code:string){
    const params = new HttpParams().set('page', page.toString())
    .set('keyword', keyword)
    .set('per_page', per_page.toString())
    .set('region_code', region_code)
    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };

    return this.httpClient.get<GalleryResponseModel>(this.urls.GetStoreImgList, findhttpOptions)
    .pipe(
     
    )
    
  }


}
