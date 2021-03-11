import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { AdminProductManagementService } from '../../../../../services/admin/admin-product-management.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-product-qutedate',
  templateUrl: './admin-product-qutedate.component.html',
  styleUrls: ['./admin-product-qutedate.component.css']
})
export class AdminProductQutedateComponent implements OnInit {
  dataSource: any[] = [];   //1.4将数据添加到dataSource
  loading = true;
  detailId: any
  page = 1;
  per_page = 20;
  total = 1;
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: Data[] = [];
  setOfCheckedId = new Set<number>();
  setArr = new Set<any>();
  proName: any;



  constructor(public adminProductManagementService: AdminProductManagementService,
    public activatedRoute: ActivatedRoute,
    private msg: NzMessageService,
    private modal: NzModalService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.detailId = params.detailId;
      this.proName = params.proName;
    });
    this.getQuteDateList();
  }

  getQuteDateList() {
    this.adminProductManagementService.QuteDateList(this.detailId, this.page, this.per_page).subscribe(res => {
      this.loading = false;
      this.dataSource = res.data
      this.total = res.total;   //总页数
      console.log(res);
    })
  }

  checkStateClick(state: any) {
    let objList = [...this.setArr]
    let flag = objList.every(item => item.check_status === 1);
    if (!flag) {
      this.msg.error("请勿审核已审核过的报价日期");
      return;
    }
    this.modal.confirm({
      nzTitle: '<h5>请确认操作是否正确?</h5>',
      nzContent: `您点击的是:${state == 2 ? '"通过"' : '"未通过"'}`,
      nzOnOk: () => {
        let ids: any[] = [...this.setOfCheckedId]
        if (ids.length === 0) {
          this.msg.error("请选择要审核的报价日期");
          return
        }
        console.log(ids);
        this.adminProductManagementService.QuteDateCheckState(ids, state).subscribe(res => {
          console.log(res);
          this.getQuteDateList();
          this.setOfCheckedId.clear()
          this.setArr.clear()
        })
      }
    });


  }
  changePageSize(per_page: number) {
    this.per_page = per_page;
    this.getQuteDateList();
  }

  changePageIndex(page: number) {
    console.log("当前页", page);
    this.page = page;
    this.getQuteDateList();
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData.filter(({ disabled }) => !disabled).forEach((data) => this.updateCheckedSet(data, checked));
    this.refreshCheckedStatus();
  }
  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(({ disabled }) => !disabled);
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  updateCheckedSet(data: any, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(data.id);
      this.setArr.add(data);

    } else {
      this.setOfCheckedId.delete(data.id);
      this.setArr.delete(data);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: Data[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  onItemChecked(data: any, checked: boolean): void {
    this.updateCheckedSet(data, checked);
    this.refreshCheckedStatus();
  }

  getState(state: any) {
    let str = ""
    switch (state) {
      case 0:
        str = '未提交审核'
        break;
      case 1:
        str = '审核中'
        break;
      case 2:
        str = '已通过'
        break;
      case 3:
        str = '未通过'
        break;
      default:
        break;
    }
    return str
  }

}
