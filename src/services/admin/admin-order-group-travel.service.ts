import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EncodeComponent } from '../../app/store-app/store-material/EncodeComponent';
import { AdminUrls } from '../../api';
import { DetailModel, StoreOrderGroupTravelListRequestModel } from '../../interfaces/store/storeOrder/store-order-group-travel-model';



const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
}


@Injectable({
  providedIn: 'root'
})
export class AdminOrderGroupTravelService {
  public urls = AdminUrls;

  
  constructor(public httpClient: HttpClient) { }

  // 跟团游订单列表
  groupTravelList(page: number, per_page: number, status: any, product_id: any, product_name: any, order_number: any,
    date_start: any, date_end: any, product_code: any,store_id:any): Observable<StoreOrderGroupTravelListRequestModel> {
    const params = new HttpParams({encoder: new EncodeComponent() }).set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('status', status ? status : '')
      .set('product_id', product_id ? product_id : '')
      .set('product_name', product_name ? product_name : '')
      .set('order_number', order_number ? order_number : '')
      .set('date_start', date_start ? date_start : '')
      .set('date_end', date_end ? date_end : '')
      .set('product_code', product_code ? product_code : '')
      .set('store_id', store_id ? store_id : '');


    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<StoreOrderGroupTravelListRequestModel>(this.urls.GetAdminOrderGroupProductList, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // 详情
  getgroupTravelDetail(id: any) {
    return this.httpClient.get<DetailModel>(this.urls.GetAdminOrderGroupProductDetail + id, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

 

  private handleError(error: HttpErrorResponse) {
    console.log("1212", error);
    switch (error.status) {
      case 401:
        break

    }
    return throwError('');
  }
}

