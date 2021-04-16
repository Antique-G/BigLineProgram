export interface AdminAdminListRequestModel {
  page?: number;
  per_page?: number;
  status?: number;
  keyword?: any;
}


export interface AdminAdminListResponseModel {
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
  admin_id: number;
  account: string;
  real_name: string;
  mobile: string;
  status: number;
  created_at: string;
  updated_at: string;
}




export interface RegisterRequestModel {
  account: string;
  password: string;
  password_confirmation: string;
  real_name: string;
  mobile: string;
  status: number;
  shop_id?: any;
  staff_type:any;
}

export interface RegisterResponseModel {
  message: string;
  code?: string;
}


export interface AdminDetailModel {
  admin_id: number;
  account: string;
  real_name: string;
  mobile: string;
  status: number;
  created_at: string;
  updated_at: string;
  shop_id: number;
  staff_type:any;
}

export interface UpdateRequestModel {
  real_name?: string;
  mobile?: string;
  status?: string;
  admin_id?: number;
  shop_id?: any;
  staff_type:any;

}

