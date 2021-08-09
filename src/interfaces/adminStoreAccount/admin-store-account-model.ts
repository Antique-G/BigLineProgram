export interface AddStoreAccountRequestModel {   // 1.1创建商铺账号的接收数据模块
    password: string;
    password_confirmation: string;
    name: string;
    mobile: string;
    email: string;
    level: string;
    store_id: string;
    status: any;
    job_num?: any;

}

export interface AddStoreAccountResponseModel {  //1.2创建商铺帐号的返回数据模块
    message: string;
    status_code?: string;
}


export interface AdminStoreAccountListRequestModel {  // 2.1创建商铺账号列表的接收数据模块
    store_id: any;
}

export interface AdminStoreAccountListResponseModel {  //2.2.1创建商铺帐号的返回数据模块
    data: Datum[];
    meta: Meta;
}

interface Meta {
    pagination: Pagination;
}

interface Pagination {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
    links: Links;
}

interface Links {
}

interface Datum {
    account_id: number;
    name: string;
    password: string;
    remember_token?: any;
    mobile: string;
    email: string;
    level: number;
    store_id: number;
    status: number;
    created_at: string;
    updated_at: string;
    job_num?: any;
}

export interface DataDetailStoreAccountResponseModel {
    account_id: any;
    created_at: string;
    email: string;
    level: any;
    mobile: string;
    name: string;
    password: string;
    password_confirmation: string;
    remember_token: any;
    status: any;
    store_id: any;
    updated_at: string;
    job_num?: any;

}

export interface StoreAccountDetailUpdateRequestModel {
    name: string;
    password: string;
    password_confirmation: string;
    mobile: string;
    email: string;
    level: any;
    store_id: string;
    status: any;
    account_id: any;
    job_num?: any;
}




