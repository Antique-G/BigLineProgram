import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AdminFreeTravelDetailResponseModel, AdminFreeTravelListResponseModel, FreeTravelUpdateModel, FreeTravelQuteDateModel, SetCheckModel } from '../../interfaces/adminProduct/free-travel-model';
import { AdminUrls } from '../../api';
import { EncodeComponent } from '../../app/store-app/store-material/EncodeComponent';
import { AddProductTrip } from '../../interfaces/store/storeProduct/ProductModel';


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
  freeTravelList(page: number, per_page: number, status: any, check_status: any, title: string, store_name: string, code: any, few_days: any, few_nights: any, tag?: any): Observable<AdminFreeTravelListResponseModel> {
    const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('status', status ? status : '')
      .set('check_status', check_status ? check_status : '')
      .set('title', title ? title : '')
      .set('store_name', store_name ? store_name : '')
      .set('code', code ? code : '')
      .set('few_days', few_days ? few_days : '')
      .set('few_nights', few_nights ? few_nights : '')
      .set('tag', tag ? tag : '');


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
  freeTravelDetail(id: any): Observable<AdminFreeTravelDetailResponseModel> {
    return this.httpClient.get<AdminFreeTravelDetailResponseModel>(this.urls.GetAdminFreeTravelDetail + id, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // 更新
  freeTravelUpdate(model: any): Observable<any> {
    const id = model.id;
    return this.httpClient.put(this.urls.PutAdminFreeTravelUpdate + id, model, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // 行程添加
  addFreeTrip(addProductTrip: AddProductTrip): Observable<any> {
    return this.httpClient.post<any>(this.urls.PostAdminProductIndenTrip, addProductTrip, httpOptions)
      .pipe(
      )
  }

  // 删除行程
  deleteProductTrip(ids: any): Observable<any> {
    return this.httpClient.post<any>(this.urls.PostAdminFreeTraveDel, { ids }, httpOptions)
      .pipe(
      )
  }


  // 上架/下架
  freeTravelUp(id: number): Observable<any> {
    return this.httpClient.post(this.urls.PostAdminFreeTRavelUp, { id: id }, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 审核
  freeTravelReview(setCheckModel: SetCheckModel): Observable<any> {
    return this.httpClient.post(this.urls.PostAdminFreeTCheckStatus, setCheckModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // 日期报价列表
  freeTravelQuteDateList(product_id: any, page: number, per_page: number) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('product_id', product_id)
    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<FreeTravelQuteDateModel>(this.urls.GetAddminFreeTravelQuteDateList, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  freeTravelQuteDateCheckState(date_id: any[], check_status: number) {
    return this.httpClient.post<any>(this.urls.GetAddminFreeTravelQuteDateCheck, { date_id, check_status }, httpOptions)
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
