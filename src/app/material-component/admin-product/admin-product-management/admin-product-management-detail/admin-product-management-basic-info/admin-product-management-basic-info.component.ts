import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd/message';
import wangEditor from 'wangeditor';
import { AdminMeetingPlaceService } from '../../../../../../services/admin/admin-meeting-place.service';
import { AdminProductManagementService } from '../../../../../../services/admin/admin-product-management.service';
import { AdminProductTagService } from '../../../../../../services/admin/admin-product-tag.service';
import { AdminRegionService } from '../../../../../../services/admin/admin-region.service';




@Component({
  selector: 'app-admin-product-management-basic-info',
  templateUrl: './admin-product-management-basic-info.component.html',
  styleUrls: ['./admin-product-management-basic-info.component.css']
})
export class AdminProductManagementBasicInfoComponent implements OnInit {
  addForm!: FormGroup;
  isLoadingBtn = false;
  // 区域联动
  nzOptions: any[] | null = null;
  values: any[] = [];
  idRegion: any;

  // 集合地以及标题
  selectedPlace: any[] = [];
  isPlaceRegion: any;
  store_id: any;
  // 目的地
  destinationPalce: any[] = [];
  idDestin: any

  selectedTag: any[] = [];
  assemblingPlaceList: any[] = [];
  tagList: any[] = [];

  // 预定截止日期
  earlierTime = new Date('2021-01-01 18:00');
  isReserveAhead = '0';
  // isReserveChildren = '0';


  dataProductDetailModel: any;
  // 更新model
  detailUpdateModel: any;
  detailId: any;
  isSpinning = true;
  @ViewChild("feeBox") feeBox: any;       // 费用 获取dom


  cateId: any;

  newDay: any;
  newHour: any;
  newMin: any;



  validationMessage: any = {
    title: {
      'maxlength': '产品主标题长度最多为20个字符',
      'required': '请填写产品主标题'
    },
    sub_title: {
      'maxlength': '副标题长度最多为64个字符',
      'required': '请填写副标题'
    },
    few_days: {
      'isNumber': '请输入非零的正整数',
      'required': '请输入出行几天！'
    },
    few_nights: {
      'isNumber': '请输入非零的正整数',
      'required': '请输入出行几晚！'
    },
    tag_id: {
      'required': '请选择产品标签'!
    },
    departure_city: {
      'required': '请输入出发城市！'
    },
    destination_city: {
      'required': '请输入目的城市！'
    },
    reserve_num_min: {
      'required': '请输入最少成团人数！'
    },
  };
  formErrors: any = {
    title: '',
    sub_title: '',
    few_days: '',
    few_nights: '',
    tag_id: '',
    departure_city: '',
    destination_city: '',
    reserve_num_min: '',
  }


  constructor(public fb: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute,
    public adminProductManagementService: AdminProductManagementService, public adminRegionService: AdminRegionService,
    public adminProductTagService: AdminProductTagService, private msg: NzMessageService,
    public adminMeetingPlaceService: AdminMeetingPlaceService) {
    this.buildForm();
    this.detailUpdateModel = {
      title: '',
      sub_title: '',
      departure_city: '',
      destination_city: '',
      earlier: 0,
      few_days: 0,
      few_nights: 0,
      child_status: 0,
      child_age_min: 0,
      child_age_max: 0,
      child_height_min: 0,
      child_height_max: 0,
      reserve_num_min: 0,
      reserve_num_max: 0,
      contacts_status: 0,
      assembling_place_id: [],
      fee: '',
      tag_id: [],
      step: 0,
      reserve_ahead: 0
    }

  }


  buildForm(): void {
    this.addForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(20)]],
      sub_title: ['', [Validators.required]],
      few_days: [2, [Validators.required]],
      few_nights: [1, [Validators.required]],
      tag_id: ['', [Validators.required]],
      departure_city: ['', [Validators.required]],
      destination_city: ['', [Validators.required]],
      assembling_place_id: ['', [Validators.required]],
      contacts_status: ['1', [Validators.required]],
      child_status: ['1', [Validators.required]],
      reserve_ahead: new FormControl(1, [Validators.required]),
      child_age_max: [14],
      child_age_min: [2],
      child_height_min: [''],
      child_height_max: [''],
      reserve_num_min: [1, [Validators.required]],
      reserve_num_max: [''],
      earlier1: new FormControl(1, [Validators.required]),
      earlier2: new FormControl(null),
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
    this.addForm.controls['assembling_place_id'].setValue([]);
    this.addForm.controls['tag_id'].setValue([]);
    this.activatedRoute.queryParams.subscribe(params => {
      this.detailId = params?.detailDataId;
    });
    this.getCateList();
  }


  getCateList() {
    this.adminProductTagService.getProdectCateList().subscribe(res => {
      console.log("结果是111", res.data)
      console.log("name", res.data[0].name)
      console.log("name", res.data[1].name)
      let name1 = res.data[0].name;
      let name2 = res.data[1].name;
      if (name1 === '跟团游') {
        this.cateId = res.data[0].id
      }
      else if (name2 === '跟团游') {
        this.cateId = res.data[1].id
      }
      this.getTagList();
    })
  }

  // 标签  --按顺序执行
  getTagList() {
    this.adminProductTagService.getProductTagList(1, 1000, this.cateId, '', '').subscribe(res => {
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
      this.getProductDetail();
    })
  }

  // 集合地点
  getAccemList() {
    console.log('111111111111 :>> ', this.dataProductDetailModel);
    this.store_id = this.dataProductDetailModel?.store_id;
    console.log('this.store_id', this.store_id);
    this.adminMeetingPlaceService.adminMeetingPlaceList('', this.isPlaceRegion, this.store_id).subscribe(res => {
      console.log("集合地点", res.data);
      this.assemblingPlaceList = [];

      if (res.data.length === 0) {
        this.assemblingPlaceList = [];
      }
      else {
        for (let i of res.data) {
          console.log("集合地点ii", i, i.time_state === 0);
          if (i.time_state === 0) {
            let a = { value: i.id, label: i.name, time: i.time };
            this.assemblingPlaceList.push(a);
          }
          else if (i.time_state === 1) {
            let a = { value: i.id, label: i.name, time: '' };
            this.assemblingPlaceList.push(a);
          }
        }
      }

      console.log(this.destinationPalce, ' this.destinationPalce');
    });
  }

  setValue() {
    this.detailUpdateModel.title = this.addForm.value.title;
    this.detailUpdateModel.sub_title = this.addForm.value.sub_title;
    this.detailUpdateModel.few_days = this.addForm.value.few_days;
    this.detailUpdateModel.few_nights = this.addForm.value.few_nights;
    this.detailUpdateModel.contacts_status = this.addForm.value.contacts_status;
    this.detailUpdateModel.child_status = this.addForm.value.child_status;
    this.detailUpdateModel.reserve_ahead = this.addForm.value.reserve_ahead;
    if (parseInt(this.isReserveAhead) === 0) {
      this.detailUpdateModel.earlier = 0;
    }
    else if (parseInt(this.isReserveAhead) === 1) {
      // 时间处理
      let earlier1 = this.addForm.value.earlier1;
      let date = new Date(this.addForm.value.earlier2);
      let min = date.getMinutes();
      let hour = date.getHours();
      if (min > 0) {
        let resMin = earlier1 * 24 * 60 + ((24 - hour - 1) * 60 + (60 - min));
        this.detailUpdateModel.earlier = resMin;
      }
      else if (min === 0) {
        let resMin = earlier1 * 24 * 60 + (24 - hour) * 60;
        this.detailUpdateModel.earlier = resMin;
      }
      console.log('date是多少', this.detailUpdateModel.earlier);
    }
    // if (parseInt(this.isReserveChildren) === 0) {
    //   this.detailUpdateModel.child_age_max = 14;
    //   this.detailUpdateModel.child_height_min = 0;
    //   this.detailUpdateModel.child_height_max = 0;
    // }
    // else if (parseInt(this.isReserveChildren) === 1) {
    //   this.detailUpdateModel.child_age_max = this.addForm.value.child_age_max;
    //   this.detailUpdateModel.child_height_min = this.addForm.value.child_height_min;
    //   this.detailUpdateModel.child_height_max = this.addForm.value.child_height_max;
    // }
    this.detailUpdateModel.child_age_min = this.addForm.value.child_age_min;
    this.detailUpdateModel.child_age_max = this.addForm.value.child_age_max;
    this.detailUpdateModel.child_height_min = this.addForm.value.child_height_min;
    this.detailUpdateModel.child_height_max = this.addForm.value.child_height_max;
    this.detailUpdateModel.reserve_num_min = this.addForm.value.reserve_num_min;
    this.detailUpdateModel.reserve_num_max = this.addForm.value.reserve_num_max;

  }


  getProductDetail() {
    this.adminProductManagementService.productDetail(this.detailId).subscribe(res => {
      console.log('详情拿到的model', res);
      this.dataProductDetailModel = res.data;
      this.setFormValue();
      this.isSpinning = false;
      this.textChange();  //富文本初始化
    })
  }


  setFormValue() {
    console.log("拿到的值是", this.dataProductDetailModel)
    this.addForm.get('title')?.setValue(this.dataProductDetailModel.title);
    this.addForm.get('sub_title')?.setValue(this.dataProductDetailModel.sub_title);
    this.addForm.controls['few_days'].setValue(this.dataProductDetailModel.few_days);
    this.addForm.get('few_nights')?.setValue(this.dataProductDetailModel.few_nights);
    this.addForm.get('child_age_min')?.setValue(this.dataProductDetailModel.child_age_min);
    this.addForm.get('child_age_max')?.setValue(this.dataProductDetailModel.child_age_max);
    this.addForm.get('child_height_min')?.setValue(this.dataProductDetailModel.child_height_min);
    this.addForm.get('child_height_max')?.setValue(this.dataProductDetailModel.child_height_max);
    this.addForm.get('reserve_num_min')?.setValue(this.dataProductDetailModel.reserve_num_min);
    this.addForm.get('reserve_num_max')?.setValue(this.dataProductDetailModel.reserve_num_max);
    let a = this.dataProductDetailModel.assembling_place.data;
    let aNums: any[] = []
    for (let int of a) {
      aNums.push(int.id)
      this.selectedPlace = aNums;
    }
    console.log("this.selectedPlace", this.selectedPlace);
    let b = this.dataProductDetailModel.tag.data;
    let bNums: any[] = []
    for (let ints of b) {
      bNums.push(ints.id)
      this.selectedTag = bNums
    }
    console.log("this.selectedTag", this.selectedTag);
    const str = this.dataProductDetailModel.departure_city;
    for (let i = 0; i < str.length / 4; i++) {
      let temp = this.values[i] || '' + str.substr(0, 4 * (i + 1))
      this.values.push(temp);
    }
    this.addForm.get('departure_city')?.setValue(this.values);   //区域
    // 目的地城市
    const strDest = this.dataProductDetailModel.destination_city;
    for (let i = 0; i < strDest.length / 4; i++) {
      let temp = this.destinationPalce[i] || '' + strDest.substr(0, 4 * (i + 1))
      this.destinationPalce.push(temp);
    }
    this.addForm.get('destination_city')?.setValue(this.destinationPalce);   //区域
    // 时间处理
    let timeArr = this.timeStamp(this.dataProductDetailModel.earlier);
    this.addForm.get('earlier1')?.setValue(timeArr[0]);   //目的城市
    let timeDate = format(this.earlierTime, 'yyyy-MM-dd') + ' ' + timeArr[1] + ':' + timeArr[2];
    this.earlierTime = new Date(timeDate)
  }

  //传入的分钟数  转换成天、时、分 [天,时,分]
  //传入的分钟数  转换成天、时、分 [天,时,分]
  timeStamp(minutes: any) {
    console.log("minutes11111111111", minutes)
    this.newDay = Math.floor(minutes / 60 / 24);
    this.newMin = Math.floor(minutes % 60);
    if (this.newMin === 0) {
      this.newHour = Math.floor(24 - minutes / 60 % 24);
    }
    else if (this.newMin != 0) {
      this.newMin = 60 - this.newMin;
      this.newHour = Math.floor(24 - minutes / 60 % 24);
    }
    let str: any = [this.newDay, this.newHour, this.newMin];
    console.log('2423423', this.newDay, this.newHour, this.newMin)
    //三元运算符 传入的分钟数不够一分钟 默认为0分钟，else return 运算后的minutes 
    return str;
  }


  changePlace(a: any): void {
    console.log('选择的值是sss', a);
    this.detailUpdateModel.assembling_place_id = a;
  }

  changeTag(a: any): void {
    console.log('选择的值是vvv', a);
    this.detailUpdateModel.tag_id = a;
  }


  onChanges(data: any): void {
    console.log("点击的结果是", data);
    if (data !== null) {
      this.detailUpdateModel.departure_city = data[data.length - 1];
      this.isPlaceRegion = this.detailUpdateModel.departure_city;
      this.store_id = this.detailUpdateModel?.store_id;
      console.log('22222222', this.dataProductDetailModel);
      this.getAccemList();
    }
  }


  onDestChange(values: any): void {
    console.log("点击的结果是", values);
    if (values !== null) {
      this.detailUpdateModel.destination_city = values[values.length - 1];
    }
  }

  // 富文本
  textChange() {
    // 费用
    const editorFee = new wangEditor("#editorFee", "#feeContent");

    this.feeBox.nativeElement.innerHTML = this.dataProductDetailModel?.fee;    //赋值
    this.detailUpdateModel.fee = this.dataProductDetailModel.fee;
    editorFee.config.onchange = (newHtml: any) => {
      console.log("213123", newHtml);
      this.detailUpdateModel.fee = newHtml;
    }
    // 配置菜单栏
    editorFee.config.menus = [
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
    editorFee.config.pasteFilterStyle = false;
    editorFee.config.pasteTextHandle = function (pasteStr: any) {
      //  去除wps文档复制过来的style样式
      let str = pasteStr
      str = str.replace(/[\s\S.@]*{[\s\S]*?}/ig, '');
      return str
    }
    editorFee.create();

  }


  // 刷新区域和集合地点,标签
  refreshRegion() {
    this.adminRegionService.getAllRegionList().subscribe(res => {
      this.nzOptions = res;
    })
  }


  refreshPlace() {
    this.assemblingPlaceList = [];
    this.store_id = this.dataProductDetailModel?.store_id
    this.adminMeetingPlaceService.adminMeetingPlaceList('', this.isPlaceRegion, this.store_id).subscribe(res => {
      for (let i of res.data) {
        console.log("集合地点ii", i, i.time_state === 0);
        if (i.time_state === 0) {
          let a = { value: i.id, label: i.name, time: i.time };
          this.assemblingPlaceList.push(a);
        }
        else if (i.time_state === 1) {
          let a = { value: i.id, label: i.name, time: '' };
          this.assemblingPlaceList.push(a);
        }
      }
    });
  }

  refreshTag() {
    this.tagList = [];
    this.adminProductTagService.getProductTagList(1, 1000, '', '', '').subscribe(res => {
      for (let i of res.data) {
        let a = { value: i.id, label: i.name };
        this.tagList.push(a);
        console.log("tagList", this.tagList)
      }
    })
  }

  nextTab() {
    this.setValue();
    // 验证表单
    console.log("this.addForm", this.addForm)
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    console.log("66666", this.addForm.valid)
    if (this.addForm.valid) {
      //更新
      if (Number(this.detailUpdateModel.child_height_min) > Number(this.detailUpdateModel.child_height_max)) {
        this.msg.error("儿童最大身高不能小于最小身高");
      }
      else {
        this.isLoadingBtn = true;
        this.detailUpdateModel.id = this.detailId;
        this.adminProductManagementService.updateProduct(this.detailUpdateModel).subscribe(res => {
          this.isLoadingBtn = false;
          console.log("res结果", res);
          localStorage.setItem("few_days", this.addForm.value.few_days);
        },
        error => {
          this.isLoadingBtn = false;
        })
      }

    }
  }



  isReserveAheadChange(status: any) {
    console.log(status, 'status');
    this.isReserveAhead = status;
    this.addForm.value.reserve_ahead = this.isReserveAhead;
  }


  // isReserveChildrenChange(status: any) {
  //   console.log(status, 'status');
  //   this.isReserveChildren = status;
  //   this.addForm.value.child_status = this.isReserveChildren;
  // }


  // 只输入整数
  numTest($event: any) {
    $event.target.value = $event.target.value.replace(/[^\d]/g, '');
  }

}



