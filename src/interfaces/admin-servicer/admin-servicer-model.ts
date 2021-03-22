

export interface AdminRegionServiceListResponseModel {
  current_page: number;
  data: AdminRegionServiceModel[];
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

export interface AdminRegionServiceModel {
  id?: any;
  region_code: string;
  region_name?: string;
  contact_name?: string;
  phone?: string;
  created_at?: string;
  updated_at?: string;
}