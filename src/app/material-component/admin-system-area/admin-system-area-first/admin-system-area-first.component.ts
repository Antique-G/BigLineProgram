import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminRegionService } from '../../../../services/admin/admin-region.service';
import { AdminSystemAreaCreateComponent } from '../admin-system-area-create/admin-system-area-create.component';




@Component({
  selector: 'app-admin-system-area-first',
  templateUrl: './admin-system-area-first.component.html',
  styleUrls: ['./admin-system-area-first.component.css']
})
export class AdminSystemAreaFirstComponent implements OnInit {
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
  constructor(public fb: FormBuilder, public dialog: MatDialog, public router: Router,
    public adminRegionService: AdminRegionService, public activatedRoute: ActivatedRoute) {
    this.nameForm = fb.group({
      storeId: new FormControl(' ')
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const parentCode = params['parentCode'];
      console.log('=== id ===>', parentCode);
      this.parent_code = parentCode;
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
    console.log("点击获取的是", element);
    this.router.navigate(['/admin/main/settingAreaSecond'], { queryParams: { 'firstParentCode': element.region_code, "name": element.region_name } });
  }

}





