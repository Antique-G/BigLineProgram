export interface AdminProductManagementListResponseModel {
  meta: Meta;
  data: DatumModel[];

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

interface DatumModel {
  id: number;
  title: string;
  sub_title: string;
  code: string;
  scenic_spot: string;
  quote_status: any;
  few_days: number;
  few_nights: number;
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
  child_height_min: number;
  child_height_max: number;
  store_name: string;
  departure_city_full_name: string;
  destination_city_full_name: string;
  departure_city_name: string;
  destination_city_name: string;
}


export interface AdminProductManagementUpdateModel {
  title: string;
  sub_title: string;
  scenic_spot: string;
  region_code: string;
  earlier: number;
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
  reason?: string;

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
  scenic_spot: string;
  sub_title: string;
  store_id: number;
  departure_city: string;
  earlier: number;
  few_days: number;
  few_nights: number;
  minimum_price: number;
  maximum_price: number;
  original_minimum_price: number;
  original_maximum_price: number;
  difference_price: number;
  destination_city: string;
  child_status: number;
  child_age_max: number;
  child_height_min: number;
  child_height_max: number;
  reserve_num_min: number;
  reserve_num_max: number;
  contacts_status: number;
  feature: string;
  details: string;
  fee: string;
  notice: string;
  status: number;
  created_at: string;
  updated_at: string;
  check_status: number;
  step_status: number;
  departure_city_full_name: string;
  destination_city_full_name: string;
  assembling_place: Assemblingplace;
  tag: Tag;
  album: Productalbum;
}


interface Productalbum {
  data: Datum3[];
}

interface Datum3 {
  id: number;
  url: string;
  url_sm: string;
  sort: number;
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


export interface ProductQuteDateModel {
  current_page: number;
  data: [];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: [];
  next_page_url?: any;
  path: string;
  per_page: string;
  prev_page_url?: any;
  to: number;
  total: number;
}


export interface CheckLogModule {
  id: number;
  product_id: number;
  check_status: number;
  reason: string;
  admin_id: number;
  created_at: string;
  updated_at: string;
  admin_name: string;
}

export interface StoreListModel {
  store_id: number;
  name: string;
}
