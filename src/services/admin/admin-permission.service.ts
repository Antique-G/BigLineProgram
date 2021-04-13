import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EncodeComponent } from '../../app/store-app/store-material/EncodeComponent';
import { AddPermissionRequestModel, AddPermissionResponseModel, AdminPermissionListResponseModel, PermissionParentListModel} from '../../interfaces/adminPermission/admin-permission-model';
import { AdminUrls } from '../../api';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
}

@Injectable({
  providedIn: 'root'
})
export class AdminPermissionService {
  public urls = AdminUrls;
  constructor(public httpClient: HttpClient) { }

   //权限列表
  permissionList(page: number, per_page: number, keyword: any): Observable<AdminPermissionListResponseModel> {
    const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('keyword', keyword ? keyword : '');
    const findhttpOptions = {
      header: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<AdminPermissionListResponseModel>(this.urls.GetAdminPermissionList, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // 权限添加
  addPermission(addPermissionRequestModel: AddPermissionRequestModel): Observable<AddPermissionResponseModel> {
    return this.httpClient.post<AddPermissionResponseModel>(this.urls.PostAdminPermissionadd, addPermissionRequestModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


   //权限父级列表
  permissionParentList(): Observable<PermissionParentListModel> {
    return this.httpClient.get<PermissionParentListModel>(this.urls.GetAdminPermissionList, httpOptions)
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
