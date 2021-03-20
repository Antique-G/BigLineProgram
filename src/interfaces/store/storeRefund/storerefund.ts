// 退款列表
export interface RefundModel {
  data: DatumRefundModel[];
  meta: MetaRefundModel;
}
interface MetaRefundModel {
  pagination: Pagination;
}

interface Pagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  links: Links;
}

interface Links {
}

interface DatumRefundModel {
  id: number;
  order_id: number;
  type: number;
  source: number;
  status: number;
  refund_amount: number;
  refund_reason: string;
  remark?: any;
  created_at: string;
  updated_at: string;
  handler_id: number;
  amount_detail?: any;
}

// 详情
export interface RefundDetailModel {
  data: DetailDataModel[];
}

interface DetailDataModel {
  id: number;
  order_id: number;
  type: number;
  source: number;
  status: number;
  refund_amount: number;
  refund_reason: string;
  remark?: any;
  created_at: string;
  updated_at: string;
  handler_id: number;
  amount_detail?: any;
  member: Member;
  price_detail: Pricedetail;
  pay_log: Paylog;
  cancel_log: Cancellog;
  refund_log: Pricedetail;
}

interface Cancellog {
  data: CancellogModel[];
}

interface CancellogModel {
  id: number;
  order_id: number;
  type: number;
  action_type: number;
  action_id: number;
  reason: string;
  created_at: string;
  updated_at: string;
}

interface Paylog {
  data: PaylogModel[];
}

interface PaylogModel {
  id: number;
  order_id: number;
  user_id: number;
  status: number;
  fee: number;
  pay_status: number;
  transaction_id: string;
  pay_type: number;
  created_at: string;
  updated_at: string;
  pay_time?: any;
  proof_url: string;
}

interface Pricedetail {
  data: any[];
}

interface Member {
  data: MemberModel[];
}

interface MemberModel {
  id: number;
  order_id: number;
  member_id: number;
  name: string;
  is_kid: number;
  phone: string;
  id_type: number;
  id_num: string;
  sms_status: number;
  created_at: string;
  updated_at: string;
  remarks: string;
  refund_status: number;
  id_photo?: any;
  birthday?: any;
  assembling_place: string;
  assembling_time?: any;
}



// 创建退款单
export interface CreateReundModel {
  id: number;
  type: number;
  reason: string;
}



// 审核提交
export interface ReundCheckModel {
  id: any;
  refund_amount: any;
  amount_add: any;
  amount_cut: any;
  members: any;
  remark: string;
}

// 支付流水
export interface RefundPayLog {
  data: RefundPayLogList[];
}

export interface RefundPayLogList {
  id: number;
  order_id: number;
  user_id: number;
  status: number;
  fee: number;
  pay_status: number;
  transaction_id: string;
  pay_type: number;
  created_at: string;
  updated_at: string;
  pay_time?: any;
  proof_url: string;
  refund_fee: number;
  refund_limit: string;
}