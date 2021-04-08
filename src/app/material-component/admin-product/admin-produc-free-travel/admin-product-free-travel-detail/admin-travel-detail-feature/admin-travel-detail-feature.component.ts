import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import wangEditor from 'wangeditor';
import { AdminProductFreeTravelService } from '../../../../../../services/admin/admin-product-free-travel.service';



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
  isLoadingBtn = false;



  constructor(public dialog: MatDialog, public activatedRoute: ActivatedRoute, public adminProductFreeTravelService: AdminProductFreeTravelService,) {
    this.detailUpdateModel = {
      step: 2,
      feature: ''
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.detailId = params?.detailId;
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
      'list',
      'todo',
      'justify',
      'quote',
      'emoticon',
      'table',
      'splitLine',
      'undo',
      'redo',
      'image'
    ];
    // 对粘贴的文本进行处理
    editorFeature.config.pasteFilterStyle = false;
    editorFeature.config.pasteTextHandle = function (pasteStr: any) {
      //  去除wps文档复制过来的style样式
      let str = pasteStr
      str = str.replace(/[\s\S.@]*{[\s\S]*?}/ig, '');
      return str
    }
    editorFeature.create();
  }



  nextTab() {
    this.isLoadingBtn = true;
    this.detailUpdateModel.id = this.detailId;
    this.adminProductFreeTravelService.freeTravelUpdate(this.detailUpdateModel).subscribe(res => {
      this.isLoadingBtn = false;
    },
      error => {
        this.isLoadingBtn = false;
      })
  }

}
