import { FormGroup } from '@angular/forms';
import { Component, OnInit, Inject, ViewChild, Input } from '@angular/core';
import wangEditor from 'wangeditor';
import { ActivatedRoute } from '@angular/router';
import { AdminProductManagementService } from '../../../../../../services/admin/admin-product-management.service';


@Component({
  selector: 'app-admin-peoduct-management-feature',
  templateUrl: './admin-peoduct-management-feature.component.html',
  styleUrls: ['./admin-peoduct-management-feature.component.css']
})
export class AdminPeoductManagementFeatureComponent implements OnInit {
  @Input() adminProductDetailModel: any;
  @ViewChild("featureBox") featureBox: any;       //获取dom
  detailUpdateModel: any;
  detailId: any;




  constructor(public activatedRoute: ActivatedRoute, public adminProductManagementService: AdminProductManagementService,) {
    this.detailUpdateModel = {
      step: 1,
      feature: ''
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.detailId = JSON.parse(params["detailDataId"]);
    });
  }

  ngAfterViewInit(): void {
    this.textChange();
  }


  // 富文本
  textChange() {
    // 产品特色
    const editorFeature = new wangEditor("#editorFeature", "#editor");
    console.log("拿到的feature", this.adminProductDetailModel?.feature);
    this.featureBox.nativeElement.innerHTML = this.adminProductDetailModel?.feature;    //赋值
    this.detailUpdateModel.feature = this.adminProductDetailModel.feature;
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
    this.detailUpdateModel.id = this.detailId;
    this.adminProductManagementService.updateProduct(this.detailUpdateModel).subscribe(res => {

    })
  }
}
