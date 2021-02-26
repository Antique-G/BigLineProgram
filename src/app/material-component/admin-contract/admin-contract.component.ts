import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminContractService } from '../../../services/admin/admin-contract.service';

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


  constructor(public fb: FormBuilder, public adminContractService: AdminContractService, public modal: NzModalService,
   ) {
    this.searchForm = fb.group({
      contract_name: [''],
      store_id: ['']
    });
  }

  ngOnInit(): void {
    this.getStoreContract();
  }

  getStoreContract() {
    this.adminContractService.getContract(this.page, this.per_page, this.contract_name,this.store_id).subscribe(res => {
      console.log("结果是", res)
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
    this.store_id = this.searchForm.value.store_id;
    this.getStoreContract();
  }


  delete(data:any){
    this.modal.confirm({
      nzTitle: "<h4>提示</h4>",
      nzContent: "<h6>是否删除</h6>",
      nzOnOk: () =>
        this.adminContractService.deleteContract(data.id).subscribe((res) => {
          this.getStoreContract();
        }),
    });
  }


}