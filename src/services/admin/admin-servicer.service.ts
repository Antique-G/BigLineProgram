import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AdminRegionModel } from '../../interfaces/adminRegion/admin-region-model';
import { AdminUrls } from '../../api';
import { catchError } from 'rxjs/operators';
import { AdminRegionServiceListResponseModel } from '../../interfaces/admin-servicer/admin-servicer-model';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};

@Injectable({
  providedIn: 'root'
})

export class AdminServicerService {
  public urls = AdminUrls;
  constructor(public httpClient: HttpClient) { }

  // 区域三级联动数据
  getAllRegionList(): Observable<AdminRegionModel[]> {
    return this.httpClient.get<AdminRegionModel[]>(this.urls.GetAdminAllRegions, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 区域客服列表
  regionServiceList(page: number, per_page: number, region_code: any, region_name: any, phone: any): Observable<AdminRegionServiceListResponseModel> {
    const params = new HttpParams().set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('region_code', region_code ? region_code : '')
      .set('region_name', region_name ? region_name : '')
      .set('phone', phone ? phone : '');

    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<AdminRegionServiceListResponseModel>(this.urls.GetAdminRegionList, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
  

  public handleError(error: HttpErrorResponse) {
    console.log("1212", error);
    switch (error.status) {
      case 401:
        // alert(error.message);
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
