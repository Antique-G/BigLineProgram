// 分类列表
export interface StoreGoodCateTreeList {
    id: number;
    name: string;
    pid: number;
    level: number;
    children: StoreGoodCateTreeListChildren[];
}

export interface StoreGoodCateTreeListChildren {
    id: number;
    name: string;
    pid: number;
    level: number;
    children?: Children[];
}

export interface Children {
    id: number;
    name: string;
    pid: number;
    level: number;
}


// 添加产品
export interface AddGoodsModel {
    title: string;
    cate_id: string;
    is_order: string;
    send_time_start: any,
    send_time_end: any,
    sales_note: string;
    product_area: string;
    delivery_type: string;
    is_hot?: string;
    sort?: string;
    goods_specs: GoodsSpecsAddGoods[];
    id?: any;
    step?: any;
}

export interface GoodsSpecsAddGoods {
    spec_name: string;
    price: any;
    stock: any;
    unit?: string;
    postage: string;
    id?: any;
}



// 商品列表
export interface GoodsListModel {
    data: DataGoodsListModel;
}

export interface DataGoodsListModel {
    current_page: number;
    data: Data[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Links[];
    next_page_url: object;
    path: string;
    per_page: number;
    prev_page_url: object;
    to: number;
    total: number;
}

export interface Links {
    url: object | string;
    label: string;
    active: boolean;
}

export interface Data {
    id: number;
    cate_id: number;
    title: string;
    sub_title: string;
    product_area: string;
    delivery_type: number;
    store_id: number;
    is_order: number;
    send_time: string;
    details: string | object;
    notice: string | object;
    step_status: number;
    poster_url: string;
    operation_name: string;
    operation_id: number;
    check_status: number;
    status: number;
    is_hot: number;
    sales_note: string;
    sort: number;
    created_at: object | string;
    updated_at: string | object;
    goods_specs: GoodsSpecsGoodsList[];
    goods_cate: GoodsCate;
    goods_area_name: any;
    store: any;
    check_log: any;
    cate_name: any;
}

export interface GoodsCate {
    id: number;
    name: string;
    desc: string;
    pid: number;
    sort: number;
    status: number;
    level: number;
    created_at: string;
    updated_at: string;
}

export interface GoodsSpecsGoodsList {
    id: number;
    good_id: number;
    spec_name: string;
    spec_desc: string;
    sort: number;
    price: number;
    unit: string;
    stock: number;
    postage: number;
    postage_policy: number;
    check_status: number;
    status: number;
    created_at: object | string;
    updated_at: string | object;
}




// 商品上下架
export interface GoodsSetStatusModel {
    id: any;
    status: any;
}


// 商品审核
export interface GoodsSetCheckStatusModel {
    id: any;
    check_status: any;
}


// 设置热门
export interface GoodsSetHotModel {
    id: any;
    is_hot: any;
    sort: any;
}


// 添加商品
export interface AddGoodsOrderModel {
    region_code: any;
    address: any;
    consignee: any;
    phone: any;
    price_total: any;
    goods_id: any;
    spec_id: any;
    goods_num: any;
    freight: any;
    remarks: any;
    user_phone: any;
    discount: any;
    extra: any
}


// 订单列表
export interface GoodsOrderListModel {
    data: DataGoodsOrderListModel[];
    meta: MetaGoodsOrderListModel;
}

export interface MetaGoodsOrderListModel {
    pagination: Pagination;
    statistics?: any;
}

export interface Pagination {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
    links: object;
}

export interface DataGoodsOrderListModel {
    id: number;
    user_id: number;
    bind_id: number;
    bind_name: any;
    order_status: number;
    payment_status: number;
    refund_status: number;
    price_total: number;
    region_code: string;
    consignee: string;
    phone: string;
    address: string;
    zip_code: string;
    created_at: string;
    updated_at: string;
    payout_status: string;
    sub_order: SubOrderGoodsOrderListModel;
}

export interface SubOrderGoodsOrderListModel {
    data: Data_1GoodsOrderListModel[];
}

export interface Data_1GoodsOrderListModel {
    id: number;
    order_id: number;
    store_id: number;
    total_price: number;
    express_number: string;
    express_status: number;
    order_status: number;
    status: number;
    created_at: string;
    updated_at: string;
    remarks: string;
    order_item: OrderItem;
}

export interface OrderItem {
    data: DataOrderItem[];
}

export interface DataOrderItem {
    id: number;
    sub_order_id: number;
    order_id: number;
    goods_id: number;
    spec_id: number;
    goods_name: string;
    spec_name: string;
    goods_num: number;
    goods_price: number;
    freight_price: number;
    total_price: number;
    created_at: string;
    updated_at: string;
    send_start: string;
    send_end: string;
    cate_name: string;
}

// 修改商品订单信息
export interface UpdateGoodsOrderModel {
    item_id: any;
    spec_id: any;
    goods_num: any;
    goods_price: any;
    freight_price: any;
    extra: any;
    discount: any;
}

// 拆分订单
export interface SplitGoodsOrderModel {
    item_ids: any;
    sub_order_id: any;
}


// 修改收货人信息
export interface UpdateGoodsOrderConsigneeModel {
    consignee: any;
    phone: any;
    region_code: any;
    address: any;
    remark: any;
    id?: any;
}



// 添加快递信息
export interface AddExpressCompanyModel {
    name: any;
    status: any;
    id?: any;
}



// 获取店铺路由的快递
export interface StoreExpressCompanyList {
    data: DataStoreExpressCompanyList[];
}

export interface DataStoreExpressCompanyList {
    id: number;
    name: string;
}

// 快递发货
export interface SendStoreExpressCompany {
    sub_order_id: any;
    express_company: string;
    express_number: any;
}


//商品请款
export interface GoodsOrderRequestModel {
    order_id: any;
    cost_type: any;
    suppiler_id: any;
    goods_info: any;
}