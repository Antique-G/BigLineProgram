import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EncodeComponent } from '../../../app/store-app/store-material/EncodeComponent';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StoreUrls } from '../../../api';
import { FreeSaleListModel, PreSaleDetailModel } from '../../../interfaces/store/storePreSale/store-pre-sale-model';


const httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
}


@Injectable({
    providedIn: 'root'
})
export class StorePreSaleService {

    public urls = StoreUrls;

    constructor(public httpClient: HttpClient) { }


    // 自由行预售订单列表
    groupPreFreeSaleList(page: number, per_page: number, use_status: any, product_name: any, order_id: any,
        date_start: any, date_end: any, code: any, use_date_start: any, use_date_end: any,
        name: any, phone: any): Observable<FreeSaleListModel> {
        const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
            .set('per_page', per_page.toString())
            .set('use_status', use_status ? use_status : '')
            .set('product_name', product_name ? product_name : '')
            .set('order_id', order_id ? order_id : '')
            .set('date_start', date_start ? date_start : '')
            .set('date_end', date_end ? date_end : '')
            .set('code', code ? code : '')
            .set('use_date_start', use_date_start ? use_date_start : '')
            .set('use_date_end', use_date_end ? use_date_end : '')
            .set('name', name ? name : '')
            .set('phone', phone ? phone : '')


        const findhttpOptions = {
            headers: new HttpHeaders({ 'content-Type': 'application/json' }),
            params: params
        };
        return this.httpClient.get<FreeSaleListModel>(this.urls.GetStoreOrderTicket, findhttpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }

    // 详情
    getStoreOrderTicketDetail(id: any) {
        return this.httpClient.get<PreSaleDetailModel>(this.urls.GetStoreOrderTicketDetail + id, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }


    // 预约码管理
    getCodeList(page: any, per_page: any, order_id: any, user_id: any, ticket_order_id: any, status: any, transaction_id: any,
        code: any, product_name: any, name: any,
        phone: any, use_date_start: any, use_date_end: any, date_start: any, date_end: any): Observable<any> {
        const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
            .set('per_page', per_page.toString())
            .set('order_id', order_id ? order_id : '')
            .set('user_id', user_id ? user_id : '')
            .set('ticket_order_id', ticket_order_id ? ticket_order_id : '')
            .set('status', status ? status : '')
            .set('transaction_id', transaction_id ? transaction_id : '')
            .set('code', code ? code : '')
            .set('product_name', product_name ? product_name : '')
            .set('name', name ? name : '')
            .set('phone', phone ? phone : '')
            .set('use_date_start', use_date_start ? use_date_start : '')
            .set('use_date_end', use_date_end ? use_date_end : '')
            .set('date_start', date_start ? date_start : '')
            .set('date_end', date_end ? date_end : '');

        const findhttpOptions = {
            headers: new HttpHeaders({ 'content-Type': 'application/json' }),
            params: params
        };
        return this.httpClient.get<any>(this.urls.GetStoreOrderTicketCode, findhttpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }

    //   预约码详情  
    getTicketCodeDetail(id: any) {
        return this.httpClient.get<any>(this.urls.GetStoreOrderTicketCodeDetail + id, httpOptions)
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
