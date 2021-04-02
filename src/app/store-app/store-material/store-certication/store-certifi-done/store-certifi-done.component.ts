import { Component, OnInit } from '@angular/core';
import { StoreContractService } from '../../../../../services/store/store-contract/store-contract.service';

@Component({
  selector: 'app-store-certifi-done',
  templateUrl: './store-certifi-done.component.html',
  styleUrls: ['./store-certifi-done.component.css']
})
export class StoreCertifiDoneComponent implements OnInit {
  page = 1;
  per_page = 10;
  contract_name: any;
  total = 1;
  loading = true;
  dataSource: any;


  constructor( public storeContractService: StoreContractService) {
 
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

}
