export interface AdminUserCommissionListRequestModel { 
    page?: number;
    per_page?: number;
    order_id?: any;
    user_id?: any;
  }

  export interface AdminUserCommissionListResponseModel {
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
  
  interface Link {
    url?: string;
    label: number | string;
    active: boolean;
  }
  
  interface Datum {
    id: number;
    user_id: number;
    order_id: number;
    dist_reward: number;
    status: number;
    created_at: string;
    updated_at: string;
    type: number;
    content: string;
    product_reward: number;
    name: string;
    product_name: string;
    num_total: number;
    product_type: number;
    price_total: number;
    second_user?: string;
    second_user_reward?: number;
    first_user?: string;
    first_user_reward?: number;
  }
  export interface UserCommissionAuditModel {
    id: number;
    status: number;
    content?: string;
  
  }
  export interface UserCommissionAuditResponseModel {
    message?: string;
    status_code?: string;
  }
  
  export interface AdminUserWithdrawListResponseModel {
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
  
  interface Link {
    url?: string;
    label: number | string;
    active: boolean;
  }
  
  interface Datum {
    id: number;
    user_id: number;
    money: number;
    status: number;
    created_at: string;
    updated_at: string;
    user: User;
  }
  
  interface User {
    user_id: number;
    name: string;
    real_name: string;
    gender: string;
    avatar_url: string;
    region_code: string;
    status: number;
    title_id: number;
    phone: string;
    openid: string;
    birth?: any;
    created_at: string;
    updated_at: string;
    email_verified_at?: any;
    money: number;
    dist: number;
    parent_id: number;
    apply_time: number;
    temporary: number;
    deleted_at?: any;
    city_name: string;
  }