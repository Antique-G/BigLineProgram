export interface AdminFreeTravelListResponseModel {
    current_page: number;
    data: DatumModel[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: LinksModel[];
    next_page_url?: any;
    path: string;
    per_page: string;
    prev_page_url?: any;
    to: number;
    total: number;

}


export interface LinksModel {
    url?: string;
    label: number | string;
    active: boolean;
}

export interface DatumModel {
    id: number;
    title: string;
    sub_title: string;
    store_id: number;
    code: string;
    few_days: number;
    few_nights: number;
    departure_city: string;
    destination_city: string;
    earlier: number;
    service_phone: string;
    min_price: number;
    price_range: number;
    reserve_num: number;
    reserve_children: number;
    reserve_ahead: number;
    children_age: number;
    child_age_min: number;
    child_height_min: number;
    child_height_max: number;
    feature?: string;
    details?: string;
    fee: string;
    notice?: string;
    status: number;
    check_status: number;
    created_at?: string;
    updated_at: string;
    departure: string;
    destination: string;
    store: StoreModel;
    check_log: LogModel[];
    date_quotes?: DatequoteModel;
    quote_status: number;
    operation_name: string;

}

export interface StoreModel {
    store_id: number;
    name: string;
    region_code: string;
    fax: string;
    phone: string;
    mobile: string;
    contact: string;
    profile_photo_path?: any;
    status: number;
    created_at: string;
    updated_at: string;
    region_full_name: string;
}


export interface LogModel {
    id: number;
    inden_product_id: number;
    check_status: number;
    reason: string;
    admin_id: number;
    created_at: string;
    updated_at: string;

}

export interface DatequoteModel {
    id: number;
    independent_product_id: number;
    date: string;
    adult_price: number;
    child_price: number;
    difference_price: number;
    inventory_num: number;
    sold_num: number;
    set_inventory: number;
    allow_over: number;
    check_status: number;
    created_at: string;
    updated_at: string;
}


export interface AdminFreeTravelDetailResponseModel {
    data: DataFreeTravelDetailModel;
}

export interface DataFreeTravelDetailModel {
    id: number;
    title?: string;
    scenic_spot?: string;
    sub_title: string;
    store_id: number;
    few_days: number;
    few_nights: number;
    departure_city: string;
    destination_city: string;
    earlier: number;
    pay_method: number;
    service_phone: string;
    min_price: number;
    reserve_num: number;
    reserve_children: number;
    reserve_ahead: number;
    child_age_min: number;
    children_age: number;
    children_height: number;
    feature: string;
    details: string;
    fee: string;
    notice: string;
    status: number;
    check_status: number;
    created_at?: any;
    updated_at: string;
    albums: Storeimage;
}

interface Storeimage {
    data: any[];
}



export interface FreeTravelUpdateModel {
    id?: number;
    title: string;
    earlier: number;
    sub_title: '',
    few_days: number;
    few_nights: number;
    departure_city: number;
    destination_city: number;
    service_phone: string;
    reserve_num: number;
    reserve_children: number;
    reserve_ahead: number;
    child_age_min: number;
    children_age: number;
    child_height_min: number;
    child_height_max: number;
    fee: string;
    status: number;
    tag_id: number[];
    step: any;
}

export interface FreeTravelQuteDateModel {
    current_page: number;
    data: DatumModel[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: LinksModel[];
    next_page_url?: any;
    path: string;
    per_page: string;
    prev_page_url?: any;
    to: number;
    total: number;
}

export interface SetCheckModel {
    id: number;
    check_status: number;
    reason?: string;
}