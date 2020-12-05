export interface AdminProductTagListRequestModel {
    data: Datum[];
}

export interface Datum {
    id: number;
    name: string;
    status: number;
    deleted_at?: any;
    created_at: string;
    updated_at?: any;
    cate_id: number;
}



export interface AddAdminProductTagRequestModel {
    name: string;
    cate_id: number;
    status: number;
}

export interface AddAdminProductTagResponseModel {
    message?: string;
    status_code?: string;
}

export interface AdminProductTagCateListModel {
    data: Data[];
}

export interface Data {
    id: string;
    name: string;
}


export interface UpdateAdminProductRequestModel {
    name: string;
    cate_id: Number;
    status: number;
    id?: number;
}
