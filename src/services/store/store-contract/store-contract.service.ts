import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EncodeComponent } from '../../../app/store-app/store-material/EncodeComponent';
import { StoreUrls } from '../../../api';
import { ContractModel } from '../../../interfaces/store/storeContract/store-contract-model';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
}


@Injectable({
  providedIn: 'root'
})
export class StoreContractService {
  public urls = StoreUrls;

  constructor(public httpClient: HttpClient) { }


  // 列表
  getStoreContract(page: number, per_page: number, contract_name: any): Observable<ContractModel> {
    const params = new HttpParams({ encoder: new EncodeComponent() }).set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('contract_name', contract_name ? contract_name : '');

    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: params
    };
    return this.httpClient.get<ContractModel>(this.urls.GetStoreContractList, findhttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // 上传
  uploadImg(reqData: any): Observable<any> {
    const imgHttpOptions = {
      reportProgress: true,
    };
    return this.httpClient.post<any>(this.urls.PostStoreContractCreate, reqData, imgHttpOptions)
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
