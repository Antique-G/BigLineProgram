import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminProductFreeTravelService } from '../../../../services/admin/admin-product-free-travel.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AdminProductFreeReviewComponent } from './admin-product-free-review/admin-product-free-review.component';
import { AdminProductTagService } from '../../../../services/admin/admin-product-tag.service';
import { AdminProductMiniCodeComponent } from '../admin-product-management/admin-product-mini-code/admin-product-mini-code.component';
import { NzMessageService } from 'ng-zorro-antd/message';

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
  store_name: any;
  confirmModal?: NzModalRef; // g-zorro model 提示框
  code: any;
  few_days: any;
  tag: any;
  tagList: any[] = [];
  setQuery: any;


  constructor(public fb: FormBuilder, public dialog: MatDialog, private modal: NzModalService,
    public adminProductFreeTravelService: AdminProductFreeTravelService, private message: NzMessageService,
    public router: Router, public adminProductTagService: AdminProductTagService,) {
    this.searchForm = this.fb.group({
      status: [''],
      checkStatus: [''],
      title: [''],
      store_name: [''],
      code: [''],
      tag: [''],
      few_days: [''],
    })

  }


  ngOnInit(): void {
    this.adminProductTagService.getProductTagList(1, 100, 2, '', '').subscribe((result: any) => {
      console.log("jieguo", result);
      this.tagList = result.data;
    });
    // 将上次查询的筛选条件赋值
    let getSeatch = JSON.parse(localStorage.getItem("adminFreeSearch")!)
    this.status = getSeatch?.status ? getSeatch?.status : '';
    this.check_status = getSeatch?.check_status ? getSeatch?.check_status : '';
    this.title = getSeatch?.title ? getSeatch?.title : '';
    this.store_name = getSeatch?.store_name ? getSeatch?.store_name : '';
    this.code = getSeatch?.code ? getSeatch?.code : '';
    this.few_days = getSeatch?.few_days ? getSeatch?.few_days : '';
    this.tag = getSeatch?.tag ? getSeatch?.tag : '';
    this.page = getSeatch?.page ? getSeatch?.page : 1;
    this.searchForm.patchValue({
      status: this.status,
      checkStatus: this.check_status,
      title: this.title,
      code: this.code,
      tag: this.tag,
      store_name: this.store_name,
      few_days: this.few_days,
    })
    this.getFeeTravelList();
  }


  getFeeTravelList() {
    this.loading = true;
    this.adminProductFreeTravelService.freeTravelList(this.page, this.per_page, this.status, this.check_status, this.title, this.store_name, this.code, this.few_days, this.tag).subscribe(res => {
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
    // 筛选条件存进cookie
    this.setQuery = { status: this.status, check_status: this.check_status, title: this.title, store_name: this.store_name, code: this.code, few_days: this.few_days, tag: this.tag, page: this.page }
    localStorage.setItem('adminFreeSearch', JSON.stringify(this.setQuery));
    this.getFeeTravelList();
  }

  search() {
    this.status = this.searchForm.value.status;
    this.check_status = this.searchForm.value.checkStatus;
    this.title = this.searchForm.value.title;
    this.store_name = this.searchForm.value.store_name;
    this.code = this.searchForm.value.code;
    this.few_days = this.searchForm.value.few_days;
    this.tag = this.searchForm.value.tag;
    this.page = 1;

    // 筛选条件存进cookie
    this.setQuery = { status: this.status, check_status: this.check_status, title: this.title, store_name: this.store_name, code: this.code, few_days: this.few_days, tag: this.tag, page: this.page }
    localStorage.setItem('adminFreeSearch', JSON.stringify(this.setQuery));
    this.getFeeTravelList();

  }


  // 查看详情
  edit(data: any) {
    this.router.navigate(['/admin/main/freeTravel/detail'], { queryParams: { detailId: data.id } });
  }


  review(data: any) {
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
  up(data: any) {
    this.confirmModal = this.modal.confirm({
      nzTitle: '是否确定该操作?',
      nzContent: '请确认操作的数据是否正确',
      nzOnOk: () => {
        this.adminProductFreeTravelService.freeTravelUp(data.id).subscribe(res => {
          console.log("结果是", res)
          this.getFeeTravelList();
        })
      }
    })

  }


  quteDateClick(data: any) {
    console.log('data :>> ', data);
    this.router.navigate(['/admin/main/freeTravel/qutedate'], { queryParams: { detailId: data.id, proName: data.title, childStatus: data.reserve_children, few_nights: data?.few_nights, quote_type:data?.quote_type} });
  }



  getCode(data: any) {
    if (data?.status === 0) {
      this.message.create('error', `该产品暂未上架，无法生成小程序码`)
    }
    else {
      const addmodal = this.modal.create({
        nzTitle: '生成小程序码',
        nzContent: AdminProductMiniCodeComponent,
        nzWidth: 800,
        nzComponentParams: {
          data: [data, 1]
        },
        nzFooter: null
      })
      addmodal.afterClose.subscribe((res: any) => {
      })
    }
  }



  // 重置
  reset() {
    this.searchForm.patchValue({
      status: '',
      checkStatus: '',
      title: '',
      store_name: '',
      code: '',
      tag: '',
      few_days: '',
    });
    this.page = 1;
  }
}
