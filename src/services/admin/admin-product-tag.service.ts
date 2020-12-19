import { Injectable } from '@angular/core';
import { AddAdminProductTagRequestModel, AddAdminProductTagResponseModel, AdminProductTagCateListModel, AdminProductTagListRequestModel, UpdateAdminProductRequestModel} from '../../interfaces/adminProduct/ProductTagModel';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AdminUrls } from '../../api';
const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
}
@Injectable({
  providedIn: 'root'
})

export class AdminProductTagService {
  public urls = AdminUrls;

  constructor(public httpClient: HttpClient) { }

  // 产品标签列表
  getProductTagList(page: number, per_page: number, cate_id: any, name: any,status:any): Observable<AdminProductTagListRequestModel> {
    const params = new HttpParams().set('page', page.toString())
    .set('per_page', per_page.toString())
    .set('cate_id', cate_id ? cate_id : '')
    .set('name', name ? name : '')
    .set('status', status ? status : '');
    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };

    return this.httpClient.get<AdminProductTagListRequestModel>(this.urls.GetAdminProductTagList,findhttpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 标签的添加
  createProductTag(addAdminProductTagRequestModel: AddAdminProductTagRequestModel): Observable<AddAdminProductTagResponseModel> {
    return this.httpClient.post<AddAdminProductTagResponseModel>(this.urls.PostAdminProductTagCreate, addAdminProductTagRequestModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // 更新
  updateProductTag(updateAdminProductRequestModel: UpdateAdminProductRequestModel): Observable<any> {
    const id = updateAdminProductRequestModel.id;
    return this.httpClient.put(this.urls.PutAdminProductTagUpdate + id, updateAdminProductRequestModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 删除
  deleteProductTag(id: any): Observable<any> {
    return this.httpClient.delete<any>(this.urls.DeleteAdminProductTag + id, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 标签的分类列表
  getProdectCateList(): Observable<AdminProductTagCateListModel> {
    return this.httpClient.get<AdminProductTagCateListModel>(this.urls.GetAdminProdectCateList,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
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
