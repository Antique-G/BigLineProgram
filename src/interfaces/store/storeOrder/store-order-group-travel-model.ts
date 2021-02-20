// 列表
export interface StoreOrderGroupTravelListRequestModel {
  data: StoreOrderGroupTravelList[];
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

export interface StoreOrderGroupTravelList {
  id: number;
  user_id: number;
  product_id: number;
  product_name: string;
  start_date?: any;
  store_id: number;
  product_type: number;
  group_id: number;
  sub_group_id: number;
  num_total: number;
  num_adult: number;
  num_kid: number;
  price_total: number;
  price_adult: number;
  price_kid: number;
  price_diff: number;
  price_insurance: number;
  price_other: number;
  discount_other: number;
  insurance_id: number;
  order_status: number;
  payment_status: number;
  refund_status: number;
  cancel_type: number;
  shared_status: number;
  num_room: number;
  contact_name: string;
  contact_phone: string;
  contact_wechat: string;
  contact_qq: string;
  customer_remarks: string;
  internal_remarks: string;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  contact_email: string;
  assembling_place: string;
  assembling_time: string;
  order_sms: number;
  member: Member;
  product: Product;
}

export interface Product {
  data: ProductList;
}

export interface ProductList {
  id: number;
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
  child_height_min: number;
  child_height_max: number;
  reserve_num_min: number;
  reserve_num_max: number;
  reserve_ahead: number;
  contacts_status: number;
  work_t_tem: number;
  feature?: any;
  details?: any;
  fee: string;
  notice?: any;
  status: number;
  created_at: string;
  updated_at: string;
  check_status: number;
  step_status: number;
  poster_url: string;
  departure_city_full_name: string;
  destination_city_full_name: string;
  departure_city_name: string;
  destination_city_name: string;
}

export interface Member {
  data: MemberList[];
}

export interface MemberList {
  id: number;
  order_id: number;
  member_id: number;
  name: boolean;
  is_kid: number;
  phone: boolean;
  id_type: number;
  id_num: string;
  sms_status: number;
  remarks: string;
}