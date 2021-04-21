import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd/message';
import wangEditor from 'wangeditor';
import { AdminProductFreeTravelService } from '../../../../../../services/admin/admin-product-free-travel.service';
import { AdminProductManagementService } from '../../../../../../services/admin/admin-product-management.service';
import { AdminProductTagService } from '../../../../../../services/admin/admin-product-tag.service';
import { AdminRegionService } from '../../../../../../services/admin/admin-region.service';


@Component({
  selector: 'app-admin-travel-detail-proinfo',
  templateUrl: './admin-travel-detail-proinfo.component.html',
  styleUrls: ['./admin-travel-detail-proinfo.component.css']
})
export class AdminTravelDetailProinfoComponent implements OnInit {
  addForm!: FormGroup;
  detailId: any;
  dataDetailModel: any;
  isLoadingBtn = false;

  // 区域联动
  nzOptions: any[] | null = null;
  values: any[] = [];
  valuesDestination_city: any[] = [];
  idRegion: any;
  idDestin: any


  selectedTag: any[] = [];  //标签
  tagList: any[] = [];
  public isSpinning: any = true;    //loading 

  time = new Date('2021-01-01 18:00');
  newDay: any;
  newHour: any;
  newMin: any;

  freeTravelUpdateModel: any

  @ViewChild("feeBox") feeBox: any;       // 费用 获取dom
  isReserveAhead = '0';
  // isReserveChildren = '0';

  cateId: any;

  validationMessage: any = {
    title: {
      'maxlength': '主要景区长度最多为64个字符',
      'required': '请填写主要景区'
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
    destination_city: {
      'required': '请输入目的城市！'
    },

  };
  formErrors: any = {
    title: '',
    sub_title: '',
    few_days: '',
    few_nights: '',
    destination_city: '',
  }

  // 报价类型
  isQuoteType = false;

  constructor(public fb: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute, public dialog: MatDialog,
    public adminProductFreeTravelService: AdminProductFreeTravelService, public adminProductManagementService: AdminProductManagementService,
    public adminRegionService: AdminRegionService, public adminProductTagService: AdminProductTagService,
    private msg: NzMessageService,) {
    this.buildForm();
    this.freeTravelUpdateModel = {
      title: '',
      sub_title: '',
      earlier: 0,
      few_days: 0,
      few_nights: 0,
      departure_city: 0,
      destination_city: 0,
      service_phone: '',
      reserve_num: 0,
      reserve_children: 0,
      reserve_ahead: 0,
      children_age: 0,
      child_age_min: 0,
      child_height_min: 0,
      child_height_max: 0,
      fee: '',
      status: 0,
      tag_id: [],
      step: 0,
      quote_type: '',
      copies_max: '',
      use_num: '',
      inclusive: '',
      buy_num_max: '',
      request_id_num: 0,

    }
  }


  buildForm(): void {
    this.addForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      sub_title: new FormControl('', [Validators.required]),
      few_days: new FormControl(2, [Validators.required]),
      few_nights: new FormControl(1, [Validators.required]),
      tag_id: new FormControl(''),
      departure_city: new FormControl(''),
      destination_city: new FormControl('', [Validators.required]),
      service_phone: new FormControl(''),
      earlier1: new FormControl(1, [Validators.required]),
      earlier2: new FormControl(null),
      reserve_ahead: new FormControl(1, [Validators.required]),
      reserve_num: new FormControl(0, [Validators.required]),
      reserve_children: new FormControl(0, [Validators.required]),
      children_age: new FormControl(''),
      child_age_min: new FormControl(''),
      child_height_min: new FormControl(''),
      child_height_max: new FormControl(''),
      quote_type: new FormControl('1', [Validators.required]),
      buy_num_max: new FormControl(0, [Validators.required]),
      copies_max: new FormControl(0),
      use_num: new FormControl(1),
      inclusive: new FormControl(0),
      request_id_num:  new FormControl('1', [Validators.required]),

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
      this.detailId = params?.detailId;
    });
    this.getCateList()
  }

  getCateList() {
    this.adminProductTagService.getProdectCateList().subscribe(res => {
      console.log("结果是111", res.data)
      console.log("name", res.data[0].name)
      console.log("name", res.data[1].name)
      let name1 = res.data[0].name;
      let name2 = res.data[1].name;
      if (name1 === '自由行') {
        this.cateId = res.data[0].id
      }
      else if (name2 === '自由行') {
        this.cateId = res.data[1].id
      }
      this.getTagList();
    })
  }

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
      this.getDetail();
    })
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
    this.addForm.get('sub_title')?.setValue(this.dataDetailModel.sub_title);
    this.addForm.controls['few_days'].setValue(this.dataDetailModel.few_days);
    this.addForm.get('few_nights')?.setValue(this.dataDetailModel.few_nights);
    this.addForm.get('service_phone')?.setValue(this.dataDetailModel.service_phone);
    this.addForm.get('reserve_ahead')?.setValue(this.dataDetailModel.reserve_ahead);
    this.addForm.get('reserve_num')?.setValue(this.dataDetailModel.reserve_num);
    this.addForm.get('reserve_children')?.setValue(this.dataDetailModel.reserve_children);
    this.addForm.get('child_age_min')?.setValue(this.dataDetailModel.child_age_min);
    this.addForm.get('children_age')?.setValue(this.dataDetailModel.children_age);
    this.addForm.get('child_height_min')?.setValue(this.dataDetailModel.child_height_min);
    this.addForm.get('child_height_max')?.setValue(this.dataDetailModel.child_height_max);
    this.addForm.get('buy_num_max')?.setValue(this.dataDetailModel.buy_num_max);
    this.addForm.get('copies_max')?.setValue(this.dataDetailModel.copies_max);
    this.addForm.get('use_num')?.setValue(this.dataDetailModel.use_num);
    this.addForm.get('inclusive')?.setValue(this.dataDetailModel.inclusive);


    console.log(this.dataDetailModel, 'this.dataDetailModel');
    let b = this.dataDetailModel.tag.data;
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
    console.log(this.values, 'this.values');
    this.addForm.get('departure_city')?.setValue(this.values);   //出发城市

    const strs = this.dataDetailModel.destination_city;
    for (let i = 0; i < strs.length / 4; i++) {
      let temp = this.valuesDestination_city[i] || '' + strs.substr(0, 4 * (i + 1))
      this.valuesDestination_city.push(temp);
    }
    console.log(this.valuesDestination_city, '目的城市');
    this.addForm.get('destination_city')?.setValue(this.valuesDestination_city);   //目的城市
    // 时间处理
    let timeArr = this.timeStamp(this.dataDetailModel.earlier);
    this.addForm.get('earlier1')?.setValue(timeArr[0]);   //目的城市
    let timeDate = format(this.time, 'yyyy-MM-dd') + ' ' + timeArr[1] + ':' + timeArr[2];
    this.time = new Date(timeDate);
  }

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




  onChanges(values: any) {
    if (values !== null) {
      this.idRegion = values[values.length - 1];
    }
  }



  // 目的地
  onDestChange(arr: any): void {
    if (arr !== null) {
      console.log(arr[arr.length - 1]);
      this.idDestin = arr[arr.length - 1]
    }
  }


  changeTag(a: any): void {
    this.freeTravelUpdateModel.tag_id = a;
  }

  setValue() {
    this.freeTravelUpdateModel.id = this.dataDetailModel.id;
    this.freeTravelUpdateModel.title = this.addForm.value.title;
    this.freeTravelUpdateModel.sub_title = this.addForm.value.sub_title;
    this.freeTravelUpdateModel.few_days = this.addForm.value.few_days;;
    this.freeTravelUpdateModel.few_nights = this.addForm.value.few_nights;
    this.freeTravelUpdateModel.service_phone = this.addForm.value.service_phone;
    this.freeTravelUpdateModel.reserve_ahead = this.addForm.value.reserve_ahead;
    if (parseInt(this.isReserveAhead) === 0) {
      this.freeTravelUpdateModel.earlier = 0;
    }
    else if (parseInt(this.isReserveAhead) === 1) {
      // 时间处理
      let earlier1 = this.addForm.value.earlier1;
      let date = new Date(this.addForm.value.earlier2);
      let min = date.getMinutes();
      let hour = date.getHours();
      if (min > 0) {
        let resMin = earlier1 * 24 * 60 + ((24 - hour - 1) * 60 + (60 - min));
        this.freeTravelUpdateModel.earlier = resMin;
      }
      else if (min === 0) {
        let resMin = earlier1 * 24 * 60 + (24 - hour) * 60;
        this.freeTravelUpdateModel.earlier = resMin;
      }
      console.log('date是多少', this.freeTravelUpdateModel.earlier);
    }
    this.freeTravelUpdateModel.reserve_num = 0;
    this.freeTravelUpdateModel.reserve_children = this.addForm.value.reserve_children;


    this.freeTravelUpdateModel.child_age_min = this.addForm.value.child_age_min;
    this.freeTravelUpdateModel.children_age = this.addForm.value.children_age;
    this.freeTravelUpdateModel.child_height_min = this.addForm.value.child_height_min;
    this.freeTravelUpdateModel.child_height_max = this.addForm.value.child_height_max;
    this.freeTravelUpdateModel.departure_city = this.idRegion;
    this.freeTravelUpdateModel.destination_city = this.idDestin;
    this.freeTravelUpdateModel.quote_type = this.addForm.value.quote_type;
    this.freeTravelUpdateModel.request_id_num = this.addForm.value.request_id_num;

    // 按套餐
    if (this.isQuoteType === false) {
      this.freeTravelUpdateModel.copies_max = this.addForm.value.copies_max == '' ? 0 : this.addForm.value.copies_max;
      this.freeTravelUpdateModel.use_num = this.addForm.value.use_num == '' ? 1 : this.addForm.value.use_num;
      this.freeTravelUpdateModel.inclusive = this.addForm.value.inclusive;
      this.freeTravelUpdateModel.buy_num_max = 0;

    }
    else {
      // 按人头
      this.freeTravelUpdateModel.buy_num_max = this.addForm.value.buy_num_max == '' ? 0 : this.addForm.value.buy_num_max;
      this.freeTravelUpdateModel.copies_max = 0;
      this.freeTravelUpdateModel.use_num = 1;
      this.freeTravelUpdateModel.inclusive = '';

    }

  }



  // 富文本
  textChange() {
    // 费用
    const editorFee = new wangEditor("#editorFee", "#feeContent");
    console.log("拿到的fee", this.dataDetailModel.fee);
    this.feeBox.nativeElement.innerHTML = this.dataDetailModel.fee;    //赋值
    this.freeTravelUpdateModel.fee = this.dataDetailModel.fee;
    editorFee.config.onchange = (newHtml: any) => {
      this.freeTravelUpdateModel.fee = newHtml;
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




  nextTab() {
    this.setValue();
    // 验证表单
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    console.log(this.addForm.valid);
    if (this.addForm.valid) {
      if (Number(this.freeTravelUpdateModel.child_height_min) > Number(this.freeTravelUpdateModel.child_height_max)) {
        this.msg.error("儿童最大身高不能小于最小身高");
      }
      else {
        //更新
        this.isLoadingBtn = true;
        this.freeTravelUpdateModel.id = this.detailId;
        this.adminProductFreeTravelService.freeTravelUpdate(this.freeTravelUpdateModel).subscribe(res => {
          this.isLoadingBtn = false;
          if (res.message == "更新成功") {
            localStorage.setItem("few_days", this.addForm.value.few_days);
          }
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
    this.addForm.value.reserve_ahead = this.isReserveAhead
  }


  // 只输入整数
  numTest($event: any) {
    $event.target.value = $event.target.value.replace(/[^\d]/g, '');
  }


  // 报价类型
  quoteType(event: any) {
    if (event == 1) {
      this.isQuoteType = false;
      this.addForm?.controls['use_num'].setValidators(Validators.required);
      this.addForm?.controls['use_num'].updateValueAndValidity();
    }
    else {
      this.isQuoteType = true;
      this.addForm?.controls['use_num'].setValidators(null);
      this.addForm?.controls['use_num'].updateValueAndValidity();
    }
  }
}
