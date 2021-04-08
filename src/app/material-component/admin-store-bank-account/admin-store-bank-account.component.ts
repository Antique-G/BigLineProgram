import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminStoreBankAccountService } from '../../../services/admin/admin-store-bank-account.service';
import { AdminStoreBankAccountCreateComponent } from './admin-store-bank-account-create/admin-store-bank-account-create.component';
import { AdminStoreBankAccountDetailComponent } from './admin-store-bank-account-detail/admin-store-bank-account-detail.component';


@Component({
  selector: 'app-admin-store-bank-account',
  templateUrl: './admin-store-bank-account.component.html',
  styleUrls: ['./admin-store-bank-account.component.css']
})
export class AdminStoreBankAccountComponent implements OnInit {
  dataSource = [];
  page = 1;
  per_page = 10;
  total = 1;
  loading = false;
  store_id: any;

  constructor(public dialog: MatDialog, public activatedRoute: ActivatedRoute,
    public modal: NzModalService, public adminStoreBankAccountService: AdminStoreBankAccountService) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.store_id = params?.id;

    });
    this.search();
  }


  search(): void {
    this.loading = true;
    console.log("this.store_id", this.store_id);
    this.adminStoreBankAccountService.storeBankList(this.store_id, this.page, this.per_page).subscribe((result: any) => {
      this.loading = false;
      this.total = result.total;   //总页数
      this.dataSource = result.data;
    });
  };

  changePageIndex(page: number) {
    console.log("当前页", page);
    this.page = page;
    this.search();
  }
  changePageSize(per_page: number) {
    console.log("一页显示多少", per_page);
    this.per_page = per_page;
    this.search();
  }


  add() {
    const addmodal = this.modal.create({
      nzTitle: '添加',
      nzContent: AdminStoreBankAccountCreateComponent,
      nzFooter: [
        {
          label: '提交',
          type:'primary',
          onClick: componentInstance => {
              componentInstance?.add()

          }
        }
      ]
    })
    addmodal.afterClose.subscribe(res => {
      this.search();
    })
  }


  edit(element: any): void {
    const dialogRef = this.dialog.open(AdminStoreBankAccountDetailComponent, {
      width: '550px',
      data: element
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.search();
      }
    });
  }


}




