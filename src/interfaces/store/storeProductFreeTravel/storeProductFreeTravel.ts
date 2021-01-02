export interface StoreFreeTravelModel {
    id?:number;
    title: string;
    earlier: number;
    confirm: number;
    pay_method: number;
    few_days: number;
    few_nights: number;
    departure_city: number;
    destination_city: number;
    service_phone: string;
    reserve_num: number;
    reserve_children: number;
    reserve_ahead: number;
    children_age: number;
    child_height_min: number;
    child_height_max: number;
    feature: string;
    details: string;
    fee: string;
    notice: string;
    status: number;
    tag_id: number[];
}

export interface ProductTabListModel{
    current_page: number;
    data: any[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: any[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url?: any;
    to: number;
    total: number;
}
