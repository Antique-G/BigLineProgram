import { SaleTitleStatusReviewRequestModel } from './../../adminSaleTitle/admin-sale-title-model';
export interface StoreTouristListResponse {
  current_page: number;
  data: DatumModel[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: LinkModel[];
  next_page_url?: any;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to: number;
  total: number;
}

export interface LinkModel {
  url?: string;
  label: number | string;
  active: boolean;
}

export interface DatumModel {
  id: number;
  name: string;
  mobile: string;
  store_id: number;
  status: number;
  created_at: string;
  updated_at: string;
}


export interface AddTouristModel {
  name: any;
  mobile: any;
  code: any;
  status: any;
}








// 上下架
export interface SetStatusModel {
  id: number;
  status: number;
}



