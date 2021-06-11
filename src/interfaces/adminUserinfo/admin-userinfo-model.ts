export interface AdminUserinfoListRequestModel {
    page?: number;
    per_page?: number;
    status?: number;
    keyword?: any;
}
export interface AdminUserinfoListResponseModel {
    current_page: number;
    data: Datum[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url?: any;
    path: string;
    per_page: number;
    prev_page_url?: any;
    to: number;
    total: number;
}

export interface Link {
    url?: string;
    label: number | string;
    active: boolean;
}

export interface Datum {
    user_id: number;
    name: string;
    real_name: string;
    gender: number;
    status: number;
    title_id: number;
    phone: string;
    birth?: any;
    created_at: string;
    updated_at: string;
    email: string;
    email_verified_at?: any;
    profile_photo_url: string;
}

export interface SetStatusRequestModel {
    user_id: number;
    status: number;
}



// 详情
export interface DetailModel {
    user_id: number;
    name: string;
    real_name: string;
    gender: string;
    avatar_url: string;
    region_code: string;
    status: number;
    title_id: number;
    phone: string;
    openid: string;
    birth: object;
    created_at: string;
    updated_at: string;
    email_verified_at: object;
    money: number;
    dist: number;
    parent_id: number;
    apply_time: number;
    temporary: number;
    combined_id: number;
    deleted_at: object;
    total_reward: number;
    city_name: string;
}


// 更新
export interface UpdateInfoModel {
    name: string;
    real_name: string;
    gender: string;
    phone: string;
    id?: any
}


// 用户关联订单
export interface UserOrderModel {
    data: DataUserOrderModel[];
    meta: MetaUserOrderModel;
}


export interface MetaUserOrderModel {
    pagination: PaginationUserOrderModel;
}

export interface PaginationUserOrderModel {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
    links: LinksUserOrderModel;
}

export interface LinksUserOrderModel {
    next: string;
}

export interface DataUserOrderModel {
    id: number;
    store_id: number;
    user_id: number;
    contact_phone: string;
    contact_name: string;
    product_id: number;
    product_code: string;
    product_name: string;
    start_date: string;
    order_status: number;
    price_total: number;
    price_receive: number;
    payment_status: number;
    order_sms: number;
    insurance_status: number;
    cancel_type: number;
    refund_status: number;
    created_at: string;
    product_type: any;
    bind_type: number;
    bind_id: number;
    num_adult: number;
    num_kid: number;
    baby_num: number;
    contract_status: number;
    payout_status: number;
    refund_amount: number;
    amount_received: string;
    store_name: string;
    insurance_status_info: string;
    cancel_type_info: string;
    bind_account_name: string;
    bind_shop_name: string | object;
    refunding_amount: number;
    cash_money_total: number;
    num_member: number;
    refund_member: number[];
    total_member: number[];
}


