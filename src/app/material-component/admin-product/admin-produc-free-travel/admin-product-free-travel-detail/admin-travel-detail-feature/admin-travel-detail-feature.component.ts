import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import wangEditor from 'wangeditor';
import { AdminChooseImgComponent } from '../admin-choose-img/admin-choose-img.component';



@Component({
  selector: 'app-admin-travel-detail-feature',
  templateUrl: './admin-travel-detail-feature.component.html',
  styleUrls: ['./admin-travel-detail-feature.component.css']
})
export class AdminTravelDetailFeatureComponent implements OnInit {
  @Input() dataFreeDetailModel: any;
  @ViewChild("featureBox") featureBox: any;       //获取dom



  constructor(public dialog: MatDialog,) { }

  ngOnInit(): void {
    // this.textChange();
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

    editorFeature.config.onchange = (newHtml: any) => {

    }
    editorFeature.create();
    // 上传图片
    editorFeature.config.uploadImgParams = {
      token: (localStorage.getItem('userToken')!),
    }
    editorFeature.config.customUploadImg = (files: any, insert: any) => {
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


  
  chooseImgClick(){
    const dialogRef = this.dialog.open(AdminChooseImgComponent, {
      width: '1105px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
      }

    });
  }


}
