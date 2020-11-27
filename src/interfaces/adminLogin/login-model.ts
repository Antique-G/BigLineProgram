export interface LoginRequestModel {
  account: string;
  password: string;
}


export interface LoginResponseModel {
  message?: string;
  status_code: string;
  access_token: string;
  token_type?: any;
  expires_in?: any;
}


