import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Urls } from '../../api';

const httpOptions = {   //1.1定义请求头信息
  headers : new HttpHeaders().set('Content-Type','application/json')
}

@Injectable({
  providedIn: 'root'
})
export class AdminStoreAccountService {  //创建店铺帐号管理服务
  public urls = Urls;   //1.2引入定义的baseUrl：http://p.carl.beennn.cn
  
  constructor(public HttpHeaders:HttpClient) { }   //1.3HttpClient 类，用于发送 HTTP 请求和接收来自通过 URI 确认的资源的 HTTP 响应。

  


  //http请求失败的响应返回对象
  public handleError(error: HttpErrorResponse) {
    console.log("1212", error);
    switch (error.status) {
      case 401:
        alert(error.message);
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
