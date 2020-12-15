import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminTermsManageService } from '../../../services/admin/admin-terms-manage.service';
import { AdminTermsManageReviewComponent } from './admin-terms-manage-review/admin-terms-manage-review.component';
import { AdminStoreService } from '../../../services/admin/admin-store.service';


@Component({
  selector: 'app-admin-terms-manage',
  templateUrl: './admin-terms-manage.component.html',
  styleUrls: ['./admin-terms-manage.component.css']
})
export class AdminTermsManageComponent implements OnInit {
  searchForm!: FormGroup;
  dataSource = [];
  page = 1;
  per_page = 20;
  store_id: any;
  title: any;
  total = 1;
  loading = true;
  storeList: any[] = [];

  constructor(public dialog: MatDialog, public adminTermsManageService: AdminTermsManageService,
    public fb: FormBuilder, public adminStoreService: AdminStoreService,) {
    this.searchForm = this.fb.group({
      storeId: ['', [Validators.required]],
      title: ['', [Validators.required]],
    })
  }


  ngOnInit(): void {
    this.adminStoreService.storeList(1, 1000, '').subscribe((result: any) => {
      console.log("商铺的结果", result.data);
      let storeData = result.data;
      let res: any[] = [];
      for (let i of storeData) {
        let a = { id: i.store_id, value: i.name };
        res.push(a);
        this.storeList = res;
      }
    });
    this.adminTermsList();
  }


  adminTermsList(): void {
    this.loading = true;
    this.adminTermsManageService.adminTermsList(this.page, this.per_page, this.store_id, this.title).subscribe((result: any) => {
      console.log("jieguyo", result)
      this.loading = false;
      this.total = result.total;   //总页数
      this.dataSource = result.data;
    });
  };

  changePageIndex(page: number) {
    console.log("当前页", page);
    this.page = page;
    this.adminTermsList();
  }
  changePageSize(per_page: number) {
    console.log("一页显示多少", per_page);
    this.per_page = per_page;
    this.adminTermsList();
  }


  search() {
    this.store_id = this.searchForm.value.storeId;
    this.title = this.searchForm.value.title;
    this.adminTermsList();
  }


  review(element: any): void {
    console.log("拿到的值", element);
    const dialogRef = this.dialog.open(AdminTermsManageReviewComponent, {
      width: '800px',
      data: element
    });
    dialogRef.afterClosed().subscribe(result => {
      this.adminTermsList();
    });

  }


}





