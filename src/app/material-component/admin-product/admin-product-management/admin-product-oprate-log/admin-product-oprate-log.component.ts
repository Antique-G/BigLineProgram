import { Component, Input, OnInit } from '@angular/core';
import { AdminProductManagementService } from '../../../../../services/admin/admin-product-management.service';



@Component({
  selector: 'app-admin-product-oprate-log',
  templateUrl: './admin-product-oprate-log.component.html',
  styleUrls: ['./admin-product-oprate-log.component.css']
})
export class AdminProductOprateLogComponent implements OnInit {
    @Input() data: any;
    dataSource: any[] = [];

  constructor(public adminProductManagementService: AdminProductManagementService,) { }

    ngOnInit(): void {
        this.adminProductManagementService.getOperateLog(this.data.id).subscribe(res => {
            console.log("12312", res);
            this.dataSource = res.data;
      })
        
  }

}
