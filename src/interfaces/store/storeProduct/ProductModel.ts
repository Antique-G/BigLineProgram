export interface AddStoreProductModel {
  title: string;
  region_code: string;
  earlier: number;
  confirm: number;
  pay_method: number;
  few_days: number;
  few_nights: number;
  adult_price: number;
  child_price: number;
  original_adult_price: number;
  original_child_price: number;
  difference_price: number;
  assembling_place_id: number[];
  feature: string;
  details: string;
  fee: string;
  notice: string;
  tag_id: number[];
}

// 返回
export interface AddProductResponseModel {
  message?: string;
  code?: string;
  debug?: object;
  status_code?: number;
  errors?: object;
}

// 查询
export interface Datum {
  id: number;
  title: string;//标题
  few_days: number;//几天
  few_nights: number;//	几晚
  adult_price: number;//	成人价格
  child_price: number;//儿童价格
  status: number;//状态：0/禁用，1/启用
  updated_at: string;
}


// 详情返回
export interface ProductDateilResponseModel {
  data: DataModel;
}

export interface DataModel {
  id: number;
  title: string;
  store_id: number;
  region_code: string;
  earlier: number;
  confirm: number;
  pay_method: number;
  few_days: number;
  few_nights: number;
  adult_price: number;
  child_price: number;
  minimum_price: number;
  maximum_price: number;
  original_adult_price: number;
  original_child_price: number;
  original_minimum_price: number;
  original_maximum_price: number;
  difference_price: number;
  feature: string;
  details: string;
  fee: string;
  notice: string;
  status: number;
  check_status: number;
  created_at: string;
  updated_at: string;
  assembling_place: AssemblingplaceModel;
  tag: TagModel;
}

export interface TagModel {
  data: Datum2Model[];
}

export interface Datum2Model {
  id: number;
  name: string;
}

export interface AssemblingplaceModel {
  data: DatumModel[];
}

export interface DatumModel {
  id: number;
  name: string;
  longitude?: any;
  latitude?: any;
}

// 列表返回
export interface ProductResponseListResponseModel {
  data: DatumListModel[];
  meta: MetaListModel;
}
export interface MetaListModel {
  pagination: PaginationListModel;
}

export interface PaginationListModel {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  links: LinksListModel;
}

export interface LinksListModel {
}

export interface DatumListModel {
  id: number;
  title: string;
  few_days: number;
  few_nights: number;
  adult_price: number;
  child_price: number;
  status: number;
  check_status: number;
  created_at: string;
  updated_at: string;
}



export interface DetailModel {
  title: string;
  region_code: string;
  earlier: number;
  confirm: number;
  pay_method: number;
  few_days: number;
  few_nights: number;
  adult_price: number;
  child_price: number;
  original_adult_price: number;
  original_child_price: number;
  difference_price: number;
  assembling_place_id: number[];
  feature: string;
  details: string;
  fee: string;
  notice: string;
  tag_id: number[];
  status?: number;
  id?: any
}


export interface UploadImgModel {
  image: any;
}


export interface  AssemblingPlaceListModel{
  data: DatumList[];
}


export interface  DatumList{
  id: number;
  name: string;
}



