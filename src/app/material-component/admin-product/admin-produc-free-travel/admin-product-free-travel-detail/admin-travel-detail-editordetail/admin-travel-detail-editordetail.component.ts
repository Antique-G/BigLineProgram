import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AdminProductFreeTravelService } from '../../../../../../services/admin/admin-product-free-travel.service';
import wangEditor from 'wangeditor';



@Component({
  selector: 'app-admin-travel-detail-editordetail',
  templateUrl: './admin-travel-detail-editordetail.component.html',
  styleUrls: ['./admin-travel-detail-editordetail.component.css']
})
export class AdminTravelDetailEditordetailComponent implements OnInit {
  @Input() dataFreeDetailModel: any;
  @ViewChild("detailBox") detailBox: any;     //获取dom
  detailUpdateModel: any;
  detailId: any;

  constructor(public dialog: MatDialog, public activatedRoute: ActivatedRoute, public adminProductFreeTravelService: AdminProductFreeTravelService,) {
    this.detailUpdateModel = {
      step: 1,
      details: ''
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


  // 富文本
  textChange() {
    // 详情
    const editorDetail = new wangEditor("#editorDetail", "#editorContent");
    console.log("拿到的details", this.dataFreeDetailModel?.details)
    this.detailBox.nativeElement.innerHTML = this.dataFreeDetailModel.details;    //赋值
    this.detailUpdateModel.details = this.dataFreeDetailModel.details;
    editorDetail.config.onchange = (newHtml: any) => {
      this.detailUpdateModel.details = newHtml;
    }
    // 配置菜单栏
    editorDetail.config.menus = [
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
      'link',
      'list',
      'todo',
      'justify',
      'quote',
      'emoticon',
      'table',
      'code',
      'splitLine',
      'undo',
      'redo',
    ]
    editorDetail.create();
  }


  nextTab() {
    this.detailUpdateModel.id = this.detailId;
    this.adminProductFreeTravelService.freeTravelUpdate(this.detailUpdateModel).subscribe(res => {

    })
  }
}
