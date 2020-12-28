import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminRegionService } from '../../../../../../services/admin/admin-region.service';
import { AdminProductTagService } from '../../../../../../services/admin/admin-product-tag.service';
import wangEditor from 'wangeditor';
import { AdminProductFreeTravelService } from '../../../../../../services/admin/admin-product-free-travel.service';
import { AdminProductManagementService } from '../../../../../../services/admin/admin-product-management.service';
import { FreeTravelUpdateModel } from '../../../../../../interfaces/adminProduct/free-travel-model';

@Component({
  selector: 'app-admin-travel-detail-proinfo',
  templateUrl: './admin-travel-detail-proinfo.component.html',
  styleUrls: ['./admin-travel-detail-proinfo.component.css']
})
export class AdminTravelDetailProinfoComponent implements OnInit {
  addForm!: FormGroup;
  detailId:any;
  dataDetailModel: any;

  // 区域联动
  nzOptions: any[] | null = null;
  values: any[] = [];
  valuesDestination_city: any[] = [];
  idRegion: any;


  selectedTag: any[] = [];  //标签
  tagList: any[] = [];
  public isSpinning: any = true;    //loading 

  time = new Date();

  freeTravelUpdateModel:FreeTravelUpdateModel

  @ViewChild("featureBox") featureBox: any;       //获取dom
  @ViewChild("detailBox") detailBox: any;     //获取dom


  validationMessage: any = {
    title: {
      'maxlength': '标题长度最多为225个字符',
      'required': '请填写标题'
    },
    few_days: {
      'isNumber': '请输入非零的正整数',
      'required': '请输入出行几天！'
    }
  };
  formErrors: any = {
    title: '',
    few_days: '',
  };


  constructor(public fb: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute,
    public adminProductFreeTravelService:AdminProductFreeTravelService,  public adminProductManagementService: AdminProductManagementService, 
    public adminRegionService: AdminRegionService, public adminProductTagService: AdminProductTagService,) {
    this.buildForm();

    this.freeTravelUpdateModel = {
      title:'',
      earlier: 0,
      confirm: 0,
      pay_method:0,
      few_days: 0,
      few_nights:0,
      departure_city: 0,
      destination_city: 0,
      service_phone: '',
      reserve_num: 0,
      reserve_children: 0,
      reserve_ahead: 0,
      children_age: 0,
      children_height: 0,
      feature: '',
      details: '',
      fee: '',
      notice: '',
      status: 0,
      tag_id: []
    }
  }


  buildForm(): void {
    this.addForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      few_days: new FormControl('', [Validators.required]),
      few_nights: new FormControl('', [Validators.required]),
      tag_id: new FormControl('', [Validators.required]),
      departure_city: new FormControl('', [Validators.required]),
      destination_city: new FormControl('', [Validators.required]),
      fee: new FormControl('', [Validators.required]),
      service_phone: new FormControl('', [Validators.required]),
      confirm: new FormControl('', [Validators.required]),
      pay: new FormControl('', [Validators.required]),
      notice: new FormControl(null, [Validators.required]),
      earlier1: new FormControl('', [Validators.required]),
      earlier2: new FormControl('', [Validators.required]),
      reserve_ahead: new FormControl('', [Validators.required]),
      reserve_num: new FormControl('', [Validators.required]),
      reserve_children: new FormControl('', [Validators.required]),
      children_age: new FormControl('', [Validators.required]),
      children_height: new FormControl('', [Validators.required]),
    });
    // 每次表单数据发生变化的时候更新错误信息
    this.addForm.valueChanges.subscribe(data => {
      this.onValueChanged(data);
    });
    // 初始化错误信息
    this.onValueChanged();
  }

  // 表单验证
  onValueChanged(data?: any) {
    // 如果表单不存在则返回
    if (!this.addForm) return;
    // 获取当前的表单
    const form = this.addForm;
    // 遍历错误消息对象
    for (const field in this.formErrors) {
      // 清空当前的错误消息
      this.formErrors[field] = '';
      // 获取当前表单的控件
      const control: any = form.get(field);
      // 当前表单存在此空间控件 && 此控件没有被修改 && 此控件验证不通过
      if (control && !control.valid) {
        // 获取验证不通过的控件名，为了获取更详细的不通过信息
        const messages = this.validationMessage[field];
        // 遍历当前控件的错误对象，获取到验证不通过的属性
        for (const key in control.errors) {
          // 把所有验证不通过项的说明文字拼接成错误消息
          this.formErrors[field] = messages[key];
        }
      }
    }
  }

  ngOnInit(): void {
    this.addForm.controls['tag_id'].setValue([]);
    this.activatedRoute.queryParams.subscribe(params => {
      this.detailId = JSON.parse(params["detailId"]);
    });
    this.getTagList()
  }
  

  // 查看详情的接口
  getDetail() {
    this.adminProductFreeTravelService.freeTravelDetail(this.detailId).subscribe(res => {
      console.log('详情拿到的model', res);
      this.dataDetailModel = res.data;
      this.setFormValue();
      this.isSpinning = false;
      this.textChange();  //富文本初始化
    })
  }

  
  setFormValue() {
    console.log("拿到的值是", this.dataDetailModel)
    this.addForm.get('title')?.setValue(this.dataDetailModel.title);
    this.addForm.controls['few_days'].setValue(this.dataDetailModel.few_days);
    this.addForm.get('few_nights')?.setValue(this.dataDetailModel.few_nights);
    this.addForm.get('fee')?.setValue(this.dataDetailModel.fee);
    this.addForm.get('service_phone')?.setValue(this.dataDetailModel.service_phone);
    this.addForm.get('reserve_ahead')?.setValue(this.dataDetailModel.reserve_ahead);
    this.addForm.get('reserve_num')?.setValue(this.dataDetailModel.reserve_num);
    this.addForm.get('reserve_children')?.setValue(this.dataDetailModel.reserve_children);
    this.addForm.get('children_age')?.setValue(this.dataDetailModel.children_age);
    this.addForm.get('children_height')?.setValue(this.dataDetailModel.children_height);
  
    let b = this.dataDetailModel.tag_id;
    let bNums: any[] = []
    for (let ints of b) {
      bNums.push(ints.id)
      this.selectedTag = bNums
    }
    console.log("this.selectedTag", this.selectedTag);  //标签

    const str = this.dataDetailModel.departure_city;
    for (let i = 0; i < str.length / 4; i++) {
      let temp = this.values[i] || '' + str.substr(0, 4 * (i + 1))
      this.values.push(temp);
    }
    this.addForm.get('departure_city')?.setValue(this.values);   //出发城市

    const strs = this.dataDetailModel.destination_city;
    for (let i = 0; i < str.length / 4; i++) {
      let temp = this.values[i] || '' + str.substr(0, 4 * (i + 1))
      this.valuesDestination_city.push(temp);
    }
    this.addForm.get('destination_city')?.setValue(this.values);   //目的城市
   
    // 截止日期
    console.log("截止日期", this.dataDetailModel.earlier);
    console.log("分钟", this.dataDetailModel.earlier % 60)
    console.log("小时", Math.floor(this.dataDetailModel.earlier / 60) % 24);
    console.log("", Math.floor(this.dataDetailModel.earlier / 60 / 24));
  }




  getTagList() {
    this.adminProductTagService.getProductTagList(1, 1000, '', '', '').subscribe(res => {
      for (let i of res.data) {
        let a = { value: i.id, label: i.name };
        this.tagList.push(a);
        console.log("tagList", this.tagList)
      }
      this.getRegionList();
    })
  }


    // 区域
    getRegionList() {
      this.adminRegionService.getAllRegionList().subscribe(res => {
        this.nzOptions = res;
        this.getDetail();
      })
    }


  onChanges($event:any){

  }


  changeTag(a: any): void {
    // this.freeTravelUpdateModel.tag_id = a;
  }




  
  // 富文本
  textChange() {
    // 产品特色
    const editorFeature = new wangEditor("#editorFeature", "#editor");
    console.log("拿到的feature", this.dataDetailModel.feature);
    this.featureBox.nativeElement.innerHTML = this.dataDetailModel.feature;    //赋值

    this.freeTravelUpdateModel.feature = this.dataDetailModel.feature;
    console.log("没改之前的model", this.freeTravelUpdateModel.feature);
    editorFeature.config.onchange = (newHtml: any) => {
      this.freeTravelUpdateModel.feature = newHtml;
      console.log("修改后的model", this.freeTravelUpdateModel.feature)

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




    // 详情
    const editorDetail = new wangEditor("#editorDetail", "#editorContent");
    console.log("拿到的details", this.dataDetailModel.details)
    this.detailBox.nativeElement.innerHTML = this.dataDetailModel.details;    //赋值
    this.freeTravelUpdateModel.details = this.dataDetailModel.details;
    console.log("没改之前的model", this.freeTravelUpdateModel.details);
    editorDetail.config.onchange = (newHtml: any) => {
      this.freeTravelUpdateModel.details = newHtml;
      console.log("修改后的model", this.freeTravelUpdateModel.details);

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
      this.adminProductManagementService.uploadImg(formDataDetail).subscribe(res => {
        console.log(res, 'res');
        insert(res.data);
      })
    }

  }


}
