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
  store: StoreModel;
  store_account: StoreAccountModel;
}

export interface StoreModel{
  store_id: any;
  name: string;
  region_code: string;
  address: string;
  fax: string;
  phone: string;
  mobile: string;
  contact: string;
  profile_photo_path?: any;
  status: number;
  created_at: string;
  updated_at: string;
  region_full_name: string;
}

export interface StoreAccountModel{
  account_id: any;
  name: string;
  remember_token?: any;
  mobile: string;
  email: string;
  level: number;
  store_id: number;
  status: number;
  created_at: string;
  updated_at: string;
}



export interface StoreLogOutResponseModel {
  message: string;
  code?: string;
}

export interface MobilCodeModel {
  mobile: any;
  code: any;
}