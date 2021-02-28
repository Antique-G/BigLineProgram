import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AdminProductFreeTravelService } from '../../../../../../services/admin/admin-product-free-travel.service';
import wangEditor from 'wangeditor';



@Component({
  selector: 'app-admin-travel-detail-editornotice',
  templateUrl: './admin-travel-detail-editornotice.component.html',
  styleUrls: ['./admin-travel-detail-editornotice.component.css']
})
export class AdminTravelDetailEditornoticeComponent implements OnInit {
  @Input() dataFreeDetailModel: any;
  @ViewChild("noticeBox") noticeBox: any;     //获取dom
  detailUpdateModel: any;
  detailId: any;


  constructor(public dialog: MatDialog, public activatedRoute: ActivatedRoute, public adminProductFreeTravelService: AdminProductFreeTravelService,) {
    this.detailUpdateModel = {
      step: 3,
      notice: ''
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.detailId = JSON.parse(params["detailId"]);
    });
  }

  ngAfterViewInit(): void {
    this.textChange();
  }

  textChange() {
    // 预约须知
    const editorNotice = new wangEditor("#editorNotice", "#noticeContent");
    console.log("拿到的notice", this.dataFreeDetailModel?.notice);
    this.noticeBox.nativeElement.innerHTML = this.dataFreeDetailModel.notice;    //赋值
    this.detailUpdateModel.notice = this.dataFreeDetailModel.notice;
    editorNotice.config.onchange = (newHtml: any) => {
      this.detailUpdateModel.notice = newHtml
    }
    // 配置菜单栏
    editorNotice.config.menus = [
      'head',
      'bold',
      'fontSize',
      'fontName',
      'italic',
      'underline',
      'strikeThrough',
      'indent',
      'lineHeight',
      'foreColor',
      'backColor',
      'list',
      'todo',
      'justify',
      'quote',
      'emoticon',
      'table',
      'splitLine',
      'undo',
      'redo',
    ]
    editorNotice.create();
  }

  nextTab() {
    this.detailUpdateModel.id = this.detailId;
    this.adminProductFreeTravelService.freeTravelUpdate(this.detailUpdateModel).subscribe(res => {

    })
  }

}
