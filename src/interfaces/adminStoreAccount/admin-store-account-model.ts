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


export interface AdminStoreAccountListRequestModel{  // 2.1创建商铺账号列表的接收数据模块
  store_id: any;
}

export interface AdminStoreAccountListResponseModel {  //2.2.1创建商铺帐号的返回数据模块
  message: string;
  data: Datun[];
  status_code?: string;
}
export interface Datun{  // 2.2.2创建商铺账号列表的返回参数
  account_id: any;
  name: string;
  password: string;
  remember_token: any;
  mobile: string;
  email: string;
  level: any;
  store_id: any;
  status: any;
  created_at: string;
  updated_at: string
}

// export interface StoreAccountDetailResponseModel {
//   message: string;
//   data: DataDetailStoreAccountResponseModel;
// }
export interface DataDetailStoreAccountResponseModel {
  account_id: any;
  created_at: string;
  email: string;
  level: any;
  mobile: string;
  name: string;
  password: string;
  remember_token: any;
  status: any;
  store_id: any;
  updated_at: string;
}

export interface StoreAccountDetailUpdateRequestModel  {
  password: string;
  // password_confirmation: string;
  name: string;
  mobile: string;
  email: string;
  level: any;
  store_id: string;
  status: any;
}




