export interface AdminRoleListRequestModel {
    page?: number;
    per_page?: number;
    keyword?: any;
}

export interface AdminRoleListResponseModel {
    current_page: number;
    data: Data[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Links[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: object;
    to: number;
    total: number;
}

export interface Links {
    url: object | string;
    label: string;
    active: boolean;
}

export interface Data {
    id: number;
    name: string;
    display_name: string;
    description: string;
    status: number;
    created_at: object | string;
    updated_at: object | string;
}

export interface PermissionTreeListModel {
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

export interface Nodes {
    title: string;
    key: string;
    children: Children_1[];
}

export interface Children_1 {
    title: string;
    key: string;
    children?: Children[];
    isLeaf?: boolean;
}

export interface Children {
    title: string;
    key: string;
    isLeaf: boolean;
}

export interface AddRoleRequestModel {
    name: string;
    display_name: string;
    description: string;
    permission: any;
  }
  
export interface AddRoleResponseModel {
    message: string;
    code?: string;
  }

  export interface RoleDetailModel {
    id: number;
    name: string;
    display_name: string;
    description: string;
    status: number;
    created_at: object;
    updated_at: object;
}

export interface UpdateRoleRequestModel {
    id?: number;
    name: string;
    display_name: string;
    description: string;
    permission: any;
  }
