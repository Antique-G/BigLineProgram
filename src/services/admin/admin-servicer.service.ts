import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AdminRegionModel } from '../../interfaces/adminRegion/admin-region-model';
import { AdminUrls } from '../../api';
import { catchError } from 'rxjs/operators';
import { AdminRegionServiceListResponseModel, AdminRegionServiceModel } from '../../interfaces/admin-servicer/admin-servicer-model';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};

@Injectable({
  providedIn: 'root'
})

export class AdminServicerService {
  public urls = AdminUrls;
  constructor(public httpClient: HttpClient) { }

  // 区域三级联动数据
  getAllRegionList(): Observable<AdminRegionModel[]> {
    return this.httpClient.get<AdminRegionModel[]>(this.urls.GetAdminAllRegions, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 区域客服列表
  regionServiceList(page: number, per_page: number, region_code: any, phone: any): Observable<AdminRegionServiceListResponseModel> {
    const params = new HttpParams().set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('region_code', region_code ? region_code : '')
      .set('phone', phone ? phone : '');

    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<AdminRegionServiceListResponseModel>(this.urls.GetAdminRegionService, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 添加
  addRegionService(adminRegionServiceModel: AdminRegionServiceModel): Observable<any> {
    return this.httpClient.post<any>(this.urls.PostAdminRegionServiceCreate, adminRegionServiceModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // 更新
  updateRegionService(adminRegionServiceModel: AdminRegionServiceModel): Observable<any> {
    const id = adminRegionServiceModel.id;
    return this.httpClient.put(this.urls.PutAdminRegion + id, adminRegionServiceModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 删除
  deleteRegionService(id: any): Observable<any> {
    return this.httpClient.delete<any>(this.urls.DeleteAdminRegionService + id, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public handleError(error: HttpErrorResponse) {
    console.log("1212", error);
    switch (error.status) {
      case 401:

        break
    }

    return throwError('');
  }

}
