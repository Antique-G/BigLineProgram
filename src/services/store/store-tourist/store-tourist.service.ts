import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoreUrls } from '../../../api';


const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};

@Injectable({
  providedIn: 'root'
})
export class StoreTouristService {
  public urls = StoreUrls;


  constructor(public httpClient: HttpClient) { }
}
