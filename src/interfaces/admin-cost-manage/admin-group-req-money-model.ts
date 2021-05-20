export interface GroupCashReqModel {
    data: GroupCashReq[];
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

export interface GroupCashReq {
    group_id: number;
    group_code: string;
    product_id: number;
    product_name: string;
    departure_city: string;
    destination_city: string;
    member_min: number;
    member_max: number;
    member_total: number;
    baby_occupy: number;
    days: number;
    start_date: string;
    end_date: string;
    active_date: any;
    group_status: number;
    store_id: number;
    payout_status: number;
    created_at: string;
    updated_at: string;
    store_name: string;
    departure_city_name: string;
    destination_city_name: string;
    sub_groups_num: number;
    guide_status: boolean;
    notice_status: boolean;
    cash_requirement: CashRequirement;
    cash_money_total?: any;
}

export interface CashRequirement {
    data: CashRequirementList[];
}

export interface CashRequirementList {
    id: number;
    group_id: number;
    cost_type: number;
    price: number;
    num: number;
    total: number;
    content: string;
    suppiler_id: number;
    pay_status: number;
    created_at: string;
    updated_at: string;
    payed_money: number;
    group_cost_type: GroupCostType;
    supplier: Supplier;
}

export interface Supplier {
    data: SupplierList[];
}

export interface SupplierList {
    id: number;
    supplier_name: string;
    bank_name: string;
    bank_account: string;
    bank_open: string;
    contacts: string;
    contact_phone: string;
    status: number;
    created_at: string;
    updated_at: string;
}

export interface GroupCostType {
    data: Data[];
}

export interface Data {
    id: number;
    title: string;
    status: number;
    created_at: string;
    updated_at: string;
}

