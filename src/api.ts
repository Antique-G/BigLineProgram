import { environment } from "./environments/environment";

const api = environment.baseUrl;

// 管理后台api
export const AdminUrls = {
  PostAdminPassword: api + '/admin/update_password', // 修改密码


  AdminLogin: api + '/admin/login', // 管理后台登陆接口
  AdminLogout: api + '/admin/logout',  //管理后台登出接口
  AdminRefresh: api + '/admin/refresh',  //管理后台Token刷新接口

  GetAdminPermissionList: api + '/admin/permission',    //权限列表
  GetAdminPermissionParent: api + '/admin/permission_parent',    //权限父级列表
  PostAdminPermissionCreate: api + '/admin/permission',    //权限创建
  PutAdminPermissionUpdate: api + '/admin/permission/', //权限更新



  PostAdminApproveCheck: api + '/admin/approve_check/', // 供应商的认证审核
  GetAdminApproveDetail: api + '/admin/approve_detail', // 认证资料详情
  GetAdminApproveList: api + '/admin/approve_list', // 认证资料的历史记录
  PostAdminRewardSet: api + '/admin/rewrd_set', // 店铺佣金设置


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


  GetAdminProductMiniCode: api + '/admin/product/get_mini_code',// 生成小程序码




  PostAdminProductTrip: api + '/admin/product_trip', //行程
  PostAdminProductIndenTrip: api + '/admin/inden_product_trip', //行程
  PostAdminProductTripDel: api + '/admin/product_trip_del',
  PostAdminFreeTraveDel: api + '/admin/inden_trip_del',



  GetAdminUserCommissionList: api + '/admin/dist_record',  //用户分销的佣金列表
  PostAdminUserCommissionAudit: api + '/admin/dist/check',   //佣金通过/拒绝审核
  PostAdminAllUserCommissionAudit: api + '/admin/dist/check_all',   //佣金通过/拒绝审核
  GetAdminUserWithdrawList: api + '/admin/user_withdraw',  //提现列表
  GetAdminUserMoneyLogList: api + '/admin/user_money_log',  //金额变动记录




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
  GetAdminUserinfoDetail: api + '/admin/user/',      // 用户详情
  PutAdminUserinfoUpdate: api + '/admin/user/',      // 用户详情修改


  GetAdminOrderGroupList: api + '/admin/group',  //订单团列表
  GetAdminOrderGroupDetail: api + '/admin/group/',   //订单团详情
  PostAdminOrderGroupSetGuide: api + '/admin/group/set_guide',   // 派遣导游
  GetAdminOrderGroupGuideList: api + '/admin/guide/data',   // 获取导游数据
  PostAdminOrderGroupMoveOrder: api + '/admin/group/move_order',   // 移动订单
  PostAdminOrderGroupShutoff: api + '/admin/group/shut_off',   // 不成团关团
  PostAdminOrderGroupOrderSms: api + '/admin/group/sendOrderSms',   // 发送订单预定成功通知短信接口
  PostAdminOrderGroupGroupSms: api + '/admin/group/sendGroupSms',   // 发送出团通知短信接口
  DeletetAdminOrderGroupSubGroup: api + '/admin/subGroup/',   // 删除子团
  PostAdminOrderGroupCancelSms: api + '/admin/group/sendOrderCancelSms',   // 发送不成团通知短信接口
  PutAdminOrderGroupNum: api + '/admin/group/',   // 设置出团人数限制





  GetAdminOrderfreeTravelList: api + '/admin/order/free_travel',  //自由行订单列表
  GetAdminOrderfreeTravelDetail: api + '/admin/order/free_travel/',  //自由行订单详情
  GetAdminOrderfreeIndentSearch: api + '/admin/indent_search',  //自由行下订单搜索产品

  
  GetAdminOrderGroupProductList: api + '/admin/order/group_product',  //跟团游订单列表
  GetAdminOrderGroupProductDetail: api + '/admin/order/group_product/',  //跟团游订单详情
  GetAdminProSearch: api + '/admin/product/search',  //跟团游产品搜索
  PostAdminProductOrderGroup: api + '/admin/order/group_product',  //跟团游后台下订单
  PostAdminOrderConfirmReceipt: api + '/admin/order/confirm_receipt',  //确认收款
  GetAdminOrderChangeDate: api + '/admin/order/change_date',  //订单改日期（提交前展示）
  PostAdminOrderChangeDate: api + '/admin/order/change_date',  //订单改日期（提交）
  PostAdminEditMember: api + '/admin/order/edit_member',  //修改集合地




  GetAdminRefund: api + '/admin/refund',  //退款列表
  PostAdminRefundCheck: api + '/admin/refund_check', // 审核提交
  PostAdminRefund: api + '/admin/refund', //创建退款单
  GetAdminRefundPayLog: api + '/admin/refund/pay_log', //支付流水
  PostAdminRefundFinish: api + '/admin/refund_finish', //提交退款流水去向（完成退款）
  GetAdminRefundLog: api + '/admin/refund_log', //退款流水列表
  PostAdminReRefund: api + '/admin/refund_log/resend', //重新获取退款结果



  GetAdminRefundDetail: api + '/admin/refund/',  //退款详情




  GetAdminProSearchFree: api + '/admin/independent_product/search',  //自由行产品搜索
  PostAdminProductOrderGroupFree: api + '/admin/order/independent_product',  //自由行后台下订单


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


  GetAdminContractList: api + '/admin/store_contract',  // 合同列表
  DeleteAdminContract: api + '/admin/store_contract/',  // 删除合同
  PostAdminContractCreate: api + '/admin/store_contract',   // 合同添加



  GetAdminGuideList: api + '/admin/guide',  //导游列表
  PostAdminGuideCreate: api + '/admin/guide',   // 导游添加
  PutAdminGuideUpdate: api + '/admin/guide/',   // 导游修改
  GetAdminGuideDetail: api + '/admin/guide/',   // 导游详情
  DeleteAdminGuide: api + '/admin/guide/',   // 导游删除
  PostAdminGuideSetStatus: api + '/admin/guide/set_status',   // 导游启用 




  PostAdminUploadImg: api + '/admin/upload_image', // 图片上传


  GetAdminRegionService: api + '/admin/region_service',   // 区域客服列表
  PostAdminRegionServiceCreate: api + '/admin/region_service', //区域客服创建
  DeleteAdminRegionService: api + '/admin/region_service/', //删除
  PutAdminRegion: api + '/admin/region_service/',    //区域更新


  GetAdminOrderOrderTotal: api + '/admin/order/order_total',   //跟团游订单统计
  GetAdminOrderIndenOrderTotal: api + '/admin/order/inden_order_total',   //自由行订单统计
  GetAdminOrderGetPayQr: api + '/admin/order/get_pay_qr',   //生成收款码


};



// 店铺后台api
export const StoreUrls = {
  PostStoreApply: api + '/store/store_apply', // 申请供应商
  PostStoreApproveUpload: api + '/store/approve_upload', // 认证资料的上传
  PostStoreApproveDetail: api + '/store/store_approve', // 提交认证资料
  GetStoreApproveDetail: api + '/store/approve_detail', // 认证资料详情
  GetStoreApproveList: api + '/store/approve_list', // 认证资料的历史记录
  PostStoreEditContract: api + '/store/edit_contact/', // 修改联系人
  GetStoreAccount: api + '/store/account_info', // 账号详情



  GetStoreForgetPassword: api + '/store/find_password', // 找回密码（第一步）
  PostStoreResetPasswordModel: api + '/store/reset_password', // 重置密码


  PostStorePassword: api + '/store/update_password', // 修改密码

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
  PostStoreProductTrip: api + '/store/product_trip', // 逐条添加行程
  PostStoreProductTripDel: api + '/store/product_trip_del', //删除行程
  GetStoreProSearch: api + '/store/product/search',  // 跟团游产品搜索
  PostStoreProductOrderGroup: api + '/store/order/group_product',  // 创建订单（跟团游）

  PostStoreProductReward: api + '/store/product_reward',//佣金的编辑
  PostStoreFreeReward: api + '/store/inden_product_reward',//佣金的编辑

  GetStoreInsuranceList: api + '/store/insurance',      // 跟团游保险列表
  GetStoreInsuranceDetail: api + '/store/insurance/',   // 保险详情

  


  GetStoreProSearchFree: api + '/store/independent_product/search',  //自由行产品搜索
  PostStoreProductOrderGroupFree: api + '/store/order/independent_product',  //创建订单（自由行）




  PostStoreUploadStroke: api + '/store/product/schedule_upload',  //上传行程






  PostStoreQuoteByDateSetCheck: api + '/store/product/set_check',//产品报价提交审核

  PostStoreImgUpload: api + '/store/image',  //上传图片
  GetStoreImgList: api + '/store/image',  //获取图片列表
  PostStoreVideoUpload: api + '/store/upload_video',  //上传视频


  // 自由行产品
  GetStoreFreeTravelList: api + '/store/independent_product',
  GetStoreFreeTravelDetail: api + '/store/independent_product/',
  PostStoreFreeTravelInfo: api + '/store/independent_product/',
  PostSaveStoreFreeTravelInfo: api + '/store/independent_product',
  PostUpDownFreeTravelInfo: api + '/store/independent_product/set_status',
  PostUpDownFreeTravelInfoSetCheck: api + '/store/independent_product/set_check',
  PostStoreFreeTravelInfoDetail: api + '/store/inden_product_trip',
  PostStoreFreeTraveDel: api + '/store/inden_trip_del',







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
  DeletetStoreOrderGroupSubGroup: api + '/store/subGroup/',   // 删除子团
  PostStoreOrderGroupCancelSms: api + '/store/group/sendOrderCancelSms',   // 发送不成团通知短信接口
  PutStoreOrderGroupNum: api + '/store/group/',   // 设置出团人数限制



  GetStoreOrderfreeTravelList: api + '/store/order/free_travel',  //自由行订单列表
  GetStoreOrderfreeTravelDetail: api + '/store/order/free_travel/',  //自由行订单详情
  GetStoreOrderGroupProductList: api + '/store/order/group_product',  //跟团游订单列表
  GetStoreOrderGroupProductDetail: api + '/store/order/group_product/',  //跟团游订单详情
  PostStoreOrderAddPriceDetails: api + '/store/order/add_price_details',  //订单改价（附加收费、优惠）
  GetStoreOrderChangeDate: api + '/store/order/change_date',  //订单改日期（提交前展示）
  PostStoreOrderChangeDate: api + '/store/order/change_date',  //订单改日期（提交）
  PostStoreOrderConfirmReceipt: api + '/store/order/confirm_receipt',  //确认收款


  GetStoreRefund: api + '/store/refund',  //退款列表
  GetStoreRefundDetail: api + '/store/refund/',  //退款详情
  GetStoreRefundLog: api + '/store/refund_log', //退款流水列表



  GetStoreContractList: api + '/store/store_contract',  //合同列表
  PostStoreContractCreate: api + '/store/store_contract',   // 合同添加





  GetStoreAllRegions: api + '/store/regions_all_json',   // 店铺后台获取区域三级联动数据
  GetStoreCode: api + '/store/sendVerifySms'// 发送手机验证码

}
