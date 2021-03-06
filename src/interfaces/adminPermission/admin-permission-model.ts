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
  export interface PermissionParentListModel {
    data: Datum[];
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
    son: Son[];
  }
  
  export interface Son {
    id: number;
    name: string;
    display_name: string;
    description: string;
    controller: string;
    action: string;
    pid: number;
    type: number;
    status: number;
    created_at: string;
    updated_at: string;
  }
  export interface AddPermissionRequestModel {
    controller: string;
    action: string;
    pid: string;
    display_name: string;
    description: string;
  }
  
  export interface AddPermissionResponseModel {
    message: string;
    code?: string;
  }
  export interface PermissionDetailtModel {
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
  export interface UpdatePermissionRequestModel {
    id?: number;
    controller: string;
    action: string;
    pid: string;
    display_name: string;
    description: string;
  }