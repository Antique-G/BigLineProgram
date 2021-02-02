import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-order-detail-subgroup',
  templateUrl: './admin-order-detail-subgroup.component.html',
  styleUrls: ['./admin-order-detail-subgroup.component.css']
})
export class AdminOrderDetailSubgroupComponent implements OnInit {
  index = 0;
  tabs = ['子团1', '子团2'];

  constructor() { }

  ngOnInit(): void {
  }


  closeTab({ index }: { index: number }): void {
    this.tabs.splice(index, 1);
  }

}
