import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EncodeComponent } from '../../app/store-app/store-material/EncodeComponent';
import { AdminUrls } from '../../api';
import { ChangeDateRequestModel, ChangeDateResponModel, ChangePriceModel, ComfirmOrderModel, DetailModel, OrderGroupProduct, OrderTotalModel, ProModel, StoreOrderGroupTravelListRequestModel, WeChatModel } from '../../interfaces/store/storeOrder/store-order-group-travel-model';



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
    date_start: any, date_end: any, product_code: any, store_id: any, order_start_date: any, order_end_date: any, contact_name: any, contact_phone: any): Observable<StoreOrderGroupTravelListRequestModel> {
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

  // 产品搜索
  getPro(page: number, per_page: number, title: any, start_date: any, departure_city: any,
    destination_city: any, few_days: any, sort_field?: any, sort?: any): Observable<ProModel> {
    const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('title', title ? title : '')
      .set('start_date', start_date ? start_date : '')
      .set('departure_city', departure_city ? departure_city : '')
      .set('destination_city', destination_city ? destination_city : '')
      .set('few_days', few_days ? few_days : '')
      .set('sort_field', sort_field ? sort_field : '')
      .set('sort', sort ? sort : '');

    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<ProModel>(this.urls.GetAdminProSearch, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 后台下订单
  addOrderGroup(orderGroupProduct: OrderGroupProduct): Observable<any> {
    return this.httpClient.post<any>(this.urls.PostAdminProductOrderGroup, orderGroupProduct, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 确认收款
  comfirmOrder(comfirmOrderModel: ComfirmOrderModel): Observable<any> {
    return this.httpClient.post<any>(this.urls.PostAdminOrderConfirmReceipt, comfirmOrderModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 微信二维码收款
  orderGetPayWechatQr(weChatModel: WeChatModel): Observable<any> {
    return this.httpClient.post<any>(this.urls.PostAdminOrderGetWeChatPayQr, weChatModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 支付宝二维码收款
  // orderGetAlipayQr(weChatModel: WeChatModel): Observable<any> {
  //   return this.httpClient.post<any>(this.urls.GetAdminOrderAlipayCode, weChatModel, httpOptions)
  //     .pipe(
  //       catchError(this.handleError)
  //     )
  // }
  orderGetAlipayQr(order_id: any): Observable<any> {
    const params = new HttpParams().set('order_id', order_id)
    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<any>(this.urls.GetAdminOrderAlipayCode, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 订单修改日期获取
  changGetDateGroup(order_id: any, new_date: any): Observable<ChangeDateResponModel> {
    const params = new HttpParams().set('order_id', order_id)
      .set('new_date', new_date);

    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<ChangeDateResponModel>(this.urls.GetAdminOrderChangeDate, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // 订单修改日期
  changeDateGroup(changeDateRequestModel: ChangeDateRequestModel): Observable<any> {
    return this.httpClient.post<any>(this.urls.PostAdminOrderChangeDate, changeDateRequestModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }



  // 订单统计
  getOrderTotal(status: any, product_id: any, product_name: any, order_number: any,
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
    return this.httpClient.get<OrderTotalModel>(this.urls.GetAdminOrderOrderTotal, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }



  // 改价
  changePrice(changePriceModel: ChangePriceModel): Observable<any> {
    return this.httpClient.post<any>(this.urls.PostAdminOrderAddPriceDetails, changePriceModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }



  // 订单导出
  exportExcel(page: number, per_page: number, status: any, product_id: any, product_name: any, order_number: any,
    date_start: any, date_end: any, product_code: any, store_id: any, order_start_date: any, order_end_date: any, contact_name: any, contact_phone: any): Observable<any> {
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
    return this.httpClient.get<any>(this.urls.GetAdminOrderExport, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  private handleError(error: HttpErrorResponse) {
    console.log("1212", error);
    switch (error.status) {
      case 401:
        break;
      case 404:
        break;
      case 422:
        break;
    }
    return throwError('');
  }
}

