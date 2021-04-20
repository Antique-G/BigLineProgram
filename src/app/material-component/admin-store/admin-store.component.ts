import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminStoreService } from '../../../services/admin/admin-store.service';
import { AdminStoreCreateComponent } from './admin-store-create/admin-store-create.component';
import { AdminStoreDetailComponent } from './admin-store-detail/admin-store-detail.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminStoreCommissComponent } from './admin-store-commiss/admin-store-commiss.component';
import { NzModalService } from 'ng-zorro-antd/modal';



@Component({
  selector: 'app-admin-store',
  templateUrl: './admin-store.component.html',
  styleUrls: ['./admin-store.component.css']
})
export class AdminStoreComponent implements OnInit {
  searchForm: FormGroup;
  dataSource = [];
  page = 1;
  per_page = 10;
  total = 1;
  loading = true;
  keyword: any;
  status: any;
  is_approve: any;


  constructor(public fb: FormBuilder, public dialog: MatDialog, public adminStoreService: AdminStoreService,
    private modal: NzModalService, public router: Router) {
    this.searchForm = fb.group({
      status: [''],
      is_approve: [''],
      storeName: ['']
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.loading = true;
    this.adminStoreService.storeList(this.page, this.per_page, this.keyword, this.status, this.is_approve).subscribe((result: any) => {
      this.loading = false;
      this.total = result.total;   //总页数
      this.dataSource = result.data;
    });
  };

  changePageIndex(page: number) {
    console.log("当前页", page);
    this.page = page;
    this.getData();
  }
  changePageSize(per_page: number) {
    console.log("一页显示多少", per_page);
    this.per_page = per_page;
    this.getData();
  }


  search() {
    this.status = this.searchForm.value.status;
    this.is_approve = this.searchForm.value.is_approve;
    this.keyword = this.searchForm.value.storeName;
    this.getData();
    console.log("this.keyword", this.keyword);

  }



  add() {
    const editmodal = this.modal.create({
      nzTitle: '添加',
      nzWidth: 1000,
      nzContent: AdminStoreCreateComponent,
      nzFooter: [
        {
          label: '提交',
          onClick: componentInstance => {
            componentInstance?.add()
          }
        }
      ]
    })
    editmodal.afterClose.subscribe(res => {
      this.getData();
    });
  }


  edit(element: any): void {
    console.log("拿到的值", element);
    const editmodal = this.modal.create({
      nzTitle: '编辑店铺（供应商）基础信息',
      nzWidth: 1000,
      nzContent: AdminStoreDetailComponent,
      nzComponentParams: {
        data: element
      },
      nzFooter: [
        {
          label: '更新',
          onClick: componentInstance => {
            componentInstance?.update()
          }
        }
      ]
    })
    editmodal.afterClose.subscribe(res => {
      this.getData();
    });
  }





  account(data: any) {
    console.log("点击传递的值", data);
    this.router.navigate(['/admin/main/store/storeAccount'], { queryParams: { id: data.store_id } });
  }

  bankAccount(data: any) {
    console.log("点击传递的值", data);
    this.router.navigate(['/admin/main/store/storeBankAccount'], { queryParams: { id: data.store_id } });

  }


  file(data: any) {
    this.router.navigate(['/admin/main/contract'], { queryParams: { id: data.store_id } });

  }


  certifi(data: any) {
    localStorage.setItem('certification', JSON.stringify(data));
    localStorage.setItem('certifiApprove', data?.is_approve);
    this.router.navigate(['/admin/main/store/certifi'], { queryParams: { id: data.store_id } });
  }

  setMoney(data: any) {
    const dialogRef = this.dialog.open(AdminStoreCommissComponent, {
      width: '650px',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {

      this.getData();
    });
  }



  // 重置
  reset() {
    this.searchForm.patchValue({
      status: '',
      is_approve: '',
      storeName: '',
    });
  }
}




