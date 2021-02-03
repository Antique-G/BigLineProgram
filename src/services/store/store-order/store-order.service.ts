import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StoreUrls } from '../../../api';
import { SetGuideModel, StoreOrderDetailRequestModel, StoreOrderListRequestModel } from '../../../interfaces/store/storeOrder/store-order-model';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
}

@Injectable({
  providedIn: 'root'
})
export class StoreOrderService {
  public urls = StoreUrls;

  constructor(public httpClient: HttpClient) { }

  // 订单团列表
  getStoreOrderGroup(page: number, per_page: number, product_id: any, product_name: any, group_id: any, order_number: any,
    destination_city: any, date_start: any, date_end: any): Observable<StoreOrderListRequestModel> {
    const params = new HttpParams().set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('product_id', product_id ? product_id : '')
      .set('product_name', product_name ? product_name : '')
      .set('group_id', group_id ? group_id : '')
      .set('order_number', order_number ? order_number : '')
      .set('destination_city', destination_city ? destination_city : '')
      .set('date_start', date_start ? date_start : '')
      .set('date_end', date_end ? date_end : '');

    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<StoreOrderListRequestModel>(this.urls.GetStoreOrderGroupList, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 获取产品详情
  getOrderGroupDetail(id: any) {
    return this.httpClient.get<StoreOrderDetailRequestModel>(this.urls.GetStoreOrderGroupDetail + id, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 派遣导游
  setGuide(setGuideModel: SetGuideModel): Observable<any> {
    return this.httpClient.post<any>(this.urls.PostStoreOrderGroupSetGuide, setGuideModel, httpOptions)
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
