import { Component, Input, OnInit, ViewChild } from '@angular/core';
import wangEditor from 'wangeditor';


@Component({
  selector: 'app-admin-peoduct-management-editornotice',
  templateUrl: './admin-peoduct-management-editornotice.component.html',
  styleUrls: ['./admin-peoduct-management-editornotice.component.css']
})
export class AdminPeoductManagementEditornoticeComponent implements OnInit {
  @Input() adminProductDetailModel: any;
  @ViewChild("noticeBox") noticeBox: any;     //获取dom


  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.textChange();
  }

  textChange() {
    // 预约须知
    const editorNotice = new wangEditor("#editorNotice", "#noticeContent");
    console.log("拿到的notice", this.adminProductDetailModel?.notice);
    this.noticeBox.nativeElement.innerHTML = this.adminProductDetailModel.notice;    //赋值

    editorNotice.config.onchange = (newHtml: any) => {
      // this.adminProductManagementUpdateModel.notice = newHtml;
    }
    editorNotice.create();
    // 上传图片
    editorNotice.config.uploadImgParams = {
      token: (localStorage.getItem('userToken')!),
    }
    editorNotice.config.customUploadImg = (files: any, insert: any) => {
      // 限制一次最多上传 1 张图片
      if (files.length !== 1) {
        alert('单次只能上传一个图片')
        return
      }
      console.log("files是什么", files);
      console.log(files[0]);
      let formData = new FormData();
      formData.append('image', files[0] as any);
      console.log("formData是什么", formData.get('file'));
      // this.adminProductManagementService.uploadImg(formData).subscribe(res => {
      //   console.log(res, 'res');
      //   insert(res.data);
      // })
    }

  }
}
