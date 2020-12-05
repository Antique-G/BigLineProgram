import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { AdminLoginService } from '../services/admin-login/admin-login.service';

// 拦截器

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(public adminLoginService: AdminLoginService, public router: Router) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('userToken');// 获取token
    let pathName = location.pathname.slice(1, 6);
    if (token) { // 如果有token，就添加
      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      });
    }
  
    return next.handle(req).pipe(
      tap(event => {
        console.log()
        if (event instanceof HttpResponse) { // 这里是返回，可通过event.body获取返回内容
          console.log("shishia", event)
         
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
              alert("请输入正确的值");
            }
          }
        }
      )
    )
  }

}




