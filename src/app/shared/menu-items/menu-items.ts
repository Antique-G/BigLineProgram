import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'admin', type: 'link', name: 'Admin', icon: 'view_headline' },
  { state: 'tabs', type: 'link', name: 'Tabs', icon: 'tab' },
  { state: 'button', type: 'link', name: 'Buttons', icon: 'crop_7_5' }
];


export interface StoreMenu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const StoreMENUITEMS = [
  { state: 'admin', type: 'link', name: 'Admin', icon: 'view_headline' }
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }


  getStoreMenuitem(): StoreMenu[] {
    return StoreMENUITEMS;
  }
}
