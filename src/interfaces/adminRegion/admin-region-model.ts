export interface AdminRegionModel {
  value: string;
  label: string;
  children: Child2[];
}

export interface Child2 {
  value: string;
  label: string;
  children?: Child[];
  isLeaf?: boolean;
}

export interface Child {
  value: string;
  label: string;
  isLeaf: boolean;
}


export interface AdminRegionResponseModel {
  message?: string;
  status_code?: string;
}



export interface AdminRegionListResponseModel {
  current_page: number;
  data: Datum[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url?: any;
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
  region_id: number;
  region_name: string;
  region_code: string;
  area_code: string;
  region_level: number;
  sort: number;
  status: number;
  created_at: string;
  updated_at: string;
}



export interface AddAdminRegionListRequestModel {
  region_name: number;
  parent_code: number;
  region_desc: string;
  area_code: number;
  region_img?: any;
  status?: number;
  sort?: number;
}



export interface UpdateAdminRegionListRequestModel {
  region_name: number;
  parent_code: number;
  region_desc: string;
  area_code: number;
  region_img?: any;
  status?: number;
  sort?: number;
  id?:any;
}