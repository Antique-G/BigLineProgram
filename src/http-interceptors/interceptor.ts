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
  alertMessage: any;



  constructor(public adminLoginService: AdminLoginService, public router: Router,
    private modal: NzModalService,) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('userToken');// 获取token
    let pathName = location.pathname.slice(1, 6);

    // 如果有token，就添加
    if (token) {
      console.log("token是什么", token);
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
        if (event instanceof HttpResponse) { // 这里是返回，可通过event.body获取返回内容
          // console.log("222", event.headers.get('Authorization'));
          let newToken = event.headers.get('Authorization');

          // 每次请求更新token
          if (newToken != null) {
            localStorage.setItem('userToken', newToken);
          }
          // 遇到报错用缓存的token
          else if (newToken === null) {
            localStorage.getItem('userToken');
          }
          console.log("返回的结果", event)
          console.log("event", event.status);
          if (event.status === 200 && event.body.message != null) {
            console.log('1111', event.body)
            this.alertMessage = event.body.message;
            this.alertSuccess();
          }
          else if (event.status === 201) {
            this.createSuccess();   // 更新 添加
          }
          else if (event.status === 204) {
            this.deleteSuccess();   // 删除
          }

        }
      },
        error => { // 统一处理所有的http错误
          if (error instanceof HttpErrorResponse) {
            switch (error.status) {
              case 401:
                  console.log("当前页", window.location.pathname)
                  if (window.location.pathname == '/store/login' || window.location.pathname == '/admin/login') {
                    // alert(error.error.message);
                    this.createFail(error.error.message)
                  }
                  else {
                    alert('token已过期，请重新登陆');
                    if (pathName === 'admin') {
                      this.router.navigate(['/admin/login']);
                    }
                    else if (pathName === 'store') {
                      this.router.navigate(['/store/login']);
                    }
                  }
                break;
              case 500:
              case 504:
              case 404:
                  this.createFail(error.message)
                  break;
              case 422:
                  console.log("弹出的错误", error.error.errors);
                  let errorObj = error.error.errors;
                  for (let key in errorObj) {
                      this.createFail(errorObj[key])
    
                    // alert(errorObj[key]);
                  }
                  console.log("422", localStorage.getItem('userToken'));
                  const oldToken = (localStorage.getItem('userToken')!);
                  localStorage.setItem('userToken', oldToken);
                  break;
              case 400:
              case 403:
                  this.createFail(error.error.message)
                  break;
              default:
                  this.createFail('未知错误')
                  break;
            }
                // if (error.status == 401) {
                //   console.log("当前页", window.location.pathname)
                //   if (window.location.pathname == '/store/login' || window.location.pathname == '/admin/login') {
                //     // alert(error.error.message);
                //     this.createFail(error.error.message)
                //   }
                //   else {
                //     alert('token已过期，请重新登陆');
                //     if (pathName === 'admin') {
                //       this.router.navigate(['/admin/login']);
                //     }
                //     else if (pathName === 'store') {
                //       this.router.navigate(['/store/login']);
                //     }
                //   }
                // }
                // else if (error.status == 500) {
                //   this.createFail(error.message)

                //   // alert(error.message);
                // }
                // else if (error.status == 504) {
                //   this.createFail(error.message)

                //   // alert(error.message);
                // }
                // else if (error.status == 422) {
                //   console.log("弹出的错误", error.error.errors);
                //   let errorObj = error.error.errors;
                //   for (let key in errorObj) {
                //   this.createFail(errorObj[key])

                //     // alert(errorObj[key]);
                //   }
                //   console.log("422", localStorage.getItem('userToken'));
                //   const oldToken = (localStorage.getItem('userToken')!);
                //   localStorage.setItem('userToken', oldToken);
                // }
                // else if (error.status == 400) {
                //   // alert(error.error.message);
                //   this.createFail(error.error.message)
                  
                // }
                // else if (error.status == 403) {
                //   this.createFail(error.error.message)

                //   // alert(error.error.message);
                // }
                // else if (error.status == 404) {
                //   this.createFail(error.message)

                //   // alert(error.message);
                // }
          }
        }
      )
    )
  }


  alertSuccess(): void {
    ['success'].forEach(method =>
      // @ts-ignore
      this.modal[method]({
        nzMask: false,
        nzTitle: this.alertMessage,
      })
    );
    this.modal.afterAllClose.subscribe(() => console.log('afterAllClose emitted!'));
    setTimeout(() => this.modal.closeAll(), 1000);  //1s后消失
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
    setTimeout(() => this.modal.closeAll(), 1000);  //1s后消失
  }


  deleteSuccess(): void {
    ['success'].forEach(method =>
      // @ts-ignore
      this.modal[method]({
        nzMask: false,
        nzTitle: `删除成功`,
      })
    );
    this.modal.afterAllClose.subscribe(() => console.log('afterAllClose emitted!'));
    setTimeout(() => this.modal.closeAll(), 1000);  //1s后消失
  }



  createFail(content:any): void {
    this.modal['error']({
      nzMask: true,
      nzTitle: "<h3>错误提示</h3>",
      nzContent: `<h5>${content}</h5>`,
      nzStyle: { position: 'fixed', top: `70px`, left: `40%`,zIndex:1000}
      // ,transform:translate 
    })
    this.modal.afterAllClose.subscribe(() => console.log('afterAllClose emitted!'));
    setTimeout(() => this.modal.closeAll(), 2000);  //1s后消失
  }

}




