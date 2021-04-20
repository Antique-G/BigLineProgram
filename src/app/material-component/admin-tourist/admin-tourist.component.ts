import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SetStatusModel } from '../../../interfaces/store/storeTourist/store-tourist-model';
import { AdminTouristService } from '../../..//services/admin/admin-tourist.service';
import { AdminTouristDetailComponent } from './admin-tourist-detail/admin-tourist-detail.component';
import { AdminTouristCreateComponent } from './admin-tourist-create/admin-tourist-create.component';

@Component({
  selector: 'app-admin-tourist',
  templateUrl: './admin-tourist.component.html',
  styleUrls: ['./admin-tourist.component.css']
})
export class AdminTouristComponent implements OnInit {
  searchForm: FormGroup;
  status: any;
  name: any;
  mobile: any;
  dataSource: any[] = [];
  loading = true;
  page = 1;
  per_page = 20;
  total: any;
  setStatusModel: SetStatusModel;

  constructor(public fb: FormBuilder, public adminTouristService: AdminTouristService, public router: Router,
    public dialog: MatDialog, public modal: NzModalService) {
    this.searchForm = this.fb.group({
      status: [''],
      name: [''],
      mobile: ['']
    });
    this.setStatusModel = {
      id: 0,
      status: 1
    }
  }


  ngOnInit(): void {
    this.getTouristList();
  }

  getTouristList() {
    this.adminTouristService.getTouristList(this.page, this.per_page, this.status, this.name, this.mobile).subscribe(res => {
      this.loading = false;
      this.dataSource = res.data;
      this.total = res.total;
    })
  }

  changePageSize(per_page: number) {
    this.per_page = per_page;
    this.getTouristList();
  }

  changePageIndex(page: number) {
    console.log("当前页", page);
    this.page = page;
    this.getTouristList();
  }

  search() {
    this.status = this.searchForm.value.status;
    this.name = this.searchForm.value.name;
    this.mobile = this.searchForm.value.mobile;
    this.getTouristList();

  }



  delete(data: any) {
    console.log("data", data);
    this.modal.confirm({
      nzTitle: '<h4>提示</h4>',
      nzContent: '<h6>是否删除</h6>',
      nzOnOk: () =>
        this.adminTouristService.deleteTourist(data.id).subscribe(res => {
          this.getTouristList();
        })
    })
  }


  add() {
    const editmodal = this.modal.create({
      nzTitle: '添加',
      nzContent: AdminTouristCreateComponent,
      nzMaskClosable: false,
      nzFooter: [
        {
          label: '提交',
          type: 'primary',
          onClick: componentInstance => {
            componentInstance?.add()
          }
        }
      ]
    })
    editmodal.afterClose.subscribe(res => {
      this.getTouristList();
    })
  }


  // 查看详情
  edit(data: any) {
    const editmodal = this.modal.create({
      nzTitle: '修改',
      nzContent: AdminTouristDetailComponent,
      nzMaskClosable: false,
      nzComponentParams: {
        data: data
      },
      nzFooter: [
        {
          label: '更新',
          type: 'primary',
          onClick: componentInstance => {
            componentInstance?.update()
          }
        }
      ]
    })
    editmodal.afterClose.subscribe(res => {
      this.getTouristList();
    })
  }



  // 上下架操作
  up(data: any) {
    console.log("nadao", data);
    this.setStatusModel.id = data.id;
    if (data.status === 1) {
      this.setStatusModel.status = 0;
    }
    else if (data.status === 0) {
      this.setStatusModel.status = 1;
    }
    console.log("this.setStatusModel", this.setStatusModel);
    this.modal.confirm({
      nzTitle: '<h4>提示</h4>',
      nzContent: '<h6>请确认操作</h6>',
      nzOnOk: () =>
        this.adminTouristService.setStatus(this.setStatusModel).subscribe(res => {
          this.getTouristList();
        })
    });
  }


  // 重置
  reset() {
    this.searchForm.patchValue({
      status: '',
      name: '',
      mobile: '',
    })
  }
}
