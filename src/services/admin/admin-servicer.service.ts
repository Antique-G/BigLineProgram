import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { AdminUrls } from '../../api';

@Injectable({
  providedIn: 'root'
})
export class AdminServicerService {
  public urls = AdminUrls;
  constructor(public httpClient: HttpClient) { }

  regionServiceList(){

  }

  public handleError(error: HttpErrorResponse) {
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
