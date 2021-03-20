import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminUserCommissionListService } from '../../../../services/admin/admin-user-commission-list.service';
import { UserCommissionAuditComponent } from './user-commission-audit/user-commission-audit.component';

@Component({
  selector: 'app-user-commission-list',
  templateUrl: './user-commission-list.component.html',
  styleUrls: ['./user-commission-list.component.css']
})
export class UserCommissionListComponent implements OnInit {

  searchForm:FormGroup;
  dataSource = [];
  page = 1;
  per_page = 20;
  total = 1;
  loading = true;
  order_id: any;
  user_id: any;

  checked = false;
  setOfCheckedId = new Set<number>();
  setArr = new Set<any>();
  ids:any = [];
  allChecked:any;
  dialogRef: any;

  constructor(public fb:FormBuilder,public adminUserCommissionListService:AdminUserCommissionListService,public dialog: MatDialog,) { 
    this.searchForm = fb.group({
      order_id:[""],
      user_id:[""]
    })
  }

  ngOnInit(): void {
    this.getDataList();
  }

  getDataList():void {
    this.loading = true
    this.adminUserCommissionListService.UserCommissionList(this.page, this.per_page, this.user_id, this.order_id).subscribe((result: any) => {
      console.log("result", result)
      this.loading = false;
      this.total = result.total;
      this.dataSource = result.data;
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
    this.order_id = this.searchForm.value.order_id;
    this.getDataList();
  }

  onAllChecked(checked: boolean): void {
    this.dataSource.filter(({ disabled }) => !disabled).forEach((data) => this.updateCheckedSet(data, checked));
    
  
  }
  updateCheckedSet(data: any, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(data.id);
      this.setArr.add(data);
      console.log('checked',checked,data)

    } else {
      this.setOfCheckedId.delete(data.id);
      this.setArr.delete(data);
    }
  }

  onItemChecked(data: any, checked: boolean):void {
    this.updateCheckedSet(data, checked);
  }

   // 审核
   checkClick() {
     const dialogRef = this.dialog.open(UserCommissionAuditComponent, {
      width: '800px',
      data: [...this.setArr]
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.getDataList();
      }
    })

  }

  //批量审核
  checkAllClick(){
    this.ids = [...this.setOfCheckedId]
    this.loading = true;
    console.log(this.ids)
    this.adminUserCommissionListService.AllUserCommissionAudit(this.ids).subscribe((res:any) =>{
      console.log('res',res)
      this.loading = false;
      if (res?.status_code) {

      }else {
        this.dialogRef.close(1)
      }
    })
  
  }

  
}



