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
  id_card_deadline: string;
  business_deadline: string;
  travel_deadline: string;
  insurance_deadline: string;
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
  id_card_deadline: string;
  business_deadline: string;
  travel_deadline: string;
  insurance_deadline: string;
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



// 账号详情
export interface StoreAccountDetailModel {
  account_id: number;
  name: string;
  remember_token?: any;
  mobile: string;
  email: string;
  level: number;
  store_id: number;
  status: number;
  created_at: string;
  updated_at: string;
  store: StoreDetailModel;
}

export interface StoreDetailModel {
  store_id: number;
  name: string;
  code: string;
  region_code: string;
  address: string;
  fax: string;
  phone: string;
  mobile: string;
  contact: string;
  profile_photo_path?: any;
  status: number;
  type: number;
  work_date: string;
  is_approve: number;
  work_time: string;
  settlement_cycle: number;
  reward_percent: number;
  remark: string;
  created_at: string;
  updated_at: string;
  region_full_name: string;
}