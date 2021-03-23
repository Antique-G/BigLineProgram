import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminUserMoneyLogService } from '../../../../services/admin/admin-user-money-log.service';

@Component({
  selector: 'app-user-money-log-list',
  templateUrl: './user-money-log-list.component.html',
  styleUrls: ['./user-money-log-list.component.css']
})
export class UserMoneyLogListComponent implements OnInit {

  searchForm:FormGroup;
  dataSource = [];
  page = 1;
  per_page = 20;
  total = 1;
  type: any;
  user_id: any;

  constructor(public fb:FormBuilder,public adminUserMoneyLogService:AdminUserMoneyLogService) { 
    this.searchForm = fb.group({
      type:[""],
      user_id:[""]
    })
  }

  ngOnInit(): void {
    this.getDataList();
  }


  //金额变动记录
  getDataList():void{
    this.adminUserMoneyLogService.UserWithdrawList(this.page,this.per_page,this.type,this.user_id).subscribe((res:any) =>{
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
    this.type = this.searchForm.value.type;
    this.getDataList();
  }

}
