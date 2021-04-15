import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EncodeComponent } from '../../app/store-app/store-material/EncodeComponent';
import { AdminUrls } from '../../api';
import { AddRoleRequestModel, AddRoleResponseModel, AdminRoleListResponseModel, PermissionTreeListModel, UpdateRoleRequestModel,  } from '../../interfaces/admin-role/admin-role-model';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
}

@Injectable({
  providedIn: 'root'
})
export class AdminRoleService {
  public urls = AdminUrls;
  constructor(public httpClient: HttpClient) { }

  //角色列表
  roleList(page: number, per_page: number, keyword: any): Observable<AdminRoleListResponseModel> {
    const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('keyword', keyword ? keyword : '');
    const findhttpOptions = {
      header: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<AdminRoleListResponseModel>(this.urls.GetAdminRoleList, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  //权限的树状列表
  permissionTreeList(): Observable<PermissionTreeListModel> {
    return this.httpClient.get<PermissionTreeListModel>(this.urls.GetPermissionTree, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // 角色添加
  addRole(addRoleRequestModel: AddRoleRequestModel): Observable<AddRoleResponseModel> {
    return this.httpClient.post<AddRoleResponseModel>(this.urls.PostAdminRoleCreate, addRoleRequestModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // 角色修改
  updateRole(updateRoleRequestModel: UpdateRoleRequestModel): Observable<any> {
    const id = updateRoleRequestModel.id;
    return this.httpClient.put(this.urls.PutAdminRoleUpdate + id, updateRoleRequestModel, httpOptions)
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
