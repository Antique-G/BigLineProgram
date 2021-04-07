export interface AdminStoreListRequestModel {
  page?: number;
  per_page?: number;
  status?: number;
  keyword?: any;
}


export interface AdminStoreListResponseModel {
  current_page: number;
  data: Datum[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url?: any;
  path: string;
  per_page: string;
  prev_page_url?: any;
  to: number;
  total: number;
}


export interface Link {
  url?: string;
  label: number | string;
  active: boolean;
}

export interface Datum {
  store_id: number;
  name: string;
  code: string;
  region_code: string;
  address: string;
  fax: string;
  phone: string;
  mobile: string;
  contact: string;
  profile_photo_path?: any;
  status: number;
  work_date: string;
  is_approve: number;
  work_time: string;
  settlement_cycle: number;
  reward_percent: number;
  remark: string;
  created_at: string;
  updated_at: string;
  region_full_name: string;
}




export interface AddStoreRequestModel {
  name: string;
  region_code: string;
  address: string;
  fax: string;
  phone: string;
  status: any;
  mobile: string;
  contact: string;
  work_date?: any;
  work_time?: string;
}

export interface AddStoreResponseModel {
  message: string;
  code?: string;
}


export interface StoreDetailModel {
  store_id: any;
  name: string;
  contact: string;
  mobile: string;
  region_code: string;
  address: string;
  fax: string;
  phone: string;
  profile_photo_path?: any;
  status: number;
  created_at: string;
  updated_at: string;
  region_full_name: string;
  work_date?: any;
  work_time?:  any;
}

export interface StoreUpdateRequestModel {
  name: string;
  region_code: string;
  address?: string;
  fax?: string;
  phone?: string;
  status?: number;
  store_id?: string;
  mobile?: string;
  contact?: string;
  work_date?: any;
  work_time?: string;
}

export interface ApplyCheckModel {
  id?: string;
  status?: string;
  content?: string;
}


export interface RewardSetModel {
  store_id?: string;
  settlement_cycle?: string;
  reward_percent?: string;
  remark: string;
}