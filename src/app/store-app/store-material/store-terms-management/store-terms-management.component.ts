import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StoreTermsManagementService } from '../../../../services/store/store-terms-management/store-terms-management.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreTermManagementReviewComponent } from './store-term-management-review/store-term-management-review.component';
import { DeleteComfirmComponent } from '../common/delete-comfirm/delete-comfirm.component';
import { Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-store-terms-management',
  templateUrl: './store-terms-management.component.html',
  styleUrls: ['./store-terms-management.component.css']
})
export class StoreTermsManagementComponent implements OnInit {
  searchForm!: FormGroup;
  status: any;
  check_status: any;
  dataSource = [];
  page = 1;
  per_page = 20;
  total = 1;
  loading = true;
  confirmModal?: NzModalRef; // g-zorro model 提示框


  constructor(public fb: FormBuilder, public storeTermsManagementService: StoreTermsManagementService, public dialog: MatDialog,
    private router: Router,private modal: NzModalService, ) {
    this.searchForm = this.fb.group({
      status: [''],
      checkStatus: [''], 
    })
  }


  ngOnInit(): void {
    this.termsList();
  }


  termsList(): void {
    this.loading = true;
    this.storeTermsManagementService.storeTermsList(this.page, this.per_page,this.status,this.check_status).subscribe((result: any) => {
      console.log("jieguyo", result)
      this.loading = false;
      this.total = result.meta.pagination.total;   //总页数
      this.dataSource = result.data;
    });
  };

  changePageIndex(page: number) {
    console.log("当前页", page);
    this.page = page;
    this.termsList();
  }
  changePageSize(per_page: number) {
    console.log("一页显示多少", per_page);
    this.per_page = per_page;
    this.termsList();
  }

  search(){
    this.status = this.searchForm.value.status;
    this.check_status = this.searchForm.value.checkStatus;
    this.termsList();
  }



  edit(element: any): void {
    this.router.navigate(['/store/main/storeTermsManage/detail'], { queryParams: { detailId: element.id } });
    // console.log("拿到的值", element);
    // this.storeTermsManagementService.storeTermsDetail(element.id).subscribe(res => {
    //   if (res.data) {
    //     const dialogRef = this.dialog.open(StoreTermsManagementDetailComponent, {
    //       width: '550px',
    //       data: res.data
    //     });
    //     dialogRef.afterClosed().subscribe(result => {
    //       // console.log("result", result);
    //       if (result !== undefined) {
    //         this.termsList();
    //       }
    //     });
    //   }
    //   else {
    //     alert("查看详情失败")
    //   }
    // })

  }

  add() {
    this.router.navigate(['/store/main/storeTermsManage/create']);

    // const dialogRef = this.dialog.open(StoreTermsManagementCreateComponent, {
    //   width: '550px',
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log("result", result);
    //   if (result !== undefined) {
    //     this.termsList();
    //   }

    // });
  }



  delete(data: any) {
    console.log("nadao", data);
    const dialogRef = this.dialog.open(DeleteComfirmComponent, {
      width: '550px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("result", result);
      if (result !== undefined) {
        console.log("nadao", data);
        this.storeTermsManagementService.deleteStoreTerms(data.id).subscribe(res => {
          console.log("res", res);
          if (res === null) {
            // alert("删除成功");
            this.termsList();
          }
          else {
            // alert("删除失败");
          }
        })
    
      }
      else {
        this.termsList();
      }

    });
  }


  review(data:any){
    console.log("拿到的值", data);
    const dialogRef = this.dialog.open(StoreTermManagementReviewComponent, {
      width: '500px',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      this.termsList();
    });
  }




    // 上下架操作
    up(data: any) {
      console.log("nadao", data);
      this.modal.confirm({
        nzTitle: '<h4>提示</h4>',
        nzContent: '<h6>请确认操作</h6>',
        nzOnOk: () =>
        this.storeTermsManagementService.setStatus(data.id).subscribe(res => {
            this.termsList();
          })
      });
    }

}




