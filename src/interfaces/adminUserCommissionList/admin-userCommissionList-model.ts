export interface AdminUserCommissionListRequestModel {
    page?: number;
    per_page?: number;
    order_id?: any;
    user_id?: any;
}

export interface AdminUserCommissionListResponseModel {
    current_page: number;
    data: Datum[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url?: any;
    to: number;
    total: number;
}

interface Link {
    url?: string;
    label: number | string;
    active: boolean;
}

interface Datum {
    id: number;
    user_id: number;
    order_id: number;
    dist_reward: number;
    status: number;
    created_at: string;
    updated_at: string;
    type: number;
    content: string;
    product_reward: number;
    name: string;
    product_name: string;
    num_total: number;
    product_type: number;
    price_total: number;
    second_user?: string;
    second_user_reward?: number;
    first_user?: string;
    first_user_reward?: number;
}
export interface UserCommissionAuditModel {
    id: number;
    status: number;
    content?: string;

}
export interface UserCommissionAuditResponseModel {
    message?: string;
    status_code?: string;
}


//   小程序提现列表
export interface AdminUserWithdrawListResponseModel {
    data: DataAdminUserWithdrawListResponseModel[];
    meta: MetaAdminUserWithdrawListResponseModel;
}

export interface MetaAdminUserWithdrawListResponseModel {
    pagination: PaginationDataAdminUserWithdrawListResponseModel;
}

export interface PaginationDataAdminUserWithdrawListResponseModel {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
    links: object;
}

export interface DataAdminUserWithdrawListResponseModel {
    id: number;
    user_id: number;
    money: number;
    order_sn: string;
    payment_no: string;
    status: number;
    pay_status: number;
    pay_type: number;
    bank_name: string;
    bank_number: string | boolean;
    bank_user: string;
    bank_id: number;
    pay_time: number;
    error_desc: string;
    created_at: string;
    updated_at: string;
    transaction_id: string;
    reviewer_name: string;
    user: UserAdminUserWithdrawListResponseModel;
}

export interface UserAdminUserWithdrawListResponseModel {
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
    frozen_money: number;
    dist: number;
    parent_id: number;
    apply_time: number;
    temporary: number;
    combined_id: number;
    deleted_at: object;
    total_reward: number;
    city_name: string;
}


//   小程序提现审核
export interface AdminUserWithdrawReview {
    status: any;
    error_desc: any;
    payment_no: any;
    pay_time: any;
    id: any;
}