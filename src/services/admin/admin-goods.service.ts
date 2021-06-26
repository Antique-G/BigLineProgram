import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoodsListModel, StoreGoodCateTreeList } from 'interfaces/store/storeGoods/store-goods-model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AdminUrls } from '../../api';
import { EncodeComponent } from '../../app/store-app/store-material/EncodeComponent';
import { AddCateModel, CateListModel } from '../../interfaces/admin-goods/admin-good-model';




const httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
};


@Injectable({
    providedIn: 'root'
})
export class AdminGoodsService {
    public urls = AdminUrls;

    constructor(public httpClient: HttpClient) { }


    // 分类列表
    cateList(page: number, per_page: number, status: any, name: any, pid?: any): Observable<CateListModel> {
        const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
            .set('per_page', per_page.toString())
            .set('status', status ? status : '')
            .set('name', name ? name : '')
            .set('pid', pid.toString());


        const findhttpOptions = {
            headers: new HttpHeaders({ 'content-Type': 'application/json' }),
            params
        };
        return this.httpClient.get<CateListModel>(this.urls.GetAdminGoodsCateList, findhttpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }


    // 添加
    addCate(addCateModel: AddCateModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostAdminGoodsCate, addCateModel, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }


    // 更新
    updateCate(addCateModel: AddCateModel): Observable<any> {
        const id = addCateModel.id;
        return this.httpClient.put(this.urls.PutAdminGoodsCateUpdate + id, addCateModel, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }



    // 商品模块
    // 商品分类列表
    getCateListTree(): Observable<StoreGoodCateTreeList> {
        return this.httpClient.get<StoreGoodCateTreeList>(this.urls.GetAdminGoodsCateListTree, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    // 商品列表
    goodsList(page: number, per_page: number, status: any, check_status: any, is_order: any, cate_id: any, title: any, store_id: any): Observable<GoodsListModel> {
        const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
            .set('per_page', per_page.toString())
            .set('status', status ? status : '')
            .set('check_status', check_status ? check_status : '')
            .set('is_order', is_order ? is_order : '')
            .set('cate_id', cate_id ? cate_id : '')
            .set('title', title ? title : '')
            .set('store_id', store_id ? store_id : '');
        const findhttpOptions = {
            headers: new HttpHeaders({ 'content-Type': 'application/json' }),
            params
        };
        return this.httpClient.get<GoodsListModel>(this.urls.GetAdminGoodsList, findhttpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }



    // 更新商品
    updateGoods(addGoodsModel: any): Observable<any> {
        const id = addGoodsModel.id;
        return this.httpClient.put(this.urls.PutAdminGoodsUpdate + id, addGoodsModel, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }



    // 获取商品详情
    getGoodsDetail(id: any) {
        return this.httpClient.get<any>(this.urls.GetAdminGoodsDetail + id, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }



    private handleError(error: HttpErrorResponse) {
        console.log('1212', error);
        switch (error.status) {
            case 401:
                break;
            case 404:
                break;
            case 422:
                break;
        }
        return throwError('');
    }
}
