export interface AddStoreProductModel {
  title: string;
  departure_city: string;
  destination_city: string;
  earlier: number;
  confirm: number;
  few_days: number;
  few_nights: number;
  child_status: number;
  child_age_max: number;
  child_height_min: number;
  child_height_max: number;
  reserve_num_min: number;
  reserve_num_max: number;
  contacts_status: number;
  assembling_place_id: number[];
  fee: string;
  tag_id: number[];
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
  status: number;//状态：0/禁用，1/启用
  updated_at: string;
}


// 详情返回
export interface ProductDateilResponseModel {
  data: DataModel;
}

export interface DataModel {
  id: number;
  title: string;
  store_id: number;
  departure_city: string;
  earlier: number;
  confirm: number;
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
  product_album: Productalbum;
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


// 列表返回
export interface ProductResponseListResponseModel {
  data: DatumListModel[];
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: any[];
  next_page_url?: any;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to: number;
  total: number;
}


export interface DatumListModel {
  id: number;
  title: string;
  few_days: number;
  few_nights: number;
  adult_price: number;
  child_price: number;
  status: number;
  check_status: number;
  created_at: string;
  updated_at: string;
}



export interface DetailModel {
  title: string;
  earlier: number;
  confirm: number;
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
  child_height_min: number;
  child_height_max: number;
  feature: string;
  details: string;
  fee: string;
  notice: string;
  status: number;
  tag_id: number[];
}



export interface UploadImgModel {
  image: any;
}


export interface  AssemblingPlaceListModel{
  data: DatumList[];
}


export interface  DatumList{
  id: number;
  name: string;
}



