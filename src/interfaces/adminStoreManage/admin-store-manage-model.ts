export interface StoreManageListResponseModel {
  current_page: number;
  data: DatumStoreManageListResponseModel[];
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

export interface DatumStoreManageListResponseModel {
  id: any;
  shop_name: string;
  region_code: string;
  address: string;
  status: number;
  created_at: string;
  updated_at: string;
  region_name: string;
}


export interface StoreManageRequestModel {
  shop_name: string;
  contact_name: string;
  contact_mobile: string;
  phone: string;
  fax: string;
  region_code: string;
  address: string;
  status: number;
  id?: any;
}

