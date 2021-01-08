import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AdminProductFreeTravelService } from '../../../../../../services/admin/admin-product-free-travel.service';
import wangEditor from 'wangeditor';



@Component({
  selector: 'app-admin-travel-detail-feature',
  templateUrl: './admin-travel-detail-feature.component.html',
  styleUrls: ['./admin-travel-detail-feature.component.css']
})
export class AdminTravelDetailFeatureComponent implements OnInit {
  @Input() dataFreeDetailModel: any;
  @ViewChild("featureBox") featureBox: any;       //获取dom
  detailUpdateModel: any;
  detailId: any;


  constructor(public dialog: MatDialog, public activatedRoute: ActivatedRoute, public adminProductFreeTravelService: AdminProductFreeTravelService,) {
    this.detailUpdateModel = {
      step: 2,
      feature: ''
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
    // 产品特色
    const editorFeature = new wangEditor("#editorFeature", "#editor");
    console.log("拿到的feature", this.dataFreeDetailModel?.feature);
    this.featureBox.nativeElement.innerHTML = this.dataFreeDetailModel?.feature;    //赋值
    this.detailUpdateModel.feature = this.dataFreeDetailModel.feature;
    editorFeature.config.onchange = (newHtml: any) => {
      this.detailUpdateModel.feature = newHtml;
    }
    editorFeature.create();
    // 配置菜单栏
    editorFeature.config.menus = [
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
  }



  nextTab() {
    this.detailUpdateModel.id = this.detailId;
    this.adminProductFreeTravelService.freeTravelUpdate(this.detailUpdateModel).subscribe(res => {

    })
  }

}
