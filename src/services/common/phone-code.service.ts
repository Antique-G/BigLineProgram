import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreUrls } from '../../api';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};

@Injectable({
  providedIn: 'root'
})
export class PhoneCodeService {
  public urls = StoreUrls;

  constructor(public httpClient: HttpClient) { }

  sendCode(mobile: any): Observable<any> {
    return this.httpClient.post(this.urls.GetStoreCode, { mobile }, httpOptions)
      .pipe(
      )
  }

}
