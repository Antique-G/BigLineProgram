import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { StoreUrls } from '../../../api';
import { ProductResponseListResponseModel, ProductDateilResponseModel, AddStoreProductModel, AddProductResponseModel, DetailModel, UploadImgModel, AssemblingPlaceListModel, ProductTagCateListModel } from '../../../interfaces/store/storeProduct/ProductModel';
import { CheckLogModule } from '../../../interfaces/adminProduct/product-management-model';

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
  getProduct(page: number, per_page: number, check_status: any, title: any, few_days: any, few_nights: any, code: any,status:any): Observable<ProductResponseListResponseModel> {
    const params = new HttpParams().set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('check_status', check_status ? check_status : '')
      .set('title', title ? title : '')
      .set('few_days', few_days ? few_days : '')
      .set('few_nights', few_nights ? few_nights : '')
      .set('code', code ? code : '')
      .set('status', status ? status : '');


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


  // 审核日志
  checkLog(id: any): Observable<CheckLogModule[]> {
    const params = new HttpParams().set('id', id.toString());
    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<CheckLogModule[]>(this.urls.GetStoreProductCheckLog, findhttpOptions)
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
  updateProduct(detailUpdateModel: any) {
    return this.httpClient.put<AddProductResponseModel>(this.urls.PutStoreProductUpdate + detailUpdateModel.id, detailUpdateModel, httpOptions)
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

  // 提交审核
  // 审核自由行产品
  checkStatusFreeTravel(id: number, check_status: number): Observable<any> {
    return this.httpClient.post<any>(this.urls.PostStoreQuoteByDateSetCheck, { id, check_status }, httpOptions)
  }


  // 产品集合地点
  productAssemblingPlaceList(name: string, region_code: string): Observable<AssemblingPlaceListModel> {
    const params = new HttpParams().set('name', name ? name : '')
      .set('region_code', region_code ? region_code : '');

    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };

    return this.httpClient.get<AssemblingPlaceListModel>(this.urls.GetStoreAssemblingPlaceList, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }



  // 产品标签
  productTagList(cate_id: any): Observable<AssemblingPlaceListModel> {
    const params = new HttpParams().set('cate_id', cate_id.toString())
    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<AssemblingPlaceListModel>(this.urls.GetStoreTagList, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // 标签分类列表
  productCateList(): Observable<ProductTagCateListModel> {
    return this.httpClient.get<ProductTagCateListModel>(this.urls.GetStoreCateList, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // uploadImgModel: UploadImgModel
  // 上传图片
  uploadImg(image: any): Observable<any> {
    console.log('uploadImgModel', image);
    const imgHttpOptions = {
      reportProgress: true,    // headers: new HttpHeaders().set('Content-Type', 'multipart/form-data')
    };
    return this.httpClient.post<any>(this.urls.PostStoreImgUpload, image, imgHttpOptions)
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
    return throwError('0.21');
  }

}


