export interface FreeSaleListModel {
    data: DataFreeSaleList[];
    meta: Meta;
}

export interface Meta {
    pagination: Pagination;
}

export interface Pagination {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
    links: object;
}

export interface DataFreeSaleList {
    id: number;
    order_id: number;
    ticket_id: number;
    product_id: number;
    product_name: string;
    product_type: number;
    ticket_price: number;
    subsidy_price: number;
    number: number;
    name: string;
    phone: string;
    use_status: number;
    use_start_date: any;
    use_end_date: any;
    created_at: any;
    updated_at: any;
    ticket_code: string[];
    store_name?: string;
    user_id?: number;
    store_id?: number;
    price_total?: number;
    order_status?: number;
    transaction_status?: number;
    order_source?: number;
    amount_actually_received?: number;
    show_price: string;
}



// 详情
export interface PreSaleDetailModel {
    data: DataPreSaleDetailModel;
}

export interface DataPreSaleDetailModel {
    id: number;
    order_id: number;
    ticket_id: number;
    product_id: number;
    product_name: string;
    product_type: number;
    ticket_price: number;
    subsidy_price: number;
    number: number;
    name: string;
    phone: string;
    use_status: number;
    use_start_date: string;
    use_end_date: string;
    created_at: string;
    updated_at: string;
    store_name: string;
    user_id: number;
    store_id: number;
    price_total: number;
    order_status: number;
    transaction_status: number;
    order_source: number;
    amount_actually_received: number;
    show_price: string;
    ticket_code: any;
    pay_log: any;
}
