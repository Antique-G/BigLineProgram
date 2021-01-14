import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminInsuranceService } from '../../../services/admin/admin-insurance.service';

@Component({
  selector: 'app-admin-insurance',
  templateUrl: './admin-insurance.component.html',
  styleUrls: ['./admin-insurance.component.css']
})
export class AdminInsuranceComponent implements OnInit {
  searchForm:FormGroup;
  dataSource = [];
  page = 1;
  per_page = 10;
  total = 1;
  loading = true;
  keyword: any;
  status: any;

  constructor(public fb: FormBuilder, public adminInsuranceService:AdminInsuranceService,) { 
    this.searchForm = fb.group({
      status: [''],
      name:['']
    })
  }

  ngOnInit(): void {
    this.getDataList()
  }
  //保险列表
  getDataList(): void {
    this.loading = true;
    this.adminInsuranceService.insuranceList(this.page, this.per_page, this.keyword, this.status).subscribe((result:any) =>{
      console.log('保险列表接口返回数据', result);
      this.loading = false;
      this.total = result.total;
      this.dataSource =  result.data;
    })
  };
  changePageIndex(page: number){
    console.log('aaa',page)
  }
  changePageSize(per_page: number){
    console.log('bbb',per_page)
  }
  search(){
    
  }
  edit(){
    
  }
}
