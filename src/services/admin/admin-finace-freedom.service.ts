import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderTotalModel } from 'interfaces/store/storeOrder/store-order-group-travel-model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AdminUrls } from '../../api';
import { EncodeComponent } from '../../app/store-app/store-material/EncodeComponent';
import { StoreOrderFreeTravelListRequestModel } from '../../interfaces/store/storeOrder/store-order-free-travel-model';


const httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
}


@Injectable({
    providedIn: 'root'
})
export class AdminFinaceFreedomService {
    public urls = AdminUrls;


    constructor(public httpClient: HttpClient) { }


    // 自由行订单列表
    freeTravelList(page: number, per_page: number, status: any, product_id: any, product_name: any, order_number: any,
        date_start: any, date_end: any, product_code: any, store_id: any, order_start_date: any,
        order_end_date: any, contact_name: any, contact_phone: any, payment_status: any,
        transaction_id?: any, pay_type?: any): Observable<StoreOrderFreeTravelListRequestModel> {
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
            .set('contact_phone', contact_phone ? contact_phone : '')
            .set('payment_status', payment_status ? payment_status : '')
            .set('transaction_id', transaction_id ? transaction_id : '')
            .set('pay_type', pay_type ? pay_type : '');



        const findhttpOptions = {
            headers: new HttpHeaders({ 'content-Type': 'application/json' }),
            params: params
        };
        return this.httpClient.get<StoreOrderFreeTravelListRequestModel>(this.urls.GetAdminFinanceFreeTravelList, findhttpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }

    // 确认支付记录
    confrmPayLog(payId: any): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostAdminFinanceOrderConfirm, { pay_id: payId }, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }

    // 订单统计
    getIndenOrderTotal(status: any, product_id: any, product_name: any, order_number: any,
        date_start: any, date_end: any, product_code: any, store_id: any, order_start_date: any,
        order_end_date: any, contact_name: any, contact_phone: any, payment_status: any,
        transaction_id?: any, pay_type?: any): Observable<OrderTotalModel> {
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
            .set('contact_phone', contact_phone ? contact_phone : '')
            .set('payment_status', payment_status ? payment_status : '')
            .set('transaction_id', transaction_id ? transaction_id : '')
            .set('pay_type', pay_type ? pay_type : '');



        const findhttpOptions = {
            headers: new HttpHeaders({ 'content-Type': 'application/json' }),
            params: params
        };
        return this.httpClient.get<OrderTotalModel>(this.urls.GetAdminFinanceFreeTravelToatl, findhttpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }


    // 自由行请款
    freeCashList(page: number, per_page: number, status: any, payout_status: any,
        pay_status: any, order_number: any, product_name: any, store_id: any,
        date_start: any, date_end: any): Observable<any> {
        const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
            .set('per_page', per_page.toString())
            .set('status', status ? status : '')
            .set('payout_status', payout_status ? payout_status : '')
            .set('pay_status', pay_status ? pay_status : '')
            .set('order_number', order_number ? order_number : '')
            .set('product_name', product_name ? product_name : '')
            .set('store_id', store_id ? store_id : '')
            .set('date_start', date_start ? date_start : '')
            .set('date_end', date_end ? date_end : '');


        const findhttpOptions = {
            headers: new HttpHeaders({ 'content-Type': 'application/json' }),
            params: params
        };
        return this.httpClient.get<any>(this.urls.GetAdminFinanceFreeCashList, findhttpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }



    // 自由行请款统计
    freeCashTotal(page: number, per_page: number, status: any, payout_status: any,
        pay_status: any, order_number: any, product_name: any, store_id: any,
        date_start: any, date_end: any): Observable<any> {
        const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
            .set('per_page', per_page.toString())
            .set('status', status ? status : '')
            .set('payout_status', payout_status ? payout_status : '')
            .set('pay_status', pay_status ? pay_status : '')
            .set('order_number', order_number ? order_number : '')
            .set('product_name', product_name ? product_name : '')
            .set('store_id', store_id ? store_id : '')
            .set('date_start', date_start ? date_start : '')
            .set('date_end', date_end ? date_end : '');


        const findhttpOptions = {
            headers: new HttpHeaders({ 'content-Type': 'application/json' }),
            params: params
        };
        return this.httpClient.get<any>(this.urls.GetAdminFreeCashTotal, findhttpOptions)
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
