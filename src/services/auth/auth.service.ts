import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

// 获取token
  getAuthorizationToken() {
    return 'some-auth-token';
  }
}
