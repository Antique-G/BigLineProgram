import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreUrls } from '../../../api';
import { EncodeComponent } from '../../../app/store-app/store-material/EncodeComponent';
import { ProductQuteDateModel } from '../../../interfaces/adminProduct/product-management-model';
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

    // ??????
    GetFreeTravelDetail(id: any): Observable<StoreFreeTravelModel> {
        return this.httpClient.get<StoreFreeTravelModel>(this.urls.GetStoreFreeTravelDetail + id, httpOptions)
            .pipe(

            )
    }



    // ????????????
    addProductTrip(addProductTrip: AddProductTrip): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostStoreFreeTravelInfoDetail, addProductTrip, httpOptions)
            .pipe(

            )
    }



    // ????????????
    deleteProductTrip(ids: any): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostStoreFreeTraveDel, { ids }, httpOptions)
            .pipe(
            )
    }

    // ??????????????????
    // ????????????
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

    // ???????????????????????????
    UpdateFreeTravelInfo(freeTravelModel: any): Observable<any> {
        return this.httpClient.put<any>(this.urls.PostStoreFreeTravelInfo + freeTravelModel.id, freeTravelModel, httpOptions)
            .pipe(

            )
    }

    // ?????????????????????
    SaveFreeTravelInfo(freeTravelModel: StoreFreeTravelModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostSaveStoreFreeTravelInfo, freeTravelModel, httpOptions)
            .pipe(

            )
    }

    // ????????????????????????
    UpDownFreeTravel(id: any): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostUpDownFreeTravelInfo, { id }, httpOptions)
    }

    // ?????????????????????
    checkStatusFreeTravel(id: number, check_status: number): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostUpDownFreeTravelInfoSetCheck, { id, check_status }, httpOptions)
    }



    // ??????
    setReward(setRewardModel: SetRewardModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostStoreFreeReward, setRewardModel, httpOptions)
            .pipe(

            )
    }




    // ??????????????????
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


    // ??????????????????
    addPreFree(freeTravelModel: StoreFreeTravelModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostStorePreFreeTravelAdd, freeTravelModel, httpOptions)
            .pipe(

            )
    }

    // ????????????
    copyProduct(product_id: any): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostStoreCopyIndentPro, { product_id }, httpOptions)
            .pipe(
            )
    }


    //????????????????????????
    getOperateLog(page: number, per_page: number, id: any) {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('per_page', per_page.toString())

        const findhttpOptions = {
            headers: new HttpHeaders({ 'content-Type': 'application/json' }),
            params: params
        };
        return this.httpClient.get<ProductQuteDateModel>(this.urls.GetStoreIndentProOperLog + id, findhttpOptions)
            .pipe(
            )
    }
}
