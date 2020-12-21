export interface StoreLoginRequestModel {
  mobile: string;
  password: string;
}


export interface StoreLoginResponseModel {
  message?: string;
  status_code: string;
  access_token: string;
  token_type?: any;
  expires_in?: any;
  region_code: any;
}



export interface StoreLogOutResponseModel {
  message: string;
  code?: string;
}