import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { AddBlockRequestModel, AddPageConfigRequestModel, BlockTypeRequestModel, ConfigPageList, PageConfigResponseModel, WeChatPageBlockListResponseModel, WeChatPageConfigListResponseModel } from '../../../interfaces/adminWeChat/admin-admin-model';
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
  updatePageBlock(addBlockRequestModel: AddBlockRequestModel): Observable<any> {
    const id = addBlockRequestModel.id;
    return this.httpClient.put(this.urls.PutWeChatPageBlockUpdate + id, addBlockRequestModel, httpOptions)
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



  private handleError(error: HttpErrorResponse) {
    console.log("1212", error);
    switch (error.status) {
      case 401:
        // alert(error.message);
        break
    }

    // if (error.error instanceof ErrorEvent) {
    //   // 客户端本身引起的错误信息
    //   alert()

    //   console.error(`客户端错误：${error.error.message}`);
    // } else {
    //   // 服务端返回的错误信息
    //   console.error(`服务端错误：HTTP 状态码：${error.status} \n\r 错误信息：${JSON.stringify(error.error)}`);
    // }

    // 反馈给用户的错误信息（用于组件中使用 error 回调时的错误提示）
    return throwError('');
  }

}
