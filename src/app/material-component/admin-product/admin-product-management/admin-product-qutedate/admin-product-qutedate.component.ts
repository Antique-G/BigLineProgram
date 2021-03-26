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
  dataSource1: any[] = [];   //1.4将数据添加到dataSource
  dataSource2: any[] = [];   //1.4将数据添加到dataSource
  dataSource3: any[] = [];   //1.4将数据添加到dataSource



  loading = true;
  detailId: any;
  // 分页
  page = 1;
  per_page = 20;
  total = 1;
  page1 = 1;
  per_page1 = 20;
  total1 = 1;
  page2 = 1;
  per_page2 = 20;
  total2 = 1;
  page3 = 1;
  per_page3 = 20;
  total3 = 1;

  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();
  setArr = new Set<any>();
  proName: any;
  childStatus: any;
  isShowPrice_diff = true;




  constructor(public adminProductManagementService: AdminProductManagementService,
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
    this.getQuteDateList();
  }

  getQuteDateList() {
    this.adminProductManagementService.QuteDateList(this.detailId, this.page, this.per_page).subscribe(res => {
      this.loading = false;
      this.dataSource = res.data
      this.total = res.total;   //总页数
      console.log(res);
      let arr1: any[] = [];
      let arr2: any[] = [];
      let arr3: any[] = [];
      this.dataSource.forEach((ele: any, index: any) => {
        console.log('ele123123', ele, ele.check_status, ele.check_status === 2, ele.check_status === '2');
        if (ele.check_status === 1) {
          arr1.push(ele)
        }
        if (ele.check_status === 2) {
          arr2.push(ele)
        }
        else if (ele.check_status === 3) {
          arr3.push(ele)
        }
      })
      this.dataSource1 = arr1;
      this.dataSource2 = arr2;
      this.dataSource3 = arr3;

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

}
