import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RefundDetailModel, RefundListModel, RefundModel } from '../../../interfaces/store/storeRefund/storerefund';
import { StoreUrls } from '../../../api';
import { EncodeComponent } from '../../../app/store-app/store-material/EncodeComponent';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
}

@Injectable({
  providedIn: 'root'
})
export class StoreRefundService {
  public urls = StoreUrls;

  constructor(public httpClient: HttpClient) { }

  // 退款列表
  getRefundList(page: number, per_page: number, order_id: any, product_id: any, product_name: any, date_start: any, date_end: any, id: any): Observable<RefundModel> {
    const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('order_id', order_id ? order_id : '')
      .set('product_id', product_id ? product_id : '')
      .set('product_name', product_name ? product_name : '')
      .set('date_start', date_start ? date_start : '')
      .set('date_end', date_end ? date_end : '')
      .set('id', id ? id : '');



    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<RefundModel>(this.urls.GetStoreRefund, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 获取退款详情
  getRefundDetail(id: any) {
    return this.httpClient.get<RefundDetailModel>(this.urls.GetStoreRefundDetail + id, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }



  //  退款流水列表
  getRefundLog(page: number, per_page: number, order_id: any, refund_id: any, transaction_id: any, date_start: any, date_end: any): Observable<RefundListModel> {
    const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('order_id', order_id ? order_id : '')
      .set('refund_id', refund_id ? refund_id : '')
      .set('transaction_id', transaction_id ? transaction_id : '')
      .set('date_start', date_start ? date_start : '')
      .set('date_end', date_end ? date_end : '');
    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<RefundListModel>(this.urls.GetStoreRefundLog, findhttpOptions)
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
