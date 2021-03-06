import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, } from 'rxjs/operators';
import { EncodeComponent } from '../../app/store-app/store-material/EncodeComponent';
import { AdminUrls } from '../../api';
import { AssemblingPlaceListModel } from '../../interfaces/store/storeProduct/ProductModel';


const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};


@Injectable({
  providedIn: 'root'
})
export class AdminMeetingPlaceService {
  public urls = AdminUrls;

  constructor(public httpClient: HttpClient) { }


  // 集合地点列表
  adminMeetingPlaceList(name: string, region_code: string,store_id?:any): Observable<AssemblingPlaceListModel> {
    const params = new HttpParams({ encoder: new EncodeComponent() }).set('name', name ? name : '')
    .set('region_code', region_code ? region_code : '')
    .set('store_id', store_id ? store_id : '');

    
    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };

    return this.httpClient.get<AssemblingPlaceListModel>(this.urls.GetAdminMeetingPlace, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }



  


  private handleError(error: HttpErrorResponse) {
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
