import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminServicerService } from '../../../services/admin/admin-servicer.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AdminServicerCreateComponent } from './admin-servicer-create/admin-servicer-create.component';
import { AdminServicerDetailComponent } from './admin-servicer-detail/admin-servicer-detail.component';


@Component({
  selector: 'app-admin-servicer',
  templateUrl: './admin-servicer.component.html',
  styleUrls: ['./admin-servicer.component.css']
})
export class AdminServicerComponent implements OnInit {

  searchForm: FormGroup;
  dataSource = [];
  page = 1;
  per_page = 10;
  total = 1;
  loading = false;
  region_code: any;
  phone: any;

  // 城市
  nzOptions: any[] | null = null;
  idRegion: any;


  constructor(public fb: FormBuilder, private modal: NzModalService, private viewContainerRef: ViewContainerRef,
    public adminServicerService: AdminServicerService) {
    this.searchForm = fb.group({
      region_code: [''],
      phone: ['']
    })
  }

  ngOnInit(): void {
    this.adminServicerService.getAllRegionList().subscribe(res => {
      this.nzOptions = res;
      this.getDataList();
    })
  }

  getDataList() {
    this.loading = true;
    this.adminServicerService.regionServiceList(this.page, this.per_page, this.region_code, this.phone).subscribe((result: any) => {
      console.log("result的结果是", result);
      this.loading = false;
      this.total = result.total;   //总页数
      this.dataSource = result.data;
    });

  }


  changePageIndex(page: number) {
    this.page = page;
    this.getDataList();
  }
  changePageSize(per_page: number) {
    this.per_page = per_page;
    this.getDataList();
  }

  onChanges(data: any): void {
    console.log("点击的结果是", data);
    if (data !== null) {
      this.idRegion = data[data.length - 1];
    }
  }


  search() {
    this.region_code = this.idRegion;
    this.phone = this.searchForm.value.phone;
    this.getDataList();
    console.log('value', this.searchForm.value)
  }

  add() {
    const modal: NzModalRef = this.modal.create({
      nzTitle: '添加',
      nzViewContainerRef: this.viewContainerRef,
      nzContent: AdminServicerCreateComponent,
      nzWidth: 660,
      nzFooter: [
        {
          label: "添加",
          type: "primary",
          onClick: (componentInstance) => {
            componentInstance?.add();
          },
        },
      ],
    })
    modal.afterClose.subscribe(res => {
      this.getDataList();
    });

  }

  edit(data: any) {
    const modal: NzModalRef = this.modal.create({
      nzTitle: '更新',
      nzViewContainerRef: this.viewContainerRef,
      nzContent: AdminServicerDetailComponent,
      nzWidth: 660,
      nzComponentParams: {
        data: data
      },
      nzFooter: [
        {
          label: "更新",
          type: "primary",
          onClick: (componentInstance) => {
            componentInstance?.add();
          },
        },
      ],
    })
    modal.afterClose.subscribe(res => {
      this.getDataList();
    });
  }

  delete(data: any) {
    this.modal.confirm({
      nzTitle: "<h4>提示</h4>",
      nzContent: "<h6>是否删除</h6>",
      nzOnOk: () =>
      this.adminServicerService.deleteRegionService(data.id).subscribe((res) => {
          this.getDataList();
        }),
    });
  }


}
