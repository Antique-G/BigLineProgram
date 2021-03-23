export interface AdminUserMoneyLogListResponseModel {
    current_page: number;
    data: Datum[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: string;
    path: string;
    per_page: string;
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
    change_money: number;
    type: number;
    created_at: string;
    updated_at: string;
    user: User;
  }
  
  interface User {
    user_id: number;
    name: string;
    avatar_url: string;
    gender: string;
    real_name: string;
    money: number;
    dist: number;
    city_name: string;
  }