import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CreateReundModel, RefundDetailModel, RefundFinished, RefundModel, RefundPayLog, ReundCheckModel } from '../../interfaces/store/storeRefund/storerefund';
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

  // 创建退款单
  createRefund(createReundModel: CreateReundModel): Observable<any> {
    return this.httpClient.post<any>(this.urls.PostAdminRefund, createReundModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }



  // 审核提交
  postRefundCheck(reundCheckModel: ReundCheckModel): Observable<any> {
    return this.httpClient.post<any>(this.urls.PostAdminRefundCheck, reundCheckModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // 支付流水信息
  getPayLog(order_id: any): Observable<RefundPayLog> {
    const params = new HttpParams().set('order_id', order_id ? order_id : '');
    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<RefundPayLog>(this.urls.GetAdminRefundPayLog, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 提交退款流水去向（完成退款）
  postRefundFinished(refundFinished: RefundFinished): Observable<any> {
    return this.httpClient.post<any>(this.urls.PostAdminRefundFinish, refundFinished, httpOptions)
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
