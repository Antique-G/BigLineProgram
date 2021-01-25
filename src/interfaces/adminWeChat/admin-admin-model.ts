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
  page_id: any;
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
  page_id?: any;
}

export interface PageConfigResponseModel {
  message: string;
  code?: string;
}


export interface WeChatPageConfigDetailModel {
  data: DetailModel;
}

export interface DetailModel {
  page_id: any;
  region_code: string;
  page_name: string;
  page_key: string;
  created_at?: any;
  updated_at: string;
  status: number;
}



// 模块配置
export interface WeChatPageBlockListResponseModel {
  current_page: number;
  data: DatumBlockModel[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: LinkBlockModel[];
  next_page_url?: any;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to: number;
  total: number;
}

export interface LinkBlockModel {
  url?: string;
  label: number | string;
  active: boolean;
}

export interface DatumBlockModel {
  block_id: number;
  page_id: any;
  block_name: string;
  block_key: string;
  type: number;
  num: number;
  status: number;
  created_at: string;
  updated_at: string;
  content: string;
}

export interface AddBlockRequestModel {
  page_id: string;
  block_name: string;
  block_key: string;
  type: number;
  status: number;
  content: any[];
  id?: any;
}

export interface BlockTypeRequestModel {
  data: DatumTypeListModel[];
}

interface DatumTypeListModel {
  name: string;
  id: number;
}


export interface BlockDetailResponseModel {
  data: BlockDetailModel[];
}

export interface BlockDetailModel {
  block_id: number;
  page_id: any;
  block_name: string;
  block_key: string;
  type: number;
  num: number;
  status: number;
  created_at?: any;
  updated_at?: any;
  content?: any[];
}


export interface UpdateBlockRequestModel {
  page_id: any;
  block_name: string;
  block_key: string;
  type: number;
  status: number;
  content: any[];
  block_id?: any;
}
