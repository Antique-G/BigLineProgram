export interface WeChatPageConfigListResponseModel {
  current_page: number;
  data: DatumListModel[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: LinkListModel[];
  next_page_url?: any;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to: number;
  total: number;
}


export interface LinkListModel {
  url?: string;
  label: number | string;
  active: boolean;
}

export interface DatumListModel {
  page_id: number;
  region_code: string;
  page_name: string;
  page_key: string;
  created_at?: any;
  updated_at?: any;
  status: number;
}


// 可配置页面
export interface ConfigPageList {
  data: ConfigPageListModel[];
}

export interface ConfigPageListModel {
  page_name: string;
  page_key: string;
}



export interface AddPageConfigRequestModel {
  region_code: string;
  page_name: string;
  page_key: string;
  status: string;
  id?: number;
}

export interface PageConfigResponseModel {
  message: string;
  code?: string;
}


export interface WeChatPageConfigDetailModel {
  data: DetailModel;
}

export interface DetailModel {
  page_id: number;
  region_code: string;
  page_name: string;
  page_key: string;
  created_at?: any;
  updated_at: string;
  status: number;
}