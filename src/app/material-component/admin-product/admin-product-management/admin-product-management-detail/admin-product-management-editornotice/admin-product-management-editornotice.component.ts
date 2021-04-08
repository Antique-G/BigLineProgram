import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import wangEditor from 'wangeditor';
import { AdminProductManagementService } from '../../../../../../services/admin/admin-product-management.service';



@Component({
  selector: 'app-admin-product-management-editornotice',
  templateUrl: './admin-product-management-editornotice.component.html',
  styleUrls: ['./admin-product-management-editornotice.component.css']
})
export class AdminProductManagementEditornoticeComponent implements OnInit {
  @Input() adminProductDetailModel: any;
  @ViewChild("noticeBox") noticeBox: any;     //获取dom
  detailUpdateModel: any;
  detailId: any;
  isLoadingBtn = false;




  constructor(public activatedRoute: ActivatedRoute, public adminProductManagementService: AdminProductManagementService,) {
    this.detailUpdateModel = {
      step: 3,
      notice: ''
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.detailId = params?.detailDataId;
    });
  }

  ngAfterViewInit(): void {
    this.textChange();
  }

  textChange() {
    // 预约须知
    const editorNotice = new wangEditor("#editorNotice", "#noticeContent");
    console.log("拿到的notice", this.adminProductDetailModel?.notice);
    this.noticeBox.nativeElement.innerHTML = this.adminProductDetailModel.notice;    //赋值
    this.detailUpdateModel.notice = this.adminProductDetailModel.notice;

    editorNotice.config.onchange = (newHtml: any) => {
      this.detailUpdateModel.notice = newHtml;
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
      'image'
    ];
    // 对粘贴的文本进行处理
    editorNotice.config.pasteFilterStyle = false;
    editorNotice.config.pasteTextHandle = function (pasteStr: any) {
      //  去除wps文档复制过来的style样式
      let str = pasteStr
      str = str.replace(/[\s\S.@]*{[\s\S]*?}/ig, '');
      return str
    }
    editorNotice.create();


  }


  nextTab() {
    this.isLoadingBtn = true;
    this.detailUpdateModel.id = this.detailId;
    this.adminProductManagementService.updateProduct(this.detailUpdateModel).subscribe(res => {
      this.isLoadingBtn = false;
    },
      error => {
        this.isLoadingBtn = false;
      })
  }
}

