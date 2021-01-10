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
  status: number;
  temp_id?:number;

}


export interface AddStoreTermsManagementResponseModel {
  status_code?: any
}


export interface UpdateStoreTermsManagementeRequestModel {
  id?: any
  title: string;
  content: string;
  status?: number;
  temp_id?:number;
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
  temp_id?:string;
}


export interface StoreTermsManagementRequestModel{
  id: number;
  check_status: number;
}


export interface TermplateModel{
  current_page: number;
  data: DatumTermplateModel[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: LinkTermplateModel[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to: number;
  total: number;
}

interface DatumTermplateModel{
  id: number;
  title: string;
  content: string;
  status: number;
  created_at: string;
  updated_at: string;
}

interface LinkTermplateModel{
}