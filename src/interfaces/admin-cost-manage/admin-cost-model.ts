export interface AdminCostModel {
    supplier_name: any;
    bank_name: any;
    bank_account: any;
    bank_open: any;
    contacts: any;
    contact_phone: any;
    status: any;
    id?: any;
}




export interface SupplyAddRequestModel {
    supplier_name: any;
    bank_name: any;
    bank_account: any;
    bank_open: any;
    contacts: any;
    contact_phone: any;
    status: any;
    id?: any;
}


export interface AddTypeRequestModel {
    title: any;
    status: any;
    id?: any;
}


export interface RequestMoneyModel {
    group_id?: any;
    cost_type: any;
    price?: any;
    num: any;
    content: any;
    suppiler_id: any;
    id?: any;
    type: any;
    order_id?: any;
}

