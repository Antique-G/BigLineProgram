export interface ProductTagModel{
    id: number;
    name: string;
    cate_id:Number;
    status: number;
    updatedAt:string;
}

export interface ProductResponseTagModel{
    message?:string
}

export interface ProductResponseCateListModel{
    data:object
}
