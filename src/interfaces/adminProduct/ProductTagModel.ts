export interface AdminProductTagListRequestModel {
    current_page: number;
    data: DatumModel[];
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

export interface Link {
    url?: string;
    label: number | string;
    active: boolean;
}


export interface DatumModel {
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
