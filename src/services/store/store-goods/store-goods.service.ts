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


    private handleError(error: HttpErrorResponse) {
        console.log('1212', error);
        switch (error.status) {
            case 401:
                break;

        }
        return throwError('');
    }
}
