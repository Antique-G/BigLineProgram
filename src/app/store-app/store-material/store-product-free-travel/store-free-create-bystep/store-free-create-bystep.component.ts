import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreProductTreeTravelService } from '../../../../../services/store/store-product-free-travel/store-product-tree-travel.service';

@Component({
  selector: 'app-store-free-create-bystep',
  templateUrl: './store-free-create-bystep.component.html',
  styleUrls: ['./store-free-create-bystep.component.css']
})
export class StoreFreeCreateBystepComponent implements OnInit {
  isIndex = 0;     //tab的index
  selectedTabIndex = 0;    //选中的tab 默认第一个
  detailId: any;
  
  dataDetailModel:any
  isSpinning:boolean = true
  constructor(public activatedRoute: ActivatedRoute,private freeTravelService:StoreProductTreeTravelService) { }
  
  ngOnInit(): void {
   
  }

  getTabIndex(event: any) {
    // 获取子组件传回来的index
    console.log("子组件传过来的值", event)
    this.selectedTabIndex = event.tabIndex;
    this.isIndex = event.tabIndex;
    this.detailId = event.id;
    this.getDetail();
  }


  getDetail(){
    this.freeTravelService.GetFreeTravelDetail(this.detailId).subscribe((res:any)=>{
      this.dataDetailModel = res.data;
      this.isSpinning = false
    })
  }
  
  onTabChange(event: any) {
    this.selectedTabIndex = event;
  }
}