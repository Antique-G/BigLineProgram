import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { AddBlockRequestModel, AddPageConfigRequestModel, BlockDetailResponseModel, BlockTypeRequestModel, ConfigPageList, PageConfigResponseModel, UpdateBlockRequestModel, WeChatPageBlockListResponseModel, WeChatPageConfigListResponseModel } from '../../../interfaces/adminWeChat/admin-admin-model';
import { AdminUrls } from '../../../api';


const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};
@Injectable({
  providedIn: 'root'
})


export class AdminWechatPageconfigService {
  public urls = AdminUrls;

  constructor(public httpClient: HttpClient) { }


  // 页面设置列表
  pageConfigList(page: number, per_page: number, status: any, page_name: any, page_key: any): Observable<WeChatPageConfigListResponseModel> {
    const params = new HttpParams().set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('status', status ? status : '')
      .set('page_name', page_name ? page_name : '')
      .set('page_key', page_key ? page_key : '');
    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<WeChatPageConfigListResponseModel>(this.urls.GetWeChatPageConfigList, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  //可配置的页面
  pageList(): Observable<ConfigPageList> {
    return this.httpClient.get<ConfigPageList>(this.urls.GetWeChatConfigPageList, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 添加
  addPageConfig(addPageConfigRequestModel: AddPageConfigRequestModel): Observable<PageConfigResponseModel> {
    return this.httpClient.post<PageConfigResponseModel>(this.urls.PostWeChatPageConfigCreate, addPageConfigRequestModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  //更新
  updatePageConfig(updatePageConfigRequestModel: AddPageConfigRequestModel): Observable<any> {
    const page_id = updatePageConfigRequestModel.page_id;
    return this.httpClient.put(this.urls.PutWeChatPageConfigUpdate + page_id, updatePageConfigRequestModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 页面模块列表
  pageBlockList(page: number, per_page: number, status: any, page_id: any, block_name: any, block_key: any): Observable<WeChatPageBlockListResponseModel> {
    const params = new HttpParams().set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('status', status ? status : '')
      .set('page_id', page_id)
      .set('block_name', block_name ? block_name : '')
      .set('block_key', block_key ? block_key : '');

    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<WeChatPageBlockListResponseModel>(this.urls.GetWeChatPageBlockList, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 添加
  addPageBlock(addBlockRequestModel: AddBlockRequestModel): Observable<PageConfigResponseModel> {
    return this.httpClient.post<PageConfigResponseModel>(this.urls.PostWeChatPageBlockCreate, addBlockRequestModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  //更新
  updatePageBlock(updateBlockRequestModel: UpdateBlockRequestModel): Observable<any> {
    const id = updateBlockRequestModel.block_id;
    return this.httpClient.put(this.urls.PutWeChatPageBlockUpdate + id, updateBlockRequestModel, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // 详情
  pageBlockDetail(id: any): Observable<BlockDetailResponseModel> {
    return this.httpClient.get<BlockDetailResponseModel>(this.urls.GetWeChatPageBlockDeatil + id, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 可配置列表
  typeList(): Observable<BlockTypeRequestModel> {
    return this.httpClient.get<BlockTypeRequestModel>(this.urls.GetWeChatBlockTypePageList, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 图片上传
  uploadImg(reqData: any): Observable<any> {
    const imgHttpOptions = {
      reportProgress: true,
    };
    return this.httpClient.post<any>(this.urls.PostAdminUploadImg, reqData, imgHttpOptions)
      .pipe(
      )
  }




  private handleError(error: HttpErrorResponse) {
    console.log("1212", error);
    switch (error.status) {
      case 401:
        break
    }
    return throwError('');
  }

}
