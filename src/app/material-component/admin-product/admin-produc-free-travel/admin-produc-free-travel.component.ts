import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminProductFreeTravelService } from '../../../../services/admin/admin-product-free-travel.service';

import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AdminProductFreeReviewComponent } from './admin-product-free-review/admin-product-free-review.component';

@Component({
  selector: 'app-admin-produc-free-travel',
  templateUrl: './admin-produc-free-travel.component.html',
  styleUrls: ['./admin-produc-free-travel.component.css']
})
export class AdminProducFreeTravelComponent implements OnInit {
  searchForm!: FormGroup;
  dataSource: any[] = [];   //1.4将数据添加到dataSource
  loading = true;
  page = 1;
  per_page = 20;
  total = 1;
  status: any;
  check_status: any;
  title: any;
  store_name:any;
  confirmModal?: NzModalRef; // g-zorro model 提示框

  constructor(public fb: FormBuilder, public dialog: MatDialog,private modal: NzModalService, public adminProductFreeTravelService: AdminProductFreeTravelService,
    public router: Router) {
      this.searchForm = this.fb.group({
        status: [''],
        checkStatus: [''],
        title: [''],
        store_name:['']
      })
   
  }


  ngOnInit(): void {
    this.getFeeTravelList();
  }


  getFeeTravelList() {
    this.loading = true;
    this.adminProductFreeTravelService.freeTravelList(this.page, this.per_page,this.status,this.check_status,this.title,this.store_name).subscribe(res => {
      console.log("结果是", res)
      this.loading = false;
      this.total = res.total;   //总页数
      this.dataSource = res.data;
    })
  }


  changePageSize(per_page: number) {
    this.per_page = per_page;
    this.getFeeTravelList();
  }

  changePageIndex(page: number) {
    console.log("当前页", page);
    this.page = page;
    this.getFeeTravelList();
  }

  search(){
    this.status = this.searchForm.value.status;
    this.check_status = this.searchForm.value.checkStatus;
    this.title = this.searchForm.value.title;
    this.store_name = this.searchForm.value.store_name;
    this.getFeeTravelList();

  }


   // 查看详情
   edit(data: any) {
    this.router.navigate(['/admin/main/freeTravel/detail'], { queryParams: { detailId: data.id } });
  }


  review(data:any){
    console.log("编辑", data);
    const dialogRef = this.dialog.open(AdminProductFreeReviewComponent, {
      width: '800px',
      data: data
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.getFeeTravelList();
      }
    })
  }


  // 上架
  up(data: any){
    this.confirmModal = this.modal.confirm({
      nzTitle: '是否确定该操作?',
      nzContent: '请确认操作的数据是否正确',
      nzOnOk: () =>{
        this.adminProductFreeTravelService.freeTravelUp(data.id).subscribe(res => {
          console.log("结果是", res)
          this.getFeeTravelList();
        })
      }
    })
    
  }
  quteDateClick(data: any){
    this.router.navigate(['/admin/main/freeTravel/qutedate'], { queryParams: { detailId: data.id } });
  }

}
