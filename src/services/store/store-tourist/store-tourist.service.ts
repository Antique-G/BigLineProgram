import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AddTouristModel, StoreTouristListResponse, TouristUpdateRequestModel, TouristUpdateResponseModel } from '../../../interfaces/store/storeTourist/store-tourist-model';
import { StoreUrls } from '../../../api';


const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};

@Injectable({
  providedIn: 'root'
})
export class StoreTouristService {
  public urls = StoreUrls;


  constructor(public httpClient: HttpClient) { }

  // 获取导游列表
  getTouristList(page: number, per_page: number, status: any, name: any, mobile: any): Observable<StoreTouristListResponse> {
    const params = new HttpParams().set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('status', status ? status : '')
      .set('name', name ? name : '')
      .set('mobile', mobile ? mobile : '');

    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };

    return this.httpClient.get<StoreTouristListResponse>(this.urls.GetStoreGuideList, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // 添加
  addTourist(addTouristModel:AddTouristModel): Observable<any>{
    return this.httpClient.post<any>(this.urls.PostStoreGuideCreate,addTouristModel, httpOptions)
    .pipe(
    
    )
  }
  //修改
  updataTourist(touristUpdateRequestModel:TouristUpdateRequestModel):Observable<TouristUpdateResponseModel>{
    const id =  touristUpdateRequestModel.id;
    return this.httpClient.put<any>(this.urls.PutStoreGuideUpdate + id,touristUpdateRequestModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // 上架/下架
  setStatus(setStatusModel: any): Observable<any> {
    return this.httpClient.post<any>(this.urls.PostStoreGuideSetStatus, setStatusModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  //删除
  deleteTourist(id: any):Observable<any> {
    return this.httpClient.delete<any>(this.urls.DeleteStoreGuide + id, httpOptions)
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
    return throwError('');
  }

}
