import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { AdminProductFreeTravelService } from '../../../../../services/admin/admin-product-free-travel.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-admin-product-free-travel-qutedate',
  templateUrl: './admin-product-free-travel-qutedate.component.html',
  styleUrls: ['./admin-product-free-travel-qutedate.component.css']
})
export class AdminProductFreeTravelQutedateComponent implements OnInit {
  dataSource1: any[] = [];   //1.4将数据添加到dataSource
  page1 = 1;
  per_page1 = 20;
  total1 = 1;

  dataSource2: any[] = [];   //1.4将数据添加到dataSource
  page2 = 1;
  per_page2 = 20;
  total2 = 1;


  dataSource3: any[] = [];   //1.4将数据添加到dataSource
  page3 = 1;
  per_page3 = 20;
  total3 = 1;

  detailId: any;
  childStatus: any;
  loading = true;


  checked = false;
  indeterminate = false;
  listOfCurrentPageData: Data[] = [];
  setOfCheckedId = new Set<number>();
  setArr = new Set<any>();
  proName: any;
  isShowPrice_diff = true;


  constructor(public adminProductFreeTravelService: AdminProductFreeTravelService,
    public activatedRoute: ActivatedRoute,
    private msg: NzMessageService,
    private modal: NzModalService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.detailId = params.detailId;
      this.proName = params.proName;
      this.childStatus = params.childStatus;
      this.isShowPrice_diff = params.few_nights === '0' ? false : true;
    });
    this.getQuteDateList1();
  }


  // 审核中
  getQuteDateList1() {
    this.adminProductFreeTravelService.freeTravelQuteDateList(this.detailId, this.page1, this.per_page1, 1).subscribe(res => {
      this.loading = false;
      this.dataSource1 = res.data
      this.total1 = res.total;   //总页数
    })
  }



  
  changePageSize1(per_page: number) {
    this.per_page1 = per_page;
    this.getQuteDateList1();
  }

  changePageIndex1(page: number) {
    console.log("当前页", page);
    this.page1 = page;
    this.getQuteDateList1();
  }


  // 已通过
  getQuteDateList2() {
    this.adminProductFreeTravelService.freeTravelQuteDateList(this.detailId, this.page2, this.per_page2, 2).subscribe(res => {
      this.loading = false;
      this.dataSource2 = res.data
      this.total2 = res.total;   //总页数
    })
  }


  changePageSize2(per_page: number) {
    this.per_page2 = per_page;
    this.getQuteDateList2();
  }

  changePageIndex2(page: number) {
    console.log("当前页", page);
    this.page2 = page;
    this.getQuteDateList2();
  }


  // 未通过
  getQuteDateList3() {
    this.adminProductFreeTravelService.freeTravelQuteDateList(this.detailId, this.page3, this.per_page3, 3).subscribe(res => {
      this.loading = false;
      this.dataSource3 = res.data
      this.total3 = res.total;   //总页数
    })
  }


  changePageSize3(per_page: number) {
    this.per_page3 = per_page;
    this.getQuteDateList3();
  }

  changePageIndex3(page: number) {
    console.log("当前页", page);
    this.page3 = page;
    this.getQuteDateList3();
  }



  checkStateClick(state: any) {
    console.log(this.setArr);
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
        this.adminProductFreeTravelService.freeTravelQuteDateCheckState(ids, state).subscribe(res => {
          console.log(res);
          this.getQuteDateList1();
          this.setOfCheckedId.clear()
          this.setArr.clear()
        })
      }
    });


  }

  onAllChecked(checked: boolean): void {
    this.dataSource1.filter(({ disabled }) => !disabled).forEach((data) => this.updateCheckedSet(data, checked));
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



  onItemChecked(data: any, checked: boolean): void {
    this.updateCheckedSet(data, checked);
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


  onTabChange(event: any) {
    console.log('event :>> ', event,event===1);
    if(event===1){
      this.getQuteDateList2();
    }
    else if(event===2){
      this.getQuteDateList3();
    }
  }
}
