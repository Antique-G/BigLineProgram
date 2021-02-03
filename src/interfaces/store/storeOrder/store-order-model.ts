
export interface StoreOrderListRequestModel{
  data: DatumStoreOrderListModel[];
  meta: Meta;
}

interface Meta {
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

interface DatumStoreOrderListModel {
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
  active_date: string;
  group_status: number;
  store_id: number;
  created_at: string;
  updated_at: string;
  group_code: string;
  departure_city_name: string;
  destination_city_name: string;
  members_num: string;
  sub_groups_num: number;
  guide_status: boolean;
  notice_status: boolean;
}

