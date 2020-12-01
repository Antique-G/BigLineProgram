export interface AdminStoreBankAccountListRequestModel {
  store_id: any;
}


export interface AdminStoreBankAccountListResponseModel {
  message: string;
  data: Datum[];
  status_code?: any;
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




