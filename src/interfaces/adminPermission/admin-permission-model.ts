export interface AdminPermissionListRequestModel {
    page?: number;
    per_page?: number;
    keyword?: any;
}

export interface AdminPermissionListResponseModel {
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
    label: string;
    active: boolean;
  }
  
export interface Datum {
    id: number;
    name: string;
    display_name: string;
    description?: string;
    controller: string;
    action: string;
    pid: number;
    type: number;
    status: number;
    created_at: string;
    updated_at: string;
  }