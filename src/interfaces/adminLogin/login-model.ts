export interface LoginRequestModel {
  account: string;
  password: string;
}


export interface LoginResponseModel {
  message?: string;
  status_code: string;
  access_token: string;
  token_type?: any;
  expires_in?: any;
}


/**
 * 接口响应的内容信息
 */
interface ResponseData {
  /**
   * 毒鸡汤
   */
  content: string;
  /**
   * 热度
   */
  hots: number;
}

