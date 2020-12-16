import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { StoreUrls } from '../../../api';
import { ProductResponseListResponseModel, ProductDateilResponseModel, AddStoreProductModel, AddProductResponseModel, DetailModel } from '../../../interfaces/store/storeProduct/ProductModel';

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
  getProduct(page: number, per_page: number): Observable<ProductResponseListResponseModel> {
    const params = new HttpParams().set('page', page.toString())
      .set('per_page', per_page.toString())

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
  createProduct(addStoreProductModel: AddStoreProductModel): Observable<AddProductResponseModel> {
    return this.httpClient.post<AddProductResponseModel>(this.urls.PostStoreProductCreate, addStoreProductModel, httpOptions)
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
  updateProduct(detailModel: DetailModel) {
    return this.httpClient.put<AddProductResponseModel>(this.urls.PutStoreProductUpdate + detailModel.id, detailModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 产品上架
  patchProductStatus(id: number) {
    return this.httpClient.patch(this.urls.PatchStoreProductStatus + id + '/status', httpOptions)
      .pipe(
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


