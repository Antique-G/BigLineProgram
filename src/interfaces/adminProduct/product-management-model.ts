export interface AdminProductManagementListResponseModel {
    current_page: number;
    data: DatumModel[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: LinkModel[];
    next_page_url: string;
    path: string;
    per_page: boolean;
    prev_page_url?: any;
    to: number;
    total: number;
}
interface LinkModel {
    url?: string;
    label: number | string;
    active: boolean;
  }
  
  interface DatumModel {
    id: number;
    title: string;
    few_days: number;
    few_nights: number;
    store_id: number;
    adult_price: number;
    child_price: number;
    status: number;
    check_status: number;
    created_at: string;
    updated_at: string;
    region_full_name: string;
    store: StoreModel;
  }
  
  interface StoreModel {
    store_id: number;
    name: string;
    region_code: string;
    address: string;
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


export interface AdminProductManagementUpdateModel {
    title: string;
    region_code: string;
    earlier: number;
    confirm: number;
    // pay_method: number;
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