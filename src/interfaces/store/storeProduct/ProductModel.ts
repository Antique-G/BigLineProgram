export interface ProductModel {
    id:number;
    title:string;//标题
    region_code:string;//区域编码
    earlier:number;//预定截止时间（出发前一天，需提前多少分钟预定）
    confirm:number;//是否需要客服确认：0/否，1/是
    pay_method:number;//支付方式：1/在线支付,2/景区现付
    few_days:number;//几天
    few_nights:number;//	几晚
    adult_price:number;//	成人价格
    child_price:number;//儿童价格
    original_adult_price:number;//成人原价
    original_child_price:number;//	儿童原价
    difference_price:number;//补差价
    feature:string;//产品特色
    details:string;//产品详情
    fee:string;//费用包含
    notice:string;//预约须知
    assembling_place_id:[];//集合地点id
    tag_id:[];//标题id
    status:number;//状态：0/禁用，1/启用
}

// 查询
export interface Datum {
  id:number;
  title:string;//标题
  few_days:number;//几天
  few_nights:number;//	几晚
  adult_price:number;//	成人价格
  child_price:number;//儿童价格
  status:number;//状态：0/禁用，1/启用
  updated_at: string;
}


// 详情返回

export interface ProductDateilResponseModel {
  data: {};
}

// 返回
export interface ProductResponseModel {
    message?: string;
    code?: string;
    debug?:object;
    status_code?:number;
    errors?:object;
}


export interface ProductResponseListResponseModel{
    // current_page: number;
    data:[];
    meta:{
      pagination:{
        count: number
        current_page: number
        links: object
        per_page: number
        total: number
        total_pages: number
      }
    }
    // first_page_url: string;
    // from: number;
    // last_page: number;
    // last_page_url: string;
    // links: Link[];
    // next_page_url: string;
    // path: string;
    // per_page: number;
    // prev_page_url?: any;
    // to: number;
    // total: number;
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
  page?: number;
  per_page?: number;
  status?: number;
  keyword?: any;
}
  

// 返回
export interface ProductModelResponseModel {
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
  
 
  