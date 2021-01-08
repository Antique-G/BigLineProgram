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
    store_id: number;
    few_days: number;
    few_nights: number;
    departure_city: string;
    destination_city: string;
    earlier: number;
    confirm: number;
    pay_method: number;
    service_phone: string;
    min_price: number;
    reserve_num: number;
    reserve_children: number;
    reserve_ahead: number;
    children_age: number;
    children_height: number;
    feature: string;
    details: string;
    fee: string;
    notice: string;
    status: number;
    check_status: number;
    created_at?: any;
    updated_at?: any;
    store: StoreModel;
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


export interface AdminFreeTravelDetailResponseModel {
    data: DataFreeTravelDetailModel;
}

export interface DataFreeTravelDetailModel {
    id: number;
    title: string;
    store_id: number;
    few_days: number;
    few_nights: number;
    departure_city: string;
    destination_city: string;
    earlier: number;
    confirm: number;
    pay_method: number;
    service_phone: string;
    min_price: number;
    reserve_num: number;
    reserve_children: number;
    reserve_ahead: number;
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
    confirm: number;
    few_days: number;
    few_nights: number;
    departure_city: number;
    destination_city: number;
    service_phone: string;
    reserve_num: number;
    reserve_children: number;
    reserve_ahead: number;
    children_age: number;
    child_height_min: number;
    child_height_max: number;
    fee: string;
    status: number;
    tag_id: number[];
    step: any;
}

