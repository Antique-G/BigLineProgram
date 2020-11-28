import { environment } from "./environments/environment";

const api = environment.baseUrl;

export const Urls = {
  AdminLogin: api + '/admin/login', // 管理后台登陆接口
  AdminLogout: api + '/admin/logout',  //管理后台登出接口
  AdminRefresh: api + '/admin/refresh',  //管理后台Token刷新接口

  
  PostAdminAccountCreate: api + '/admin/account', //管理后台管理员账号注册
  GetAdminAccount: api + '/admin/account', //管理后台管理员列表接口
  PutAdminAccountUpdate: api + '/admin/account/id', //管理后台管理员更新接口


  PostAdminStoreCreate: api +'/admin/store', //管理后台商户添加接口
  GetAdminStoreDetail: api +'/admin/store',   //管理后台获取商户信息接口
  PutAdminStoreUpdate: api + '/admin/store/id', //管理后台商户信息修改保存
  GetAdminStore: api + '/admin/store', //管理后台获取商户列表接口

    
};

