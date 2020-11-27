export interface AdminAdminListRequestModel {
  page: any;
  status: number;
  keyword:string;
}


export interface AdminAdminListResponseModel {
  message?: string;
  status_code: string;
  access_token: string;
  token_type?: any;
  expires_in?: any;
}


