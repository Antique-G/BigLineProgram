export interface AdminSaleTitleListRequestModel { 
    page?: number;
    per_page?: number;
    status?: number;
    keyword?: any;
  }

  export interface AdminSaleTitleListResponseModel {
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

  export interface Datum {
    store_id: number;
    name: string;
    region_code: string;
    fax: string;
    phone: string;
    mobile: string;
    contact: string;
    profile_photo_path?: any;
    status: number;
    created_at: string;
    updated_at: string;
    region_full_name: string;
    address: string;
  }

  export interface Link {
    url?: string;
    label: number | string;
    active: boolean;
  }


  export interface SaleTitleCreateRequestModel {
    title: string;
    reward_rate: number;
  }
  
  export interface SaleTitleCreateResponseModel {
    message: string;
    status_code?: string;
  }

  export interface SaleTitleDetailtModel {
    id:number;
    title: string;
    reward_rate: number;
    status: number;
  }
  export interface SaleTitleUpdateRequestModel {
    title?: string;
    reward_rate?: string;
    id?:number;
  }
  export interface SaleTitleStatusReviewRequestModel {
    id:number;
    title: string;
    reward_rate: number;
    status: number;
  }
