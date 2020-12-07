import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AdminRegionService } from '../../../../services/admin/admin-region.service';
import { AdminSystemAreaCreateComponent } from '../admin-system-area-create/admin-system-area-create.component';





@Component({
  selector: 'app-admin-system-area-second',
  templateUrl: './admin-system-area-second.component.html',
  styleUrls: ['./admin-system-area-second.component.css']
})
export class AdminSystemAreaSecondComponent implements OnInit {
  nameForm: FormGroup;
  dataSource = [];
  page = 1;
  per_page = 10;
  total = 1;
  loading = true;
  keyword: any;
  parent_code: any;
  isName: any;



  // testing
  constructor(public fb: FormBuilder, public dialog: MatDialog, public activatedRoute: ActivatedRoute,
    public adminRegionService: AdminRegionService) {
    this.nameForm = fb.group({
      storeId: new FormControl(' ')
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let firstParentCode = params['firstParentCode'];
      console.log('二级>', firstParentCode);
      this.parent_code = firstParentCode;
      this.isName = params['name'];
    });
    this.getData();
  }



  getData(): void {
    this.loading = true;
    this.adminRegionService.regionList(this.page, this.per_page, this.keyword, this.parent_code).subscribe((result: any) => {
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
      data: this.isName
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("result", result)

    });
  }


  edit(index: any): void {

  }


  nextLevel(element: any) {

  }

}




