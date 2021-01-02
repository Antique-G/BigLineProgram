/*
 * @Author: karl
 * @Date: 2021-01-02 16:05:39
 * @LastEditTime: 2021-01-02 16:22:42
 * @LastEditors: Please set LastEditors
 * @Description: 店铺公共service
 * @FilePath: \angular\src\services\store\common-service\common-service.service.ts
 */


import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { StoreUrls } from '../../../api';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  private urls = StoreUrls;
  constructor(public httpClient: HttpClient) { }

  uploadImg(image: any): Observable<any> {
    console.log('uploadImgModel',image);
    const imgHttpOptions = {
      reportProgress: true,    // headers: new HttpHeaders().set('Content-Type', 'multipart/form-data')
    };
    return this.httpClient.post<any>(this.urls.PostStoreImgUpload, image, imgHttpOptions)
      .pipe(
      )
  }



}
