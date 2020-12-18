import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminRegionService } from '../../../services/admin/admin-region.service';
import { AdminSystemAreaCreateComponent } from './admin-system-area-create/admin-system-area-create.component';
import { AdminSystemAreaEditComponent } from './admin-system-area-edit/admin-system-area-edit.component';


@Component({
  selector: 'app-admin-system-area',
  templateUrl: './admin-system-area.component.html',
  styleUrls: ['./admin-system-area.component.css']
})

export class AdminSystemAreaComponent implements OnInit {
  nameForm: FormGroup;
  dataSource = [];
  parent: any;
  page = 1;
  per_page = 10;
  total = 1;
  loading = true;
  keyword: any;
  parent_code: any;
  upFlag: boolean = false;


  constructor(public fb: FormBuilder, public dialog: MatDialog, public router: Router,
    public adminRegionService: AdminRegionService) {
    this.nameForm = fb.group({
      keyword: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.loading = true;
    this.adminRegionService.regionList(this.page, this.per_page, this.keyword, this.parent_code).subscribe((result: any) => {
      console.log("result的结果是", result);
      this.parent = result.parent;
      let temp = result.list;
      this.loading = false;
      this.total = temp.total;   //总页数
      this.dataSource = temp.data;
      this.upFlag = this.parent?.region_id ? true : false;
    });
  };

  changePageIndex(page: number) {
    this.page = page;
    this.getData();
  }

  changePageSize(per_page: number) {
    this.per_page = per_page;
    this.getData();
  }

  search() {
    this.keyword = this.nameForm.value.keyword;
    this.page = 1;
    this.parent = [];
    this.parent_code = '';
    this.getData();
  }


  add() {
    const dialogRef = this.dialog.open(AdminSystemAreaCreateComponent, {
      width: '550px',
      data: this.parent
    });
    dialogRef.afterClosed().subscribe(result => {
      this.search();

    });

  }


  edit(data: any): void {
    console.log("data", data)
    this.adminRegionService.regionDetail(data.region_id).subscribe(res => {
      const dialogRef = this.dialog.open(AdminSystemAreaEditComponent, {
        width: '550px',
        data: res
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log("等级", data.region_level);
        if (data.region_level === 1) {
          this.parent_code = '';
          this.getData();
        }
        else if (data.region_level === 2) {
          console.log("zhuagyai ", data.region_code);
          this.parent_code = data.region_code.substr(0, 4);
          console.log("this.parent_code", this.parent_code)
          this.getData();
        }
        else if(data.region_level === 3){
          this.parent_code = data.region_code.substr(0, 8);
          console.log("this.parent_code", this.parent_code)
          this.getData();
        }


      });
    })

  }

  nextLevel(element: any) {
    let p = element.region_code;
    if (p.length >= 12) {
      return;
    }
    this.parent_code = p;
    this.page = 1;
    this.keyword = '';
    this.getData();
  }

  resetPage(): void {
    this.page = 1;
    this.parent_code = '';
    this.keyword = '';
    this.getData();
  }

  backToUp(): void {
    if (this.parent_code.length === 4) {
      this.parent_code = '';
      this.keyword = '';
      this.getData();
    } else {
      this.parent_code = this.parent_code.substr(0, 4);
      this.keyword = '';
      console.log("this.parent_code", this.parent_code)
      this.getData();
    }

  }
}




