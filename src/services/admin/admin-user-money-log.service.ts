import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AdminUrls } from '../../api';
import { AdminUserMoneyLogListResponseModel } from '../../interfaces/adminUserMoneyLog/admin-user-money-log-model';

const httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
}

@Injectable({
    providedIn: 'root'
})
export class AdminUserMoneyLogService {

    public urls = AdminUrls;
    constructor(public httpClient: HttpClient) { }

    //金额变动记录
    UserWithdrawList(page: number, per_page: number, type: any, search_value: any, search_type?: any): Observable<AdminUserMoneyLogListResponseModel> {
        const params = new HttpParams().set('page', page.toString()).
            set('per_page', per_page.toString()).
            set('type', type ? type : '').
            set('search_value', search_value ? search_value : '').
            set('search_type', search_type ? search_type : '');

        const findhttpOptions = {
            header: new HttpHeaders({ 'content-Type': 'application/json' }),
            params: params
        }
        return this.httpClient.get<AdminUserMoneyLogListResponseModel>(this.urls.GetAdminUserMoneyLogList, findhttpOptions)
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
