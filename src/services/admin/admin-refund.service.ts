import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RefundModel } from '../../interfaces/store/storeRefund/storerefund';
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
  // product_id: any, product_name: any, group_id: any, order_number: any,destination_city: any, date_start: any, date_end: any, group_code: any
  getRefundList(page: number, per_page: number,): Observable<RefundModel> {
    const params = new HttpParams().set('page', page.toString())
      .set('per_page', per_page.toString())
    // .set('product_id', product_id ? product_id : '')
    // .set('product_name', product_name ? product_name : '')
    // .set('group_id', group_id ? group_id : '')
    // .set('order_number', order_number ? order_number : '')
    // .set('destination_city', destination_city ? destination_city : '')
    // .set('date_start', date_start ? date_start : '')
    // .set('date_end', date_end ? date_end : '')
    // .set('group_code', group_code ? group_code : '');


    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<RefundModel>(this.urls.GetAdminRefund, findhttpOptions)
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
