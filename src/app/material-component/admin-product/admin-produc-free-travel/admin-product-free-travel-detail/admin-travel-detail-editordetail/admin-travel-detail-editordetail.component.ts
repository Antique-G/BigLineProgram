import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AdminProductFreeTravelService } from '../../../../../../services/admin/admin-product-free-travel.service';
import wangEditor from 'wangeditor';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';



@Component({
  selector: 'app-admin-travel-detail-editordetail',
  templateUrl: './admin-travel-detail-editordetail.component.html',
  styleUrls: ['./admin-travel-detail-editordetail.component.css']
})
export class AdminTravelDetailEditordetailComponent implements OnInit {
  @Input() dataFreeDetailModel: any;
  @ViewChild("detailBox") detailBox: any;     //获取dom
  detailUpdateModel: any;
  detailId: any;


  addForm!: FormGroup;
  dayNum: any;
  // 按天添加行程
  dayListData: any;
  addProductTrip: any;
  choose_trip_type = '1';
  isSpecial = true;
  delids: any[] = [];





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
  imgArray: any


  constructor(public fb: FormBuilder, public dialog: MatDialog, public activatedRoute: ActivatedRoute,
    public adminProductFreeTravelService: AdminProductFreeTravelService, private msg: NzMessageService,) {
    this.addForm = this.fb.group({
      trip_type: ['1'],
      title: [''],
      dayList: this.fb.array([]),
    });
    this.detailUpdateModel = {
      step: 1,
      details: '',
      trip_type: 2
    }
    this.addProductTrip = {
      product_id: '',
      trip_type: 1,
      trip_arr: []
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.detailId = JSON.parse(params["detailId"]);
    });
    console.log('父组件的值 ', this.dataFreeDetailModel);
    console.log("few_days", this.dataFreeDetailModel.few_days);
    this.dayNum = localStorage.getItem("few_days");
    console.log('this.dayNum1111111 ', this.dayNum);
    if (this.dataFreeDetailModel?.trip_type.toString()) {
      this.choose_trip_type = this.dataFreeDetailModel?.trip_type.toString()
    }
  }

  // Dom渲染富文本编辑器
  ngAfterViewInit() {
    let arr: any[] = [];
    for (let i = 0; i < this.dayNum; i++) {
      let obj = {
        day: i + 1,
        title: '',
        inden_product_id: '',
        content: '',
      }
      arr.push(obj);
      this.dayListData = arr;
    }
    console.log(' 便利dayListData ', this.dayListData);
    this.dayArray.controls = [];
    setTimeout(() => {
      this.dayEditor();
      setTimeout(() => {
        this.textChange();
      }, 1000);
    }, 100);

  }


  // 行程
  get dayArray() {
    return this.addForm.get("dayList") as FormArray;
  }


  dayEditor() {
    for (let i = 0; i < this.dayNum; i++) {
      this.dayArray.push(this.fb.group({
        name: new FormControl(this.dataFreeDetailModel.product_trip.data[i]?.title),
      }))
      const newEditor = new wangEditor(`#newEditor${i + 1}`, `#newEditorContent${i + 1}`);
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
        if (this.dataFreeDetailModel?.product_trip.data.length === 0) {
          newEditor.txt.html()
        }
        else {
          newEditor.txt.html(this.dataFreeDetailModel?.product_trip.data[i]?.content) // 重i新设置编辑器内容

        }
      }, 100)
    }
    console.log('this.dayArray :>> ', this.dayArray);
  }




  // 富文本
  textChange() {
    // 详情
    const editorDetail = new wangEditor("#editorDetail", "#editorContent");
    console.log("拿到的details", this.dataFreeDetailModel?.details)
    this.detailBox.nativeElement.innerHTML = this.dataFreeDetailModel.details;    //赋值
    this.detailUpdateModel.details = this.dataFreeDetailModel.details;
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
    if (this.dataFreeDetailModel.product_trip.data.length === 0) {
      console.log("this.addForm.value.dayList", this.addForm.value.dayList);
      this.dayListData.forEach((element: any, index: any) => {
        element.title = this.addForm.value.dayList[index].name;
        element.inden_product_id = this.dataFreeDetailModel.id;
        element['id'] = 0;
      });
    }
    else {
      this.dayListData.forEach((element: any, index: any) => {
        element.title = this.addForm.value.dayList[index].name;
        element.inden_product_id = this.dataFreeDetailModel.id;
        if (this.dataFreeDetailModel.product_trip.data[index]?.id === undefined || this.dataFreeDetailModel.product_trip.data[index]?.id === 0) {
          element['id'] = 0;
        }
        else {
          element['id'] = this.dataFreeDetailModel.product_trip.data[index].id;
        }
      });
    }
    console.log('this.dayList :>>23423423423 ', this.dayListData);
    this.addProductTrip.trip_arr = this.dayListData;
    this.addProductTrip.product_id = this.dataFreeDetailModel.id;
    this.addProductTrip.trip_type = 1;
  }



  nextTab() {
    if (this.choose_trip_type === '2') {
      this.detailUpdateModel.id = this.detailId;
      this.adminProductFreeTravelService.freeTravelUpdate(this.detailUpdateModel).subscribe(res => {
      })
    }
    else if (this.choose_trip_type === '1') {
      this.dayListSetValue();
      let flag = this.dayListData.every((ele: any) => ele.title != null && ele.content != '')
      console.log('flag :>> ', flag);
      if (flag) {
        this.adminProductFreeTravelService.addFreeTrip(this.addProductTrip).subscribe(res => {
          if (this.dayNum < this.dataFreeDetailModel.product_trip.data.length) {
            let newIds: any[] = [];
            this.dataFreeDetailModel.product_trip.data.forEach((element: any, index: any) => {
              if (element.id != this.dayListData[index]?.id) {
                newIds.push(element.id);
              }
            });
            this.delids = newIds;
            this.adminProductFreeTravelService.deleteProductTrip(this.delids).subscribe(res => {
              console.log('res :>> ', res);
            })
          }

        })
      }
      else if (!flag) {
        this.msg.error("请填写具体行程");
      }

    }

  }

  changeVideo(event: any) {
    console.log('event123', event, event === 1, event === '1');
    // 初始化富文本编辑器
    if (event === '1') {
      this.choose_trip_type === '1';
      this.isSpecial = true;

    }
    else if (event === '2') {
      this.choose_trip_type === '2';
      this.isSpecial = false;

    }
  }


}
