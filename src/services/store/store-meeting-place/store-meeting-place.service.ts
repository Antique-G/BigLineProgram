import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, } from 'rxjs/operators';
import { AddStoreMeetingPlaceRequestModel, StoreMeetingPlaceListResponseModel, UpdateStoreMeetingPlaceRequestModel, UpdateStoreMeetingPlaceResponseModel } from '../../../interfaces/store/storeMeetingPlace/store-meeting-place-model';
import { StoreUrls } from '../../../api';


const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};


@Injectable({
  providedIn: 'root'
})
export class StoreMeetingPlaceService {
  public urls = StoreUrls;

  constructor(public httpClient: HttpClient) { }


  // 集合地点列表
  storeMeetingPlaceList(page: number, per_page: number, name: any, status: any,time:any): Observable<StoreMeetingPlaceListResponseModel> {
   time = new Date().getTime()
    const params = new HttpParams().set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('name', name ? name : '')
      .set('status', status ? status : '')
      .set("time", time.toString())

    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<StoreMeetingPlaceListResponseModel>(this.urls.GetStoreMeetingPlace, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }



  // 集合地点添加
  addStoreMeetingPlace(addStoreMeetingPlaceRequestModel: AddStoreMeetingPlaceRequestModel): Observable<any> {
    return this.httpClient.post<any>(this.urls.PostStoreMeetingPlaceCreate, addStoreMeetingPlaceRequestModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 更新
  updateStoreMeetingPlace(updateStoreMeetingPlaceRequestModel: UpdateStoreMeetingPlaceRequestModel): Observable<UpdateStoreMeetingPlaceResponseModel> {
    const id = updateStoreMeetingPlaceRequestModel.id;
    return this.httpClient.put(this.urls.PutStoreMeetingPlaceUpdate + id, updateStoreMeetingPlaceRequestModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 删除
  deleteStoreMeetingPlace(id: any): Observable<UpdateStoreMeetingPlaceResponseModel> {
    return this.httpClient.delete<any>(this.urls.DeleteStoreMeetingPlace + id, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }



  //详情
  getStoreMeetingPlaceDetail(id: any) {
    return this.httpClient.get<any>(this.urls.GetStoreMeetingPlaceDetail + id, httpOptions)
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
