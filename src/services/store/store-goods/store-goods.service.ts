import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StoreUrls } from '../../../api';
import { EncodeComponent } from '../../../app/store-app/store-material/EncodeComponent';
import { AddGoodsModel, GoodsListModel, GoodsSetCheckStatusModel, GoodsSetStatusModel, StoreGoodCateTreeList } from '../../../interfaces/store/storeGoods/store-goods-model';



const httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
};


@Injectable({
    providedIn: 'root'
})
export class StoreGoodsService {

    public urls = StoreUrls;

    constructor(public httpClient: HttpClient) { }


    // 分类列表
    getCateListTree(): Observable<StoreGoodCateTreeList> {
        return this.httpClient.get<StoreGoodCateTreeList>(this.urls.GetStoreGoodsCateListTree, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }


    // 商品列表
    goodsList(page: number, per_page: number, status: any, check_status: any, is_order: any, cate_id: any, title: any): Observable<GoodsListModel> {
        const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
            .set('per_page', per_page.toString())
            .set('status', status ? status : '')
            .set('check_status', check_status ? check_status : '')
            .set('is_order', is_order ? is_order : '')
            .set('cate_id', cate_id ? cate_id : '')
            .set('title', title ? title : '');


        const findhttpOptions = {
            headers: new HttpHeaders({ 'content-Type': 'application/json' }),
            params
        };
        return this.httpClient.get<GoodsListModel>(this.urls.GetStoreGoodsList, findhttpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }


    // 添加商品
    addGoods(addGoodsModel: AddGoodsModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostStoreAddGoods, addGoodsModel, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    // 更新商品
    updateGoods(addGoodsModel: any): Observable<any> {
        const id = addGoodsModel.id;
        return this.httpClient.put(this.urls.PutStoreGoodsUpdate + id, addGoodsModel, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }



    // 获取商品详情
    getGoodsDetail(id: any) {
        return this.httpClient.get<any>(this.urls.GetStoreGoodsDetail + id, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }


    // 商品上下架
    setStatus(goodsSetStatusModel: GoodsSetStatusModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostStoreGoodsSetShelves + goodsSetStatusModel.id, goodsSetStatusModel, httpOptions)
    }



    // 提交审核和撤销
    checkStatus(goodsSetCheckStatusModel: GoodsSetCheckStatusModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostStoreGoodsSetCheck + goodsSetCheckStatusModel.id, goodsSetCheckStatusModel, httpOptions)
    }


    // 订单列表
    orderList(page: number, per_page: number, order_status: any, order_id: any, express_status: any, goods_name: any, cate_id: any,
        is_postage: any, date_start: any, date_end: any, send_time_start: any, send_time_end: any,
       consignee: any, phone: any, bind_id: any,): Observable<any> {
        const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
            .set('per_page', per_page.toString())
            .set('order_status', order_status ? order_status : '')
            .set('order_id', order_id ? order_id : '')
            .set('express_status', express_status ? express_status : '')
            .set('goods_name', goods_name ? goods_name : '')
            .set('cate_id', cate_id ? cate_id : '')
            .set('is_postage', is_postage ? is_postage : '')
            .set('date_start', date_start ? date_start : '')
            .set('date_end', date_end ? date_end : '')
            .set('send_time_start', send_time_start ? send_time_start : '')
            .set('send_time_end', send_time_end ? send_time_end : '')
            .set('consignee', consignee ? consignee : '')
            .set('phone', phone ? phone : '')
            .set('bind_id', bind_id ? bind_id : '');



        const findhttpOptions = {
            headers: new HttpHeaders({ 'content-Type': 'application/json' }),
            params
        };
        return this.httpClient.get<any>(this.urls.GetStoreGoodsOrderList, findhttpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }


    // 订单详情
    orderDetail(id: any) {
        return this.httpClient.get<any>(this.urls.GetStoreGoodsOrderDetail + id, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }



    private handleError(error: HttpErrorResponse) {
        console.log('1212', error);
        switch (error.status) {
            case 401:
                break;

        }
        return throwError('');
    }
}
