import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-goods-pro-detail-post',
  templateUrl: './admin-goods-pro-detail-post.component.html',
  styleUrls: ['./admin-goods-pro-detail-post.component.css']
})
export class AdminGoodsProDetailPostComponent implements OnInit {
    @Input() addDataDetailModel: any;
    imgSrc: any;
    isShow = false;
  
  
    constructor() { }
  
    ngOnInit(): void {
      console.log("更新", this.addDataDetailModel.poster_url);
      if(this.addDataDetailModel.poster_url!=""){
        this.imgSrc=this.addDataDetailModel.poster_url;
        this.isShow = true;
      }
      else{
        this.isShow = false;
      }
    }
  
  }
  