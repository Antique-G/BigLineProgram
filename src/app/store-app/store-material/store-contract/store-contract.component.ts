import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { StoreContractService } from '../../../../services/store/store-contract/store-contract.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StoreContractCreateComponent } from './store-contract-create/store-contract-create.component';


@Component({
  selector: 'app-store-contract',
  templateUrl: './store-contract.component.html',
  styleUrls: ['./store-contract.component.css']
})


export class StoreContractComponent implements OnInit {
  searchForm!: FormGroup;
  page = 1;
  per_page = 10;
  contract_name: any;
  total = 1;
  loading = true;
  dataSource: any;


  constructor(public fb: FormBuilder, public storeContractService: StoreContractService, public modal: NzModalService) {
    this.searchForm = fb.group({
      contract_name: ['']
    });
  }

  ngOnInit(): void {
    this.getStoreContract();
  }

  getStoreContract() {
    this.storeContractService.getStoreContract(this.page, this.per_page, this.contract_name).subscribe(res => {
      console.log("结果是", res)
      res?.data.forEach((element: any) => {
        element['isStatus'] = '';
        element.isStatus = this.nowInDateBetwen(element.start_date, element.end_date, element.isStatus);
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


  add() {
    const addmodal = this.modal.create({
      nzTitle: '添加合同',
      nzContent: StoreContractCreateComponent,
      nzFooter: [
        {
          label: '添加',
          type: 'primary',
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

  // 重置
  reset() {
    this.searchForm.patchValue({
      contract_name: '',
    })
  }
}
