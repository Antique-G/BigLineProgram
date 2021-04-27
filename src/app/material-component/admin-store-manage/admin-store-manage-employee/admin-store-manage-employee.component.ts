import { Component, Input, OnInit } from '@angular/core';
import { AdminStoreManageService } from '../../../../services/admin/admin-store-manage.service';

@Component({
  selector: 'app-admin-store-manage-employee',
  templateUrl: './admin-store-manage-employee.component.html',
  styleUrls: ['./admin-store-manage-employee.component.css']
})

export class AdminStoreManageEmployeeComponent implements OnInit {
  @Input() data: any[] = [];
  dataSource:any[]=[]

  page = 1;
  per_page = 20;
  total = 1;
  loading = true;

  constructor(private adminStoreManageService: AdminStoreManageService) { }

  ngOnInit(): void {
    this.adminStoreManageService.shopAccountList().subscribe(res => {
      console.log('res :>> ', res);
      this.dataSource = res.data;
      this.total = res?.data.length;
      this.loading = false
    })
  }

}
