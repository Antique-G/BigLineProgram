export interface AdminRegionModel {
  value: string;
  label: string;
  children: Child2[];
}

export interface Child2 {
  value: string;
  label: string;
  children?: Child[];
  isLeaf?: boolean;
}

export interface Child {
  value: string;
  label: string;
  isLeaf: boolean;
}


export interface AdminRegionResponseModel {
  message?: string;
  status_code?: string;
}