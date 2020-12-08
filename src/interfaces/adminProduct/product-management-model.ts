export interface AdminProductManagementListResponseModel {
    data: Datum[];
    meta: Meta;
}

export interface Meta {
    pagination: Pagination;
}

export interface Pagination {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
    links: Links;
}

export interface Links {
}

export interface Datum {
    id: number;
    title: string;
    few_days: number;
    few_nights: number;
    store_id: number;
    adult_price: number;
    child_price: number;
    status: number;
    check_status: number;
    created_at?: string;
    updated_at?: string;
}


export interface AdminProductManagementUpdateModel {
    title: string;
    region_code: string;
    earlier: number;
    confirm: number;
    pay_method: number;
    few_days: number;
    few_nights: number;
    adult_price: number;
    child_price: number;
    original_adult_price: number;
    original_child_price: number;
    difference_price: number;
    assembling_place_id: number[];
    feature: string;
    details: string;
    fee: string;
    notice: string;
    status: number;
    tag_id: number[];
    id?: number;
}

export interface AdminProductSetStatusModel {
    id: number;
    status: number;
}

export interface AdminProductCheckStatusModel {
    id: number;
    check_status: number;
}

export interface AdminProductResponseModel {
    message?: string;
    status_code?: string;
}