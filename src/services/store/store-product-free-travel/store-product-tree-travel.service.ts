import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreUrls } from '../../../api';
import { EncodeComponent } from '../../../app/store-app/store-material/EncodeComponent';
import { AddProductTrip, AssemblingPlaceListModel, SetRewardModel } from '../../../interfaces/store/storeProduct/ProductModel';
import { FreeTravelListModel, StoreFreeTravelModel } from '../../../interfaces/store/storeProductFreeTravel/storeProductFreeTravel';

const httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
};


@Injectable({
    providedIn: 'root'
})
export class StoreProductTreeTravelService {

    public urls = StoreUrls;

    constructor(public httpClient: HttpClient) { }

    GetFreeTravelList(page: number, per_page: number, check_status: any, title: any,
        few_days: any, id: any, status: any, tag?: any, departure_city?: any, destination_city?: any, is_presell?: any): Observable<FreeTravelListModel> {
        const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
            .set('per_page', per_page.toString())
            .set('check_status', check_status ? check_status : '')
            .set('title', title ? title : '')
            .set('few_days', few_days ? few_days : '')
            .set('id', id ? id : '')
            .set('status', status ? status : '')
            .set('tag', tag ? tag : '')
            .set('departure_city', departure_city ? departure_city : '')
            .set('destination_city', destination_city ? destination_city : '')
            .set('is_presell', is_presell ? is_presell : '');



        const findhttpOptions = {
            headers: new HttpHeaders({ 'content-Type': 'application/json' }),
            params: params
        };
        return this.httpClient.get<FreeTravelListModel>(this.urls.GetStoreFreeTravelList, findhttpOptions)
            .pipe(

            )
    }

    // 详情
    GetFreeTravelDetail(id: any): Observable<StoreFreeTravelModel> {
        return this.httpClient.get<StoreFreeTravelModel>(this.urls.GetStoreFreeTravelDetail + id, httpOptions)
            .pipe(

            )
    }



    // 行程添加
    addProductTrip(addProductTrip: AddProductTrip): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostStoreFreeTravelInfoDetail, addProductTrip, httpOptions)
            .pipe(

            )
    }



    // 删除行程
    deleteProductTrip(ids: any): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostStoreFreeTraveDel, { ids }, httpOptions)
            .pipe(
            )
    }

    // 产品标签列表
    // 产品标签
    GetProductTagList(cate_id: any): Observable<AssemblingPlaceListModel> {
        const params = new HttpParams().set('cate_id', cate_id.toString())
        const findhttpOptions = {
            headers: new HttpHeaders({ 'content-Type': 'application/json' }),
            params: params
        };
        return this.httpClient.get<AssemblingPlaceListModel>(this.urls.GetStoreTagList, findhttpOptions)
            .pipe(
            )
    }

    // 修改自由行产品报价
    UpdateFreeTravelInfo(freeTravelModel: any): Observable<any> {
        return this.httpClient.put<any>(this.urls.PostStoreFreeTravelInfo + freeTravelModel.id, freeTravelModel, httpOptions)
            .pipe(

            )
    }

    // 添加自由行产品
    SaveFreeTravelInfo(freeTravelModel: StoreFreeTravelModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostSaveStoreFreeTravelInfo, freeTravelModel, httpOptions)
            .pipe(

            )
    }

    // 自由行产品上下架
    UpDownFreeTravel(id: any): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostUpDownFreeTravelInfo, { id }, httpOptions)
    }

    // 审核自由行产品
    checkStatusFreeTravel(id: number, check_status: number): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostUpDownFreeTravelInfoSetCheck, { id, check_status }, httpOptions)
    }



    // 佣金
    setReward(setRewardModel: SetRewardModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostStoreFreeReward, setRewardModel, httpOptions)
            .pipe(

            )
    }




    // 预售产品列表
    GetPreFreeTravelList(page: number, per_page: number,title: any,
        few_days: any, id: any, departure_city?: any, destination_city?: any,
        start_date?: any, end_date?: any, use_start_date?: any, use_end_date?: any): Observable<any> {
        const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
            .set('per_page', per_page.toString())
            .set('title', title ? title : '')
            .set('few_days', few_days ? few_days : '')
            .set('id', id ? id : '')
            .set('departure_city', departure_city ? departure_city : '')
            .set('destination_city', destination_city ? destination_city : '')
            .set('start_date', start_date ? start_date : '')
            .set('end_date', end_date ? end_date : '')
            .set('use_start_date', use_start_date ? use_start_date : '')
            .set('use_end_date', use_end_date ? use_end_date : '');



        const findhttpOptions = {
            headers: new HttpHeaders({ 'content-Type': 'application/json' }),
            params: params
        };
        return this.httpClient.get<any>(this.urls.GetStorePreFreeTravelList, findhttpOptions)
            .pipe(

            )
    }


    // 添加预售产品
    addPreFree(freeTravelModel: StoreFreeTravelModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostStorePreFreeTravelAdd, freeTravelModel, httpOptions)
            .pipe(

            )
    }

    // 复制产品
    copyProduct(product_id: any): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostStoreCopyIndentPro, { product_id }, httpOptions)
            .pipe(
            )
    }
}
