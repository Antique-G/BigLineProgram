import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { StoreUrls } from '../../../api';
import { AdminRegionModel } from '../../../interfaces/adminRegion/admin-region-model';


const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};


@Injectable({
  providedIn: 'root'
})
export class StoreRegionService {
  public urls = StoreUrls;

  constructor(public httpClient: HttpClient) { }


  // 区域三级联动数据
  getAllRegionList(): Observable<AdminRegionModel[]> {
    return this.httpClient.get<AdminRegionModel[]>(this.urls.GetStoreAllRegions,httpOptions)
      .pipe(
        retry(1), // 重试1次
        catchError(this.handleError)
      );
  }




  public handleError(error: HttpErrorResponse) {
    console.log("1212", error);
    switch (error.status) {
      case 401:
        alert(error.message);
        break
    }

    // if (error.error instanceof ErrorEvent) {
    //   // 客户端本身引起的错误信息
    //   alert()

    //   console.error(`客户端错误：${error.error.message}`);
    // } else {
    //   // 服务端返回的错误信息
    //   console.error(`服务端错误：HTTP 状态码：${error.status} \n\r 错误信息：${JSON.stringify(error.error)}`);
    // }

    // 反馈给用户的错误信息（用于组件中使用 error 回调时的错误提示）
    return throwError('');
  }

}
