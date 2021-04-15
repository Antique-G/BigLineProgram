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
  product_code: string;
  product_name: string;
  start_date?: any;
  store_id: number;
  product_type: number;
  price_receive: any;
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



// 详情
export interface DetailModel {
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
  price_adult: number;
  price_kid: number;
  price_diff: number;
  price_insurance: number;
  price_other: number;
  emergency_contact_person: string;
  emergency_contact_number: string;
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
  product: Products;
  group: Group;
  sub_group: Subgroup;
  cancel_log: Cancellog;
  pay_log: Paylog;
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

export interface Cancellog {
  data: any[];
}

export interface Subgroup {
  data: SubgroupModel;
}

export interface SubgroupModel {
  sub_group_id: number;
  group_id: number;
  number: number;
  guide_name: string;
  guide_phone: string;
  traffic_name: string;
  traffic_contact: string;
  traffic_phone: string;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  notice_status: number;
  sub_group_status: number;
  store_id: number;
}

export interface Group {
  data: GroupModel;
}

export interface GroupModel {
  group_id: number;
  product_id: number;
  product_name: string;
  departure_city: string;
  destination_city: string;
  member_min: number;
  member_max: number;
  days: number;
  start_date: string;
  end_date: string;
  active_date?: any;
  group_status: number;
  store_id: number;
  created_at: string;
  updated_at: string;
}

export interface Products {
  data: ProductModel;
}

export interface ProductModel {
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
  feature: string;
  details: string;
  fee: string;
  notice: string;
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

export interface Members {
  data: MemberModel[];
}

export interface MemberModel {
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
  gender:any
}



// 改价
export interface ChangePriceModel {
  order_id: string;
  type: number;
  title: string;
  price: number;
}


// 订单修改日期
export interface ChangeDateRequestModel {
  order_id: string;
  new_date: any
}

export interface ChangeDateResponModel {
  date_quote: Datequote;
  new_date_quote: Datequote;
  diff_price_total: string;
}

export interface Datequote {
  id: number;
  product_id: number;
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


// 产品名称
export interface ProModel {
  current_page: number;
  data: ProListModel[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: any;
  next_page_url?: any;
  path: string;
  per_page: string;
  prev_page_url?: any;
  to: number;
  total: number;
}


export interface ProListModel {
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
  child_height_min: number;
  child_height_max: number;
  reserve_num_min: number;
  reserve_num_max: number;
  reserve_ahead: number;
  contacts_status: number;
  work_t_tem: number;
  feature?: string;
  details?: string;
  fee: string;
  notice?: string;
  status: number;
  created_at: string;
  updated_at: string;
  check_status: number;
  step_status: number;
  poster_url: string;
  trip_type: number;
  dist_reward: number;
  store_reward: number;
  third_reward: number;
  commerce_reward: number;
  schedule_file: number;
  reward_set: number;
  group_count: number;
  member_total?: string;
  departure_city_full_name: string;
  destination_city_full_name: string;
  departure_city_name: string;
  destination_city_name: string;
  schedule_file_url: string;
  assembling_place: AssemblingplaceList[];
  group: (Group1 | Group2)[];
  date_quote: DatequoteList[];
}

interface Group2 {
  group_id: number;
  group_code: string;
  product_id: number;
  product_name: string;
  departure_city: string;
  destination_city: string;
  member_min: number;
  member_max: number;
  member_total: number;
  days: number;
  start_date: string;
  end_date: string;
  active_date: string;
  group_status: number;
  store_id: number;
  created_at: string;
  updated_at: string;
}

interface Group1 {
  group_id: number;
  group_code: string;
  product_id: number;
  product_name: string;
  departure_city: string;
  destination_city: string;
  member_min: number;
  member_max: number;
  member_total: number;
  days: number;
  start_date: string;
  end_date: string;
  active_date?: string;
  group_status: number;
  store_id: number;
  created_at: string;
  updated_at: string;
}


interface AssemblingplaceList {
  data: placeListModel;
}

interface placeListModel {
  id: number;
  name: string;
  region_code: string;
  time: string;
  time_state: number;
  address: string;
  longitude?: any;
  latitude?: any;
  store_id: number;
  region_full_name: string;
}

interface DatequoteList {
  id: number;
  product_id: number;
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


export interface OrderGroupProduct {
  product_id: any;
  date_quotes_id: any;
  num_adult: any;
  num_kid: any;
  num_room: any;
  members: any[],
  contact_name: string;
  contact_phone: string;
  baby_num?: string;
  baby_info?: string;
  contact_wechat: string;
  contact_qq: string;
  contact_email: string;
  customer_remarks: string;
  assembling_place_id?: any;
  shared_status?: any;
  emergency_contact_person?: any;
  emergency_contact_number?: any;
  discount?: any;
}


// 确认收款
export interface ComfirmOrderModel {
  order_id: any;
  fee: any;
  pay_type: any;
  pay_time: any;
  transaction_id: any;
}



// 订单统计OrderTotal
export interface OrderTotalModel {
  data: DatumOrderTotalModel;
}


export interface DatumOrderTotalModel {
  total_num: string;
  total_adult: string;
  total_kid: string;
  baby_num: string;
  receive: string;
  is_pay_money?: any;
  refund_money: string;
}