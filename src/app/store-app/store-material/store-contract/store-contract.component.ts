import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { StoreContractService } from '../../../../services/store/store-contract/store-contract.service';

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


  constructor(public fb: FormBuilder, public storeContractService: StoreContractService) {
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


  add() { }
}
