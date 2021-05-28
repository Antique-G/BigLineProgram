import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GroupCashReqModel } from 'interfaces/admin-cost-manage/admin-group-req-money-model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AdminUrls } from '../../api';
import { EncodeComponent } from '../../app/store-app/store-material/EncodeComponent';
import { CashReqReviwqModel, OrderTotalModel, StoreOrderGroupTravelListRequestModel, TransChangeModel } from '../../interfaces/store/storeOrder/store-order-group-travel-model';


const httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
};

@Injectable({
    providedIn: 'root'
})
export class AdminFinaceGroupService {
    public urls = AdminUrls;

    constructor(public httpClient: HttpClient) { }

    // 跟团游订单列表
    groupTravelList(page: number, per_page: number, status: any, product_name: any, order_number: any,
        date_start: any, date_end: any, product_code: any, store_id: any, order_start_date: any,
        order_end_date: any, contact_name: any, contact_phone: any, payment_status: any,
        transaction_id?: any,pay_type?: any): Observable<StoreOrderGroupTravelListRequestModel> {
        const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
            .set('per_page', per_page.toString())
            .set('status', status ? status : '')
            .set('product_name', product_name ? product_name : '')
            .set('order_number', order_number ? order_number : '')
            .set('date_start', date_start ? date_start : '')
            .set('date_end', date_end ? date_end : '')
            .set('product_code', product_code ? product_code : '')
            .set('store_id', store_id ? store_id : '')
            .set('order_start_date', order_start_date ? order_start_date : '')
            .set('order_end_date', order_end_date ? order_end_date : '')
            .set('contact_name', contact_name ? contact_name : '')
            .set('contact_phone', contact_phone ? contact_phone : '')
            .set('payment_status', payment_status ? payment_status : '')
            .set('transaction_id', transaction_id ? transaction_id : '')
            .set('pay_type', pay_type ? pay_type : '');
        


        const findhttpOptions = {
            headers: new HttpHeaders({ 'content-Type': 'application/json' }),
            params
        };
        return this.httpClient.get<StoreOrderGroupTravelListRequestModel>(this.urls.GetAdminFinanceGroupTravelList, findhttpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    // 确认支付记录
    confrmPayLog(payId: any): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostAdminFinanceOrderConfirm, { pay_id: payId }, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    // 订单统计
    getOrderTotal(status: any, product_name: any, order_number: any,
        date_start: any, date_end: any, product_code: any, store_id: any, order_start_date: any,
        order_end_date: any, contact_name: any, contact_phone: any, payment_status: any, transaction_id?: any,
        pay_type?: any): Observable<OrderTotalModel> {
        const params = new HttpParams({ encoder: new EncodeComponent() }).set('status', status ? status : '')
            .set('product_name', product_name ? product_name : '')
            .set('order_number', order_number ? order_number : '')
            .set('date_start', date_start ? date_start : '')
            .set('date_end', date_end ? date_end : '')
            .set('product_code', product_code ? product_code : '')
            .set('store_id', store_id ? store_id : '')
            .set('order_start_date', order_start_date ? order_start_date : '')
            .set('order_end_date', order_end_date ? order_end_date : '')
            .set('contact_name', contact_name ? contact_name : '')
            .set('contact_phone', contact_phone ? contact_phone : '')
            .set('payment_status', payment_status ? payment_status : '')
            .set('transaction_id', transaction_id ? transaction_id : '')
            .set('pay_type', pay_type ? pay_type : '');


        const findhttpOptions = {
            headers: new HttpHeaders({ 'content-Type': 'application/json' }),
            params
        };
        return this.httpClient.get<OrderTotalModel>(this.urls.GetAdminFinanceGroupTravelToatl, findhttpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }


    // 修改流水信息
    changeTrans(transChangeModel: TransChangeModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostAdminOrderEditReceipt, transChangeModel, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }



    // 团请款
    groupCashList(page: number, per_page: number, group_status: any, payout_status: any, group_id: any, order_number: any,
        product_name: any, store_id: any,): Observable<GroupCashReqModel> {
        const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
            .set('per_page', per_page.toString())
            .set('group_status', group_status ? group_status : '')
            .set('payout_status', payout_status ? payout_status : '')
            .set('group_id', group_id ? group_id : '')
            .set('order_number', order_number ? order_number : '')
            .set('product_name', product_name ? product_name : '')
            .set('store_id', store_id ? store_id : '');



        const findhttpOptions = {
            headers: new HttpHeaders({ 'content-Type': 'application/json' }),
            params
        };
        return this.httpClient.get<GroupCashReqModel>(this.urls.GetAdminFinanceGroupCashList, findhttpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }




    // 请款审核PostAdminFinanceOrderCheckoutCash
    cashReview(cashReqReviwqModel: CashReqReviwqModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostAdminFinanceOrderCheckoutCash, cashReqReviwqModel, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }




    private handleError(error: HttpErrorResponse) {
        console.log('1212', error);
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
