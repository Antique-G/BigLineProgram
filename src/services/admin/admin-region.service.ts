import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AdminUrls } from '../../api';
import { AddAdminRegionListRequestModel, AdminRegionDetailResponseModel, AdminRegionListResponseModel, AdminRegionModel, AdminRegionResponseModel, AdminRegionUploadRequestModel, AdminRegionUploadResponseModel, UpdateAdminRegionListRequestModel } from '../../interfaces/adminRegion/admin-region-model';


const httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
};


@Injectable({
    providedIn: 'root'
})
export class AdminRegionService {
    public urls = AdminUrls;

    constructor(public httpClient: HttpClient) { }


    // 区域三级联动数据
    getAllRegionList(level?: any): Observable<AdminRegionModel[]> {
        const params = new HttpParams().set('level', level ? level : 3);
        const findhttpOptions = {
            headers: new HttpHeaders({ 'content-Type': 'application/json' }),
            params: params
        };
        return this.httpClient.get<AdminRegionModel[]>(this.urls.GetAdminAllRegions, findhttpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    // 区域列表
    regionList(page: number, per_page: number, keyword: any, parent_code: any): Observable<AdminRegionListResponseModel> {
        const params = new HttpParams().set('page', page.toString())
            .set('per_page', per_page.toString())
            .set('keyword', keyword ? keyword : '')
            .set('parent_code', parent_code ? parent_code : '');

        const findhttpOptions = {
            headers: new HttpHeaders({ 'content-Type': 'application/json' }),
            params: params
        };
        return this.httpClient.get<AdminRegionListResponseModel>(this.urls.GetAdminRegionList, findhttpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }


    // 添加
    addRegion(addAdminRegionListRequestModel: AddAdminRegionListRequestModel): Observable<AdminRegionResponseModel> {
        return this.httpClient.post<AdminRegionResponseModel>(this.urls.PostAdminRegionCreate, addAdminRegionListRequestModel, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }


    // 更新
    updateRegion(updateAdminRegionListRequestModel: UpdateAdminRegionListRequestModel): Observable<AdminRegionResponseModel> {
        const id = updateAdminRegionListRequestModel.id;
        return this.httpClient.put(this.urls.PutAdminRegionUpdate + id, updateAdminRegionListRequestModel, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }


    // 详情
    regionDetail(region_id: any): Observable<AdminRegionDetailResponseModel> {
        return this.httpClient.get<AdminRegionDetailResponseModel>(this.urls.GetAdminRegionDetail + region_id, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }

    //上传图片
    adminUpload(adminRegionUploadRequestModel: AdminRegionUploadRequestModel) {
        return this.httpClient.post<AdminRegionUploadResponseModel>(this.urls.PostAdminUpload, adminRegionUploadRequestModel, httpOptions)
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

        // if (error.error instanceof ErrorEvent) {
        //   // 客户端本身引起的错误信息
        //   alert()

        //   console.error(`客户端错误：${error.error.message}`);
        // } else {
        //   // 服务端返回的错误信息
        //   console.error(`服务端错误：HTTP 状态码：${error.status} \n\r 错误信息：${JSON.stringify(error.error)}`);
        // }

        // 反馈给用户的错误信息（用于组件中使用 error 回调时的错误提示）
        return throwError('');
    }

}
