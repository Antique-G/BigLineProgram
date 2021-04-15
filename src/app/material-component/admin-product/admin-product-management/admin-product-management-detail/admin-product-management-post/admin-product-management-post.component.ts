import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-product-management-post',
  templateUrl: './admin-product-management-post.component.html',
  styleUrls: ['./admin-product-management-post.component.css']
})
export class AdminProductManagementPostComponent implements OnInit {
  @Input() adminProductDetailModel: any;
  imgSrc: any;
  isShow = false;


  constructor() { }

  ngOnInit(): void {
    console.log("更新", this.adminProductDetailModel.poster_url);
    if(this.adminProductDetailModel.poster_url!=""){
      this.imgSrc=this.adminProductDetailModel.poster_url;
      this.isShow = true;
    }
    else{
      this.isShow = false;
    }
  }

}
