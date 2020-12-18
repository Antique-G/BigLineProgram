export interface StoreTermsManagementListRequestModel {
  page?: number;
  per_page?: number;
}


export interface StoreTermsManagementListResponseModel {
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
  title: string;
  status: number;
  id: any,
}


export interface AddStoreTermsManagementRequestModel {
  title: string;
  content: string;
  status: number,

}


export interface AddStoreTermsManagementResponseModel {
  status_code?: any
}


export interface UpdateStoreTermsManagementeRequestModel {
  id?: any
  title: string;
  content: string;
  status: number;
}


export interface UpdateStoreTermsManagementResponseModel {
  message?: string;
  status_code?: number;
}



export interface StoreTermsManagementDetailResponseModel {
  data: DataDetailModel
}

export interface DataDetailModel {
  id: number;
  title: string;
  content: string;
  status: number;
  deleted_at?: any;
  created_at: string;
  updated_at: string;
}


export interface StoreTermsManagementRequestModel{
  id: number;
  check_status: number;
}