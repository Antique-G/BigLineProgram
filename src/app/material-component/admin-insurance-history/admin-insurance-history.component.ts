import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminInsuredListComponent } from './admin-insured-list/admin-insured-list.component';

@Component({
  selector: 'app-admin-insurance-history',
  templateUrl: './admin-insurance-history.component.html',
  styleUrls: ['./admin-insurance-history.component.css']
})
export class AdminInsuranceHistoryComponent implements OnInit {
  searchForm: FormGroup;
  dataSource = [];
  page = 1;
  per_page = 20;
  total = 1;
  loading = true;
  name: any;
  keyword: any;


  constructor(public fb: FormBuilder, private modal: NzModalService) {
    this.searchForm = fb.group({
      name: [""],
      keyword: [""],
    });
  }

  ngOnInit(): void {
    this.getDataHistoryList();
  }


  //保险列表
  getDataHistoryList(): void {
    this.loading = true;
    // this.adminInsuranceService.insuranceList(this.page, this.per_page, this.name, this.keyword).subscribe((result: any) => {
    //     console.log("保险列表接口返回什么", result);
    //     this.loading = false;
    //     this.total = result.total;
    //     this.dataSource = result.data;
    //   });
  }


  changePageIndex(page: number) {
    console.log("aaa", page);
    this.page = page;
    this.getDataHistoryList();
  }

  changePageSize(per_page: number) {
    console.log("bbb", per_page);
    this.per_page = per_page;
    this.getDataHistoryList();
  }

  search() {
    this.name = this.searchForm.value.name;
    this.keyword = this.searchForm.value.keyword;
    this.getDataHistoryList();
    console.log("value", this.searchForm.value);
  }



  insuredDetail() {
    const editmodal = this.modal.create({
      nzTitle: "参保人列表信息",
      nzContent: AdminInsuredListComponent,
      nzWidth: 900,
      nzComponentParams: {
        // data: element,
      },
      nzFooter: [
        {
          label: "知道了",
          type: "primary",
          onClick: (componentInstance) => {
            componentInstance?.close();
          },
        },
      ],
    });
    editmodal.afterClose.subscribe((res) => {
   
    });
  }
}
