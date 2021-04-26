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
  price_detail: any;
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
  quote_type?:any
  independent_product: Independentproduct;
  total_number?:any
  refund_number?:any
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
  quote_type?:any
  total_number?:any
  refund_number?:any
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
  baby_num: number;
  price_total: number;
  amount_received: number;
  price_adult: number;
  price_kid: number;
  price_receive: any;
  price_diff: number;
  price_insurance: number;
  price_other: number;
  discount_other: number;
  insurance_id: number;
  order_status: number;
  payment_status: number;
  refund_status: number;
  cancel_type: number;
  price_detail: any;
  shared_status: number;
  num_room: number;
  contact_name: string;
  contact_phone: string;
  contact_wechat: string;
  contact_qq: string;
  contact_email: string;
  customer_remarks: string;
  internal_remarks: string;
  emergency_contact_person: string;
  emergency_contact_number: string;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  assembling_place: string;
  assembling_time: string;
  order_sms: number;
  member: Members;
  independent_product: Independentproducts;
  pay_log: Paylog;
  refund: any;
  refund_amount: any;
  service_charge: any;
  inclusive_price?:any
  use_num?:any
  price_inclusive?:any
  price_baby?:any
  quote_type?:any
  total_number?:any
  refund_number?:any
}



export interface Paylog {
  data: PaylogModel[];
}

export interface PaylogModel {
  id: number;
  order_id: number;
  fee: number;
  pay_status: number;
  transaction_id: string;
  pay_type: number;
  created_at: string;
  updated_at: string;
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
  quote_type?:string;
  use_num?:string;
  total_number?:any
  refund_number?:any
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
  eng_name: string;
  gender: any
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
  total_number?:any
  refund_number?:any
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


// 自由行后台下订单产品搜索
export interface FreeProSearchModel {
  current_page: number;
  data: DatumfreeProSearchModel[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: LinkfreeProSearchModel[];
  next_page_url?: any;
  path: string;
  per_page: string;
  prev_page_url?: any;
  to: number;
  total: number;
}


interface LinkfreeProSearchModel {
  url?: string;
  label: string;
  active: boolean;
}

interface DatumfreeProSearchModel {
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
  created_at?: string;
  updated_at: string;
  poster_url: string;
  trip_type: number;
  dist_reward: number;
  store_reward: number;
  third_reward: number;
  commerce_reward: number;
  reward_set: number;
  operation_name: string;
  operation_id: number;
  third_product_id: number;
  departure: string;
  destination: string;
  date_quote: DatequotefreeProSearchModel[];
}

interface DatequotefreeProSearchModel {
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