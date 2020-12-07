import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminRegionService } from '../../../services/admin/admin-region.service';
import { AdminSystemAreaCreateComponent } from './admin-system-area-create/admin-system-area-create.component';
import { AdminSystemAreaFirstComponent } from './admin-system-area-first/admin-system-area-first.component';



@Component({
  selector: 'app-admin-system-area',
  templateUrl: './admin-system-area.component.html',
  styleUrls: ['./admin-system-area.component.css']
})
export class AdminSystemAreaComponent implements OnInit {
  nameForm: FormGroup;
  dataSource = [];
  page = 1;
  per_page = 10;
  total = 1;
  loading = true;
  keyword: any;
  parent_code: any;



  // testing
  constructor(public fb: FormBuilder, public dialog: MatDialog, public router: Router,
    public adminRegionService: AdminRegionService) {
    this.nameForm = fb.group({
      storeId: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getData();
  }



  getData(): void {
    this.loading = true;
    this.adminRegionService.regionList(this.page, this.per_page, this.keyword, this.parent_code).subscribe((result: any) => {
      console.log("结果是",result);
      this.loading = false;
      this.total = result.total;   //总页数
      this.dataSource = result.data;
    });
  };

  changePageIndex(page: number) {
    console.log("当前页", page);
    this.page = page;
    this.getData();
  }
  changePageSize(per_page: number) {
    console.log("一页显示多少", per_page);
    this.per_page = per_page;
    this.getData();
  }


  search() {
    this.keyword = this.nameForm.value.storeId;
    this.getData();
    console.log("this.keyword", this.keyword);

  }


  add() {
    const dialogRef = this.dialog.open(AdminSystemAreaCreateComponent, {
      width: '550px',
      data:0
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("result", result)

    });

  }


  edit(index: any): void {

  }


  nextLevel(element: any) {
    console.log("点击获取的是",element);
    this.router.navigate(['/admin/main/settingAreaFirst'], { queryParams: { 'parentCode': element.region_code,"name":element.region_name} });
  }

}




