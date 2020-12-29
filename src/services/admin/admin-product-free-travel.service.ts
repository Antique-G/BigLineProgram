import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AdminFreeTravelDetailResponseModel, AdminFreeTravelListResponseModel, FreeTravelUpdateModel } from '../../interfaces/adminProduct/free-travel-model';
import { AdminUrls } from '../../api';


const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};

@Injectable({
  providedIn: 'root'
})
export class AdminProductFreeTravelService {
  public urls = AdminUrls;

  constructor(public httpClient: HttpClient) { }


  // 自由行产品列表
  freeTravelList(page: number, per_page: number, status: any, check_status: any, title: string): Observable<AdminFreeTravelListResponseModel> {
    const params = new HttpParams().set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('status', status ? status : '')
      .set('check_status', check_status ? check_status : '')
      .set('title', title ? title : '')

    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<AdminFreeTravelListResponseModel>(this.urls.GetAdminFreeTravelList, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

    // 详情
    freeTravelDetail(id:any): Observable<AdminFreeTravelDetailResponseModel> {
      return this.httpClient.get<AdminFreeTravelDetailResponseModel>(this.urls.GetAdminFreeTravelDetail+id, httpOptions)
        .pipe(
          catchError(this.handleError)
        )
    }

    // 更新
    freeTravelUpdate(model:FreeTravelUpdateModel): Observable<any> {
      return this.httpClient.put<FreeTravelUpdateModel>(this.urls.PutAdminFreeTravelUpdate+model.id,model, httpOptions)
        .pipe(
          catchError(this.handleError)
        )
    }




  private handleError(error: HttpErrorResponse) {
    console.log("1212", error);
    switch (error.status) {
      case 401:
        // alert(error.message);
        break
    }
    return throwError('');
  }

}
