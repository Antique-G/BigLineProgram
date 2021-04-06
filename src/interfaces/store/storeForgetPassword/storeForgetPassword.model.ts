export interface MobilCodeModel {
    mobile: any;
    code: any;
}

export interface MobilCodeResponseModel {
  token: string;
}

export interface ResetPasswordModel {
  mobile: any;
  token: any;
  password:any;
  password_confirmation:any;
}