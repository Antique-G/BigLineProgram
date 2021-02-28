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

  constructor(public activatedRoute: ActivatedRoute, public adminProductManagementService: AdminProductManagementService,) {
    this.detailUpdateModel = {
      step: 3,
      notice: ''
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
    ]
    editorNotice.create();
    // 上传图片
    // editorNotice.config.uploadImgParams = {
    //   token: (localStorage.getItem('userToken')!),
    // }
    // editorNotice.config.customUploadImg = (files: any, insert: any) => {
    //   // 限制一次最多上传 1 张图片
    //   if (files.length !== 1) {
    //     alert('单次只能上传一个图片')
    //     return
    //   }
    //   console.log("files是什么", files);
    //   console.log(files[0]);
    //   let formData = new FormData();
    //   formData.append('image', files[0] as any);
    //   console.log("formData是什么", formData.get('file'));
    //   this.adminProductManagementService.uploadImg(formData).subscribe(res => {
    //     console.log(res, 'res');
    //     insert(res.data);
    //   })
    // }

  }


  nextTab() {
    this.detailUpdateModel.id = this.detailId;
    this.adminProductManagementService.updateProduct(this.detailUpdateModel).subscribe(res => {

    })
  }
}

