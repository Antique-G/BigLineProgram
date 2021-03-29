import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EncodeComponent } from '../../app/store-app/store-material/EncodeComponent';
import { AdminUrls } from '../../api';
import { AdminProductCheckStatusModel, AdminProductDetailResponseModel, AdminProductManagementListResponseModel, AdminProductResponseModel, AdminProductSetStatusModel, CheckLogModule, ProductQuteDateModel, StoreListModel } from '../../interfaces/adminProduct/product-management-model';
import { AddProductTrip } from '../../interfaces/store/storeProduct/ProductModel';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};


@Injectable({
  providedIn: 'root'
})

export class AdminProductManagementService {
  public urls = AdminUrls;

  constructor(public httpClient: HttpClient) { }


  // 产品列表
  productList(page: number, per_page: number, status: any, check_status: any, title: string, store_id: string, code: any, few_days: any, tag?: any): Observable<AdminProductManagementListResponseModel> {
    const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('status', status ? status : '')
      .set('check_status', check_status ? check_status : '')
      .set('title', title ? title : '')
      .set('store_id', store_id ? store_id : '')
      .set('code', code ? code : '')
      .set('few_days', few_days ? few_days : '')
      .set('tag', tag ? tag : '');


    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<AdminProductManagementListResponseModel>(this.urls.GetAdminProductManagementList, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 更新
  updateProduct(adminProductManagementUpdateModel: any): Observable<any> {
    const id = adminProductManagementUpdateModel.id;
    return this.httpClient.put(this.urls.PutAdminProductManagementUpdate + id, adminProductManagementUpdateModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // 行程添加
  addProductTrip(addProductTrip: AddProductTrip): Observable<any> {
    return this.httpClient.post<any>(this.urls.PostAdminProductTrip, addProductTrip, httpOptions)
      .pipe(

      )
  }


  // 删除行程
  deleteProductTrip(ids: any): Observable<any> {
    return this.httpClient.post<any>(this.urls.PostAdminProductTripDel, { ids }, httpOptions)
      .pipe(
      )
  }



  // 详情
  productDetail(id: any): Observable<AdminProductDetailResponseModel> {
    return this.httpClient.get<AdminProductDetailResponseModel>(this.urls.GetAdminProductManagementDetail + id, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }



  // 产品的上架/下架
  productSetStatus(adminProductSetStatusModel: AdminProductSetStatusModel): Observable<AdminProductResponseModel> {
    return this.httpClient.post<AdminProductResponseModel>(this.urls.PostAdminProductSetStatus, adminProductSetStatusModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 产品的审核
  productCheckStatus(adminProductCheckStatusModel: AdminProductCheckStatusModel): Observable<AdminProductResponseModel> {
    return this.httpClient.post<AdminProductResponseModel>(this.urls.PostAdminProductCheckStatus, adminProductCheckStatusModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 审核日志
  checkLog(id: any): Observable<CheckLogModule[]> {
    const params = new HttpParams().set('id', id.toString());
    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<CheckLogModule[]>(this.urls.GetAdminProductCheckLog, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // 查询店铺
  storeList(keyword: string): Observable<StoreListModel[]> {
    const params = new HttpParams({ encoder: new EncodeComponent() }).set('keyword', keyword ? keyword : '')
    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<StoreListModel[]>(this.urls.GetAdminProductManagementStoreList, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }



  // 上传图片
  uploadImg(image: any): Observable<any> {
    console.log('uploadImgModel', image);
    const imgHttpOptions = {
      reportProgress: true,    // headers: new HttpHeaders().set('Content-Type', 'multipart/form-data')
    };
    return this.httpClient.post<any>(this.urls.PostAdminUpload, image, imgHttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // 日期报价列表
  QuteDateList(product_id: any, page: number, per_page: number) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('product_id', product_id)
    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<ProductQuteDateModel>(this.urls.GetAdminQuteDateList, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }



  QuteDateCheckState(date_id: any[], check_status: number) {
    return this.httpClient.post<any>(this.urls.PostAdminQuteDateSetCheck, { date_id, check_status }, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 产品生成二维码
  getProductMiniCode(product_id: any, product_type: any) {
    const params = new HttpParams().set('product_id', product_id)
      .set('product_type', product_type)

    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<any>(this.urls.GetAdminProductMiniCode, findhttpOptions)
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
