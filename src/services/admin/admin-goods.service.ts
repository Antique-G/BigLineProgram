import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddExpressCompanyModel, AddGoodsOrderModel, GoodsListModel, GoodsOrderListModel, GoodsSetCheckStatusModel, GoodsSetHotModel, GoodsSetStatusModel, StoreGoodCateTreeList, UpdateGoodsOrderConsigneeModel, UpdateGoodsOrderModel } from 'interfaces/store/storeGoods/store-goods-model';
import { CashReqReviwqModel, ComfirmOrderModel, TransChangeModel, WeChatModel } from 'interfaces/store/storeOrder/store-order-group-travel-model';
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
    goodsList(page: number, per_page: number, status: any, check_status: any, is_order: any, cate_id: any, title: any, store_id: any, is_hot: any): Observable<GoodsListModel> {
        const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
            .set('per_page', per_page.toString())
            .set('status', status ? status : '')
            .set('check_status', check_status ? check_status : '')
            .set('is_order', is_order ? is_order : '')
            .set('cate_id', cate_id ? cate_id : '')
            .set('title', title ? title : '')
            .set('store_id', store_id ? store_id : '')
            .set('is_hot', is_hot ? is_hot : '');


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


    // 商品上下架
    setStatus(goodsSetStatusModel: GoodsSetStatusModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostAdminGoodsSetShelves + goodsSetStatusModel.id, goodsSetStatusModel, httpOptions)
    }


    // 商品审核
    setCheckStatus(goodsSetCheckStatusModel: GoodsSetCheckStatusModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostAdminGoodsSetCheck + goodsSetCheckStatusModel.id, goodsSetCheckStatusModel, httpOptions)
    }




    // 设置热门
    setHot(goodsSetHotModel: GoodsSetHotModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostAdminGoodsSetHot, goodsSetHotModel, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }


    // 添加商品订单
    addOrder(addGoodsOrderModel: AddGoodsOrderModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostAdminGoodsAddOrder, addGoodsOrderModel, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }




    // 订单列表
    orderList(page: number, per_page: number, order_status: any, order_id: any, express_status: any, goods_name: any, cate_id: any,
        is_postage: any, date_start: any, date_end: any, send_time_start: any, send_time_end: any,
        store_id: any, consignee: any, phone: any, bind_id: any,): Observable<GoodsOrderListModel> {
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
            .set('store_id', store_id ? store_id : '')
            .set('consignee', consignee ? consignee : '')
            .set('phone', phone ? phone : '')
            .set('bind_id', bind_id ? bind_id : '');



        const findhttpOptions = {
            headers: new HttpHeaders({ 'content-Type': 'application/json' }),
            params
        };
        return this.httpClient.get<GoodsOrderListModel>(this.urls.GetAdminGoodsOrderList, findhttpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }


    // 订单详情
    orderDetail(id: any) {
        return this.httpClient.get<any>(this.urls.GetAdminGoodsOrderDetail + id, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }


    // 修改订单的商品信息
    updateGoodsOrderItem(updateGoodsOrderModel: UpdateGoodsOrderModel): Observable<any> {
        return this.httpClient.post(this.urls.PostAdminGoodsOrderUpdateItem, updateGoodsOrderModel, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }



    // 修改收货人信息
    updateGoodsOrderCon(updateGoodsOrderConsigneeModel: UpdateGoodsOrderConsigneeModel): Observable<any> {
        const id = updateGoodsOrderConsigneeModel.id;
        return this.httpClient.put(this.urls.PutAdminGoodsOrderUpdateCon + id, updateGoodsOrderConsigneeModel, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }



    // 确认收款
    comfirmGoodOrder(comfirmOrderModel: ComfirmOrderModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostAdminGoodsOrderConfirmReceipt, comfirmOrderModel, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }


    // 微信二维码收款
    goodOrderGetPayWechatQr(weChatModel: WeChatModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostAdminGoodsOrderGetWeChatPayQr, weChatModel, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }


    // 支付宝二维码收款
    postGoodOrderGetAlipayQr(weChatModel: WeChatModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostAdminGoodsOrderAlipayCode, weChatModel, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }


    // 快递列表
    expressCompanyList(page: number, per_page: number, status: any, name: any): Observable<any> {
        const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
            .set('per_page', per_page.toString())
            .set('status', status ? status : '')
            .set('name', name ? name : '');

        const findhttpOptions = {
            headers: new HttpHeaders({ 'content-Type': 'application/json' }),
            params
        };
        return this.httpClient.get<any>(this.urls.GetAdminExpressCompanyList, findhttpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }


    // 添加快递
    addExpressCompany(addExpressCompanyModel: AddExpressCompanyModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostAdminExpressCompany, addExpressCompanyModel, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }

    // 更新快递
    updateExpressCompany(addExpressCompanyModel: AddExpressCompanyModel): Observable<any> {
        const id = addExpressCompanyModel.id;
        return this.httpClient.put(this.urls.PutAdminExpressCompanyUpdate + id, addExpressCompanyModel, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }


    //删除快递
    deleteExpressCompany(id: any): Observable<any> {
        return this.httpClient.delete<any>(this.urls.DeleteAdminExpressCompany + id, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }


    // 财务模块订单列表
    orderList_finance(page: number, per_page: number, pay_status: any, order_id: any, goods_name: any,
        date_start: any, date_end: any, transaction_id: any, pay_type: any,
        store_id: any, consignee: any, phone: any, bind_id: any,): Observable<any> {
        const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
            .set('per_page', per_page.toString())
            .set('pay_status', pay_status ? pay_status : '')
            .set('order_id', order_id ? order_id : '')
            .set('goods_name', goods_name ? goods_name : '')
            .set('date_start', date_start ? date_start : '')
            .set('date_end', date_end ? date_end : '')
            .set('transaction_id', transaction_id ? transaction_id : '')
            .set('pay_type', pay_type ? pay_type : '')
            .set('store_id', store_id ? store_id : '')
            .set('consignee', consignee ? consignee : '')
            .set('phone', phone ? phone : '')
            .set('bind_id', bind_id ? bind_id : '');

        const findhttpOptions = {
            headers: new HttpHeaders({ 'content-Type': 'application/json' }),
            params
        };
        return this.httpClient.get<any>(this.urls.GetAdminFinanceGoodsOrderList, findhttpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    // 财务确认收款
    confirmGoodPayLog(pay_id: any): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostAdminFinanceGoodsOrderConfirm, { pay_id: pay_id }, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }


    // 修改流水信息
    changeTrans(transChangeModel: TransChangeModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostAdminFinanceGoodsOrderEditReceipt, transChangeModel, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }


    // 请款列表
    cashRequireList(page: number, per_page: number, order_status: any, order_id: any, express_status: any, goods_name: any, cate_id: any,
        is_postage: any, date_start: any, date_end: any, send_time_start: any, send_time_end: any,
        store_id: any, consignee: any, phone: any, bind_id: any,): Observable<any> {
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
            .set('store_id', store_id ? store_id : '')
            .set('consignee', consignee ? consignee : '')
            .set('phone', phone ? phone : '')
            .set('bind_id', bind_id ? bind_id : '');



        const findhttpOptions = {
            headers: new HttpHeaders({ 'content-Type': 'application/json' }),
            params
        };
        return this.httpClient.get<any>(this.urls.GetAdminGoodsOrderCashRequireList, findhttpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }


    // 请款审核
    cashReview(cashReqReviwqModel: CashReqReviwqModel): Observable<any> {
        return this.httpClient.post<any>(this.urls.PostAdminGoodsOrderCheckCash, cashReqReviwqModel, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
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
