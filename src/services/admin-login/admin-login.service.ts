import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

  constructor() { }


   getToken() {
    return localStorage.getItem('userToken');
  }

  logOut(loginType?: string) {
    localStorage.removeItem('isLoggedin');        
  }
}
