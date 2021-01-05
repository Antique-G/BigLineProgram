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
      step: 2,
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
      this.adminProductManagementService.uploadImg(formData).subscribe(res => {
        console.log(res, 'res');
        insert(res.data);
      })
    }
  }


  nextTab() {
    this.detailUpdateModel.id = this.detailId;
    this.adminProductManagementService.updateProduct(this.detailUpdateModel).subscribe(res => {

    })
  }
}
