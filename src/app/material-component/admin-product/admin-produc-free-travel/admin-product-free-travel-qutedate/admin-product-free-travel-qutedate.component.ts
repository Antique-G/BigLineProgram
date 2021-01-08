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
  dataSource: any[] = [];   //1.4将数据添加到dataSource
  loading = true;
  detailId:any
  page = 1;
  per_page = 20;
  total = 1;
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: Data[] = [];
  setOfCheckedId = new Set<number>();

  constructor(public adminProductFreeTravelService: AdminProductFreeTravelService,
    public activatedRoute: ActivatedRoute,
    private msg: NzMessageService,
    private modal: NzModalService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.detailId = JSON.parse(params["detailId"]);
    });
    this.getQuteDateList();
  }

  getQuteDateList(){
    this.adminProductFreeTravelService.freeTravelQuteDateList(this.detailId,this.page, this.per_page).subscribe(res=>{
      this. loading = false;
      this.dataSource = res.data
      this.total = res.total;   //总页数
      console.log(res);
    })
  }

  checkStateClick(state:any){

    this.modal.confirm({
      nzTitle: '<h5>请确认操作是否正确?</h5>',
      nzContent: `您点击的是:${state==2?'"通过"':'"未通过"'}`,
      nzOnOk: () =>{
        let ids:any[] = [...this.setOfCheckedId]
        if(ids.length===0){
          this.msg.error("请选择要审核的报价日期");
          return
        }
        console.log(ids);
        this.adminProductFreeTravelService.freeTravelQuteDateCheckState(ids,state).subscribe(res=>{
          console.log(res);
          this.getQuteDateList();
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
    this.listOfCurrentPageData.filter(({ disabled }) => !disabled).forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }
  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(({ disabled }) => !disabled);
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: Data[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  getState(state:any){
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
