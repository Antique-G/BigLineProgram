export interface ContractModel {
  current_page: number;
  data: DatumContractModel[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url?: any;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to: number;
  total: number;
}

export  interface Link {
  url?: string;
  label: number | string;
  active: boolean;
}

export  interface DatumContractModel {
  id: number;
  store_id: number;
  contract_name: string;
  url: string;
  url_sm: string;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  store: Store;
}

export  interface Store {
  store_id: number;
  name: string;
  code: string;
  region_code: string;
  fax: string;
  phone: string;
  mobile: string;
  contact: string;
  profile_photo_path?: any;
  status: number;
  created_at: string;
  updated_at: string;
  region_full_name: string;
}