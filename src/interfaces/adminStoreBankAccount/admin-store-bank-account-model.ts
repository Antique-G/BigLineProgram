export interface StoreBankAccountRequestModel {
  store_id: string;
  bank_name: string;
  bank_account: string;
  account_address: string;
  is_corporate: any;
  contacts_phone: string;
  contacts: string;
}

export interface StoreBankAccountResponseModel {
  message: string;
  code?: string;
}

