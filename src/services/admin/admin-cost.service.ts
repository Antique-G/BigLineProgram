import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminUrls } from '../../api';
import { EncodeComponent } from '../../app/store-app/store-material/EncodeComponent';
import { Observable, throwError } from 'rxjs';
import { SupplyAddRequestModel } from '../../interfaces/admin-cost-manage/admin-cost-model';
import { catchError } from 'rxjs/operators';



const httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
};


@Injectable({
    providedIn: 'root'
})
export class AdminCostService {

    public urls = AdminUrls;
    constructor(public httpClient: HttpClient) { }


    // 列表
    getSupplyList(page: number, per_page: number, status: any, supplier_name: any): Observable<any> {
        const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
            .set('per_page', per_page.toString())
            .set('status', status ? status : '')
            .set('supplier_name', supplier_name ? supplier_name : '');
        const findhttpOptions = {
            headers: new HttpHeaders({ 'content-Type': 'application/json' }),
            params
        };
        return this.httpClient.get<any>(this.urls.GetAdminSupplyList, findhttpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }



    // 添加
    addSupply(supplyAddRequestModel: SupplyAddRequestModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostAdminSupplyAdd, supplyAddRequestModel, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    // 更新
    updateSupply(supplyAddRequestModel: SupplyAddRequestModel): Observable<any> {
        const id = supplyAddRequestModel.id;
        return this.httpClient.put(this.urls.PutAdminSupplyUpdate + id, supplyAddRequestModel, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }


    private handleError(error: HttpErrorResponse) {
        console.log('1212', error);
        switch (error.status) {
            case 401:
                break;
            case 400:
                break;

        }
        return throwError('');
    }
}
