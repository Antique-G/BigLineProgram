export interface StoreFreeTravelModel {
    id?: number;
    title: string;
    sub_title: string;
    earlier: number;
    pay_method: number;
    few_days: number;
    few_nights: number;
    departure_city: number;
    destination_city: number;
    service_phone: string;
    reserve_num: number;
    reserve_children: number;
    reserve_ahead: number;
    child_age_min: number;
    children_age: number;
    child_height_min: number;
    child_height_max: number;
    fee: string;
    // notice: string;
    status: number;
    tag_id: number[];
    step: any;
    quote_type?: any;
    copies_max?: any;
    use_num?: any;
    inclusive?: any;
    buy_num_max?: any;
    request_id_num?: any;
    baby_occupy?: any;
    sales_note?: any;
    is_presell?: any;
    ticket_price?: any;
    show_price?: any;
    inventory?: any;
    start_date?: any;
    end_date?: any;
    use_start_date?: any;
    use_end_date?: any;
}

export interface ProductTabListModel {
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


export interface FreeTravelListModel {
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
    title: string;
    sub_title: string;
    code: string;
    store_id: number;
    few_days: number;
    price_receive: any;
    few_nights: number;
    departure_city: string;
    destination_city: string;
    earlier: number;
    service_phone: string;
    min_price: number;
    price_range: number;
    reserve_num: number;
    reserve_children: number;
    reserve_ahead: number;
    child_age_min: number;
    children_age: number;
    child_height_min: number;
    child_height_max: number;
    feature: string;
    details: string;
    fee: string;
    notice: string;
    status: number;
    check_status: number;
    created_at: string;
    updated_at: string;
    departure: string;
    destination: string;
    check_log: LogModel[];
    reward_set?: any;
    third_reward?: any;
    store_reward?: any;
    dist_reward?: any;
    commerce_reward?: any;
    quote_type?: any;
    copies_max?: any;
    use_num?: any;
    inclusive?: any;
    buy_num_max?: any;
    request_id_num?: any;
    baby_occupy?: any;
    sales_note?: any;
    is_presell?: any;
    ticket_price?: any;
    show_price?: any;
    inventory?: any;
    start_date?: any;
    end_date?: any;
    use_start_date?: any;
    use_end_date?: any;
}

export interface LogModel {
    id: number;
    inden_product_id: number;
    check_status: number;
    reason: string;
    admin_id: number;
    created_at: string;
    updated_at: string;

}