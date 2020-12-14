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
    assembling_place_id: [];
    feature: string;
    details: string;
    fee: string;
    notice: string;
    status?: number;
    tag_id: [];
    id?: any;
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

export interface AdminProductDetailResponseModel {
    data: DataProductDetailModel;
}

export interface DataProductDetailModel {
    id?: number;
    title: string;
    store_id: number;
    region_code: string;
    earlier: number;
    confirm: number;
    pay_method: number;
    few_days: number;
    few_nights: number;
    adult_price: number;
    child_price: number;
    minimum_price: number;
    maximum_price: number;
    original_adult_price: number;
    original_child_price: number;
    original_minimum_price: number;
    original_maximum_price: number;
    difference_price: number;
    feature: string;
    details: string;
    fee: string;
    notice: string;
    status: number;
    check_status: number;
    created_at: string;
    updated_at: string;
    assembling_place: Assemblingplace;
    tag: Tag;
}

export interface Tag {
    data: Datum2[];
}

export interface Datum2 {
    id: number;
    name: string;
}

export interface Assemblingplace {
    data: Datum3[];
}

export interface Datum3 {
    id: number;
    name: string;
    longitude?: any;
    latitude?: any;
}