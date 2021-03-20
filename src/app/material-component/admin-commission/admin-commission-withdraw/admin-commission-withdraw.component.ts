import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminUserCommissionListService } from '../../../../services/admin/admin-user-commission-list.service';

@Component({
  selector: 'app-admin-commission-withdraw',
  templateUrl: './admin-commission-withdraw.component.html',
  styleUrls: ['./admin-commission-withdraw.component.css']
})
export class AdminCommissionWithdrawComponent implements OnInit {
  searchForm:FormGroup;
  dataSource = [];
  page = 1;
  per_page = 20;
  total = 1;
  status: any;
  user_id: any;

  constructor(public fb:FormBuilder,public adminUserCommissionListService:AdminUserCommissionListService,) { 
    this.searchForm = fb.group({
      status:[""],
      user_id:[""]
    })
  }

  ngOnInit(): void {
    this.getDataList();
  }


  //提现列表
  getDataList():void{
    this.adminUserCommissionListService.UserWithdrawList(this.page,this.per_page,this.user_id,this.status).subscribe((res:any) =>{
      console.log('res',res)
      this.total = res.total;
      this.dataSource = res.data;
    })
  }
  changePageIndex(page: number) {
    console.log("aaa", page);
    this.page = page;
    this.getDataList();
  }
  changePageSize(per_page: number) {
    console.log("bbb", per_page);
    this.per_page = per_page;
    this.getDataList();
  }
  
  search(){
    console.log("value",this.searchForm.value)
    this.user_id = this.searchForm.value.user_id;
    this.status = this.searchForm.value.status;
    this.getDataList();
  }

}
