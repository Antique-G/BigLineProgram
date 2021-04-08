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
  isLoadingBtn = false;

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
    'image'
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
      this.detailId = params?.detailDataId;
    });
    console.log('父组件的值 ', this.adminProductDetailModel);
    console.log("few_days", this.adminProductDetailModel.few_days);
    this.dayNum = localStorage.getItem("few_days");
    console.log('this.dayNum天数 ', this.dayNum);
    if (this.adminProductDetailModel?.trip_type.toString()) {
      this.choose_trip_type = this.adminProductDetailModel?.trip_type.toString()
    }
  }


  // Dom渲染富文本编辑器
  ngAfterViewInit() {
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
          newEditor.txt.html(this.adminProductDetailModel?.product_trip.data[i]?.content) // 重i新设置编辑器内容
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
      str = str.replace(/[\s\S.@]*\{[\s\S]*?\}/ig, '');
      return str
    }
    setTimeout(() => {
      editorDetail.create();
    }, 100)


  }



  dayListSetValue() {
    if (this.adminProductDetailModel.product_trip.data.length === 0) {
      console.log("this.addForm.value.dayList", this.addForm.value.dayList);
      this.dayListData.forEach((element: any, index: any) => {
        element.title = this.addForm.value.dayList[index].name;
        element.product_id = this.detailId;
        element['id'] = 0;
      });
    }
    else {
      this.dayListData.forEach((element: any, index: any) => {
        element.title = this.addForm.value.dayList[index].name;
        element.product_id = this.detailId;
        if (this.adminProductDetailModel.product_trip.data[index]?.id === undefined || this.adminProductDetailModel.product_trip.data[index]?.id === 0) {
          element['id'] = 0;
        }
        else {
          element['id'] = this.adminProductDetailModel.product_trip.data[index].id;
        }
      });
    }
    console.log('this.dayList :>>23423423423 ', this.dayListData);
    this.addProductTrip.trip_arr = this.dayListData;
    this.addProductTrip.product_id = this.detailId;
    this.addProductTrip.trip_type = 1;
  }



  nextTab() {
    this.isLoadingBtn = true;
    if (this.choose_trip_type === '2') {
      this.detailUpdateModel.id = this.detailId;
      this.adminProductManagementService.updateProduct(this.detailUpdateModel).subscribe(res => {
        this.isLoadingBtn = false;
      },
        error => {
          this.isLoadingBtn = false;
        })
    }
    else if (this.choose_trip_type === '1') {
      this.dayListSetValue();
      let flag = this.dayListData.every((ele: any) => ele.title != null && ele.content != '')
      console.log('flag :>> ', flag);
      if (flag) {
        this.adminProductManagementService.addProductTrip(this.addProductTrip).subscribe(res => {
          this.isLoadingBtn = false;
          if (this.dayNum < this.adminProductDetailModel.product_trip.data.length) {
            let newIds: any[] = [];
            this.adminProductDetailModel.product_trip.data.forEach((element: any, index: any) => {
              if (element.id != this.dayListData[index]?.id) {
                newIds.push(element.id);
              }
            });
            this.delids = newIds;
            this.adminProductManagementService.deleteProductTrip(this.delids).subscribe(res => {
              console.log('res :>> ', res);
            })
          }

        },
          error => {
            this.isLoadingBtn = false;
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
