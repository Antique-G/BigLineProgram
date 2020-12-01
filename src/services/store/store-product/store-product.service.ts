import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { StoreUrls } from '../../../api';
import { ProductModel, ProductResponseModel, ProductModelRequestModel, ProductResponseListResponseModel } from '../../../interfaces/store/storeProduct/ProductModel';

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
  getProduct(productModelRequestModel: ProductModelRequestModel): Observable<ProductResponseListResponseModel> {
    let params = new HttpParams()
    params.append("page", productModelRequestModel.page ? productModelRequestModel.page : '');
    params.append("keyword", productModelRequestModel.keyword ? productModelRequestModel.keyword : '');

    let body = params;
    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: body
    };

    return this.httpClient.get<ProductResponseListResponseModel>(this.urls.GetStoreProductList, findhttpOptions)
      .pipe(
        retry(1), // 重试1次
        catchError(this.handleError)
      )
  }

  // 添加产品
  createProduct(productModel: ProductModel): Observable<ProductResponseModel> {
    return this.httpClient.post<ProductResponseModel>(this.urls.PostStoreProductCreate, productModel, httpOptions)
      .pipe(
        retry(1), // 重试1次
        catchError(this.handleError)
      )
  }

  // 获取产品详情
  getProductDetail(id: any) {

    let params = new HttpParams()
    params.append("id", id ? id : 0);
    let body = params;
    const findhttpOption = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: body
    };
    return this.httpClient.get<ProductModel>(this.urls.GetStoreProductDetail, findhttpOption)
      .pipe(
        retry(1), // 重试1次
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


