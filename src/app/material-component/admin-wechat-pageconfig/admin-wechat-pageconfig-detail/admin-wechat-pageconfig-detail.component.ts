import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminWechatPageconfigService } from '../../../../services/admin/admin-wechat/admin-wechat-pageconfig.service';
import { AdminRegionService } from '../../../../services/admin/admin-region.service';
import { AddPageConfigRequestModel } from '../../../../interfaces/adminWeChat/admin-admin-model';

@Component({
  selector: 'app-admin-wechat-pageconfig-detail',
  templateUrl: './admin-wechat-pageconfig-detail.component.html',
  styleUrls: ['./admin-wechat-pageconfig-detail.component.css']
})
export class AdminWechatPageconfigDetailComponent implements OnInit {
  public isSpinning: any = true;    //loading 
  addForm!: FormGroup;
  // 区域联动
  nzOptions: any[] | null = null;
  values: any[] = [];
  idRegion: any;

  // 页面名称
  dataList: any[] = [];
  page_name: any;
  page_key: any;
  isValue: any;
  status = '1';
  selectedPage: any;

  @Input() data: any;

  detailModel!: any;
  updatePageConfigRequestModel: AddPageConfigRequestModel;


  constructor(public fb: FormBuilder, public adminRegionService: AdminRegionService,
    public adminWechatPageconfigService: AdminWechatPageconfigService) {
    this.forms();
    this.updatePageConfigRequestModel = {
      region_code: '',
      page_name: '',
      page_key: '',
      status: '',
      page_id: ''
    }
  }


  forms() {
    this.addForm = this.fb.group({
      regionCode: [''],
      name: ['', [Validators.required]],
      key: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.detailModel = this.data;
    console.log("this.detailModel", this.detailModel);
    // 页面名称
    this.selectedPage = { page_name: this.detailModel.page_name, page_key: this.detailModel.page_key };

    console.log(" this.selectedPage", this.selectedPage)
    const str = this.detailModel.region_code;
    for (let i = 0; i < str.length / 4; i++) {
      let temp = this.values[i] || '' + str.substr(0, 4 * (i + 1))
      this.values.push(temp);
    }
    console.log("111", this.values);    //区域
    this.addForm.setValue({
      regionCode: this.detailModel.region_code,
      name: { page_name: this.detailModel.page_name, page_key: this.detailModel.page_key },
      key: this.detailModel.page_key,
      status: this.detailModel.status
    })


    // 区域接口
    this.adminRegionService.getAllRegionList().subscribe(res => {
      this.nzOptions = res;
      // 页面名称
      this.adminWechatPageconfigService.pageList().subscribe(result => {
        this.dataList = result.data;
        this.isSpinning = false
      })
    })
  }

  setValue() {
    this.updatePageConfigRequestModel.region_code = this.idRegion ? this.idRegion : '';
    this.updatePageConfigRequestModel.page_name = this.page_name;
    this.updatePageConfigRequestModel.page_key = this.addForm.value.key;
    this.updatePageConfigRequestModel.status = this.addForm.value.status;
  }

  update() {
    this.setValue();
    this.updatePageConfigRequestModel.page_id = this.detailModel.page_id;
    console.log("提交的model是什么", this.updatePageConfigRequestModel);
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    console.log("this.addForm.valid", this.addForm)
    if (this.addForm.valid) {
      this.adminWechatPageconfigService.updatePageConfig(this.updatePageConfigRequestModel).subscribe(res => {

      })
    }
  }




  onChanges(values: any): void {
    console.log("点击的结果是", values);
    console.log("this.values", this.values);
    if (values !== null) {
      this.idRegion = values[values.length - 1];
    }

  }


  changeList(event: any) {
    console.log("event", event);
    this.page_name = event.page_name;
    this.page_key = event.page_key;
    this.isValue = this.page_key;
  }


  compare(selectedPage: any, dataList: any): boolean {
    return selectedPage && dataList ? selectedPage['page_name'] === dataList['page_name'] : selectedPage === dataList;
  }

}
