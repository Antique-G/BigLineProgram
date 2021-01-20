import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-wechat-pageblock',
  templateUrl: './admin-wechat-pageblock.component.html',
  styleUrls: ['./admin-wechat-pageblock.component.css']
})
export class AdminWechatPageblockComponent implements OnInit {
  pageId: any;

  constructor(public activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.pageId = JSON.parse(params["pageId"]);
    });
  }

}
