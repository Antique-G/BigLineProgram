// 列表
export interface StoreOrderListRequestModel {
    data: DatumStoreOrderListModel[];
    meta: Meta;
}

export interface Meta {
    pagination: Pagination;
}

export interface Pagination {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
    links: Links;
}

export interface Links {
}

export interface DatumStoreOrderListModel {
    group_id: number;
    product_id: number;
    product_name: string;
    departure_city: string;
    destination_city: string;
    member_min: number;
    member_max: number;
    days: number;
    start_date: string;
    end_date: string;
    active_date?: string;
    group_status: number;
    store_id: number;
    created_at: string;
    updated_at: string;
    group_code: string;
    departure_city_name: string;
    destination_city_name: string;
    members_num: number | string;
    sub_groups_num: number;
    guide_status: boolean;
    notice_status: boolean;
    store_name?: string;
}

// 详情
export interface StoreOrderDetailRequestModel {
    data: DataOrderDetail;
}

export interface DataOrderDetail {
    group_id: number;
    product_id: number;
    product_name: string;
    departure_city: string;
    destination_city: string;
    member_min: number;
    member_max: number;
    member_total: number;
    days: number;
    start_date: string;
    end_date: string;
    active_date: string;
    group_status: number;
    store_id: number;
    created_at: string;
    updated_at: string;
    group_code: string;
    departure_city_name: string;
    destination_city_name: string;
    sub_group: SubgroupModel;
    cash_requirement?: any;
    product?: any;
}

export interface SubgroupModel {
    data: SubgroupDeatilModel[];
}

export interface SubgroupDeatilModel {
    sub_group_id: number;
    group_id: number;
    number: number;
    guide_name: string;
    guide_phone: string;
    traffic_name: string;
    traffic_contact: string;
    traffic_phone: string;
    created_at: string;
    updated_at: string;
    notice_status: number;
    guide_status: boolean;
    sub_group_status: number;
    store_id: number;
    sub_group_code: string;
    members_num: number;
    adult_num: number;
    kid_num: number;
    order: OrderModel;
}


export interface OrderModel {
    data: OrderDetailModel[];
}


export interface OrderDetailModel {
    id: number;
    order_sms: number;
    user_id: number;
    product_id: number;
    product_name: string;
    store_id: number;
    group_id: number;
    sub_group_id: number;
    num_total: number;
    num_adult: number;
    num_kid: number;
    price_total: number;
    price_adult: number;
    price_kid: number;
    price_diff: number;
    price_insurance: number;
    price_other: number;
    discount_other: number;
    insurance_id: number;
    order_status: number;
    refund_status: number;
    cancel_type: number;
    shared_status: number;
    num_room: number;
    cancel_sms: number;
    contact_name: string;
    contact_phone: string;
    contact_wechat: string;
    contact_qq: string;
    contact_email: string;
    customer_remarks: string;
    internal_remarks: string;
    created_at: string;
    updated_at: string;
    deleted_at?: any;
    assembling_place: string;
    assembling_time: string;
    member: MemberModel;
    insurance_status: any;
}


export interface MemberModel {
    data: MemberDetailModel[];
}

export interface MemberDetailModel {
    id: number;
    order_id: number;
    member_id: number;
    name: string;
    is_kid: number;
    phone: string;
    id_type: number;
    id_num: string;
    sms_status: number;
    eng_name: string;
    gender: any;
    // member.sms_status:number;
}


// 派遣导游
export interface SetGuideModel {
    sub_group_id: number;
    guide_name: string;
    guide_phone: string;
}


// 移动订单
export interface MoveOrderModel {
    sub_group_id: any;
    order_numbers: any[];
    new_sub_group_id: any;
}


// 不成团关团
export interface ShuffOrderModel {
    group_id: string;
    reason?: string;
}

// 发送出团通知短信
export interface OrderSmsModel {
    order_ids: any;
}

// 发送出团通知短信
export interface GroupSmsModel {
    sub_group_id: string;
    contact_name?: string;
    contact_phone?: string;
    orders: any[];
}

export interface DeleteSubGroup {
    sub_group_id: any;
}


// 设置出团人数限制
export interface OrderGroupNum {
    member_min: any;
    member_max: any;
    id?: any;
}

// 修改出行人信息
export interface EditMemberModel {
    id: string;
    name?: string;
    phone?: string;
    id_type?: string;
    id_num?: string;
    remarks?: string;
    birthday?: string;
    id_photo?: string;
    gender?: string;
    assembling_place?: string;
    eng_name?: string;
    assembling_time?: string;

}


// 修改订单信息
export interface EditInfoModel {
    id: string;
    contact_name?: string;
    contact_phone?: string;
    contact_wechat?: string;
    contact_qq?: string;
    contact_email?: string;
    emergency_contact_person?: string;
    emergency_contact_number?: string;
    customer_remarks?: string;
    internal_remarks: '';
}
