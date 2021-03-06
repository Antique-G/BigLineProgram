import { environment } from './environments/environment';

const api = environment.baseUrl;

// 管理后台api
export const AdminUrls = {
    PostAdminPassword: api + '/admin/update_password', // 修改密码
    GetAdminForgetPassword: api + '/admin/find_password', // 找回密码（第一步）
    PostAdminResetPasswordModel: api + '/admin/reset_password', // 重置密码


    AdminLogin: api + '/admin/login', // 管理后台登陆接口
    AdminLogout: api + '/admin/logout',  // 管理后台登出接口
    AdminRefresh: api + '/admin/refresh',  // 管理后台Token刷新接口

    GetAdminPermissionList: api + '/admin/permission',    // 权限列表
    GetAdminPermissionParent: api + '/admin/permission_parent',    // 权限父级列表
    PostAdminPermissionCreate: api + '/admin/permission',    // 权限创建
    PutAdminPermissionUpdate: api + '/admin/permission/', // 权限更新

    GetAdminRoleList: api + '/admin/role',    // 角色列表
    GetPermissionTree: api + '/admin/get_permission',    // 权限的树状列表
    PostAdminRoleCreate: api + '/admin/role',    // 角色创建
    GetAdminRoleDetail: api + '/admin/role/',    // 角色详情
    PutAdminRoleUpdate: api + '/admin/role/', // 角色更新


    GetAdminShopList: api + '/admin/shop',    // 门店列表
    PostAdminShopCreate: api + '/admin/shop',    // 门店创建
    PutAdminShopUpdate: api + '/admin/shop/', // 门店更新
    GetAdminShopSchedule: api + '/admin/shop_schedule', // 门店排班
    PostAdminShopSchedule: api + '/admin/shop_schedule', // 门店排班添加
    GetAdminShopAccountList: api + '/admin/shop_admin_list', // 门店的账号列表
    getAdminShopDateScheduleInfo: api + '/admin/date_schedule', // 某天的所有排班
    PostAdminShopDateScheduleInfo: api + '/admin/schedule_destroy', // 删除排班






    PostAdminApproveCheck: api + '/admin/approve_check/', // 供应商的认证审核
    GetAdminApproveDetail: api + '/admin/approve_detail', // 认证资料详情
    GetAdminApproveList: api + '/admin/approve_list', // 认证资料的历史记录
    PostAdminRewardSet: api + '/admin/rewrd_set', // 店铺佣金设置


    PostAdminAccountCreate: api + '/admin/account', // 管理后台管理员账号注册
    GetAdminAccount: api + '/admin/account', // 管理后台管理员列表接口详情
    PutAdminAccountUpdate: api + '/admin/account/', // 管理后台管理员更新接口
    GetAdminDetail: api + '/admin/account/',  // 管理后台管理员详情接口

    PostAdminStoreCreate: api + '/admin/store', // 管理后台商户添加接口
    GetAdminStoreDetail: api + '/admin/store/',   // 管理后台获取商户信息接口详情
    PutAdminStoreUpdate: api + '/admin/store/', // 管理后台商户信息修改保存
    GetAdminStore: api + '/admin/store', // 管理后台获取商户列表接口

    PostAdminStoreBankCreate: api + '/admin/store_bank', // 商铺银行卡添加接口
    GetAdminStoreBank: api + '/admin/store_bank/',  // 商铺的银行卡列表
    GetAdminStoreBankDetail: api + '/admin/store/', // 商铺的银行卡详情
    PutAdminStoreBankUpdate: api + '/admin/store_bank/', // 商铺的银行卡更新

    PostAdminStoreAccountCreate: api + '/admin/store_account', // 商铺的账号创建store_account
    GetAdminStoreAccountList: api + '/admin/store_account',    // 店铺的账号列表
    GetAdminStoreAccountDetail: api + '/admin/store_account/', // 店铺账号的编辑详情
    PutAdminStoreAccountUpdate: api + '/admin/store_account/', // 店铺的账号的修改

    GetAdminAllRegions: api + '/admin/regions_all_json',   // 管理后台获取区域三级联动数据
    PostAdminRegionCreate: api + '/admin/region', // 区域创建接口
    GetAdminRegionList: api + '/admin/region',    // 区域列表接口
    GetAdminRegionDetail: api + '/admin/region/', // 区域列表接口的编辑详情
    PutAdminRegionUpdate: api + '/admin/region/', // 区域列表接口信息修改保存
    PostAdminUpload: api + '/admin/image',  // 区域创建的图片上传
    GetAdminQuteDateList: api + '/admin/date_quotes',  // 日期报价列表
    PostAdminQuteDateSetCheck: api + '/admin/date_quotes/set_check',  // 日期报价列表


    GetAdminProductTagList: api + '/admin/tag', // 产品标签列表
    GetAdminProductTagDetail: api + '/admin/tag/', // 产品标签的编辑信息
    PutAdminProductTagUpdate: api + '/admin/tag/', // 产品标签的修改信息
    PostAdminProductTagCreate: api + '/admin/tag', // 标签的添加
    DeleteAdminProductTag: api + '/admin/tag/', // 标签的删除
    GetAdminProdectCateList: api + '/admin/tags/cate_list', // 标签的分类列表


    GetAdminProductManagementList: api + '/admin/product',  // 产品列表
    PutAdminProductManagementUpdate: api + '/admin/product/', // 产品更新
    GetAdminProductManagementDetail: api + '/admin/product/', // 产品详情
    PostAdminProductSetStatus: api + '/admin/products/set_status', // 产品的上架/下架
    PostAdminProductCheckStatus: api + '/admin/products/set_check', // 产品的审核
    GetAdminProductCheckLog: api + '/admin/product/check_log', // 审核日志
    GetAdminProductManagementStoreList: api + '/admin/store/list', // 查询店铺
    GetAdminInsuranceDayList: api + '/admin/insurance/data',      // 跟团游保险列表天数
    GetAdminProOperLog: api + '/admin/product_opet_log/',      // 操作时间线


    GetAdminProductMiniCode: api + '/admin/product/get_mini_code', // 生成小程序码



    PostAdminProductTrip: api + '/admin/product_trip', // 行程
    PostAdminProductIndenTrip: api + '/admin/inden_product_trip', // 行程
    PostAdminProductTripDel: api + '/admin/product_trip_del',
    PostAdminFreeTraveDel: api + '/admin/inden_trip_del',




    GetAdminUserCommissionList: api + '/admin/dist_record',  // 用户分销的佣金列表
    PostAdminUserCommissionAudit: api + '/admin/dist/check',   // 佣金通过/拒绝审核
    PostAdminAllUserCommissionAudit: api + '/admin/dist/check_all',   // 佣金通过/拒绝审核
    GetAdminUserWithdrawList: api + '/admin/user_withdraw',  // 提现列表
    PutAdminUserWithdrawReview: api + '/admin/user_withdraw/',  // 审核提现
    GetAdminUserMoneyLogList: api + '/admin/user_money_log',  // 金额变动记录
    GetAdminUserOption: api + '/admin/user/option',  // 提现列表的用户列表信息
    GetAdminWithdrawTotal: api + '/admin/user_withdraw/statistic',  // 提现统计





    GetAdminFreeTravelList: api + '/admin/independent_product',  // 自由行产品列表
    GetAdminFreeTravelDetail: api + '/admin/independent_product/', // 自由行产品详情
    PutAdminFreeTravelUpdate: api + '/admin/independent_product/', // 自由行产品更新
    PostAdminFreeTRavelUp: api + '/admin/independent_product/set_status', // 自由行产上下架
    PostAdminFreeTCheckStatus: api + '/admin/independent_product/set_check', /// 自由行审核
    // 自由行日期报价
    GetAddminFreeTravelQuteDateList: api + '/admin/independent_date_quotes',
    GetAddminFreeTravelQuteDateCheck: api + '/admin/indent_date_quotes/set_check',


    // 自由行预售产品
    GetAdminPreFreeTravelList: api + '/admin/indent_ticket_list',   // 列表
    GetAdminIndentProOperLog: api + '/admin/indent_opet_log/',      // 操作时间线

    // 预售管理
    GetAdminOrderTicket: api + '/admin/order/ticket',   // 预售订单列表
    GetAdminOrderTicketDetail: api + '/admin/order/ticket/',   // 预售订单详情
    GetAdminOrderTicketCode: api + '/admin/order/ticket_code',   // 预约码列表
    GetAdminOrderTicketCodeDetail: api + '/admin/order/ticket_code/',   // 预约码详情





    GetAdminMeetingPlace: api + '/admin/assembling_place/list',   // 集合地点列表

    GetAdminTermsManageList: api + '/admin/terms',   // 条款管理列表
    PostAdminTermsCheckStatus: api + '/admin/terms/set_check',  // 条款管理审核
    PostAdminTermsSetStatus: api + '/admin/terms/set_status', // 条款管理开启



    GetAdminTermTemplateList: api + '/admin/terms_temp',   // 模版条款的列表
    PostAdminTermTemplateCreate: api + '/admin/terms_temp',   // 模版条款的添加
    PutAdminTermTemplateUpdate: api + '/admin/terms_temp/',   // 模版条款的更新
    GetAdminTermTemplateDetail: api + '/admin/terms_temp/',   // 模版条款的详情
    PostAdminTermTemplateSetStatus: api + '/admin/terms_temp/set_status',   // 模版条款的禁用、启用
    DeleteAdminTermTemplate: api + '/admin/terms_temp/',  // 删除

    GetAdminSaleTitleList: api + '/admin/sale/title',   // 销售头衔列表
    PostAdminSaleTitleCreate: api + '/admin/sale/title',   // 销售头衔添加
    PutAdminSaleTitleUpdate: api + '/admin/sale/title/',   // 销售头衔修改
    PutAdminSaleTitleStatus: api + '/admin/sale/title/status/',   // 销售头衔审核

    GetAdminInsuranceList: api + '/admin/insurance',      // 保险列表
    PostAdminInsuranceCreate: api + '/admin/insurance',       // 保险添加
    GetAdminInsuranceDetail: api + '/admin/insurance/',   // 保险详情
    PutAdminInsuranceUpdate: api + '/admin/insurance/',   // 保险详情更新
    PostAdminInsuranceStatus: api + '/admin/insurance/set_status',   // 保险状态修改
    DeleteAdminInsurance: api + '/admin/insurance/',       // 删除

    GetAdminUserinfoList: api + '/admin/user',      // 用户信息列表
    PostAdminUserinfoStatus: api + '/admin/user/set_status',      // 用户状态修改
    GetAdminUserinfoDetail: api + '/admin/user/',      // 用户详情
    PutAdminUserinfoUpdate: api + '/admin/user/',      // 用户详情修改
    GetAdminUserOrderIndex: api + '/admin/order/index',      // 用户订单



    GetAdminOrderGroupList: api + '/admin/group',  // 订单团列表
    GetAdminOrderGroupDetail: api + '/admin/group/',   // 订单团详情
    PostAdminOrderGroupSetGuide: api + '/admin/group/set_guide',   // 派遣导游
    GetAdminOrderGroupGuideList: api + '/admin/guide/data',   // 获取导游数据
    PostAdminOrderGroupMoveOrder: api + '/admin/group/move_order',   // 移动订单
    PostAdminOrderGroupShutoff: api + '/admin/group/shut_off',   // 不成团关团
    PostAdminOrderGroupOrderSms: api + '/admin/group/sendOrderSms',   // 发送订单预定成功通知短信接口
    PostAdminOrderGroupGroupSms: api + '/admin/group/sendGroupSms',   // 发送出团通知短信接口
    DeletetAdminOrderGroupSubGroup: api + '/admin/subGroup/',   // 删除子团
    PostAdminOrderGroupCancelSms: api + '/admin/group/sendOrderCancelSms',   // 发送不成团通知短信接口
    PutAdminOrderGroupNum: api + '/admin/group/',   // 设置出团人数限制


    PostAdminOrderAddPriceDetails: api + '/admin/order/add_price_details',  // 订单改价（附加收费、优惠）
    GetAdminOrderExport: api + '/admin/order/export/0',  // 跟团游订单导出
    GetAdminFreeOrderExport: api + '/admin/order/export/1',  // 自由行订单导出






    GetAdminOrderfreeTravelList: api + '/admin/order/free_travel',  // 自由行订单列表
    GetAdminOrderfreeTravelDetail: api + '/admin/order/free_travel/',  // 自由行订单详情
    GetAdminOrderfreeIndentSearch: api + '/admin/indent_search',  // 自由行下订单搜索产品


    GetAdminOrderGroupProductList: api + '/admin/order/group_product',  // 跟团游订单列表
    GetAdminOrderGroupProductDetail: api + '/admin/order/group_product/',  // 跟团游订单详情
    GetAdminProSearch: api + '/admin/product/search',  // 跟团游产品搜索
    PostAdminProductOrderGroup: api + '/admin/order/group_product',  // 跟团游后台下订单
    PostAdminOrderGroupFillOrderMember: api + '/admin/fill_order_members',  // 补录出行人信息
    PostAdminOrderConfirmReceipt: api + '/admin/order/confirm_receipt',  // 确认收款
    GetAdminOrderChangeDate: api + '/admin/order/change_date_show',  // 订单改日期（提交前展示）
    PostAdminOrderChangeDate: api + '/admin/order/change_date_update',  // 订单改日期（提交）
    PostAdminEditMember: api + '/admin/order/edit_member',  // 修改出行人信息
    PostAdminOrderEditInfo: api + '/admin/order/edit_info',  // 修改订单信息
    PostAdminOrderRecover: api + '/admin/order/recover',  // 恢复订单
    GetAdminProductToBuy: api + '/admin/product/to_buy/',  // 跟团游后台下订单获取信息
    PostAdminEffectIns: api + '/admin/insurance/effect_insurance',  // 投保
    GetAdminInsOrderDown: api + '/admin/insurance/order_down',  // 电子保单
    PostAdminInsCancel: api + '/admin/insurance/policy_cancel',  // 退保
    GetAdminContractView: api + '/admin/contract_view/',  // 电子合同
    PostAdminSignContract: api + '/admin/contract',  // 签署电子合同
    PostAdminOrderCancel: api + '/admin/order/cancel',  // 取消订单
    GetAdminOrderOperateLog: api + '/admin/order_opet_log/',  // 订单日志
    PostAdminSyncOrder: api + '/admin/send_bigline',  // 同步订单
    PostAdminContractCreateTravel: api + '/admin/contract_create',   //发送合同
    PostAdminContractCancelTravel: api + '/admin/contract_cancel',   //作废合同
    GetAdminOrderPrintConfirm: api + '/admin/print_receipt',  // 打印客人确认单
    GetAdminOrderDateList: api + '/admin/product_date_list',  // 获取跟团游自由行可下单的日期列表







    PostAdminOrderGroupAddMembers: api + '/admin/order/add_member',   //添加出行人
    PostAdminOrderBindid: api + '/admin/order_bind_id',   //添加销售






    GetAdminOptData: api + '/admin/admin_opt_data',  // 下单人




    GetAdminRefund: api + '/admin/refund',  // 退款列表
    PostAdminRefundCheck: api + '/admin/refund_check', // 审核提交
    PostAdminRefund: api + '/admin/refund', // 创建退款单
    GetAdminRefundPayLog: api + '/admin/refund/pay_log', // 支付流水
    PostAdminRefundFinish: api + '/admin/refund_finish', // 提交退款流水去向（完成退款）
    GetAdminRefundLog: api + '/admin/refund_log', // 退款流水列表
    PostAdminReRefund: api + '/admin/refund_log/resend', // 重新获取退款结果
    PostAdminRefundLogEdit: api + '/admin/refund_log/edit', // 变更退款流水信息
    PostAdminRefundDataCheck: api + '/admin/refund_data_check', // 主管审核退款
    GetAdminRefundAmountTotal: api + '/admin/refund_amount_total', //  财务退款 统计
    PostAdminRefundCancel: api + '/admin/cancel_refund', // 撤销退款




    GetAdminRefundDetail: api + '/admin/refund/',  // 退款详情
    PutAdminRefundDetailType: api + '/admin/refund/',  // 退款详情修改退款方式




    GetAdminProSearchFree: api + '/admin/independent_product/search',  // 自由行产品搜索
    PostAdminProductOrderGroupFree: api + '/admin/order/independent_product',  // 自由行后台下订单


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



    GetAdminGuideList: api + '/admin/guide',  // 导游列表
    PostAdminGuideCreate: api + '/admin/guide',   // 导游添加
    PutAdminGuideUpdate: api + '/admin/guide/',   // 导游修改
    GetAdminGuideDetail: api + '/admin/guide/',   // 导游详情
    DeleteAdminGuide: api + '/admin/guide/',   // 导游删除
    PostAdminGuideSetStatus: api + '/admin/guide/set_status',   // 导游启用





    PostAdminUploadImg: api + '/admin/upload_image', // 图片上传


    GetAdminRegionService: api + '/admin/region_service',   // 区域客服列表
    PostAdminRegionServiceCreate: api + '/admin/region_service', // 区域客服创建
    DeleteAdminRegionService: api + '/admin/region_service/', // 删除
    PutAdminRegion: api + '/admin/region_service/',    // 区域更新


    GetAdminOrderOrderTotal: api + '/admin/order/order_total',   // 跟团游订单统计
    GetAdminOrderIndenOrderTotal: api + '/admin/order/inden_order_total',   // 自由行订单统计
    PostAdminOrderGetWeChatPayQr: api + '/admin/order/get_wechat_pay_qr',   // 生成微信收款码
    GetAdminOrderAlipayCode: api + '/admin/order/get_alipay_code',   // 生成支付宝收款码不带参数
    PostAdminOrderAlipayCode: api + '/admin/order/get_alipay_code',   // 生成支付宝收款码带参数


    // 财务模块
    GetAdminFinanceFreeTravelList: api + '/admin/finance/free_travel',  // 自由行订单列表
    GetAdminFinanceGroupTravelList: api + '/admin/finance/group_product',  // 跟团游订单列表
    PostAdminFinanceOrderConfirm: api + '/admin/finance/order_confirm',  // 确认支付记录
    GetAdminFinanceGroupTravelToatl: api + '/admin/finance/productorder_total', // 跟团游统计
    GetAdminFinanceFreeTravelToatl: api + '/admin/finance/indentorder_total', // 自由行统计
    PostAdminOrderEditReceipt: api + '/admin/order/edit_receipt',  // 流水信息修改
    GetAdminFinanceGroupCashList: api + '/admin/group_cash_require',  // 团请款列表
    PostAdminFinanceOrderCheckoutCash: api + '/admin/check_cash_require',  // 团请款审核
    GetAdminGroupCashTotal: api + '/admin/group_cash_total',  // 团请款的合计
    GetAdminFinanceFreeCashList: api + '/admin/finance/free_travel_cash',  // 自由行请款列表
    GetAdminFreeCashTotal: api + '/admin/finance/free_travel_total',  // 自由行请款的合计
    GetAdminFinanceOrderReport: api + '/admin/finance_order_report',  // 财务统计报表
    PostAdminFinanceOrderDestroyReceive: api + '/admin/order/del_receipt',  // 作废收款记录



    // 供应商
    GetAdminSupplyList: api + '/admin/supplier',   // 列表
    PostAdminSupplyAdd: api + '/admin/supplier',   // 添加
    PutAdminSupplyUpdate: api + '/admin/supplier/',   // 更新



    // 生鲜商城
    GetAdminGoodsCateList: api + '/admin/goods_cate',   // 分类列表
    PostAdminGoodsCate: api + '/admin/goods_cate',   // 添加
    PutAdminGoodsCateUpdate: api + '/admin/goods_cate/',   // 更新
    GetAdminGoodsCateListTree: api + '/admin/cate_list_tree',   // 商品列表的分类列表

    GetAdminExpressCompanyList: api + '/admin/express_company',   // 快递列表
    PostAdminExpressCompany: api + '/admin/express_company',   // 添加
    PutAdminExpressCompanyUpdate: api + '/admin/express_company/',   // 更新
    DeleteAdminExpressCompany: api + '/admin/express_company/',   // 删除



    GetAdminGoodsList: api + '/admin/goods',     //商品列表
    PutAdminGoodsUpdate: api + '/admin/goods/',     //更新
    GetAdminGoodsDetail: api + '/admin/goods/',  // 详情
    PostAdminGoodsSetHot: api + '/admin/set_hot',   // 设置热门
    PostAdminGoodsSetShelves: api + '/admin/set_shelves/',     //商品上下架
    PostAdminGoodsSetCheck: api + '/admin/set_check/',     //商品审核
    PostAdminGoodsAddOrder: api + '/admin/goods_order',     //添加商品订单
    GetAdminGoodsOrderList: api + '/admin/goods_order',     //商品订单
    GetAdminGoodsOrderDetail: api + '/admin/goods_order/',     //商品订单详情
    PostAdminGoodsOrderUpdateItem: api + '/admin/goods_order/update_item',     //商品订单修改
    PutAdminGoodsOrderUpdateCon: api + '/admin/goods_order/',     //商品订单修改收货人信息
    PostAdminGoodsOrderConfirmReceipt: api + '/admin/goods_order/confirm_receipt',     //商品订单收款
    PostAdminGoodsOrderGetWeChatPayQr: api + '/admin/goods_order/get_wechat_pay_qr',   // 生成商品订微信收款码
    PostAdminGoodsOrderAlipayCode: api + '/admin/goods_order/get_alipay_code',   // 生成商品订支付宝收款码
    GetAdminFinanceGoodsOrderList: api + '/admin/finance/goods_order',     //财务商品订单
    PostAdminFinanceGoodsOrderConfirm: api + '/admin/finance/goods_order_confirm',   // 财务确认商品收款
    PostAdminFinanceGoodsOrderEditReceipt: api + '/admin/goods_order/edit_receipt',   // 财务修改商品流水
    GetAdminGoodsOrderCashRequireList: api + '/admin/goods_cash_list',     //商品请款列表
    PostAdminGoodsOrderCheckCash: api + '/admin/check_goods_cash',   // 请款审核



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
    PostStoreChangeJobNum: api + '/store/update_job_num', // 修改联系人



    GetStoreAccountList: api + '/store/store_account',    // 店铺的账号列表


    GetStoreForgetPassword: api + '/store/find_password', // 找回密码（第一步）
    PostStoreResetPasswordModel: api + '/store/reset_password', // 重置密码


    PostStorePassword: api + '/store/update_password', // 修改密码

    StoreLogin: api + '/store/login', // 店铺后台登陆接口
    StoreLogout: api + '/store/logout',  // 店铺后台登出接口
    StoreRefresh: api + '/store/refresh',  // 店铺后台Token刷新接口


    PostStoreProductCreate: api + '/store/product', // 添加产品api
    GetStoreAssemblingPlaceList: api + '/store/assembling_place/list',  // 产品管理获取集合地点
    PostStoreCopyProduct: api + '/store/copy_product',  // 复制产品

    GetStoreTagList: api + '/store/product/tag',  // 产品管理获取标签
    GetStoreCateList: api + '/store/tags/cate_list',  // 产品管理获取标签
    GetStoreProductList: api + '/store/product', // 获取产品列表api
    GetStoreProductDetail: api + '/store/product/', // 获取产品详情api
    PutStoreProductUpdate: api + '/store/product/', // 修改产品api
    PatchStoreProductStatus: api + '/store/product/',   // 产品上下架
    GetStoreQuoteByDate: api + '/store/date_quote', // 产品报价列表
    PostStoreQuoteByDate: api + '/store/date_quote', // 添加产品报价
    PutStoreQuoteByDate: api + '/store/date_quote/', // 添加产品报价
    DelStoreQuoteByDate: api + '/store/date_quote/',
    GetStoreProductCheckLog: api + '/store/product/check_log', // 审核日志
    PostStoreProductTrip: api + '/store/product_trip', // 逐条添加行程
    PostStoreProductTripDel: api + '/store/product_trip_del', // 删除行程
    GetStoreProSearch: api + '/store/product/search',  // 跟团游产品搜索
    PostStoreProductOrderGroup: api + '/store/order/group_product',  // 创建订单（跟团游）
    GetStoreProOperLog: api + '/store/product_opet_log/',      // 操作时间线


    PostStoreProductReward: api + '/store/product_reward', // 佣金的编辑
    GetStoreProductReward: api + '/store/product_default_reward', // 获取默认佣金
    PostStoreFreeReward: api + '/store/inden_product_reward', // 佣金的编辑

    GetStoreInsuranceList: api + '/store/insurance',      // 跟团游保险列表
    GetStoreInsuranceDayList: api + '/store/insurance/data',      // 跟团游保险列表天数
    GetStoreInsuranceDetail: api + '/store/insurance/',   // 保险详情




    GetStoreProSearchFree: api + '/store/independent_product/search',  // 自由行产品搜索
    PostStoreProductOrderGroupFree: api + '/store/order/independent_product',  // 创建订单（自由行）




    PostStoreUploadStroke: api + '/store/product/schedule_upload',  // 上传行程
    GetStoreProductMiniCode: api + '/store/get_mini_code', // 生成店铺产品小程序码





    PostStoreQuoteByDateSetCheck: api + '/store/product/set_check', // 产品报价提交审核

    PostStoreImgUpload: api + '/store/image',  // 上传图片
    GetStoreImgList: api + '/store/image',  // 获取图片列表
    PostStoreVideoUpload: api + '/store/upload_video',  // 上传视频


    // 自由行产品
    GetStoreFreeTravelList: api + '/store/independent_product',
    GetStoreFreeTravelDetail: api + '/store/independent_product/',
    PostStoreFreeTravelInfo: api + '/store/independent_product/',
    PostSaveStoreFreeTravelInfo: api + '/store/independent_product',
    PostUpDownFreeTravelInfo: api + '/store/independent_product/set_status',
    PostUpDownFreeTravelInfoSetCheck: api + '/store/independent_product/set_check',
    PostStoreFreeTravelInfoDetail: api + '/store/inden_product_trip',
    PostStoreFreeTraveDel: api + '/store/inden_trip_del',
    GetStoreIndentProOperLog: api + '/store/indent_opet_log/',      // 操作时间线







    // 自由行产品日期报价
    GetStoreFreeTravelQuote: api + '/store/independent_date_quote', // 自由行报价日期列表
    PostStoreFreeTravelQuote: api + '/store/independent_date_quote', // 自由行报价日期
    GetStoreFreeTravelQuoteDetail: api + '/store/independent_date_quote/', // 获取自由行报价日期详情
    PutStoreFreeTravelQuoteInfo: api + '/store/independent_date_quote/', // 修改自由行报价日期

    GetStoreMeetingPlace: api + '/store/assembling_place',   // 集合地点列表
    PostStoreMeetingPlaceCreate: api + '/store/assembling_place',   // 集合地点添加
    PutStoreMeetingPlaceUpdate: api + '/store/assembling_place/',   // 集合地点修改
    DeleteStoreMeetingPlace: api + '/store/assembling_place/',   // 集合地点删除
    GetStoreMeetingPlaceDetail: api + '/store/assembling_place/',   // 集合地点详情

    GetStoreProductTagList: api + '/store/tag', // 产品标签列表


    GetStoreTermsList: api + '/store/terms',  // 条款管理列表
    PostStoreTermsCreate: api + '/store/terms',   // 条款管理添加
    PutStoreTermsUpdate: api + '/store/terms/',   // 条款管理修改
    DeleteStoreTerms: api + '/store/terms/',   // 条款管理删除
    GetStoreTermsDetail: api + '/store/terms/',   // 条款管理详情
    PostStoreTermsUpdateCheck: api + '/store/terms/update_check',  // 条款审核
    GetStoreTemplate: api + '/store/terms_temp',  // 条款模板
    GetStoreTemplateDetail: api + '/store/terms_temp/',  // 条款模板详情
    PostStoreTemplateSetStatus: api + '/store/terms/set_status',  // 条款模板启用


    GetStoreGuideList: api + '/store/guide',  // 导游列表
    PostStoreGuideCreate: api + '/store/guide',   // 导游添加
    PutStoreGuideUpdate: api + '/store/guide/',   // 导游修改
    GetStoreGuideDetail: api + '/store/guide/',   // 导游详情
    DeleteStoreGuide: api + '/store/guide/',   // 导游删除
    PostStoreGuideSetStatus: api + '/store/guide/set_status',   // 导游启用


    GetStoreOrderGroupList: api + '/store/group',  // 订单团列表
    GetStoreOrderGroupDetail: api + '/store/group/',   // 订单团详情
    PostStoreOrderGroupSetGuide: api + '/store/group/set_guide',   // 派遣导游
    GetStoreOrderGroupGuideList: api + '/store/guide/data',   // 获取导游数据
    PostStoreOrderGroupMoveOrder: api + '/store/group/move_order',   // 移动订单
    PostStoreOrderGroupShutoff: api + '/store/group/shut_off',   // 不成团关团
    PostStoreOrderGroupOrderSms: api + '/store/group/sendOrderSms',   // 发送订单预定成功通知短信接口
    PostStoreOrderGroupGroupSms: api + '/store/group/sendGroupSms',   // 发送出团通知短信接口
    DeletetStoreOrderGroupSubGroup: api + '/store/subGroup/',   // 删除子团
    PostStoreOrderGroupCancelSms: api + '/store/group/sendOrderCancelSms',   // 发送不成团通知短信接口
    PutStoreOrderGroupNum: api + '/store/group/',   // 设置出团人数限制



    GetStoreOrderfreeTravelList: api + '/store/order/free_travel',  // 自由行订单列表
    GetStoreOrderfreeTravelDetail: api + '/store/order/free_travel/',  // 自由行订单详情
    GetStoreOrderGroupProductList: api + '/store/order/group_product',  // 跟团游订单列表
    GetStoreOrderGroupProductDetail: api + '/store/order/group_product/',  // 跟团游订单详情
    PostStoreOrderAddPriceDetails: api + '/store/order/add_price_details',  // 订单改价（附加收费、优惠）
    GetStoreOrderChangeDate: api + '/store/order/change_date',  // 订单改日期（提交前展示）
    PostStoreOrderChangeDate: api + '/store/order/change_date',  // 订单改日期（提交）
    PostStoreOrderConfirmReceipt: api + '/store/order/confirm_receipt',  // 确认收款
    GetStoreOrderOperateLog: api + '/store/order_opet_log/',  // 订单日志



    GetStoreRefund: api + '/store/refund',  // 退款列表
    GetStoreRefundDetail: api + '/store/refund/',  // 退款详情
    GetStoreRefundLog: api + '/store/refund_log', // 退款流水列表



    GetStoreContractList: api + '/store/store_contract',  // 合同列表
    PostStoreContractCreate: api + '/store/store_contract',   // 合同添加





    GetStoreAllRegions: api + '/store/regions_all_json',   // 店铺后台获取区域三级联动数据
    GetStoreCode: api + '/store/sendVerifySms', // 发送手机验证码



    // 自由行预售产品
    GetStorePreFreeTravelList: api + '/store/indent_ticket_list',   // 列表
    PostStorePreFreeTravelAdd: api + '/store/indent_ticket_add',  // 添加
    PostStoreCopyIndentPro: api + '/store/copy_indent_product',  // 复制产品




    // 成本
    GetStoreCostType: api + '/store/cost_type',   // 列表
    PostStoreCostTypeAdd: api + '/store/cost_type',   // 添加
    PutStoreCostTypeUpdate: api + '/store/cost_type/',   // 更新
    DeleteStoreCostType: api + '/store/cost_type/',   // 删除


    GetStoreCashList: api + '/store/cash_requirement_list',   // 供应商列表
    PostStoreCash: api + '/store/cash_requirement',   // 请款
    PutStoreCashUpdate: api + '/store/cash_requirement/',   // 更新
    DeleteStoreCashType: api + '/store/cash_requirement/',   // 删除



    // 预售管理
    GetStoreOrderTicket: api + '/store/order/ticket',   // 预售订单列表
    GetStoreOrderTicketDetail: api + '/store/order/ticket/',   // 预售订单详情
    GetStoreOrderTicketCode: api + '/store/order/ticket_code',   // 预约码列表
    GetStoreOrderTicketCodeDetail: api + '/store/order/ticket_code/',   // 预约码详情
    // 生鲜商城
    GetStoreGoodsCateListTree: api + '/store/cate_list_tree',   // 分类列表
    GetStoreGoodsList: api + '/store/goods',     //商品列表
    PostStoreAddGoods: api + '/store/goods',     //添加商品
    PutStoreGoodsUpdate: api + '/store/goods/',     //更新
    GetStoreGoodsDetail: api + '/store/goods/',  // 详情
    PostStoreGoodsSetShelves: api + '/store/set_shelves/',     //商品上下架
    PostStoreGoodsSetCheck: api + '/store/set_check/',     //商品审核
    GetStoreGoodsOrderList: api + '/store/goods_sub_order',     //商品订单
    GetStoreGoodsOrderDetail: api + '/store/goods_sub_order/',     //商品订单详情
    PostStoreGoodsOrderUpdateItem: api + '/store/goods_order/update_item',     //商品订单修改
    PostStoreGoodsOrderAddSub: api + '/store/goods_order/add_sub',     //拆分订单


    GetStoreExpressCompanyList: api + '/store/express_company/list',     //快递公司
    PostStoreGoodsSendExpress: api + '/store/goods_order/express',     //快递发货

    PostStoreGoodsOrderRequest: api + '/store/goods_cash_requirement',     //商品订单请款
    PutStoreGoodsOrderCashUpdate: api + '/store/goods_cash_requirement/',   // 更新
    DeleteStoreGoodsOrderCashType: api + '/store/goods_cash_requirement/',   // 删除




    PostStoreGoodsImgUpload: api + '/store/goods_image',  // 上传商品图片
    GetStoreGoodsImgList: api + '/store/goods_image',  // 获取商品图片列表
    PostStoreGoodsVedioUpload: api + '/store/goods_video',  // 上传商品视频



};
