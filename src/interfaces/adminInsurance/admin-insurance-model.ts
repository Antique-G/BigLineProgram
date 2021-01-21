export interface AdminInsuranceListRequestModel { 
    page?: number;
    per_page?: number;
    status?: number;
    keyword?: any;
  }
export interface AdminInsuranceListResponseModel {
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
  
export  interface Link {
    url?: string;
    label: number | string;
    active: boolean;
  }
  
export  interface Datum {
    id: number;
    name: string;
    insured_date: number[];
    status: number;
    created_at: string;
    updated_at: string;
  }

  export interface InsuranceDetailModel {
    id:number;
    name: string;
    insured_date: number[];
    status: number;
  }
  export interface AdminInsuranceStatusResponseModel {
    id:number;
    status: number;
  }

  export interface AdminInsuranceCreateRequestModel {
    name: string;
    insured_date: number[];
    status: number;
  }
  export interface AdminInsuranceCreateResponseModel {
    status_code?: any
  }
  export interface AdminInsuranceUpdateRequestModel {
    id:number;
    name: string;
    insured_date: number[];
    status: number;
  }
