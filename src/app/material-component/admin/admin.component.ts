import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminAdminService } from '../../../services/admin/admin-admin.service';
import { AdminCreateComponent } from './admin-create/admin-create.component';
import { AdminDetailComponent } from './admin-detail/admin-detail.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
  searchForm: FormGroup;
  dataSource = [];
  page = 1;
  per_page = 10;
  total = 1;
  loading = true;
  keyword:any;

  constructor(public fb: FormBuilder,public adminAdminService: AdminAdminService, public dialog: MatDialog) {
    this.searchForm = fb.group({
      name: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.loading = true;
    this.adminAdminService.adminList(this.page, this.per_page,this.keyword).subscribe((result: any) => {
      this.loading = false;
      this.total = result.total;   //总页数
      this.dataSource = result.data;
      });
    };
  
  changePageIndex(page:number ) {
    console.log("当前页",page);
    this.page = page;
    this.getData();
  }
   changePageSize(per_page:number) {
    console.log("一页显示多少",per_page);
    this.per_page = per_page;
     this.getData();
  }


  search(){
    this.keyword = this.searchForm.value.name;
    this.getData();
    console.log("this.keyword",this.keyword);

  }



  edit(element: any): void {
    console.log("拿到的值", element);
    const dialogRef = this.dialog.open(AdminDetailComponent, {
      width: '550px',
      data: element
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log("result", result);
      if (result !== undefined) {
        this.getData();
      }

    });
  }

  add() {
    const dialogRef = this.dialog.open(AdminCreateComponent, {
      width: '550px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("result", result);
      if (result !== undefined) {
        this.getData();
      }

    });
  }
}




