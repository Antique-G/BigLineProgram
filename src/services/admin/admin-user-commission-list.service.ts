import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AdminUrls } from '../../api';
import { EncodeComponent } from '../../app/store-app/store-material/EncodeComponent';
import { AdminUserCommissionListResponseModel, AdminUserWithdrawListResponseModel, AdminUserWithdrawReview, UserCommissionAuditModel, UserCommissionAuditResponseModel } from '../../interfaces/adminUserCommissionList/admin-userCommissionList-model';

const httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
}

@Injectable({
    providedIn: 'root'
})
export class AdminUserCommissionListService {
    public urls = AdminUrls;
    constructor(public httpClient: HttpClient) { }

    //用户分销的佣金列表
    UserCommissionList(page: number, per_page: number, order_id: any, product_name: any, product_code: any, status: any): Observable<AdminUserCommissionListResponseModel> {
        const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
            .set('per_page', per_page.toString())
            .set('order_id', order_id ? order_id : '')
            .set('product_name', product_name ? product_name : '')
            .set('product_code', product_code ? product_code : '')
            .set('status', status ? status : '');

        const findhttpOptions = {
            header: new HttpHeaders({ 'content-Type': 'application/json' }),
            params: params
        }
        return this.httpClient.get<AdminUserCommissionListResponseModel>(this.urls.GetAdminUserCommissionList, findhttpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }



    //佣金审核
    UserCommissionAudit(userCommissionAuditModel: UserCommissionAuditModel): Observable<UserCommissionAuditResponseModel> {
        return this.httpClient.post<UserCommissionAuditResponseModel>(this.urls.PostAdminUserCommissionAudit, userCommissionAuditModel, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }




    //批量佣金审核
    AllUserCommissionAudit(ids: any): Observable<UserCommissionAuditResponseModel> {
        return this.httpClient.post<UserCommissionAuditResponseModel>(this.urls.PostAdminAllUserCommissionAudit, { ids }, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }


    // 用户id
    userOption(keyword: any): Observable<any> {
        const params = new HttpParams().set('keyword', keyword ? keyword : '');
        const findhttpOptions = {
            header: new HttpHeaders({ 'content-Type': 'application/json' }),
            params: params
        }
        return this.httpClient.get<any>(this.urls.GetAdminUserOption, findhttpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }





    //小程序提现审核列表
    UserWithdrawList(page: number, per_page: number, status: any, user_id: any, pay_type: any, payment_no: any, bank_user: any,
        date_start: any, date_end: any, phone: any, check: any): Observable<AdminUserWithdrawListResponseModel> {
        const params = new HttpParams().set('page', page.toString())
            .set('per_page', per_page.toString())
            .set('status', status ? status : '')
            .set('user_id', user_id ? user_id : '')
            .set('pay_type', pay_type ? pay_type : '')
            .set('payment_no', payment_no ? payment_no : '')
            .set('bank_user', bank_user ? bank_user : '')
            .set('date_start', date_start ? date_start : '')
            .set('date_end', date_end ? date_end : '')
            .set('phone', phone ? phone : '')
            .set('check', check ? check : '');

        const findhttpOptions = {
            header: new HttpHeaders({ 'content-Type': 'application/json' }),
            params: params
        }
        return this.httpClient.get<AdminUserWithdrawListResponseModel>(this.urls.GetAdminUserWithdrawList, findhttpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }


    // 审核提现
    withdrawReview(adminUserWithdrawReview: AdminUserWithdrawReview): Observable<any> {
        const id = adminUserWithdrawReview.id;
        return this.httpClient.put(this.urls.PutAdminUserWithdrawReview + id, adminUserWithdrawReview, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }


    // 统计提现
    totalWithdrawal(status: any, user_id: any, pay_type: any, payment_no: any, bank_user: any,
        date_start: any, date_end: any, phone: any, check: any): Observable<any> {
        const params = new HttpParams().set('status', status ? status : '')
            .set('user_id', user_id ? user_id : '')
            .set('pay_type', pay_type ? pay_type : '')
            .set('payment_no', payment_no ? payment_no : '')
            .set('bank_user', bank_user ? bank_user : '')
            .set('date_start', date_start ? date_start : '')
            .set('date_end', date_end ? date_end : '')
            .set('phone', phone ? phone : '')
            .set('check', check ? check : '');

        const findhttpOptions = {
            header: new HttpHeaders({ 'content-Type': 'application/json' }),
            params: params
        }
        return this.httpClient.get<any>(this.urls.GetAdminWithdrawTotal, findhttpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }



    private handleError(error: HttpErrorResponse) {
        console.log("1212", error);
        switch (error.status) {
            case 401:
                // alert(error.message);
                break
        }
        return throwError('');
    }
}
