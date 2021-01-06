 
export interface ImgResponseModel {
    url: string;
    url_sm: string;
}

export interface ImgModel{
    image:any;
    region_code:string;
    desc:string;
}



export interface GalleryResponseModel {
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
    id: number;
    store_id: number;
    region_code: string;
    url: string;
    url_sm: string;
    desc: string;
    deleted_at?: any;
    created_at: string;
    updated_at: string;
    region_name: string;
}