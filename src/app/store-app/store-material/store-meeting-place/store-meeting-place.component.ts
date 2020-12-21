import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StoreMeetingPlaceService } from '../../../../services/store/store-meeting-place/store-meeting-place.service';
import { DeleteComfirmComponent } from '../common/delete-comfirm/delete-comfirm.component';
import { StoreMeetingPlaceCreateComponent } from './store-meeting-place-create/store-meeting-place-create.component';
import { StoreMeetingPlaceDetailComponent } from './store-meeting-place-detail/store-meeting-place-detail.component';


@Component({
  selector: 'app-store-meeting-place',
  templateUrl: './store-meeting-place.component.html',
  styleUrls: ['./store-meeting-place.component.css']
})
export class StoreMeetingPlaceComponent implements OnInit {
  searchForm: FormGroup;
  dataSource = [];
  page = 1;
  per_page = 20;
  total = 1;
  loading = true;
  name: any;
  status: any;

  constructor(public fb: FormBuilder, public storeMeetingPlaceService: StoreMeetingPlaceService, public dialog: MatDialog) {
    this.searchForm = fb.group({
      status: ['' ],
      name: ['' ],
    })
  }


  ngOnInit(): void {
    this.storeMeetingPlaceList();
  }



  storeMeetingPlaceList(): void {
    this.loading = true;
    this.storeMeetingPlaceService.storeMeetingPlaceList(this.page, this.per_page, this.name, this.status).subscribe((result: any) => {
      console.log("jieguyo", result)
      this.loading = false;
      this.total = result.meta.pagination.total;   //总页数
      this.dataSource = result.data;
    });
  };

  changePageIndex(page: number) {
    console.log("当前页", page);
    this.page = page;
    this.storeMeetingPlaceList();
  }
  changePageSize(per_page: number) {
    console.log("一页显示多少", per_page);
    this.per_page = per_page;
    this.storeMeetingPlaceList();
  }

  search() {
    console.log("获取输入框内容", this.searchForm.value)
    this.name = this.searchForm.value.name;
    this.status = this.searchForm.value.status;
    this.storeMeetingPlaceList();

  }

  edit(element: any): void {
    console.log("拿到的值", element);
    const dialogRef = this.dialog.open(StoreMeetingPlaceDetailComponent, {
      width: '550px',
      data: element
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log("result", result);
      if (result !== undefined) {
        this.storeMeetingPlaceList();
      }

    });
  }

  add() {
    const dialogRef = this.dialog.open(StoreMeetingPlaceCreateComponent, {
      width: '550px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("result", result);
      if (result !== undefined) {
        this.storeMeetingPlaceList();
      }

    });
  }



  delete(data: any) {
    console.log("nadao", data);
    const dialogRef = this.dialog.open(DeleteComfirmComponent, {
      width: '550px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("result", result);
      if (result !== undefined) {
        this.storeMeetingPlaceService.deleteStoreMeetingPlace(data.id).subscribe(res => {
          console.log("res", res);
          if (res === null) {
            // alert("删除成功");
            this.storeMeetingPlaceList();
          }
          else {
            // alert("删除失败");
          }
        })
        this.storeMeetingPlaceList();
      }
      else {
        this.storeMeetingPlaceList();
      }

    });


  }
}




