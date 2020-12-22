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
  admin: AdminModel;
}

export interface AdminModel {
  admin_id: any;
  account: string;
  real_name: string;
  mobile: string;
  status: number;
  created_at: string;
  updated_at: string;
  ip: string;
}



export interface LogOutResponseModel {
  message: string;
  code?: string;
}