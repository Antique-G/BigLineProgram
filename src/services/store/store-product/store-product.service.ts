import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StoreUrls } from '../../../api';
import { EncodeComponent } from '../../../app/store-app/store-material/EncodeComponent';
import { AdminInsuranceListResponseModel } from '../../../interfaces/adminInsurance/admin-insurance-model';
import { CheckLogModule, ProductQuteDateModel } from '../../../interfaces/adminProduct/product-management-model';
import { AddProductResponseModel, AddProductTrip, AddStoreProductModel, AssemblingPlaceListModel, ProductDateilResponseModel, ProductResponseListResponseModel, ProductTagCateListModel, SetRewardModel } from '../../../interfaces/store/storeProduct/ProductModel';

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
    getProduct(page: number, per_page: number, check_status: any, title: any, few_days: any, code: any,
        status: any, tag?: any, operation_id?: any, departure_city?: any, destination_city?: any): Observable<ProductResponseListResponseModel> {
        const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
            .set('per_page', per_page.toString())
            .set('check_status', check_status ? check_status : '')
            .set('title', title ? title : '')
            .set('few_days', few_days ? few_days : '')
            .set('code', code ? code : '')
            .set('status', status ? status : '')
            .set('tag', tag ? tag : '')
            .set('operation_id', operation_id ? operation_id : '')
            .set('departure_city', departure_city ? departure_city : '')
            .set('destination_city', destination_city ? destination_city : '');


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

    // 复制产品
    copyProduct(product_id: any): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostStoreCopyProduct, { product_id }, httpOptions)
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


    // 逐条添加行程
    addProductTrip(addProductTrip: AddProductTrip): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostStoreProductTrip, addProductTrip, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }


    // 删除行程
    deleteProductTrip(ids: any): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostStoreProductTripDel, { ids }, httpOptions)
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
    productAssemblingPlaceList(name: string, region_code: string, store_id?: any): Observable<AssemblingPlaceListModel> {
        const params = new HttpParams().set('name', name ? name : '')
            .set('region_code', region_code ? region_code : '')
            .set('store_id', store_id ? store_id : '');


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


    // 上传行程
    uploadStroke(reqData: any): Observable<any> {
        const imgHttpOptions = {
            reportProgress: true,    // headers: new HttpHeaders().set('Content-Type', 'multipart/form-data')
        };
        return this.httpClient.post<any>(this.urls.PostStoreUploadStroke, reqData, imgHttpOptions)
            .pipe(
            )
    }


    // 佣金
    setReward(setRewardModel: SetRewardModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostStoreProductReward, setRewardModel, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }



    // 获取默认佣金
    getProductReward(): Observable<any> {
        return this.httpClient.get<any>(this.urls.GetStoreProductReward, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }



    // 获取保险
    insuranceList(page: number, per_page: number, status: any): Observable<AdminInsuranceListResponseModel> {
        const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
            .set('per_page', per_page.toString())
            .set('status', status ? status : '')

        const findhttpOptions = {
            headers: new HttpHeaders({ 'content-Type': 'application/json' }),
            params: params
        };
        return this.httpClient.get<AdminInsuranceListResponseModel>(this.urls.GetStoreInsuranceList, findhttpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }


    // 按天数获取保险
    insuranceDayList(day: any): Observable<AdminInsuranceListResponseModel> {
        const params = new HttpParams({ encoder: new EncodeComponent() }).set('day', day ? day : '');

        const findhttpOptions = {
            headers: new HttpHeaders({ 'content-Type': 'application/json' }),
            params: params
        };
        return this.httpClient.get<AdminInsuranceListResponseModel>(this.urls.GetStoreInsuranceDayList, findhttpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }


    //保险详情
    getInsuranceDetail(id: any) {
        return this.httpClient.get<any>(this.urls.GetStoreInsuranceDetail + id, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }


    // 店铺的所有账户
    accountList(): Observable<any> {
        return this.httpClient.get<any>(this.urls.GetStoreAccountList, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }


    // 产品生成二维码
    getStoreProductMiniCode(product_id: any, product_type: any) {
        const params = new HttpParams().set('product_id', product_id)
            .set('product_type', product_type)

        const findhttpOptions = {
            headers: new HttpHeaders({ 'content-Type': 'application/json' }),
            params: params
        };
        return this.httpClient.get<any>(this.urls.GetStoreProductMiniCode, findhttpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }


    //获取操作的时间线
    getOperateLog(page: number, per_page: number, id: any) {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('per_page', per_page.toString())

        const findhttpOptions = {
            headers: new HttpHeaders({ 'content-Type': 'application/json' }),
            params: params
        };
        return this.httpClient.get<ProductQuteDateModel>(this.urls.GetStoreProOperLog + id, findhttpOptions)
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


