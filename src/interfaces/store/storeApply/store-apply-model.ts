export interface StoreApplyRequestModel {
  account_name: string;
  password: string;
  password_confirmation: string;
  name: string;
  code: string;
  address: string;
  fax: string;
  mobile: string;
  phone: string;
  region_code: string;
  contact: string;
  work_date: any;
  work_time: any;
}

export interface StoreApplyCertifiModel {
  legal_person: string;
  id_num: string;
  taxpayer_num: string;
  bank_type: string;
  bank_open: string;
  bank_num: string;
  bank_account_name: string;
  id_card_front: string;
  id_card_reverse: string;
  business_license: string;
  travel_agency: string;
  bank_front: string;
  bank_reverse: string;
  insurance: string;
}


export interface StoreApplyCertifiDetailModel {
  data: DataApplyCertifiDetailModel;
}

export interface DataApplyCertifiDetailModel {
  id: number;
  legal_person: string;
  id_num: string;
  taxpayer_num: string;
  bank_type: number;
  bank_open: string;
  bank_num: string;
  bank_account_name: string;
  id_card_front: string;
  id_card_reverse: string;
  business_license: string;
  travel_agency: string;
  insurance: string;
  bank_front: string;
  bank_reverse: string;
  status: number;
  store_id: number;
  check_time: number;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface StoreApplyCertifiDetailListModel {
  data: DataApplyCertifiDetailModel[];
}


export interface EditContractModel {
  contact: string;
  mobile: string;
  phone: string;
  fax: string;
  work_date: any
  work_time: string;
  id: string;
}