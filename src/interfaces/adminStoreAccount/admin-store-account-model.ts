export interface AddStoreAccountRequestModel {   // 1.1创建商铺账号的接收数据模块
  password: string;
  password_confirmation: string;
  name: string;
  mobile: string;
  email: string;
  level: string;
  store_id: string;
  status: any;
}

export interface AddStoreAccountResponseModel {  //1.2创建商铺帐号的返回数据模块
  message: string;
  status_code?: string;
}


