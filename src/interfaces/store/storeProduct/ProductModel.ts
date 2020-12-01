export interface ProductModel {
    title:string;
    fewDays:number;
    fewNights:number;
    adultPrice:number;
    childPrice:number;
    originalAdultPrice:number;
    originalChildPrice:number;
    differencePrice:number;
    feature:string;
    details:string;
    fee:string;
    notice:string;
    assemblingPlaceId:[];
    tagId:[];
    status:number;
}

// 返回
export interface ProductResponseModel {
    message: string;
    code?: string;
}


export interface ProductResponseListResponseModel{
    current_page: number;
    data: Datum[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url?: any;
    to: number;
    total: number;
  }
  
  
export  interface Datum {
    id: number;
    title: string;
    fewDays: number;
    fewNights: number;
    adultPrice: number;
    childPrice: number;
    status: number;
    updatedAt:string
  }
  
  export interface Link {
    previous?: string;
    next?: string;
  }
  

// 请求
export interface ProductModelRequestModel {
    page?: any;
    status?: number;
    keyword?: any;
  }
  