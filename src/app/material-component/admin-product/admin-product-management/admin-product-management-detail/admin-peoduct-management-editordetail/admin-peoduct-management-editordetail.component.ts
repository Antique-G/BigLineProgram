import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import wangEditor from 'wangeditor';
import { AdminProductManagementService } from '../../../../../../services/admin/admin-product-management.service';



@Component({
  selector: 'app-admin-peoduct-management-editordetail',
  templateUrl: './admin-peoduct-management-editordetail.component.html',
  styleUrls: ['./admin-peoduct-management-editordetail.component.css']
})
export class AdminPeoductManagementEditordetailComponent implements OnInit {
  @Input() adminProductDetailModel: any;
  @ViewChild("detailBox") detailBox: any;     //获取dom
  detailUpdateModel: any;
  detailId: any;

  addForm!: FormGroup;
  dayNum: any;
  // 按天添加行程
  dayListData: any;
  addProductTrip: any;
  choose_trip_type = '1';



  editMenu = [
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
  ]



  constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute,
    public adminProductManagementService: AdminProductManagementService, private msg: NzMessageService,) {
    this.detailUpdateModel = {
      step: 2,
      details: '',
      trip_type: 2
    }
    this.addForm = this.fb.group({
      trip_type: ['1'],
      title: [''],
      dayList: this.fb.array([]),
    });
    this.addProductTrip = {
      product_id: '',
      trip_type: 1,
      trip_arr: []
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.detailId = JSON.parse(params["detailDataId"]);
    });
    console.log('父组件的值 ', this.adminProductDetailModel);
    console.log("few_days", this.adminProductDetailModel.few_days);
    this.dayNum = this.adminProductDetailModel.few_days;
  }


  // 行程
  get dayArray() {
    return this.addForm.get("dayList") as FormArray;
  }


  dayEditor() {
    for (let i = 0; i < this.dayNum; i++) {
      this.dayArray.push(this.fb.group({
        name: new FormControl(this.adminProductDetailModel.product_trip.data[i]?.title),
      }))
      const newEditor = new wangEditor(`#newEditor${i + 1}`, `#newEditorContent${i + 1}`);
      if (this.adminProductDetailModel?.product_trip.data === []) {
        document.getElementById(`detailBox${i}`)!.innerHTML = '';
      }
      else {
        this.adminProductDetailModel?.product_trip.data.forEach((element: any, index: any) => {
          console.log("ele,=", element, document.getElementById(`detailBox${i}`))
        });
      }
      newEditor.config.onchange = (newHtml: any) => {
        this.dayListData[i].content = newHtml;
      }
      // 配置菜单栏
      newEditor.config.menus = this.editMenu;
      newEditor.config.pasteFilterStyle = false;
      newEditor.config.pasteTextHandle = function (pasteStr: any) {
        //  去除wps文档复制过来的style样式
        let str = pasteStr
        str = str.replace(/[\s\S.@]*{[\s\S]*?}/ig, '');
        return str
      }
      setTimeout(() => {
        newEditor.create();
        if (this.adminProductDetailModel?.product_trip.data.length === 0) {
          newEditor.txt.html()
        }
        else {
          newEditor.txt.html(this.adminProductDetailModel?.product_trip.data[i].content) // 重i新设置编辑器内容
        }
      }, 100)
    }
    console.log('this.dayArray :>> ', this.dayArray);
  }






  // 富文本
  textChange() {
    // 详情
    const editorDetail = new wangEditor("#editorDetail", "#editorContent");
    console.log("拿到的details", this.adminProductDetailModel?.details)
    this.detailBox.nativeElement.innerHTML = this.adminProductDetailModel.details;    //赋值
    this.detailUpdateModel.details = this.adminProductDetailModel.details;
    editorDetail.config.onchange = (newHtml: any) => {
      this.detailUpdateModel.details = newHtml;
    }
    // 配置菜单栏
    editorDetail.config.menus = this.editMenu;
    // 对粘贴的文本进行处理
    editorDetail.config.pasteFilterStyle = false;
    editorDetail.config.pasteTextHandle = function (pasteStr: any) {
      //  去除wps文档复制过来的style样式
      let str = pasteStr
      str = str.replace(/[\s\S.@]*{[\s\S]*?}/ig, '');
      return str
    }
    setTimeout(() => {
      editorDetail.create();
    }, 100)


  }



  dayListSetValue() {
    console.log("this.addForm.value.dayList", this.addForm.value.dayList);
    this.dayListData.forEach((element: any, index: any) => {
      element.title = this.addForm.value.dayList[index].name;
      element.product_id = this.detailId;
      element['id'] = this.adminProductDetailModel.product_trip.data[index].id

    });
    console.log('this.dayList :>>23423423423 ', this.dayListData);
    this.addProductTrip.trip_arr = this.dayListData;
    this.addProductTrip.product_id = this.detailId;
    this.addProductTrip.trip_type = 1;
  }



  nextTab() {
    if (this.choose_trip_type === '2') {
      this.detailUpdateModel.id = this.detailId;
      this.adminProductManagementService.updateProduct(this.detailUpdateModel).subscribe(res => {

      })
    }
    else if (this.choose_trip_type === '1') {
      this.dayListSetValue();
      let flag = this.dayListData.every((ele: any) => ele.title != null && ele.content != '')
      console.log('flag :>> ', flag);
      if (flag) {
        this.adminProductManagementService.addProductTrip(this.addProductTrip).subscribe(res => {
        })
      }
      else if (!flag) {
        this.msg.error("请填写具体行程");
      }


    }

  }

  changeVideo(event: any) {
    console.log('event123', event, event === 1, event === '1');
    let arr: any[] = [];
    for (let i = 0; i < this.dayNum; i++) {
      let obj = {
        day: i + 1,
        title: '',
        product_id: '',
        content: '',
      }
      arr.push(obj);
      this.dayListData = arr;
    }
    console.log(' 便利dayListData ', this.dayListData);
    // 初始化富文本编辑器
    if (event === '1') {
      this.dayArray.controls = [];
      setTimeout(() => {
        this.dayEditor();
      }, 100)
    }
    else if (event === '2') {
      setTimeout(() => {
        this.textChange();
      }, 100)
    }
  }


}
