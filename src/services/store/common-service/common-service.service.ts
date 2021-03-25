import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { StoreUrls } from '../../../api';
import { GalleryResponseModel } from '../../../interfaces/store/common/common';
import { EncodeComponent } from '../../../app/store-app/store-material/EncodeComponent';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};


@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  private urls = StoreUrls;
  constructor(public httpClient: HttpClient) { }


  // 上传图片
  uploadImg(reqData: any): Observable<any> {
    const imgHttpOptions = {
      reportProgress: true,
    };
    return this.httpClient.post<any>(this.urls.PostStoreImgUpload, reqData, imgHttpOptions)
      .pipe(
      )
  }

  // 获取图片列表
  getGalleryList(page: number, keyword: string, per_page: number, region_code: any, type: any, image_name?: any) {
    const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
      .set('keyword', keyword)
      .set('per_page', per_page.toString())
      .set('region_code', region_code)
      .set('type', type)
      .set('image_name', image_name ? image_name : '')

    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };

    return this.httpClient.get<GalleryResponseModel>(this.urls.GetStoreImgList, findhttpOptions)
      .pipe(

      )
  }

  // 上传视频
  uploadVideo(reqData: any): Observable<any> {
    const imgHttpOptions = {
      reportProgress: true,
    };
    return this.httpClient.post<any>(this.urls.PostStoreVideoUpload, reqData, imgHttpOptions)
      .pipe(
      )
  }


}
