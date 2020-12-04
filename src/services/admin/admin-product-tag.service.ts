import { Injectable } from '@angular/core';
import {ProductTagModel,ProductResponseTagModel,ProductResponseCateListModel} from '../../interfaces/adminProduct/ProductTagModel';
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

  // 获取产品标签列表
  getProductTagList(){
    // const params = new HttpParams().set('page', page.toString())
    // .set('per_page', per_page.toString())
    // .set('keyword',keyword?keyword:'');

    // const findhttpOptions = {
    //   headers: new HttpHeaders({ 'content-Type': 'application/json' }),
    //   params: params
    // };

    return this.httpClient.get<ProductResponseTagModel>(this.urls.GetAdminProdectTagList, httpOptions)
      .pipe(
        catchError(this.handleError)
      )

  }  

  // 添加产品
  createProduct(productTagModel: ProductTagModel): Observable<ProductResponseTagModel> {
    return this.httpClient.post<ProductResponseTagModel>(this.urls.PostAdminProductTagCreate, productTagModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 获取产品分类
  getCateList(){
    return this.httpClient.get<ProductResponseCateListModel>(this.urls.GetAdminProdectCateList,httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    console.log("1212", error);
    switch (error.status) {
      case 401:
        alert(error.message);
        break
     
    }
    return throwError('');
  }

}
