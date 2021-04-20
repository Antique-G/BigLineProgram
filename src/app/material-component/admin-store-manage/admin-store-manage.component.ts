import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminRegionService } from '../../../services/admin/admin-region.service';
import { AdminStoreManageService } from '../../../services/admin/admin-store-manage.service';
import { AdminStoreManageSetScheduleComponent } from '../admin-store-manage-schedule/admin-store-manage-set-schedule/admin-store-manage-set-schedule.component';
import { AdminStoreManageAddComponent } from './admin-store-manage-add/admin-store-manage-add.component';
import { AdminStoreManageDetailComponent } from './admin-store-manage-detail/admin-store-manage-detail.component';


@Component({
  selector: 'app-admin-store-manage',
  templateUrl: './admin-store-manage.component.html',
  styleUrls: ['./admin-store-manage.component.css']
})
export class AdminStoreManageComponent implements OnInit {
  searchForm: FormGroup;
  dataSource: any;
  page = 1;
  per_page = 20;
  total = 1;
  loading = true;
  region_code: any;
  status: any;
  shop_name: any;
  // 城市
  nzOptions: any[] | null = null;
  idRegion: any;

  constructor(public fb: FormBuilder, public adminRegionService: AdminRegionService, public adminStoreManageService: AdminStoreManageService,
    private modal: NzModalService, public router: Router) {
    this.searchForm = fb.group({
      status: [''],
      region_code: [''],
      shop_name: [''],
    });
  }

  ngOnInit(): void {
    // 城市
    this.adminRegionService.getAllRegionList().subscribe(res => {
      this.nzOptions = res;
    })
    this.list();
  }

  list() {
    this.loading = true;
    this.adminStoreManageService.storeManageList(this.page, this.per_page, this.status, this.region_code, this.shop_name).subscribe(res => {
      console.log('res :>> ', res);
      this.dataSource = res?.data;
      this.total = res?.total;
      this.loading = false;
    })
  }

  changePageIndex(page: number) {
    console.log("当前页", page);
    this.page = page;
    this.list();
  }

  changePageSize(per_page: number) {
    console.log("一页显示多少", per_page);
    this.per_page = per_page;
    this.list();
  }


  search() {
    this.status = this.searchForm.value.status;
    this.shop_name = this.searchForm.value.shop_name;
    this.region_code = this.idRegion;
    this.list();
  }

  onChanges(data: any): void {
    console.log("点击的结果是", data);
    if (data !== null) {
      this.idRegion = data[data.length - 1];
    }
  }

  add() {
    const addmodal = this.modal.create({
      nzTitle: '添加',
      nzWidth: 800,
      nzContent: AdminStoreManageAddComponent,
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
    addmodal.afterClose.subscribe(res => {
      this.list();
    })
  }

  edit(data: any) {
    const addmodal = this.modal.create({
      nzTitle: '编辑',
      nzWidth: 800,
      nzContent: AdminStoreManageDetailComponent,
      nzMaskClosable: false,
      nzComponentParams: {
        data: data
      },
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
    addmodal.afterClose.subscribe(res => {
      this.list();
    })
  }



  set(data: any) {
    this.router.navigate(['/admin/main/adminStoreManage/schedule'], { queryParams: { id: data.id, shopName: data.shop_name } });
  }

  setSchedule() {
    const editmodal = this.modal.create({
      nzTitle: '门店员工排班设置',
      nzContent: AdminStoreManageSetScheduleComponent,
      nzWidth: 1000,
      // nzComponentParams: {
      //   data: [this.shop_id]
      // },
      nzFooter: [
        {
          label: '提交',
          type: 'primary',
          onClick: componentInstance => {
            componentInstance?.update()
          }
        }
      ]
    })
    editmodal.afterClose.subscribe(res => {
    })
  }



  // 重置
  reset() {
    this.searchForm.patchValue({
      status: '',
      region_code: '',
      shop_name: '',
    });
  }
}
