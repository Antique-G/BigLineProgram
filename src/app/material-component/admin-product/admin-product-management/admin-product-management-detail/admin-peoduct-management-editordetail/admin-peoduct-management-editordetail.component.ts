import { Component, Input, OnInit, ViewChild } from '@angular/core';
import wangEditor from 'wangeditor';


@Component({
  selector: 'app-admin-peoduct-management-editordetail',
  templateUrl: './admin-peoduct-management-editordetail.component.html',
  styleUrls: ['./admin-peoduct-management-editordetail.component.css']
})
export class AdminPeoductManagementEditordetailComponent implements OnInit {
  @Input() adminProductDetailModel: any;
  @ViewChild("detailBox") detailBox: any;     //获取dom


  constructor() { }

  ngOnInit(): void {
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

    editorDetail.config.onchange = (newHtml: any) => {
      //  this.adminProductManagementUpdateModel.details = newHtml;
      //  console.log("修改后的model", this.adminProductManagementUpdateModel.details);

    }
    editorDetail.create();

    // 上传图片
    editorDetail.config.uploadImgParams = {
      token: (localStorage.getItem('userToken')!),
    }
    editorDetail.config.customUploadImg = (files: any, insert: any) => {
      // 限制一次最多上传 1 张图片
      if (files.length !== 1) {
        alert('单次只能上传一个图片')
        return
      }
      console.log("files是什么", files);

      console.log(files[0]);
      let formDataDetail = new FormData();
      formDataDetail.append('image', files[0] as any);
      console.log("formData是什么", formDataDetail.get('file'));
      //  this.adminProductManagementService.uploadImg(formDataDetail).subscribe(res => {
      //    console.log(res, 'res');
      //    insert(res.data);
      //  })
    }





  }

}
