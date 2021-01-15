export interface StoreTouristListResponse{
  current_page: number;
  data: DatumModel[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: LinkModel[];
  next_page_url?: any;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to: number;
  total: number;
}

interface LinkModel {
  url?: string;
  label: number | string;
  active: boolean;
}

interface DatumModel {
  id: number;
  name: string;
  mobile: string;
  store_id: number;
  status: number;
  created_at: string;
  updated_at: string;
}



