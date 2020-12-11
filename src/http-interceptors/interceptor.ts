import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { AdminLoginService } from '../services/admin-login/admin-login.service';
import { NzModalService } from 'ng-zorro-antd/modal';

// 拦截器

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(public adminLoginService: AdminLoginService, public router: Router,
    private modal: NzModalService,) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('userToken');// 获取token
    let pathName = location.pathname.slice(1, 6);
    if (token) { // 如果有token，就添加
      // console.log("token是什么", token);
      let bearToken = token.slice(0, 6);
      if (bearToken === 'Bearer') {
        req = req.clone({
          setHeaders: {
            'Authorization': `${token}`
          }
        });
      }
      else {
        req = req.clone({
          setHeaders: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    }

    return next.handle(req).pipe(
      tap(event => {
        console.log()
        if (event instanceof HttpResponse) { // 这里是返回，可通过event.body获取返回内容
          console.log("222", event.headers.get('Authorization'));
          let newToken = event.headers.get('Authorization');
          if (newToken != null) {
            localStorage.setItem('userToken', newToken);
          }
          console.log("返回的结果", event)
          console.log("event", event.status);
          if (event.status === 201) {
            this.createSuccess();   // 更新 添加
          }

        }
      },
        error => { // 统一处理所有的http错误
          if (error instanceof HttpErrorResponse) {
            if (error.status == 401) {
              alert('token已过期，请重新登陆');
              if (pathName === 'admin') {
                this.router.navigate(['/admin/login']);
              }
              else if (pathName === 'store') {
                this.router.navigate(['/store/login']);
              }
            }
            else if (error.status == 500) {
              alert(error.message)
            }
            else if (error.status == 504) {
              alert(error.message)
            }
            else if (error.status == 422) {
              this.createFail();
            }
            else if (error.status == 403) {
              alert(error.message)
            }
            else if (error.status == 404) {
              alert(error.message)
            }
          }
        }
      )
    )
  }

  createSuccess(): void {
    ['success'].forEach(method =>
      // @ts-ignore
      this.modal[method]({
        nzMask: false,
        nzTitle: `操作成功`,
      })
    );
    this.modal.afterAllClose.subscribe(() => console.log('afterAllClose emitted!'));
    setTimeout(() => this.modal.closeAll(), 2000);  //2s后消失
  }


  createFail(): void {
    ['error'].forEach(method =>
      // @ts-ignore
      this.modal[method]({
        nzMask: false,
        nzTitle: `操作失败`,
      })
    );
    this.modal.afterAllClose.subscribe(() => console.log('afterAllClose emitted!'));
    setTimeout(() => this.modal.closeAll(), 2000);  //2s后消失
  }

}




