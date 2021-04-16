import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminUrls } from '../../api';
import { AddScheduleModel, StoreManageListResponseModel, StoreManageRequestModel, StoreScheduleListResponseModel, StoreShopAccountModel } from '../../interfaces/adminStoreManage/admin-store-manage-model';


const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};



@Injectable({
  providedIn: 'root'
})
export class AdminStoreManageService {
  public urls = AdminUrls;

  constructor(public httpClient: HttpClient) { }


  // 列表
  storeManageList(page: number, per_page: number, status: any, region_code: any, shop_name: any): Observable<StoreManageListResponseModel> {
    const params = new HttpParams().set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('status', status ? status : '')
      .set('region_code', region_code ? region_code : '')
      .set('shop_name', shop_name ? shop_name : '');

    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<StoreManageListResponseModel>(this.urls.GetAdminShopList, findhttpOptions)
      .pipe(

      )
  }



  // 注册
  register(storeManageRequestModel: StoreManageRequestModel): Observable<any> {
    return this.httpClient.post<any>(this.urls.PostAdminShopCreate, storeManageRequestModel, httpOptions)
      .pipe(
      )
  }


  //门店更新
  updateStore(storeManageRequestModel: StoreManageRequestModel): Observable<any> {
    const id = storeManageRequestModel.id;
    return this.httpClient.put(this.urls.PutAdminShopUpdate + id, storeManageRequestModel, httpOptions)
      .pipe(
      )
  }


  // 门店排班
  shopScheduleList(page: number, per_page: number, admin_id: any, date: any, shop_id: any): Observable<StoreScheduleListResponseModel> {
    const params = new HttpParams().set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('admin_id', admin_id ? admin_id : '')
      .set('date', date ? date : '')
      .set('shop_id', shop_id ? shop_id : '');

    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<StoreScheduleListResponseModel>(this.urls.GetAdminShopSchedule, findhttpOptions)
      .pipe(

      )
  }

  // 添加排班
  addScheduleList(addScheduleModel: AddScheduleModel): Observable<any> {
    return this.httpClient.post<any>(this.urls.PostAdminShopSchedule, addScheduleModel, httpOptions)
      .pipe(
      )
  }

  shopAccountList(shop_id: any): Observable<StoreShopAccountModel> {
    const params = new HttpParams().set('shop_id', shop_id)
    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<StoreShopAccountModel>(this.urls.GetAdminShopAccountList, findhttpOptions)
      .pipe(

      )
  }

  // 获取某天排班
  shopScheduleInfo(date:any,shop_id:any){
    const params = new HttpParams().set('shop_id', shop_id)
      .set('date',date)
    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<StoreShopAccountModel>(this.urls.getAdminShopDateScheduleInfo, findhttpOptions)
      .pipe(

      )
  }

  // 删除
  // admin/schedule_destroy
  DeleteShopScheduleInfo(arr:any){
    
    return this.httpClient.post<any>(this.urls.PostAdminShopDateScheduleInfo, {ids:arr}, httpOptions)
      .pipe(
      )
  }

}

