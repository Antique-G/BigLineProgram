import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GetGuideListModel } from '../../../interfaces/store/storeTourist/store-tourist-model';
import { StoreUrls } from '../../../api';
import { GroupSmsModel, MoveOrderModel, OrderGroupNum, OrderSmsModel, SetGuideModel, ShuffOrderModel, StoreOrderDetailRequestModel, StoreOrderListRequestModel } from '../../../interfaces/store/storeOrder/store-order-model';
import { EncodeComponent } from '../../../app/store-app/store-material/EncodeComponent';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};

@Injectable({
  providedIn: 'root'
})
export class StoreOrderService {
  public urls = StoreUrls;

  constructor(public httpClient: HttpClient) { }

  // 订单团列表
  getStoreOrderGroup(page: number, per_page: number, product_id: any, product_name: any, group_id: any, order_number: any,
                     destination_city: any, date_start: any, date_end: any, payout_status: any): Observable<StoreOrderListRequestModel> {
    const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('product_id', product_id ? product_id : '')
      .set('product_name', product_name ? product_name : '')
      .set('group_id', group_id ? group_id : '')
      .set('order_number', order_number ? order_number : '')
      .set('destination_city', destination_city ? destination_city : '')
      .set('date_start', date_start ? date_start : '')
      .set('date_end', date_end ? date_end : '')
      .set('payout_status', payout_status ? payout_status : '');


    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params
    };
    return this.httpClient.get<StoreOrderListRequestModel>(this.urls.GetStoreOrderGroupList, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 获取产品详情
  getOrderGroupDetail(id: any) {
    return this.httpClient.get<StoreOrderDetailRequestModel>(this.urls.GetStoreOrderGroupDetail + id, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 派遣导游
  setGuide(setGuideModel: SetGuideModel): Observable<any> {
    return this.httpClient.post<any>(this.urls.PostStoreOrderGroupSetGuide, setGuideModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取导游数据
  getGuide(): Observable<GetGuideListModel> {
    return this.httpClient.get<GetGuideListModel>(this.urls.GetStoreOrderGroupGuideList, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 移动订单
  moveOrder(moveOrderModel: MoveOrderModel): Observable<any> {
    return this.httpClient.post<any>(this.urls.PostStoreOrderGroupMoveOrder, moveOrderModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 不成团关团
  shutoff(shuffOrderModel: ShuffOrderModel): Observable<any> {
    return this.httpClient.post<any>(this.urls.PostStoreOrderGroupShutoff, shuffOrderModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 发送订单预定成功通知短信
  orderSms(orderSmsModel: OrderSmsModel): Observable<any> {
    return this.httpClient.post<any>(this.urls.PostStoreOrderGroupOrderSms, orderSmsModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 发送出团通知短信
  groupSms(groupSmsModel: GroupSmsModel): Observable<any> {
    return this.httpClient.post<any>(this.urls.PostStoreOrderGroupGroupSms, groupSmsModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 删除子团
  deleteSubGroup(sub_group_id: any): Observable<any> {
    return this.httpClient.delete<any>(this.urls.DeletetStoreOrderGroupSubGroup + sub_group_id, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 发送不成团通知短信
  cancel(orderSmsModel: OrderSmsModel): Observable<any> {
    return this.httpClient.post<any>(this.urls.PostStoreOrderGroupCancelSms, orderSmsModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 设置出团人数限制
  groupNum(orderGroupNum: OrderGroupNum): Observable<any> {
    const id = orderGroupNum.id;
    return this.httpClient.put<any>(this.urls.PutStoreOrderGroupNum + id, orderGroupNum, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.log('1212', error);
    switch (error.status) {
      case 401:
        break;

    }
    return throwError('');
  }
}
