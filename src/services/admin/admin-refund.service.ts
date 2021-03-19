import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RefundDetailModel, RefundModel } from '../../interfaces/store/storeRefund/storerefund';
import { AdminUrls } from '../../api';


const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};

@Injectable({
  providedIn: 'root'
})
export class AdminRefundService {
  public urls = AdminUrls;

  constructor(public httpClient: HttpClient) { }


  // 退款列表
  getRefundList(page: number, per_page: number, order_id: any, store_id: any, product_id: any, date_start: any, date_end: any, id: any, status: any): Observable<RefundModel> {
    const params = new HttpParams().set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('order_id', order_id ? order_id : '')
      .set('store_id', store_id ? store_id : '')
      .set('product_id', product_id ? product_id : '')
      .set('date_start', date_start ? date_start : '')
      .set('date_end', date_end ? date_end : '')
      .set('id', id ? id : '')
      .set('status', status ? status : '');


    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<RefundModel>(this.urls.GetAdminRefund, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }



  // 获取退款详情
  getRefundDetail(id: any) {
    return this.httpClient.get<RefundDetailModel>(this.urls.GetAdminRefundDetail + id, httpOptions)
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
    return throwError('');
  }
}
