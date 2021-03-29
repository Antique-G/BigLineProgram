import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminProductTagService } from '../../../../services/admin/admin-product-tag.service';
import { AdminProductSetStatusModel } from '../../../../interfaces/adminProduct/product-management-model';
import { AdminProductManagementService } from '../../../../services/admin/admin-product-management.service';
import { AdminProductReviewComponent } from './admin-product-review/admin-product-review.component';
import { AdminProductMiniCodeComponent } from './admin-product-mini-code/admin-product-mini-code.component';

@Component({
  selector: 'app-admin-product-management',
  templateUrl: './admin-product-management.component.html',
  styleUrls: ['./admin-product-management.component.css']
})
export class AdminProductManagementComponent implements OnInit {
  searchForm!: FormGroup;
  dataSource: any[] = [];   //1.4将数据添加到dataSource
  loading = true;
  page = 1;
  per_page = 20;
  total = 1;
  status: any;
  check_status: any;
  title: any;
  store_id: any;
  adminProductSetStatusModel: AdminProductSetStatusModel;
  storeList: any[] = [];
  isReason: any;
  code: any;
  few_days: any;
  tag: any;
  tagList: any[] = [];


  constructor(public fb: FormBuilder, public dialog: MatDialog, public adminProductManagementService: AdminProductManagementService,
    public router: Router, private modal: NzModalService, public adminProductTagService: AdminProductTagService,) {
    this.adminProductSetStatusModel = {
      id: 0,
      status: 0
    }
    this.searchForm = this.fb.group({
      status: [''],
      checkStatus: [''],
      title: [''],
      store_id: [''],
      code: [''],
      tag: [''],
      few_days: [''],
    })

  }


  ngOnInit(): void {
    this.adminProductManagementService.storeList('').subscribe(res => {
      console.log("24234", res);
      this.storeList = res;
      this.adminProductTagService.getProductTagList(1, 100, 1, '', '').subscribe((result: any) => {
        console.log("jieguo", result);
        this.tagList = result.data;
      });
      this.getProductList();
    })

  }


  getProductList() {
    this.loading = true;
    this.adminProductManagementService.productList(this.page, this.per_page, this.status, this.check_status, this.title, this.store_id, this.code, this.few_days, this.tag).subscribe(res => {
      console.log("结果是", res)
      this.loading = false;
      this.total = res.meta.pagination.total;   //总页数
      this.dataSource = res.data;
    })
  }


  changePageSize(per_page: number) {
    this.per_page = per_page;
    this.getProductList();
  }

  changePageIndex(page: number) {
    console.log("当前页", page);
    this.page = page;
    this.getProductList();
  }

  search() {
    this.status = this.searchForm.value.status;
    this.check_status = this.searchForm.value.checkStatus;
    this.title = this.searchForm.value.title;
    this.store_id = this.searchForm.value.store_id;
    this.code = this.searchForm.value.code;
    this.few_days = this.searchForm.value.few_days;
    this.tag = this.searchForm.value.tag;
    this.getProductList();

  }


  // 查看详情
  edit(data: any) {
    this.router.navigate(['/admin/main/productManagement/detail'], { queryParams: { detailDataId: data.id } });
  }


  // 审核
  review(data: any) {
    console.log("编辑", data);
    this.adminProductManagementService.checkLog(data.id).subscribe(res => {
      console.log("122", res);
      console.log("24452", res[0]);
      this.isReason = res[0]?.reason;
      const dialogRef = this.dialog.open(AdminProductReviewComponent, {
        width: '800px',
        data: [data, this.isReason]
      })
      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          this.getProductList();
        }
      })
    })

  }



  // 上下架操作
  up(data: any) {
    console.log("nadao", data);
    this.adminProductSetStatusModel.id = data.id;
    if (data.status === 1) {
      this.adminProductSetStatusModel.status = 0;
    }
    else if (data.status === 0) {
      this.adminProductSetStatusModel.status = 1;
    }
    this.modal.confirm({
      nzTitle: '<h4>提示</h4>',
      nzContent: '<h6>请确认操作</h6>',
      nzOnOk: () =>
        this.adminProductManagementService.productSetStatus(this.adminProductSetStatusModel).subscribe(res => {
          this.getProductList();
        })
    });
  }

  quteDateClick(data: any) {
    console.log('data :>> ', data);
    this.adminProductManagementService.productDetail(data.id).subscribe(res => {
      console.log('res :>> ', res);
      let childStatus = res.data.child_status;
      this.router.navigate(['/admin/main/productManagement/qutedate'], { queryParams: { detailId: data.id, proName: data.title, childStatus: childStatus, few_nights: data?.few_nights } });

    })
  }



  // 审核日志
  viewLog(data: any) {
    this.adminProductManagementService.checkLog(data.id).subscribe(res => {
      console.log("122", res);
      console.log("24452", res[0]);
      this.isReason = res[0]?.reason;
    })
  }



  getCode(data: any) {
    const addmodal = this.modal.create({
      nzTitle: '生成小程序码',
      nzContent: AdminProductMiniCodeComponent,
      nzWidth: 800,
      nzComponentParams: {
        data: [data, 0]
      },
      nzFooter: null
    })
    addmodal.afterClose.subscribe((res: any) => {
    })
  }

}
