export interface AddStoreProductModel {
    scenic_spot?: string;
    title: string;
    sub_title: string;
    departure_city: string;
    destination_city: string;
    earlier: number;
    few_days: number;
    few_nights: number;
    child_status: number;
    child_age_max: number;
    child_age_min: number;
    child_height_min: number;
    child_height_max: number;
    reserve_num_min: number;
    reserve_num_max: number;
    contacts_status: number;
    assembling_place_id: number[];
    fee: string;
    tag_id: number[];
    reserve_ahead: number;
    step?: any;
    id?: any;
    insurance_base?: any;
    insurance_extra?: any;
    request_id_num?: number;
    baby_occupy?: any;
    include_insurance_fee?: any;
    insurance_base_info?: any;
    sales_note?: any;

}

// 返回
export interface AddProductResponseModel {
    message?: string;
    code?: string;
    debug?: object;
    status_code?: number;
    errors?: object;
    id: number
}


// 查询
export interface Datum {
    id: number;
    title: string;//标题
    few_days: number;//几天
    few_nights: number;//	几晚
    adult_price: number;//	成人价格
    child_price: number;//儿童价格
    baby_price?: number;//婴儿价格
    status: number;//状态：0/禁用，1/启用
    updated_at: string;
}


// 详情返回
export interface ProductDateilResponseModel {
    data: DataModel;
}

export interface DataModel {
    id: number;
    code: string;
    title: string;
    sub_title: string;
    scenic_spot: string;
    store_id: number;
    departure_city: string;
    earlier: number;
    confirm: number;
    few_days: number;
    few_nights: number;
    price_range: number;
    minimum_price: number;
    maximum_price: number;
    original_minimum_price: number;
    original_maximum_price: number;
    destination_city: string;
    child_status: number;
    child_age_max: number;
    child_age_min: number;
    child_height_min: number;
    child_height_max: number;
    reserve_num_min: number;
    reserve_num_max: number;
    reserve_ahead: number;
    contacts_status: number;
    work_t_tem: number;
    feature: string;
    details?: any;
    fee: string;
    notice?: any;
    status: number;
    created_at: string;
    updated_at: string;
    check_status: number;
    step_status: number;
    poster_url: string;
    trip_type: number;
    departure_city_full_name: string;
    destination_city_full_name: string;
    departure_city_name: string;
    destination_city_name: string;
    assembling_place: Assemblingplace;
    tag: Tag;
    album: Productalbum;
    product_trip: Producttrip;
    insurance_base?: any;
    insurance_extra?: any;
    request_id_num?: number;
    baby_occupy?: any;
    include_insurance_fee?: any;
    insurance_base_info?: any;
    sales_note?: any;

}

interface Producttrip {
    data: ProducttripList[];
}

interface ProducttripList {
    id: number;
    day: number;
    title: string;
    product_id: number;
    content: string;
}


interface Productalbum {
    data: Datum3[];
}

interface Datum3 {
    id: number;
    url: string;
    url_sm: string;
    sort: number;
    type: number;
}

interface Tag {
    data: Datum2[];
}

interface Datum2 {
    id: number;
    name: string;
}

interface Assemblingplace {
    data: Datum4[];
}

interface Datum4 {
    id: number;
    name: string;
    longitude?: any;
    latitude?: any;
}


// 列表返回
export interface ProductResponseListResponseModel {
    data: DatumListModel[];
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
    next: string;
}

export interface DatumListModel {
    id: number;
    title: string;
    few_days: number;
    few_nights: number;
    code: string;
    store_id: number;
    minimum_price: number;
    maximum_price: number;
    departure_city: string;
    destination_city: string;
    status: number;
    check_status: number;
    created_at: string;
    updated_at: string;
    child_age_max: number;
    child_age_min: number;
    child_height_min: number;
    child_height_max: number;
    finish_status: boolean;
    departure_city_full_name: string;
    destination_city_full_name: string;
    departure_city_name: string;
    destination_city_name: string;
    reward_set?: any;
    commerce_reward?: any;
    third_reward?: any;
    store_reward?: any;
    dist_reward?: any;
    insurance_base?: any;
    insurance_extra?: any;
    request_id_num?: number;
    baby_occupy?: any;
    include_insurance_fee?: any;
    insurance_base_info?: any;
    sales_note?: any;

}



interface Storeimage {
    data: StoreimageDatum[];
}

interface StoreimageDatum {
    id: number;
    region_code: string;
    url: string;
    url_sm: string;
    desc: string;
    region_name: string;
    sort: number;
}

export interface DetailModel {
    title: string;
    earlier: number;
    pay_method: number;
    few_days: number;
    few_nights: number;
    departure_city: number;
    destination_city: number;
    service_phone: string;
    reserve_num: number;
    reserve_children: number;
    reserve_ahead: number;
    children_age: number;
    child_age_min: number;
    request_id_num?: number;
    child_height_min: number;
    child_height_max: number;
    feature: string;
    details: string;
    fee: string;
    notice: string;
    status: number;
    tag_id: number[];
    baby_occupy?: any;
    insurance_base?: any;
    insurance_extra?: any;
    include_insurance_fee?: any;
    insurance_base_info?: any;
    sales_note?: any;

}



export interface UploadImgModel {
    image: any;
}


export interface AssemblingPlaceListModel {
    data: DatumList[];
}


export interface DatumList {
    id: number;
    name: string;
    time?: string;
    time_state?: number;
}


export interface ProductTagCateListModel {
    data: DataProductTagCateList[];
}

export interface DataProductTagCateList {
    id: string;
    name: string;
}

// 逐条添加行程
export interface AddProductTrip {
    product_id: string;
    trip_arr: Triparr[];
    trip_type: number;
}

export interface Triparr {
    day: string;
    title: string;
    product_id: string;
    content: string;
    id: string;
}

// 佣金
export interface SetRewardModel {
    product_id: any;
    reward_set: any;
    day: any;
    dist_reward: any;
    store_reward: any;
    third_reward: any;
    commerce_reward: any;
}
