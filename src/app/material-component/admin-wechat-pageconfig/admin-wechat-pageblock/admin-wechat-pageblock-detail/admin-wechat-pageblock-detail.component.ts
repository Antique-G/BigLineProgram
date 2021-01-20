import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-wechat-pageblock-detail',
  templateUrl: './admin-wechat-pageblock-detail.component.html',
  styleUrls: ['./admin-wechat-pageblock-detail.component.css']
})
export class AdminWechatPageblockDetailComponent implements OnInit {
  @Input() data: any;


  constructor() { }

  ngOnInit(): void {
  }

  update(){}
}
