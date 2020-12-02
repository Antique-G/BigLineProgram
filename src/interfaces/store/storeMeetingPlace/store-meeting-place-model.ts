export interface StoreMeetingPlaceListRequestModel {
  page?: number;
  per_page?: number;
}


export interface StoreMeetingPlaceListResponseModel {
  data: Datum[];
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

export interface Datum {
  name: string;
  region_code: string;
  address?: string;
  status: number;
  created_at: string;
  updated_at: string;
  id?: any
}


export interface AddStoreMeetingPlaceRequestModel {
  name: string;
  status: number;
  region_code: string;
  address: string;
}


export interface AddStoreMeetingPlaceResponseModel {
  status_code?: any
}


export interface UpdateStoreMeetingPlaceRequestModel {
  id?: any
  name: string;
  status: number;
  region_code: string;
  address: string;
}


export interface UpdateStoreMeetingPlaceResponseModel {

}