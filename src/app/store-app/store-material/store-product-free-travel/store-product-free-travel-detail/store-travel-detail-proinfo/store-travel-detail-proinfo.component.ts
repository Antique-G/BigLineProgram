import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import wangEditor from 'wangeditor';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { StoreProductTreeTravelService } from '../../../../../../services/store/store-product-free-travel/store-product-tree-travel.service';
import { StoreFreeTravelModel } from '../../../../../../interfaces/store/storeProductFreeTravel/storeProductFreeTravel';
import { StoreRegionService } from '../../../../../../services/store/store-region/store-region.service';
import { CommonServiceService } from '../../../../../../services/store/common-service/common-service.service';
import { InsertABCMenu } from '../../../InsertABCMenu';
import { MatDialog } from '@angular/material/dialog';
import { CommonModelComponent } from '../../../common/common-model/common-model.component';
import { ChooseGalleryComponent } from '../../../../../layouts/choose-gallery/choose-gallery';
import { NzMessageService } from 'ng-zorro-antd/message';
import { StoreProductService } from '../../../../../../services/store/store-product/store-product.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-store-travel-detail-proinfo',
  templateUrl: './store-travel-detail-proinfo.component.html',
  styleUrls: ['./store-travel-detail-proinfo.component.css']
})
export class StoreTravelDetailProinfoComponent implements OnInit {
  addForm!: FormGroup;
  public isSpinning: any = true;    //loading 
  detailId: any //产品id
  dataModel: any //数据存储容器
  freeTravelModel: StoreFreeTravelModel
  earlierTime = new Date('2021-01-01 18:00');

  featureList: any[] = []
  detailList: any[] = []

  selectedTag: any[] = [];  //标签
  tagList: any[] = [];

  // 区域联动
  valuesDestination_city: any[] = [];//目的城市
  nzOptions: any[] | null = null;
  departure_city: any[] = [];//出发城市

  @ViewChild("feeBox") feeBox: any;       // 费用 获取dom
  feeList: any[] = []    //图片

  isReserveAhead = '0';
  isReserveChildren = '0';

  cateId: any


  validationMessage: any = {
    title: {
      'maxlength': '标题长度最多为64个字符',
      'required': '请填写标题'
    },
    few_days: {
      'isNumber': '请输入非零的正整数',
      'required': '请输入出行几天！'
    },
    few_nights: {
      'isNumber': '请输入非零的正整数',
      'required': '请输入出行几晚！'
    },
    departure_city: {
      'required': '请输入出发城市！'
    },
    destination_city: {
      'required': '请输入目的城市！'
    },
    reserve_num: {
      'required': '请输入可预订人数！'
    },
  };
  formErrors: any = {
    title: '',
    few_days: '',
    few_nights: '',
    departure_city: '',
    destination_city: '',
    reserve_num: '',
  }




  constructor(public fb: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute,
    public storeProductService: StoreProductService,
    private freeTravelService: StoreProductTreeTravelService, private storeRegionService: StoreRegionService,
    public dialog: MatDialog, private msg: NzMessageService,
    private modal: NzModalService, private viewContainerRef: ViewContainerRef) {
    this.buildForm()
    this.freeTravelModel = {
      title: '',
      earlier: 0,
      confirm: 0,
      pay_method: 0,
      few_days: 0,
      few_nights: 0,
      departure_city: 0,
      destination_city: 0,
      service_phone: '',
      reserve_num: 0,
      reserve_children: 0,
      reserve_ahead: 0,
      children_age: 0,
      child_height_min: 0,
      child_height_max: 0,
      fee: '',
      status: 0,
      tag_id: [],
      step: 0
    }

  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.detailId = params.detailId;
    });
    console.log('this.detailId', this.detailId);
    this.addForm.controls['tag_id'].setValue([]);
    this.getCateList();
  }

  // 表单初始化
  buildForm(): void {
    this.addForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(64)]),
      few_days: new FormControl(2, [Validators.required]),
      few_nights: new FormControl(1, [Validators.required]),
      tag_id: new FormControl('', [Validators.required]),
      departure_city: new FormControl('', [Validators.required]),
      destination_city: new FormControl('', [Validators.required]),
      service_phone: new FormControl(''),
      confirm: new FormControl('', [Validators.required]),
      earlier1: new FormControl(1, [Validators.required]),
      earlier2: new FormControl(null),
      reserve_ahead: new FormControl(1, [Validators.required]),
      reserve_num: new FormControl('', [Validators.required]),
      reserve_children: new FormControl(0, [Validators.required]),
      children_age: new FormControl(''),
      child_height_min: new FormControl(''),
      child_height_max: new FormControl(''),
    });
    // 每次表单数据发生变化的时候更新错误信息
    this.addForm.valueChanges.subscribe(data => {
      this.onValueChanged(data);
    });
    // 初始化错误信息
    this.onValueChanged();
  }

  getDetail() {
    this.freeTravelService.GetFreeTravelDetail(this.detailId).subscribe((res: any) => {
      console.log(res);
      this.isSpinning = false
      this.dataModel = res.data
      this.setFormValue();
      this.textChange()
    })
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

  setFormValue() {
    this.addForm.get('title')?.setValue(this.dataModel.title);
    this.addForm.controls['few_days'].setValue(this.dataModel.few_days);
    this.addForm.get('few_nights')?.setValue(this.dataModel.few_nights);
    this.addForm.get('service_phone')?.setValue(this.dataModel.service_phone);
    this.addForm.get('reserve_ahead')?.setValue(this.dataModel.reserve_ahead);
    this.addForm.get('reserve_num')?.setValue(this.dataModel.reserve_num);
    this.addForm.get('reserve_children')?.setValue(this.dataModel.reserve_children);
    this.addForm.get('children_age')?.setValue(this.dataModel.children_age);
    this.addForm.get('child_height_min')?.setValue(this.dataModel.child_height_min);
    this.addForm.get('child_height_max')?.setValue(this.dataModel.child_height_max);

    let b = this.dataModel.tag.data;
    let bNums: any[] = []
    for (let ints of b) {
      bNums.push(ints.id)
      this.selectedTag = bNums
    }
    const str = this.dataModel.departure_city;
    for (let i = 0; i < str.length / 4; i++) {
      let temp = this.departure_city[i] || '' + str.substr(0, 4 * (i + 1))
      this.departure_city.push(temp);
    }
    console.log(this.departure_city, 'this.values');
    this.addForm.get('departure_city')?.setValue(this.departure_city);   //出发城市

    const strs = this.dataModel.destination_city;
    for (let i = 0; i < strs.length / 4; i++) {
      let temp = this.valuesDestination_city[i] || '' + strs.substr(0, 4 * (i + 1))
      this.valuesDestination_city.push(temp);
    }
    console.log(this.valuesDestination_city, '目的城市');
    this.addForm.get('destination_city')?.setValue(this.valuesDestination_city);   //目的城市
    // 时间处理
    let timeArr = this.timeStamp(this.dataModel.earlier);
    this.addForm.get('earlier1')?.setValue(timeArr[0]);   //目的城市
    let timeDate = format(this.earlierTime, 'yyyy-MM-dd') + ' ' + timeArr[1] + ':' + timeArr[2];
    this.earlierTime = new Date(timeDate)
  }


  //传入的分钟数  转换成天、时、分 [天,时,分]
  timeStamp(minutes: any) {
    var day = Math.floor(minutes / 60 / 24);
    var hour = Math.floor(minutes / 60 % 24);
    var min = Math.floor(minutes % 60);
    let str: any = [day, hour, min]

    //三元运算符 传入的分钟数不够一分钟 默认为0分钟，else return 运算后的minutes 
    return str;
  }

  changeTag(a: any) {
    this.freeTravelModel.tag_id = a;
  }

  // 标签分类列表
  getCateList() {
    this.storeProductService.productCateList().subscribe(res => {
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
    this.freeTravelService.GetProductTagList(this.cateId).subscribe((res: any) => {
      for (let i of res.data) {
        this.tagList.push({ value: i.id, label: i.name });
      }
      this.getRegionList()
    })
    console.log(this.tagList, '  this.tagList');
  }

  // 区域
  getRegionList() {
    this.storeRegionService.getAllRegionList().subscribe(res => {
      this.nzOptions = res;
      console.log(this.detailId, 1234123421341234);
      if (this.detailId === undefined) {
        this.isSpinning = false
      } else {
        this.getDetail()
      }

    })
  }

  // 修改
  updateInfo() {
    this.setValue();
    // 验证表单
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    console.log(this.addForm.valid);
    if (this.addForm.valid) {
      this.freeTravelService.UpdateFreeTravelInfo(this.freeTravelModel).subscribe(res => {
        if (res.message == "更新成功") {
          this.router.navigate(['/store/main/storeFreeTravel']);
        }
      })
    }

  }

  // 添加
  AddInfo() {
    console.log(123);
    this.setValue();
    // 验证表单
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {
      this.freeTravelService.SaveFreeTravelInfo(this.freeTravelModel).subscribe(res => {
        if (res.message == "添加成功") {
          this.router.navigate(['/store/main/storeFreeTravel']);
        }
      })
    }
  }

  setValue() {
    if (this.detailId != undefined) {
      this.freeTravelModel.id = this.dataModel.id;
    }
    this.freeTravelModel.title = this.addForm.value.title;
    this.freeTravelModel.few_days = this.addForm.value.few_days;;
    this.freeTravelModel.few_nights = this.addForm.value.few_nights;
    this.freeTravelModel.service_phone = this.addForm.value.service_phone;
    this.freeTravelModel.reserve_ahead = this.addForm.value.reserve_ahead;
    if (parseInt(this.isReserveAhead) === 0) {
      this.freeTravelModel.earlier = 0;
    }
    else if (parseInt(this.isReserveAhead) === 1) {
      let earlier1 = this.addForm.value.earlier1
      let date = new Date(this.addForm.value.earlier2);
      let min = date.getMinutes();
      let hour = date.getHours();
      let resMin = earlier1 * 24 * 60 + hour * 60 + min;
      this.freeTravelModel.earlier = resMin
      console.log('拿到的值', this.freeTravelModel);
    }
    this.freeTravelModel.reserve_num = this.addForm.value.reserve_num;
    this.freeTravelModel.reserve_children = this.addForm.value.reserve_children;
    if (parseInt(this.isReserveChildren) === 0) {
      this.freeTravelModel.children_age = 0;
      this.freeTravelModel.child_height_min = 0;
      this.freeTravelModel.child_height_max = 0;
    }
    else if (parseInt(this.isReserveChildren) === 1) {
      this.freeTravelModel.children_age = this.addForm.value.children_age;
      this.freeTravelModel.child_height_min = this.addForm.value.child_height_min;
      this.freeTravelModel.child_height_max = this.addForm.value.child_height_max;
    }

    this.freeTravelModel.confirm = this.addForm.value.confirm;
    this.freeTravelModel.departure_city = this.departure_city[this.departure_city.length - 1]
    this.freeTravelModel.destination_city = this.valuesDestination_city[this.valuesDestination_city.length - 1]


  }


  // 富文本
  textChange() {
    // 预约须知
    const editorFee = new wangEditor("#editorFee", "#feeContent");
    // 产品详情

    this.feeBox.nativeElement.innerHTML = this.dataModel.fee
    this.freeTravelModel.fee = this.dataModel.fee

    editorFee.config.onchange = (newHtml: any) => {
      console.log("213123", newHtml);
      this.freeTravelModel.fee = newHtml;
    }
    // InsertABCMenu
    // 注册菜单
    editorFee.menus.extend('insertABC', InsertABCMenu)
    // 重新配置 editor.config.menus
    editorFee.config.menus = editorFee.config.menus.concat('insertABC')
    editorFee.config.customFunction = (insert: any) => {
      const modal: NzModalRef = this.modal.create({
        nzTitle: '图片上传',
        nzViewContainerRef: this.viewContainerRef,
        nzContent: CommonModelComponent,
        nzWidth: 660,
        nzFooter: null
      })
      modal.afterClose.subscribe(result => {
        let res = result?.data || []
        res.forEach((item: any) => {
          insert(item.url)
        });
      });
    }
    editorFee.create();

  }

  importImg() {
    const modal: NzModalRef = this.modal.create({
      nzTitle: '从图库导入资源',
      nzViewContainerRef: this.viewContainerRef,
      nzContent: ChooseGalleryComponent,
      nzWidth: 1105,
      nzFooter: null
    })
    modal.afterClose.subscribe(res => {
      let result = res || []
      result.forEach((item: any) => {
        this.feeList.push(item)
        if (this.feeList.length > 10) {
          this.msg.error('产品特色引用图片不能超过10张')
          return
        }
        this.feeBox.nativeElement.innerHTML += `<img src="${item.url}" style="max-width:100%;"/><br>`;
        console.log("this.addStoreProductModel.fee", this.freeTravelModel.fee)
      });
    });

  }


  isReserveAheadChange(status: any) {
    console.log(status, 'status');
    this.isReserveAhead = status;
    this.addForm.value.reserve_ahead = this.isReserveAhead
  }

  isReserveChildrenChange(status: any) {
    console.log(status, 'status');
    this.isReserveChildren = status
    this.addForm.value.reserve_children = this.isReserveChildren
  }



  // 只输入整数
  numTest($event: any) {
    $event.target.value = $event.target.value.replace(/[^\d]/g, '');
  }

}
