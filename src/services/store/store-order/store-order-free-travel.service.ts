import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Details, freeProModel, StoreOrderFreeTravelListRequestModel } from '../../../interfaces/store/storeOrder/store-order-free-travel-model';
import { StoreUrls } from '../../../api';
import { ChangeDateRequestModel, ChangeDateResponModel, ChangePriceModel, OrderGroupProduct, ProModel } from '../../../interfaces/store/storeOrder/store-order-group-travel-model';
import { EncodeComponent } from '../../../app/store-app/store-material/EncodeComponent';


const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
}

@Injectable({
  providedIn: 'root'
})


export class StoreOrderFreeTravelService {
  public urls = StoreUrls;

  constructor(public httpClient: HttpClient) { }

  // 自由行订单列表
  freeTravelList(page: number, per_page: number, status: any, product_id: any, product_name: any, order_number: any,
    date_start: any, date_end: any, product_code: any, order_start_date: any, order_end_date: any,contact_name:any,contact_phone:any): Observable<StoreOrderFreeTravelListRequestModel> {
    const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('status', status ? status : '')
      .set('product_id', product_id ? product_id : '')
      .set('product_name', product_name ? product_name : '')
      .set('order_number', order_number ? order_number : '')
      .set('date_start', date_start ? date_start : '')
      .set('date_end', date_end ? date_end : '')
      .set('product_code', product_code ? product_code : '')
      .set('order_start_date', order_start_date ? order_start_date : '')
      .set('order_end_date', order_end_date ? order_end_date : '')
      .set('contact_name', contact_name ? contact_name : '')
      .set('contact_phone', contact_phone ? contact_phone : '');


    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<StoreOrderFreeTravelListRequestModel>(this.urls.GetStoreOrderfreeTravelList, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }



  // 获取详情
  getfreeTravelDetail(id: any) {
    return this.httpClient.get<Details>(this.urls.GetStoreOrderfreeTravelDetail + id, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // 改价
  changePrice(changePriceModel: ChangePriceModel): Observable<any> {
    return this.httpClient.post<any>(this.urls.PostStoreOrderAddPriceDetails, changePriceModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // 订单修改日期获取
  changGetDateFree(order_id: any, new_date: any): Observable<ChangeDateResponModel> {
    const params = new HttpParams().set('order_id', order_id)
      .set('new_date', new_date);

    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<ChangeDateResponModel>(this.urls.GetStoreOrderChangeDate, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // 订单修改日期
  changeDateFree(changeDateRequestModel: ChangeDateRequestModel): Observable<any> {
    return this.httpClient.post<any>(this.urls.PostStoreOrderChangeDate, changeDateRequestModel, httpOptions)
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
    return this.httpClient.get<freeProModel>(this.urls.GetStoreProSearchFree, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 后台下订单
  addOrderGroup(orderGroupProduct: OrderGroupProduct): Observable<any> {
    return this.httpClient.post<any>(this.urls.PostStoreProductOrderGroupFree, orderGroupProduct, httpOptions)
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
