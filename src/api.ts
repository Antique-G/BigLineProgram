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
  GetAdminQuteDateList: api + '/admin/date_quotes',  //日期报价列表
  PostAdminQuteDateSetCheck: api + '/admin/date_quotes/set_check',  //日期报价列表


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
  GetAdminProductCheckLog: api + '/admin/product/check_log', // 审核日志
  GetAdminProductManagementStoreList: api + '/admin/store/list',// 查询店铺



  GetAdminFreeTravelList: api + '/admin/independent_product',  //自由行产品列表
  GetAdminFreeTravelDetail: api + '/admin/independent_product/', //自由行产品详情
  PutAdminFreeTravelUpdate: api + '/admin/independent_product/', //自由行产品更新
  PostAdminFreeTRavelUp: api + '/admin/independent_product/set_status',//自由行产上下架
  PostAdminFreeTCheckStatus: api + '/admin/independent_product/set_check',///自由行审核
  // 自由行日期报价
  GetAddminFreeTravelQuteDateList: api + '/admin/independent_date_quotes',
  GetAddminFreeTravelQuteDateCheck: api + '/admin/indent_date_quotes/set_check',

  GetAdminMeetingPlace: api + '/admin/assembling_place/list',   // 集合地点列表

  GetAdminTermsManageList: api + '/admin/terms',   // 条款管理列表
  PostAdminTermsCheckStatus: api + '/admin/terms/set_check',  // 条款管理审核
  PostAdminTermsSetStatus: api + '/admin/terms/set_status', // 条款管理开启


  GetAdminTermTemplateList: api + '/admin/terms_temp',   // 模版条款的列表
  PostAdminTermTemplateCreate: api + '/admin/terms_temp',   // 模版条款的添加
  PutAdminTermTemplateUpdate: api + '/admin/terms_temp/',   // 模版条款的更新
  GetAdminTermTemplateDetail: api + '/admin/terms_temp/',   // 模版条款的详情
  PostAdminTermTemplateSetStatus: api + '/admin/terms_temp/set_status',   // 模版条款的禁用、启用
  DeleteAdminTermTemplate: api + '/admin/terms_temp/',  //删除

  GetAdminSaleTitleList: api + '/admin/sale/title',   // 销售头衔列表
  PostAdminSaleTitleCreate: api + '/admin/sale/title',   // 销售头衔添加
  PutAdminSaleTitleUpdate: api + '/admin/sale/title/',   // 销售头衔修改
  PutAdminSaleTitleStatus: api + '/admin/sale/title/status/',   // 销售头衔审核

  GetAdminInsuranceList: api + '/admin/insurance',      // 保险列表
  PostAdminInsuranceCreate: api + '/admin/insurance',       // 保险添加
  GetAdminInsuranceDetail: api + '/admin/insurance/',   // 保险详情
  PutAdminInsuranceUpdate: api + '/admin/insurance/',   // 保险详情更新
  PostAdminInsuranceStatus: api + '/admin/insurance/set_status',   // 保险状态修改
  DeleteAdminInsurance: api + '/admin/insurance/',       //删除

  GetAdminUserinfoList: api + '/admin/user',      // 用户信息列表
  PostAdminUserinfoStatus: api + '/admin/user/set_status',      // 用户状态修改


  GetAdminOrderGroupList: api + '/admin/group',  //订单团列表
  GetAdminOrderGroupDetail: api + '/admin/group/',   //订单团详情


  // 小程序
  GetWeChatPageConfigList: api + '/admin/page_config',  // 页面设置列表
  PostWeChatPageConfigCreate: api + '/admin/page_config',   // 添加
  PutWeChatPageConfigUpdate: api + '/admin/page_config/',   // 修改
  GetWeChatConfigPageList: api + '/admin/page_list',  // 可配置列表

  GetWeChatPageBlockList: api + '/admin/page_block',  // 页面模块列表
  PostWeChatPageBlockCreate: api + '/admin/page_block',   // 添加
  PutWeChatPageBlockUpdate: api + '/admin/page_block/',   // 修改
  GetWeChatPageBlockDeatil: api + '/admin/page_block/',   // 详情
  GetWeChatBlockTypePageList: api + '/admin/page_type',  // 可配置类型
  GetWeChatBlockProList: api + '/admin/product_search',  // 产品搜索


  PostAdminUploadImg: api + '/admin/upload_image', // 图片上传



};



// 店铺后台api
export const StoreUrls = {
  StoreLogin: api + '/store/login', // 店铺后台登陆接口
  StoreLogout: api + '/store/logout',  //店铺后台登出接口
  StoreRefresh: api + '/store/refresh',  //店铺后台Token刷新接口


  PostStoreProductCreate: api + '/store/product', //添加产品api
  GetStoreAssemblingPlaceList: api + '/store/assembling_place/list',  // 产品管理获取集合地点
  GetStoreTagList: api + '/store/product/tag',  // 产品管理获取标签
  GetStoreCateList: api + '/store/tags/cate_list',  // 产品管理获取标签
  GetStoreProductList: api + '/store/product', //获取产品列表api
  GetStoreProductDetail: api + '/store/product/', //获取产品详情api
  PutStoreProductUpdate: api + '/store/product/', //修改产品api
  PatchStoreProductStatus: api + '/store/product/',   //产品上下架
  GetStoreQuoteByDate: api + '/store/date_quote',//产品报价列表
  PostStoreQuoteByDate: api + '/store/date_quote',//添加产品报价
  PutStoreQuoteByDate: api + '/store/date_quote/',//添加产品报价
  DelStoreQuoteByDate: api + '/store/date_quote/',
  GetStoreProductCheckLog: api + '/store/product/check_log', // 审核日志


  PostStoreQuoteByDateSetCheck: api + '/store/product/set_check',//产品报价提交审核

  PostStoreImgUpload: api + '/store/image',  //上传
  GetStoreImgList: api + '/store/image',  //上传

  // 自由行产品
  GetStoreFreeTravelList: api + '/store/independent_product',
  GetStoreFreeTravelDetail: api + '/store/independent_product/',
  PostStoreFreeTravelInfo: api + '/store/independent_product/',
  PostSaveStoreFreeTravelInfo: api + '/store/independent_product',
  PostUpDownFreeTravelInfo: api + '/store/independent_product/set_status',
  PostUpDownFreeTravelInfoSetCheck: api + '/store/independent_product/set_check',

  // 自由行产品日期报价
  GetStoreFreeTravelQuote: api + '/store/independent_date_quote',//自由行报价日期列表
  PostStoreFreeTravelQuote: api + '/store/independent_date_quote',//自由行报价日期
  GetStoreFreeTravelQuoteDetail: api + '/store/independent_date_quote/',//获取自由行报价日期详情
  PutStoreFreeTravelQuoteInfo: api + '/store/independent_date_quote/',//修改自由行报价日期

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
  GetStoreTemplate: api + '/store/terms_temp',  // 条款模板
  GetStoreTemplateDetail: api + '/store/terms_temp/',  // 条款模板详情
  PostStoreTemplateSetStatus: api + '/store/terms/set_status',  // 条款模板启用   


  GetStoreGuideList: api + '/store/guide',  //导游列表
  PostStoreGuideCreate: api + '/store/guide',   // 导游添加
  PutStoreGuideUpdate: api + '/store/guide/',   // 导游修改
  GetStoreGuideDetail: api + '/store/guide/',   // 导游详情
  DeleteStoreGuide: api + '/store/guide/',   // 导游删除
  PostStoreGuideSetStatus: api + '/store/guide/set_status',   // 导游启用 


  GetStoreOrderGroupList: api + '/store/group',  //订单团列表
  GetStoreOrderGroupDetail: api + '/store/group/',   //订单团详情
  PostStoreOrderGroupSetGuide: api + '/store/group/set_guide',   // 派遣导游
  GetStoreOrderGroupGuideList: api + '/store/guide/data',   // 获取导游数据
  PostStoreOrderGroupMoveOrder: api + '/store/group/move_order',   // 移动订单
  PostStoreOrderGroupShutoff: api + '/store/group/shut_off',   // 不成团关团
  PostStoreOrderGroupOrderSms: api + '/store/group/sendOrderSms',   // 发送订单预定成功通知短信接口
  PostStoreOrderGroupGroupSms: api + '/store/group/sendGroupSms',   // 发送出团通知短信接口





  GetStoreAllRegions: api + '/store/regions_all_json',   // 店铺后台获取区域三级联动数据
  GetStoreCode: api + '/store/sendVerifySms'// 发送手机验证码

}
