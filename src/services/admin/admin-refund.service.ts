import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AdminUrls } from '../../api';
import { EncodeComponent } from '../../app/store-app/store-material/EncodeComponent';
import { AdminRefundCheckDataModel, AdminRefundLogEditModel, CreateReundModel, RefundDetailModel, RefundFinished, RefundListModel, RefundModel, RefundPayLog, ReundCheckModel } from '../../interfaces/store/storeRefund/storerefund';


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
    getRefundList(page: number, per_page: number, order_id: any, store_id: any, product_name: any, date_start: any, date_end: any, id: any, status: any, check_status?: any): Observable<RefundModel> {
        const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
            .set('per_page', per_page.toString())
            .set('order_id', order_id ? order_id : '')
            .set('store_id', store_id ? store_id : '')
            .set('product_name', product_name ? product_name : '')
            .set('date_start', date_start ? date_start : '')
            .set('date_end', date_end ? date_end : '')
            .set('id', id ? id : '')
            .set('status', status ? status : '')
            .set('check_status', check_status ? check_status : '');



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
    createRefund(reundCheckModel: ReundCheckModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostAdminRefund, reundCheckModel, httpOptions)
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


    //  退款流水列表
    getRefundLog(page: number, per_page: number, order_id: any, store_id: any, refund_id: any, transaction_id: any, status: any, date_start: any, date_end: any): Observable<RefundListModel> {
        const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
            .set('per_page', per_page.toString())
            .set('order_id', order_id ? order_id : '')
            .set('store_id', store_id ? store_id : '')
            .set('refund_id', refund_id ? refund_id : '')
            .set('transaction_id', transaction_id ? transaction_id : '')
            .set('status', status ? status : '')
            .set('date_start', date_start ? date_start : '')
            .set('date_end', date_end ? date_end : '');
        const findhttpOptions = {
            headers: new HttpHeaders({ 'content-Type': 'application/json' }),
            params: params
        };
        return this.httpClient.get<RefundListModel>(this.urls.GetAdminRefundLog, findhttpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }


    //重新获取退款结果
    postReRefund(id: any): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostAdminReRefund, { id }, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }


    // 变更退款流水信息
    postAdminRefundLogEdit(adminRefundLogEditModel: AdminRefundLogEditModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostAdminRefundLogEdit, adminRefundLogEditModel, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }


    // 主管审核退款
    postAdminRefundDataCheck(adminRefundCheckDataModel: AdminRefundCheckDataModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostAdminRefundDataCheck, adminRefundCheckDataModel, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }



    // 财务退款 统计
    getRefundAmountTotal(page: number, per_page: number, order_id: any, store_id: any, product_name: any, date_start: any, date_end: any, id: any, status: any, check_status?: any): Observable<any> {
        const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
            .set('per_page', per_page.toString())
            .set('order_id', order_id ? order_id : '')
            .set('store_id', store_id ? store_id : '')
            .set('product_name', product_name ? product_name : '')
            .set('date_start', date_start ? date_start : '')
            .set('date_end', date_end ? date_end : '')
            .set('id', id ? id : '')
            .set('status', status ? status : '')
            .set('check_status', check_status ? check_status : '');



        const findhttpOptions = {
            headers: new HttpHeaders({ 'content-Type': 'application/json' }),
            params: params
        };
        return this.httpClient.get<any>(this.urls.GetAdminRefundAmountTotal, findhttpOptions)
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
