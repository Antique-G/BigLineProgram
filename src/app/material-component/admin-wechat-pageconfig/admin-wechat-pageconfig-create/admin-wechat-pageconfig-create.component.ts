import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminWechatPageconfigService } from '../../../../services/admin/admin-wechat/admin-wechat-pageconfig.service';
import { AdminRegionService } from '../../../../services/admin/admin-region.service';
import { AddPageConfigRequestModel } from '../../../../interfaces/adminWeChat/admin-admin-model';

@Component({
  selector: 'app-admin-wechat-pageconfig-create',
  templateUrl: './admin-wechat-pageconfig-create.component.html',
  styleUrls: ['./admin-wechat-pageconfig-create.component.css']
})
export class AdminWechatPageconfigCreateComponent implements OnInit {
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
  isDisabled = true;

  addPageConfigRequestModel: AddPageConfigRequestModel;



  constructor(public fb: FormBuilder, public adminRegionService: AdminRegionService,
    public adminWechatPageconfigService: AdminWechatPageconfigService) {
    this.forms();
    this.addPageConfigRequestModel = {
      region_code: '',
      page_name: '',
      page_key: '',
      status: ''
    }
  }


  forms() {
    this.addForm = this.fb.group({
      regionCode: [''],
      name: ['', [Validators.required]],
      key: ['', [Validators.required]],
      status: [1, [Validators.required]]
    });
  }

  ngOnInit(): void {
    // 区域
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
    this.addPageConfigRequestModel.region_code = this.idRegion;
    this.addPageConfigRequestModel.page_name = this.page_name;
    this.addPageConfigRequestModel.page_key = this.addForm.value.key;
    this.addPageConfigRequestModel.status = this.addForm.value.status;
  }

  add() {
    this.setValue();
    console.log("提交的model是什么", this.addPageConfigRequestModel);
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    console.log("this.addForm.valid", this.addForm)
    if (this.addForm.valid) {
      this.adminWechatPageconfigService.addPageConfig(this.addPageConfigRequestModel).subscribe(res => {

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

}
