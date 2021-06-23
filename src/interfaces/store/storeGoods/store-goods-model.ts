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
    send_time: any;
    sales_note: string;
    product_area: string;
    delivery_type: string;
    is_hot: string;
    sort: string;
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

