
export interface StoreQuoteBydateRsponseListModel {
    data:StoreQuoteBydateModel[]
}

export interface StoreQuoteBydateModel{
    date: string;
    child_price?: number;
    adult_price?: number;
    original_adult_price?: number;
    original_child_price?:number;
    difference_price?: number;
}

export interface StoreQuoteBydateRequestModel{
    data:StoreQuoteBydateModel[]
}