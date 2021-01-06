export interface AdminTermTemplateListResponseModel {
  current_page: number;
  data: DatumModel[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: LinkModel[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to: number;
  total: number;
}


export interface LinkModel {
  url?: string;
  label: number | string;
  active: boolean;
}

export interface DatumModel {
  id: number;
  title: string;
  content: string;
  status: number;
  created_at?: string;
  updated_at?: string;
}



export interface AdminTermsTemplateSetStatusRequestModel {
  id: number;
  status: number;
}



export interface AddAdminTermsTemplateRequestModel {
  title: string;
  content: string;
  status: string;
}

export interface AdminTermsTemplateResponseModel {
  message: string;
  status?: string;
}


export interface AdminTermsTemplateUpdateRequestModel {
  id?:string;
  title: string;
  content: string;
  status: string;
}

