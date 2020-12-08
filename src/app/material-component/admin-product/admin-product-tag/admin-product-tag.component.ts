import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminProductTagService } from '../../../../services/admin/admin-product-tag.service';
import { AdminProductTagCreateComponent } from './admin-product-tag-create/admin-product-tag-create.component';
import { AdminProductTagDetailComponent } from './admin-product-tag-detail/admin-product-tag-detail.component';



@Component({
  selector: 'app-admin-product-tag',
  templateUrl: './admin-product-tag.component.html',
  styleUrls: ['./admin-product-tag.component.css']
})
export class AdminProductTagComponent implements OnInit {
  dataSource = [];
  loading = true;

  constructor(public dialog: MatDialog, public adminProductTagService: AdminProductTagService,) { }


  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.loading = true;
    this.adminProductTagService.getProductTagList().subscribe((result: any) => {
      console.log("jieguo", result);
      this.loading = false;  //总页数
      this.dataSource = result.data;
    });
  };


  edit(data: any) {
    console.log("传的值", data);
    const dialogRef = this.dialog.open(AdminProductTagDetailComponent, {
      width: '500px',
      data: data
    })
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result !== undefined) {
        this.getData();
      }
    })

  }

  addTap() {
    const dialogRef = this.dialog.open(AdminProductTagCreateComponent, {
      width: '500px'
    })
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result !== undefined) {
        this.getData();
      }
    })
  }


  delete(data: any) {
    console.log("传的值", data);
    this.adminProductTagService.deleteProductTag(data.id).subscribe(res => {
      if (res.status_code) {
        alert("删除失败");
      }
      else {
        alert("删除成功");
        this.getData();
      }
    })
  }
}


