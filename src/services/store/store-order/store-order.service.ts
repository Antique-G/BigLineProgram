import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StoreUrls } from '../../../api';
import { StoreOrderListRequestModel } from '../../../interfaces/store/storeOrder/store-order-model';

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
  getStoreOrderGroup(page: number, per_page: number, status: any, name: any, mobile: any): Observable<StoreOrderListRequestModel> {
    const params = new HttpParams().set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('status', status ? status : '')
      .set('name', name ? name : '')
      .set('mobile', mobile ? mobile : '');
    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<StoreOrderListRequestModel>(this.urls.GetStoreOrderGroupList, findhttpOptions)
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
