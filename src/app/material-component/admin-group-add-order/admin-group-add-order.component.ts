import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminRegionService } from '../../../services/admin/admin-region.service';

@Component({
  selector: 'app-admin-group-add-order',
  templateUrl: './admin-group-add-order.component.html',
  styleUrls: ['./admin-group-add-order.component.css']
})
export class AdminGroupAddOrderComponent implements OnInit {
  searchForm: FormGroup;

  // 目的城市
  nzOptions: any[] | null = null;
  idRegion: any;

  constructor(public fb: FormBuilder, public router: Router, public adminRegionService: AdminRegionService,) {
    this.searchForm = fb.group({
      product_code: [''],
      date_start: [''],
      destination_city: [''],
      day: [''],
    });
  }

  ngOnInit(): void {
    this.adminRegionService.getAllRegionList().subscribe(res => {
      this.nzOptions = res;
    })
  }



  search() {

  }





  // 目的城市
  onChanges(data: any): void {
    console.log("点击的结果是", data);
    if (data !== null) {
      this.idRegion = data[data.length - 1];
    }
  }
}
