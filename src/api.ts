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
  GetAdminDetail: api + '/admin/account/',///管理后台管理员详情接口

  PostAdminStoreCreate: api + '/admin/store', //管理后台商户添加接口
  GetAdminStoreDetail: api + '/admin/store/',   //管理后台获取商户信息接口详情
  PutAdminStoreUpdate: api + '/admin/store/', //管理后台商户信息修改保存
  GetAdminStore: api + '/admin/store', //管理后台获取商户列表接口

  PostAdminStoreBankCreate: api + '/admin/store_bank', // 商铺银行卡添加接口
  GetAdminStoreBank: api + '/admin/store_bank/',  //商铺的银行卡列表
  GetAdminStoreBankDetail: api + '/admin/store/', //商铺的银行卡详情
  PutAdminStoreBankUpdate: api + '/admin/store_bank/', //商铺的银行卡更新

  PostAdminStoreAccountCreate: api + '/admin/store_account', //商铺的账号创建
  GetAdminStoreAccountList: api + '/admin/store_account',    //店铺的账号列表
  GetAdminStoreAccountDetail: api + '/admin/store_account/', //店铺账号的编辑详情
  PutAdminStoreAccountUpdate: api + '/admin/store_account/', //店铺的账号的修改

  GetAdminAllRegions: api + '/admin/regions_all_json',   // 管理后台获取区域三级联动数据
  PostAdminRegionCreate: api + '/admin/region', //区域创建接口
  GetAdminRegionList: api + '/admin/region',    //区域列表接口
  GetAdminRegionDetail: api + '/admin/region/', //区域列表接口的编辑详情
  PutAdminRegionUpdate: api + '/admin/region/', //区域列表接口信息修改保存
  PostAdminUpload: api + '/admin/image',  //区域创建的图片上传


  GetAdminProductTagList: api + '/admin/tag', //产品标签列表
  GetAdminProductTagDetail: api + '/admin/tag/', //产品标签的编辑信息
  PutAdminProductTagUpdate: api + '/admin/tag/', //产品标签的修改信息
  PostAdminProductTagCreate: api + '/admin/tag', //标签的添加
  DeleteAdminProductTag: api + '/admin/tag/', //标签的删除
  GetAdminProdectCateList: api + '/admin/tags/cate_list',//标签的分类列表


  GetAdminProductManagementList: api + '/admin/product',  //产品列表
  PutAdminProductManagementUpdate: api + '/admin/product/', //产品更新
  GetAdminProductManagementDetail: api + '/admin/product/', //产品详情
  PostAdminProductSetStatus: api + '/admin/products/set_status', //产品的上架/下架
  PostAdminProductCheckStatus: api + '/admin/products/set_check', //产品的审核


  GetAdminFreeTravelList: api + '/admin/independent_product',  //自由行产品列表
  GetAdminFreeTravelDetail: api + '/admin/independent_product/', //自由行产品详情
  PutAdminFreeTravelUpdate: api + '/admin/independent_product/', //自由行产品更新


  GetAdminMeetingPlace: api + '/admin/assembling_place',   // 集合地点列表

  GetAdminTermsManageList: api + '/admin/terms',   // 条款管理列表
  PostAdminTermsCheckStatus: api + '/admin/terms/set_check',  // 条款管理审核
  PostAdminTermsSetStatus: api + '/admin/terms/set_status'  // 条款管理开启


};



// 店铺后台api
export const StoreUrls = {
  StoreLogin: api + '/store/login', // 店铺后台登陆接口
  StoreLogout: api + '/store/logout',  //店铺后台登出接口
  StoreRefresh: api + '/store/refresh',  //店铺后台Token刷新接口


  PostStoreProductCreate: api + '/store/product', //添加产品api
  GetStoreAssemblingPlaceList: api + '/store/assembling_place/list',  // 产品管理获取集合地点
  GetStoreTagList: api + '/store/product/tag',  // 产品管理获取标签
  GetStoreProductList: api + '/store/product', //获取产品列表api
  GetStoreProductDetail: api + '/store/product/', //获取产品详情api
  PutStoreProductUpdate: api + '/store/product/', //修改产品api
  PatchStoreProductStatus: api + '/store/product/',   //产品上下架
  GetStoreQuoteByDate: api + '/store/product/',//产品报价列表
  PostStoreQuoteByDate: api + '/store/product/',//添加产品报价
  PostStoreImgUpload: api + '/store/image',  //上传

  GetStoreMeetingPlace: api + '/store/assembling_place',   // 集合地点列表
  PostStoreMeetingPlaceCreate: api + '/store/assembling_place',   // 集合地点添加
  PutStoreMeetingPlaceUpdate: api + '/store/assembling_place/',   // 集合地点修改
  DeleteStoreMeetingPlace: api + '/store/assembling_place/',   // 集合地点删除
  GetStoreMeetingPlaceDetail: api + '/store/assembling_place/',   // 集合地点详情

  GetStoreProductTagList: api + '/store/tag', //产品标签列表


  GetStoreTermsList: api + '/store/terms',  //条款管理列表
  PostStoreTermsCreate: api + '/store/terms',   // 条款管理添加
  PutStoreTermsUpdate: api + '/store/terms/',   // 条款管理修改
  DeleteStoreTerms: api + '/store/terms/',   // 条款管理删除
  GetStoreTermsDetail: api + '/store/terms/',   // 条款管理详情
  PostStoreTermsUpdateCheck: api + '/store/terms/update_check',  // 条款审核


  GetStoreAllRegions: api + '/store/regions_all_json',   // 店铺后台获取区域三级联动数据

}
