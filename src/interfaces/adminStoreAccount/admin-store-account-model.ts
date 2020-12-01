export interface StoreAccountRequestModel {
  password: string;
  password_confirmation: string;
  name: string;
  mobile: string;
  email: string;
  level: string;
  store_id: string;
  status: any;
}

export interface StoreAccountResponseModel {
  message: string;

}

