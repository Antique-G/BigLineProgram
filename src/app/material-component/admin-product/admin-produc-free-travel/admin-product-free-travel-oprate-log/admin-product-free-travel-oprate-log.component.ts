import { Component, Input, OnInit } from '@angular/core';
import { AdminProductFreeTravelService } from '../../../../../services/admin/admin-product-free-travel.service';


@Component({
  selector: 'app-admin-product-free-travel-oprate-log',
  templateUrl: './admin-product-free-travel-oprate-log.component.html',
  styleUrls: ['./admin-product-free-travel-oprate-log.component.css']
})
export class AdminProductFreeTravelOprateLogComponent implements OnInit {
    @Input() data: any;
    dataSource: any[] = [];

  constructor( public adminProductFreeTravelService: AdminProductFreeTravelService, ) { }

    ngOnInit(): void {
        this.adminProductFreeTravelService.getOperateLog(this.data.id).subscribe(res => {
            console.log("12312", res);
            this.dataSource = res.data;
      })
        
  }

}
