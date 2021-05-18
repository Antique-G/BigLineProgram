import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EncodeComponent } from '../../../app/store-app/store-material/EncodeComponent';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StoreUrls } from '../../../api';
import { AddTypeRequestModel } from '../../../interfaces/admin-cost-manage/admin-cost-model';



const httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
};



@Injectable({
    providedIn: 'root'
})
export class StoreCostService {
    public urls = StoreUrls;

    constructor(public httpClient: HttpClient) { }

    // 列表
    getTypeList(page: number, per_page: number, status: any): Observable<any> {
        const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
            .set('per_page', per_page.toString())
            .set('status', status ? status : '');

        const findhttpOptions = {
            headers: new HttpHeaders({ 'content-Type': 'application/json' }),
            params
        };
        return this.httpClient.get<any>(this.urls.GetStoreCostType, findhttpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }


    // 添加
    addType(addTypeRequestModel: AddTypeRequestModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostStoreCostTypeAdd, addTypeRequestModel, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }


    // 更新
    updateType(addTypeRequestModel: AddTypeRequestModel): Observable<any> {
        const id = addTypeRequestModel.id;
        return this.httpClient.put(this.urls.PutStoreCostTypeUpdate + id, addTypeRequestModel, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }


    // 删除
    deleteType(id: any): Observable<any> {
        return this.httpClient.delete<any>(this.urls.DeleteStoreCostType + id, httpOptions)
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
