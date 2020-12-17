export interface AdminTermsManagementListResponseModel {
  current_page: number;
  data: DatumModel[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: LinkModel[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to: number;
  total: number;
  region_full_name: string;
}


export interface LinkModel {
  url?: string;
  label: number | string;
  active: boolean;
}

export interface DatumModel {
  id: number;
  store_id: number;
  title: string;
  content: string;
  status: number;
  check_status: number;
  created_at: string;
  updated_at: string;
}


export interface AdminTermsManagementSetCheckRequestModel {
  id: number;
  check_status: number;
}


export interface AdminTermsManagementSetCheckResponseModel {
  message?: string;
  status_code?: number;
}


