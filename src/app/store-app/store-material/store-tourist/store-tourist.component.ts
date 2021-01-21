import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SetStatusModel } from '../../../../interfaces/store/storeTourist/store-tourist-model';
import { StoreTouristService } from '../../../../services/store/store-tourist/store-tourist.service';
import { StoreTouristCreateComponent } from './store-tourist-create/store-tourist-create.component';

@Component({
  selector: 'app-store-tourist',
  templateUrl: './store-tourist.component.html',
  styleUrls: ['./store-tourist.component.css']
})
export class StoreTouristComponent implements OnInit {
  searchForm: FormGroup;
  status: any;
  name: any;
  mobile: any;
  dataSource: any[] = [];
  loading = true;
  page = 1;
  per_page = 20;
  total: any;
  setStatusModel: SetStatusModel;

  constructor(public fb: FormBuilder, public storeTouristService: StoreTouristService, public router: Router,
    public dialog: MatDialog,public modal: NzModalService) {
    this.searchForm = this.fb.group({
      status: [''],
      name: [''],
      mobile: ['']
    });
    this.setStatusModel = {
      id: 0,
      status: 1
    }
  }


  ngOnInit(): void {
    this.getTouristList();
  }

  getTouristList() {
    this.storeTouristService.getTouristList(this.page, this.per_page, this.status, this.name, this.mobile).subscribe(res => {
      this.loading = false;
      this.dataSource = res.data;
      this.total = res.total;
    })
  }

  changePageSize(per_page: number) {
    this.per_page = per_page;
    this.getTouristList();
  }

  changePageIndex(page: number) {
    console.log("当前页", page);
    this.page = page;
    this.getTouristList();
  }

  search() {
    this.status = this.searchForm.value.status;
    this.name = this.searchForm.value.name;
    this.mobile = this.searchForm.value.mobile;
    this.getTouristList();

  }

  // 查看详情
  edit(data: any) {
    this.router.navigate(['/store/main/storeProduct/detail'], { queryParams: { detailDataId: data.id } });
  }

  deleteData(data: any) {

  }


  add() {
    const dialogRef = this.dialog.open(StoreTouristCreateComponent, {
      width: '550px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("result", result);
      this.getTouristList();
    });
  }






  // 上下架操作
  up(data: any) {
    console.log("nadao", data);
    this.setStatusModel.id = data.id;
    if (data.status === 1) {
      this.setStatusModel.status = 0;
    }
    else if (data.status === 0) {
      this.setStatusModel.status = 1;
    }
    this.modal.confirm({
      nzTitle: '<h4>提示</h4>',
      nzContent: '<h6>请确认操作</h6>',
      nzOnOk: () =>
        this.storeTouristService.setStatus(this.setStatusModel).subscribe(res => {
          this.getTouristList();
        })
    });
  }

}
