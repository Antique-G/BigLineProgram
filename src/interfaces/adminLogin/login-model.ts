export interface LoginRequestModel {
    account: string;
    password: string;
}
// export interface LoginResponseModel {
//   message?: string;
//   status_code: string;
//   access_token: string;
//   token_type?: any;
//   expires_in?: any;
//   admin: AdminModel;
// }

// export interface AdminModel {
//   admin_id: any;
//   account: string;
//   real_name: string;
//   mobile: string;
//   status: number;
//   created_at: string;
//   updated_at: string;
//   ip: string;
// }
export interface LoginResponseModel {
    message?: string;
    status_code: string;
    access_token: string;
    token_type: string;
    expires_in: number;
    admin: Admin;
    permission: Permission[];
}
export interface Permission {
    id: number;
    name: string;
    display_name: string;
    description: object | string;
    controller: string;
    action: string;
    pid: number;
    type: number;
    status: number;
    created_at: string;
    updated_at: string;
    pivot: Pivot;
}
export interface Pivot {
    role_id: number;
    permission_id: number;
}
export interface Admin {
    admin_id: any;
    account: string;
    real_name: string;
    mobile: string;
    status: number;
    shop_id: number;
    staff_type: any;
    created_at: string;
    updated_at: string;
    ip: string;
    region_name?: string;
    role?: Role[];
}
export interface LogOutResponseModel {
    message: string;
    code?: string;
}

export interface Role {
    id: number;
    name: string;
    display_name: string;
    description: string;
    status: number;
    created_at: string;
    updated_at: string;
    pivot: Pivot;
}

export interface Pivot {
    user_id: number;
    role_id: number;
}