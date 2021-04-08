import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminContractService } from '../../../services/admin/admin-contract.service';
import { AdminContractCreateComponent } from './admin-contract-create/admin-contract-create.component';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-contract',
  templateUrl: './admin-contract.component.html',
  styleUrls: ['./admin-contract.component.css']
})
export class AdminContractComponent implements OnInit {
  searchForm!: FormGroup;
  page = 1;
  per_page = 10;
  contract_name: any;
  total = 1;
  loading = true;
  store_id: any;
  dataSource: any;
  storeList: any[] = [];
  isSelectedValue = false;



  constructor(public fb: FormBuilder, public adminContractService: AdminContractService, public modal: NzModalService,
    public activatedRoute: ActivatedRoute,public dialog: MatDialog) {
    this.searchForm = fb.group({
      contract_name: [''],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.store_id = params.id;
      this.getStoreContract();
    });
  }

  getStoreContract() {
    this.adminContractService.getContract(this.page, this.per_page, this.contract_name, this.store_id).subscribe(res => {
      console.log("结果是", res)
      res?.data.forEach((element: any) => {
        element['isStatus'] = '';
        element.isStatus =  this.nowInDateBetwen(element.start_date, element.end_date, element.isStatus);
        console.log('element.isStatus :>> ', element.isStatus);
      });
      this.dataSource = res?.data;
      this.total = res.total;
      this.loading = false;
    })
  }


  changePageIndex(page: number) {
    console.log("当前页", page);
    this.page = page;
    this.getStoreContract();
  }


  changePageSize(per_page: number) {
    console.log("一页显示多少", per_page);
    this.per_page = per_page;
    this.getStoreContract();
  }


  search() {
    this.contract_name = this.searchForm.value.contract_name;
    this.getStoreContract();
  }


  delete(data: any) {
    this.modal.confirm({
      nzTitle: "<h4>提示</h4>",
      nzContent: "<h6>是否删除</h6>",
      nzOnOk: () =>
        this.adminContractService.deleteContract(data.id).subscribe((res) => {
          this.getStoreContract();
        }),
    });
  }




  add() {
    const addmodal = this.modal.create({
      nzTitle: '添加合同',
      nzContent: AdminContractCreateComponent,
      nzFooter: [
        {
          label: '提交',
          type:'primary',
          onClick: componentInstance => {
              componentInstance?.add()

          }
        }
      ]
    })
    addmodal.afterClose.subscribe(res => {
      this.getStoreContract();
    })

  }



  
  // 判断时间是否为有效期内
  nowInDateBetwen(d1: any, d2: any, isData: any) {
    let dateBegin = new Date(d1);//将-转化为/，使用new Date
    let dateEnd = new Date(d2);//将-转化为/，使用new Date
    let dateNow = new Date();//获取当前时间

    let beginDiff = dateNow.getTime() - dateBegin.getTime();//时间差的毫秒数       
    let beginDayDiff = Math.floor(beginDiff / (24 * 3600 * 1000));//计算出相差天数

    let endDiff = dateEnd.getTime() - dateNow.getTime();//时间差的毫秒数
    let endDayDiff = Math.floor(endDiff / (24 * 3600 * 1000));//计算出相差天数       
    console.log('1111', endDayDiff, beginDayDiff);
    if (endDayDiff > 0) {
      isData = '正常';
      return isData
    }
    else if (beginDayDiff > 0) {
      isData = '过期';
      return isData
    }
  }
}