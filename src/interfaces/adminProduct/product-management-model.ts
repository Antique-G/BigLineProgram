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
    pay_method: number;
    few_days: number;
    few_nights: number;
    adult_price: number;
    child_price: number;
    original_adult_price: number;
    original_child_price: number;
    difference_price: number;
    destination: string;
    advance: number;
    child_status: number;
    child_age_max: number;
    child_height_min: number;
    child_height_max: number;
    reserve_num_min: number;
    reserve_num_max: number;
    contacts_status: number;
    work_t_tem: number;
    inventory: number;
    inventory_num: number;
    inventory_exceed: number;
    assembling_place_id: number[];
    feature: string;
    details: string;
    fee: string;
    notice: string;
    status: number;
    tag_id: number[];
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
}

