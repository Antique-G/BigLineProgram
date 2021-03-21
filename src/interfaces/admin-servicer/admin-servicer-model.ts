// export interface AdminRegionServiceListRequestModel {
//   page?: number;
//   per_page?: number;
//   status?: number;
//   keyword?: any;
// }


export interface AdminRegionServiceListResponseModel {
    current_page: number;
    data: Datum[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url?: any;
    path: string;
    per_page: number;
    prev_page_url?: any;
    to: number;
    total: number;
  }
  
  interface Link {
    url?: string;
    label: number | string;
    active: boolean;
  }
  
  interface Datum {
    id: number;
    region_code: string;
    region_name: string;
    contact_name: string;
    phone: string;
    created_at: string;
    updated_at: string;
  }