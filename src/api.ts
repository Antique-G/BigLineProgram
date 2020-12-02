import { environment } from "./environments/environment";

const api = environment.baseUrl;

// 管理后台api
export const AdminUrls = {
  AdminLogin: api + '/admin/login', // 管理后台登陆接口
  AdminLogout: api + '/admin/logout',  //管理后台登出接口
  AdminRefresh: api + '/admin/refresh',  //管理后台Token刷新接口


  PostAdminAccountCreate: api + '/admin/account', //管理后台管理员账号注册
  GetAdminAccount: api + '/admin/account', //管理后台管理员列表接口详情
  PutAdminAccountUpdate: api + '/admin/account/', //管理后台管理员更新接口


  PostAdminStoreCreate: api + '/admin/store', //管理后台商户添加接口
  GetAdminStoreDetail: api + '/admin/store/',   //管理后台获取商户信息接口详情
  PutAdminStoreUpdate: api + '/admin/store/', //管理后台商户信息修改保存
  GetAdminStore: api + '/admin/store', //管理后台获取商户列表接口

  PostAdminStoreBankCreate: api + '/admin/store_bank', // 商铺银行卡添加接口
  GetAdminStoreBank: api + '/admin/store_bank',  //商铺的银行卡列表
  GetAdminStoreBankDetail: api + '/admin/store/', //商铺的银行卡详情
  PutAdminStoreBankUpdate: api + '/admin/store_bank/', //商铺的银行卡更新


  PostAdminStoreAccountCreate: api + '/admin/store_account', //商铺的账号创建
  GetAdminStoreAccountDetail: api + '/admin/store_account/', //店铺账号的编辑详情
  PutAdminStoreAccountUpdate: api + '/admin/store/', //管理后台商户信息修改保存



  GetAdminAllRegions: api + '/admin/regions_all_json',   // 管理后台获取区域三级联动数据

};



// 店铺后台api
export const StoreUrls = {
  StoreLogin: api + '/store/login', // 店铺后台登陆接口
  StoreLogout: api + '/store/logout',  //店铺后台登出接口
  StoreRefresh: api + '/store/refresh',  //店铺后台Token刷新接口


  PostStoreProductCreate: api + '/store/product', //添加产品api
  GetStoreProductList: api + '/store/product', //添加产品api
  GetStoreProductDetail: api + '/store/product/id', //添加产品api


  GetStoreMeetingPlace: api + '/store/assembling_place',   // 集合地点列表
  PostStoreMeetingPlaceCreate: api + '/store/assembling_place',   // 集合地点添加
  PutStoreMeetingPlaceUpdate: api + '/store/assembling_place/',   // 集合地点修改
  DeleteStoreMeetingPlaceUpdate: api + '/store/assembling_place/',   // 集合地点删除
  GetStoreMeetingPlaceDetail: api + '/store/assembling_place/',   // 集合地点详情



  GetStoreAllRegions: api + '/store/regions_all_json',   // 店铺后台获取区域三级联动数据
}
