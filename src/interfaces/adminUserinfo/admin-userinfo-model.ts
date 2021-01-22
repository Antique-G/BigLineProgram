export interface AdminUserinfoListRequestModel { 
    page?: number;
    per_page?: number;
    status?: number;
    keyword?: any;
  }
export interface AdminUserinfoListResponseModel {
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
    user_id: number;
    name: string;
    real_name: string;
    gender: number;
    status: number;
    title_id: number;
    phone: string;
    birth?: any;
    created_at: string;
    updated_at: string;
    email: string;
    email_verified_at?: any;
    profile_photo_url: string;
  }