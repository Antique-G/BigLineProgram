import { environment } from "./environments/environment";

const api = environment.baseUrl;

export const Urls = {
  AdminLogin: api + '/admin/login', // 管理后台登陆接口
  AdminRegister: api + '/admin/register', //管理后台管理员账号注册
  AdminLogout: api + '/admin/logout',  //管理后台登陆接口
  AdminList: api + '/admin/list',      //管理后台管理员列表接口
  AdminStoreCreate: api +'/admin/store/create'   //管理后台商户添加接口
    
};

