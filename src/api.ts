import { environment } from "./environments/environment";




const api=environment.baseUrl;

export const Urls= {
    AdminLogin: api + '/admin/login', // 管理后台登陆接口
    // GetBills: api +  '/api/bill/GetBills', // 获取列表
    // GetCount: api +  '/api/bill/GetCount', // 获取统计信息
    // GetTotallCount: api +  '/api/bill/GetTotallCount', // 获取求和数据
    // AddBills: api +  '/api/bill/AddBills', // 添加记账信息
    // DeleteBill: api +  '/api/bill/DeleteBill', // 删除记账信息
  };

