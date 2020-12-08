import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { StoreUrls } from '../../../api';
import { ProductModel, ProductResponseModel, ProductModelRequestModel, ProductResponseListResponseModel, ProductDateilResponseModel } from '../../../interfaces/store/storeProduct/ProductModel';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};


@Injectable({
  providedIn: 'root'
})
export class StoreProductService {
  public urls = StoreUrls;

  constructor(public httpClient: HttpClient) { }

  // 获取产品列表
  getProduct(page: number, per_page: number, keyword: any): Observable<ProductResponseListResponseModel> {
    const params = new HttpParams().set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('keyword', keyword ? keyword : '');

    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };

    return this.httpClient.get<ProductResponseListResponseModel>(this.urls.GetStoreProductList, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // 添加产品
  createProduct(productModel: ProductModel): Observable<ProductResponseModel> {
    return this.httpClient.post<ProductResponseModel>(this.urls.PostStoreProductCreate, productModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // 获取产品详情
  getProductDetail(id: any) {
    return this.httpClient.get<ProductDateilResponseModel>(this.urls.GetStoreProductDetail + id, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // 修改产品
  updateProduct(productModel: ProductModel) {
    return this.httpClient.put<ProductResponseModel>(this.urls.PutStoreProductUpdate + productModel.id, productModel, httpOptions)
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


