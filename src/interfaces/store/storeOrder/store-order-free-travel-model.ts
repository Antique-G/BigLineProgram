// 列表
export interface StoreOrderFreeTravelListRequestModel {
  data: StoreOrderFreeTravelList[];
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

export interface StoreOrderFreeTravelList {
  id: number;
  user_id: number;
  product_id: number;
  product_code: string;
  product_name: string;
  start_date: string;
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
  order_sms: number;
  member: Member;
  independent_product: Independentproduct;
}

export interface Independentproduct {
  data: IndependentproductList;
}

export interface IndependentproductList {
  id: number;
  title: string;
  sub_title: string;
  store_id: number;
  few_days: number;
  few_nights: number;
  departure_city: string;
  destination_city: string;
  earlier: number;
  confirm: number;
  service_phone: string;
  min_price: number;
  price_range: number;
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
  check_status: number;
  created_at?: any;
  updated_at: string;
  poster_url: string;
  departure: string;
  destination: string;
}

export interface Member {
  data: MemberList[];
}

export interface MemberList {
  id: number;
  order_id: number;
  member_id: number;
  name: string;
  is_kid: number;
  phone: string;
  id_type: number;
  id_num: string;
  sms_status: number;
  remarks: string;
}



// 详情
export interface Details {
  data: DetailsModel;
}

export interface DetailsModel {
  id: number;
  user_id: number;
  product_id: number;
  product_name: string;
  start_date: string;
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
  contact_email: string;
  customer_remarks: string;
  internal_remarks: string;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  assembling_place: string;
  assembling_time: string;
  order_sms: number;
  member: Members;
  independent_product: Independentproducts;
}

export interface Independentproducts {
  data: IndependentproductsModel;
}

export interface IndependentproductsModel {
  id: number;
  title: string;
  sub_title: string;
  store_id: number;
  few_days: number;
  few_nights: number;
  departure_city: string;
  destination_city: string;
  earlier: number;
  confirm: number;
  service_phone: string;
  min_price: number;
  price_range: number;
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
  check_status: number;
  created_at: string;
  updated_at: string;
  poster_url: string;
  departure: string;
  destination: string;
}

interface Members {
  data: MembersModel[];
}

interface MembersModel {
  id: number;
  order_id: number;
  member_id: number;
  name: string;
  is_kid: number;
  phone: string;
  id_type: number;
  id_num: string;
  sms_status: number;
  remarks: string;
}



// 产品搜索
export interface freeProModel {
  data: freeProModelList;
}

export interface freeProModelList {
  id: number;
  code: string;
  title: string;
  sub_title: string;
  store_id: number;
  few_days: number;
  few_nights: number;
  departure_city: string;
  destination_city: string;
  earlier: number;
  confirm: number;
  service_phone: string;
  min_price: number;
  child_status: number;
  price_range: number;
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
  check_status: number;
  created_at?: any;
  updated_at: string;
  poster_url: string;
  trip_type: number;
  dist_reward: number;
  store_reward: number;
  third_reward: number;
  commerce_reward: number;
  date_quote: DatequoteList[];
  departure: string;
  destination: string;
}

export interface DatequoteList {
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
