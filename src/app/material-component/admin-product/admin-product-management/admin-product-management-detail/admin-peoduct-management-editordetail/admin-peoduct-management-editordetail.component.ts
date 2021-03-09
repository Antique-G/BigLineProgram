import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import wangEditor from 'wangeditor';
import { AdminProductManagementService } from '../../../../../../services/admin/admin-product-management.service';



@Component({
  selector: 'app-admin-peoduct-management-editordetail',
  templateUrl: './admin-peoduct-management-editordetail.component.html',
  styleUrls: ['./admin-peoduct-management-editordetail.component.css']
})
export class AdminPeoductManagementEditordetailComponent implements OnInit {
  @Input() adminProductDetailModel: any;
  @ViewChild("detailBox") detailBox: any;     //获取dom
  detailUpdateModel: any;
  detailId: any;


  constructor(public activatedRoute: ActivatedRoute, public adminProductManagementService: AdminProductManagementService,) {
    this.detailUpdateModel = {
      step: 2,
      details: ''
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
    // 详情
    const editorDetail = new wangEditor("#editorDetail", "#editorContent");
    console.log("拿到的details", this.adminProductDetailModel?.details)
    this.detailBox.nativeElement.innerHTML = this.adminProductDetailModel.details;    //赋值
    this.detailUpdateModel.details = this.adminProductDetailModel.details;
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
    editorDetail.config.pasteFilterStyle = false;
    editorDetail.config.pasteTextHandle = function (pasteStr: any) {
      //  去除wps文档复制过来的style样式
      let str = pasteStr
      str = str.replace(/[\s\S.@]*{[\s\S]*?}/ig, '');
      return str
    }
    editorDetail.create();

  
  }


  nextTab() {
    this.detailUpdateModel.id = this.detailId;
    this.adminProductManagementService.updateProduct(this.detailUpdateModel).subscribe(res => {
    })
  }

}
