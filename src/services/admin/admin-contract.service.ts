import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminUrls } from '../../api';
import { ContractModel } from '../../interfaces/store/storeContract/store-contract-model';


const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
}

@Injectable({
  providedIn: 'root'
})
export class AdminContractService {

  public urls = AdminUrls;
  constructor(public httpClient: HttpClient) { }

  // 列表
  getContract(page: number, per_page: number, contract_name: any, store_id: any): Observable<ContractModel> {
    const params = new HttpParams().set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('contract_name', contract_name ? contract_name : '')
      .set('store_id', store_id ? store_id : '');


    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<ContractModel>(this.urls.GetAdminContractList, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }



  //删除
  deleteContract(id: any): Observable<any> {
    return this.httpClient.delete<any>(this.urls.DeleteAdminContract + id, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  // 上传
  uploadImg(reqData: any): Observable<any> {
    const imgHttpOptions = {
      reportProgress: true,
    };
    return this.httpClient.post<any>(this.urls.PostAdminContractCreate, reqData, imgHttpOptions)
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
