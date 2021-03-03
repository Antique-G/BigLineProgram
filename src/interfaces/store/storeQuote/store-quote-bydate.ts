
export interface StoreQuoteBydateRsponseListModel {
    data: StoreQuoteBydateModel[]
}

export interface StoreQuoteBydateModel {
    date: string;
    // child_price?: number;
    // adult_price?: number;
    // original_adult_price?: number;
    // original_child_price?:number;
    // difference_price?: number;
    product_id?: number;
    id?: number;
    independent_product_id?: number;
    adult_price?: number;
    child_price?: number;
    difference_price?: number;
    inventory_num?: number;
    set_inventory?: number;
    allow_over?: number;
    check_status?: number;
    created_at?: any;
    updated_at?: any;
    deleted_at?: any;

}

export interface StoreQuoteBydateRequestModel {
    data: StoreQuoteBydateModel[]
}


export interface FreeTraveRsponseListModel {
    data: FreeTraveQuoteBydateModel[]
}


// 自由行日期报价
export interface FreeTraveQuoteBydateModel {
    date: string,
    id?: number;
    independent_product_id: number;
    adult_price: number;
    child_price: number;
    difference_price: number;
    inventory_num: number;
    set_inventory: number;
    allow_over: number;
    check_status: number;
    created_at: string;
    updated_at: string;
    deleted_at?: any;
}


//   报价删除
export interface DeleteQuoteBydateModel {
    ids: any[]
}