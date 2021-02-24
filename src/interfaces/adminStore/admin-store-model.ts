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
  next_page_url: string;
  path: string;
  per_page: number;
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
  region_code: string;
  code: string;
  fax: string;
  phone: string;
  mobile: string;
  contact: string;
  profile_photo_path?: any;
  status: number;
  created_at: string;
  updated_at: string;
  region_full_name: string;
  address: string;
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
}

