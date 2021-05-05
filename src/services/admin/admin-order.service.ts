import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EditInfoModel, EditMemberModel, GroupSmsModel, MoveOrderModel, OrderGroupNum, OrderSmsModel, SetGuideModel, ShuffOrderModel, StoreOrderDetailRequestModel, StoreOrderListRequestModel } from '../../interfaces/store/storeOrder/store-order-model';
import { AdminUrls } from '../../api';
import { GetGuideListModel } from '../../interfaces/store/storeTourist/store-tourist-model';
import { EncodeComponent } from '../../app/store-app/store-material/EncodeComponent';



const httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
}

@Injectable({
    providedIn: 'root'
})
export class AdminOrderService {
    public urls = AdminUrls;

    constructor(public httpClient: HttpClient) { }

    // 订单团列表
    getStoreOrderGroup(page: number, per_page: number, product_id: any, product_name: any, group_id: any, order_number: any,
        destination_city: any, date_start: any, date_end: any, group_status: any, group_code: any, store_id: any): Observable<StoreOrderListRequestModel> {
        const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
            .set('per_page', per_page.toString())
            .set('product_id', product_id ? product_id : '')
            .set('product_name', product_name ? product_name : '')
            .set('group_id', group_id ? group_id : '')
            .set('order_number', order_number ? order_number : '')
            .set('destination_city', destination_city ? destination_city : '')
            .set('date_start', date_start ? date_start : '')
            .set('date_end', date_end ? date_end : '')
            .set('group_status', group_status ? group_status : '')
            .set('group_code', group_code ? group_code : '')
            .set('store_id', store_id ? store_id : '');


        const findhttpOptions = {
            headers: new HttpHeaders({ 'content-Type': 'application/json' }),
            params: params
        };
        return this.httpClient.get<StoreOrderListRequestModel>(this.urls.GetAdminOrderGroupList, findhttpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }


    // 获取产品详情
    getOrderGroupDetail(id: any) {
        return this.httpClient.get<StoreOrderDetailRequestModel>(this.urls.GetAdminOrderGroupDetail + id, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }




    // 派遣导游
    setGuide(setGuideModel: SetGuideModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostAdminOrderGroupSetGuide, setGuideModel, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }

    //获取导游数据 
    getGuide(): Observable<GetGuideListModel> {
        return this.httpClient.get<GetGuideListModel>(this.urls.GetAdminOrderGroupGuideList, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    // 移动订单
    moveOrder(moveOrderModel: MoveOrderModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostAdminOrderGroupMoveOrder, moveOrderModel, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }


    // 不成团关团
    shutoff(shuffOrderModel: ShuffOrderModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostAdminOrderGroupShutoff, shuffOrderModel, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }


    // 发送订单预定成功通知短信
    orderSms(orderSmsModel: OrderSmsModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostAdminOrderGroupOrderSms, orderSmsModel, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }


    // 发送出团通知短信
    groupSms(groupSmsModel: GroupSmsModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostAdminOrderGroupGroupSms, groupSmsModel, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }

    // 删除子团
    deleteSubGroup(sub_group_id: any): Observable<any> {
        return this.httpClient.delete<any>(this.urls.DeletetAdminOrderGroupSubGroup + sub_group_id, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }

    // 发送不成团通知短信
    cancel(orderSmsModel: OrderSmsModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostAdminOrderGroupCancelSms, orderSmsModel, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }


    //设置出团人数限制
    groupNum(orderGroupNum: OrderGroupNum): Observable<any> {
        const id = orderGroupNum.id;
        return this.httpClient.put<any>(this.urls.PutAdminOrderGroupNum + id, orderGroupNum, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }

    // 修改出行人信息
    editMember(editMemberModel: EditMemberModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostAdminEditMember, editMemberModel, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }

    // 修改订单信息
    editInfo(editInfoModel: EditInfoModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostAdminOrderEditInfo, editInfoModel, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }


    // 投保
    effectIns(order_id: any): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostAdminEffectIns, { order_id }, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }


    // 恢复订单
    recoverInfo(order_id: any): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostAdminOrderRecover, { order_id }, httpOptions)
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

