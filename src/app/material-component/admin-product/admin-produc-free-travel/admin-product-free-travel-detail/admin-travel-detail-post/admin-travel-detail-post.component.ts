import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-travel-detail-post',
  templateUrl: './admin-travel-detail-post.component.html',
  styleUrls: ['./admin-travel-detail-post.component.css']
})
export class AdminTravelDetailPostComponent implements OnInit {
  @Input() dataFreeDetailModel: any;
  imgSrc: any;
  isShow = false;


  constructor() { }

  ngOnInit(): void {
    console.log("更新", this.dataFreeDetailModel.poster_url);
    if(this.dataFreeDetailModel.poster_url!=""){
      this.imgSrc=this.dataFreeDetailModel.poster_url;
      this.isShow = true;
    }
    else{
      this.isShow = false;
    }
  }

}
