export interface AdminStoreBankAccountListRequestModel {
  store_id: any;
}


export interface AdminStoreBankAccountListResponseModel {
  current_page: number;
  data: Datum[];
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

export interface Link {
  url?: string;
  label: number | string;
  active: boolean;
}

export interface Datum {
  bank_id: number;
  store_id: number;
  bank_name: string;
  bank_account: string;
  account_address: string;
  is_corporate: number;
  contacts: string;
  contacts_phone: string;
  created_at: string;
  updated_at: string;
}


export interface StoreBankAccountRequestModel {
  store_id?: any;
  bank_name: string;
  bank_account: string;
  account_address: string;
  is_corporate: number;
  contacts_phone: string;
  contacts: string;
}

export interface StoreBankAccountResponseModel {
  message: string;
  code?: string;
}

export interface StoreBankAccountDetailResponseModel {
  message: string;
  data: DataDetailResponseModel;
}


export interface DataDetailResponseModel {
  store_id?: any;
  bank_name: string;
  bank_account: string;
  account_address: string;
  is_corporate: number;
  contacts_phone: string;
  contacts: string;
  bank_id?: number;
}



export interface StoreBankAccountUpdateRequestModel {
  bank_name: string;
  bank_account: string;
  account_address: string;
  is_corporate: number;
  contacts_phone: string;
  contacts: string;
  bank_id?: number;

}




