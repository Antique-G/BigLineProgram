import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OrderGroupProduct, OrderTotalModel } from '../..//interfaces/store/storeOrder/store-order-group-travel-model';
import { AdminUrls } from '../../api';
import { EncodeComponent } from '../../app/store-app/store-material/EncodeComponent';
import { Details, freeProModel, FreeProSearchModel, StoreOrderFreeTravelListRequestModel } from '../../interfaces/store/storeOrder/store-order-free-travel-model';



const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
}


@Injectable({
  providedIn: 'root'
})
export class AdminOrderFreeTravelService {
  public urls = AdminUrls;


  constructor(public httpClient: HttpClient) { }


  // 自由行订单列表
  freeTravelList(page: number, per_page: number, status: any, product_id: any, product_name: any, order_number: any,
    date_start: any, date_end: any, product_code: any, store_id: any, order_start_date: any, order_end_date: any, contact_name: any, contact_phone: any): Observable<StoreOrderFreeTravelListRequestModel> {
    const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('status', status ? status : '')
      .set('product_id', product_id ? product_id : '')
      .set('product_name', product_name ? product_name : '')
      .set('order_number', order_number ? order_number : '')
      .set('date_start', date_start ? date_start : '')
      .set('date_end', date_end ? date_end : '')
      .set('product_code', product_code ? product_code : '')
      .set('store_id', store_id ? store_id : '')
      .set('order_start_date', order_start_date ? order_start_date : '')
      .set('order_end_date', order_end_date ? order_end_date : '')
      .set('contact_name', contact_name ? contact_name : '')
      .set('contact_phone', contact_phone ? contact_phone : '');



    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<StoreOrderFreeTravelListRequestModel>(this.urls.GetAdminOrderfreeTravelList, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }



  // 获取详情
  getfreeTravelDetail(id: any) {
    return this.httpClient.get<Details>(this.urls.GetAdminOrderfreeTravelDetail + id, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // 产品搜索
  getPro(code: any) {
    const params = new HttpParams().set('code', code)
    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<freeProModel>(this.urls.GetAdminProSearchFree, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 后台下订单
  addOrderGroup(orderGroupProduct: OrderGroupProduct): Observable<any> {
    return this.httpClient.post<any>(this.urls.PostAdminProductOrderGroupFree, orderGroupProduct, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 搜索可下订单的产品
  getFreePro(page: number, per_page: number, title: any, start_date: any, departure_city: any,
    destination_city: any, few_days: any, quote_type?: any, id?: any, sort_field?: any, sort?: any): Observable<FreeProSearchModel> {
    const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('title', title ? title : '')
      .set('start_date', start_date ? start_date : '')
      .set('departure_city', departure_city ? departure_city : '')
      .set('destination_city', destination_city ? destination_city : '')
      .set('few_days', few_days ? few_days : '')
      .set('quote_type', quote_type ? quote_type : '')
      .set('id', id ? id : '')
      .set('sort_field', sort_field ? sort_field : '')
      .set('sort', sort ? sort : '');


    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<FreeProSearchModel>(this.urls.GetAdminOrderfreeIndentSearch, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // 订单统计
  getIndenOrderTotal(status: any, product_id: any, product_name: any, order_number: any,
    date_start: any, date_end: any, product_code: any, store_id: any, order_start_date: any, order_end_date: any, contact_name: any, contact_phone: any): Observable<OrderTotalModel> {
    const params = new HttpParams({ encoder: new EncodeComponent() }).set('status', status ? status : '')
      .set('product_id', product_id ? product_id : '')
      .set('product_name', product_name ? product_name : '')
      .set('order_number', order_number ? order_number : '')
      .set('date_start', date_start ? date_start : '')
      .set('date_end', date_end ? date_end : '')
      .set('product_code', product_code ? product_code : '')
      .set('store_id', store_id ? store_id : '')
      .set('order_start_date', order_start_date ? order_start_date : '')
      .set('order_end_date', order_end_date ? order_end_date : '')
      .set('contact_name', contact_name ? contact_name : '')
      .set('contact_phone', contact_phone ? contact_phone : '');


    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<OrderTotalModel>(this.urls.GetAdminOrderIndenOrderTotal, findhttpOptions)
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

