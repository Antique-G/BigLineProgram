import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-insured-list',
  templateUrl: './admin-insured-list.component.html',
  styleUrls: ['./admin-insured-list.component.css']
})
export class AdminInsuredListComponent implements OnInit {
  dataSource = [];
  page = 1;
  per_page = 20;
  total = 1;

  constructor( private modal: NzModalService) { }

  ngOnInit(): void {
  }

  close(){
    this.modal.closeAll();
  }

  changePageIndex(page: number) {
    console.log("aaa", page);
    this.page = page;
    // this.getDataHistoryList();
  }

  changePageSize(per_page: number) {
    console.log("bbb", per_page);
    this.per_page = per_page;
    // this.getDataHistoryList();
  }
}
