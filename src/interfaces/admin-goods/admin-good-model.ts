export interface CateListModel {
    data: CateListsModel;
}

export interface CateListsModel {
    current_page: number;
    data: Data[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Links[];
    next_page_url: object;
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
    desc: string;
    pid: number;
    sort: number;
    status: number;
    level: number;
    created_at: string;
    updated_at: string;
}


export interface AddCateModel {
    name: any;
    desc: any;
    pid?: any;
    id?: any;
    status?: any;
}
