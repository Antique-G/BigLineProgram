import { Component, Input, OnInit, ViewChild, OnChanges, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { ChooseGalleryComponent } from '../../../../../layouts/choose-gallery/choose-gallery';
import wangEditor from 'wangeditor';
import { InsertABCMenu } from '../../../InsertABCMenu';
import { CommonModelComponent } from '../../../common/common-model/common-model.component';
import { SimpleChanges } from '@angular/core';
import { StoreProductTreeTravelService } from '../../../../../../services/store/store-product-free-travel/store-product-tree-travel.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-store-travel-detail-desc',
  templateUrl: './store-travel-detail-desc.component.html',
  styleUrls: ['./store-travel-detail-desc.component.css']
})
export class StoreTravelDetailDescComponent implements OnInit {
  @Input() dataDetailModel: any;
  dataModel: any
  featureList: any[] = []
  reqModel = {
    id: 0,
    step: 1,
    details: '',
    trip_type: 2
  }
  @ViewChild("detailBox") detailBox: any;       //获取dom


  addForm!: FormGroup;
  dayNum: any;
  // 按天添加行程
  dayListData: any;
  addProductTrip: any;
  choose_trip_type = '1';
  isSpecial = true;



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


  constructor(public fb: FormBuilder, public dialog: MatDialog, private msg: NzMessageService,
    private freeTravelService: StoreProductTreeTravelService, public router: Router,
    private modal: NzModalService, private viewContainerRef: ViewContainerRef) {
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
    console.log('父组件的值 ', this.dataDetailModel);
    console.log("few_days", this.dataDetailModel.few_days);
    this.dayNum = localStorage.getItem("few_days");
    if (this.dataDetailModel?.trip_type.toString()) {
      this.choose_trip_type = this.dataDetailModel?.trip_type.toString()
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
        name: new FormControl(this.dataDetailModel.product_trip.data[i]?.title),
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
      // 注册菜单
      newEditor.menus.extend('insertABC', InsertABCMenu)
      // 重新配置 editor.config.menus
      newEditor.config.menus = newEditor.config.menus.concat('insertABC')
      newEditor.config.customFunction = (insert: any) => {
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
      setTimeout(() => {
        newEditor.create();
        if (this.dataDetailModel?.product_trip.data.length === 0) {
          newEditor.txt.html()
        }
        else {
          newEditor.txt.html(this.dataDetailModel?.product_trip.data[i]?.content) // 重i新设置编辑器内容
        }
      }, 100)
    }
    console.log('this.dayArray :>> ', this.dayArray);
  }



  importImg() {
    const modal: NzModalRef = this.modal.create({
      nzTitle: '从图库导入资源',
      nzViewContainerRef: this.viewContainerRef,
      nzContent: ChooseGalleryComponent,
      nzComponentParams: {
        data: 1
      },
      nzWidth: 1105,
      nzFooter: null
    })
    modal.afterClose.subscribe(res => {
      let result = res || []
      result.forEach((item: any) => {
        this.featureList.push(item)
        if (this.featureList.length > 10) {
          this.msg.error('产品详情引用图片不能超过10张')
          return
        }
        this.detailBox.nativeElement.innerHTML += `<img src="${item.url}" style="max-width:100%;"/><br>`
      });
    });

  }

  // 富文本
  textChange() {
    const editorDetail = new wangEditor("#editorDetail", "#editorContent");
    // 产品详情
    if (this.dataModel != undefined) {
      this.detailBox.nativeElement.innerHTML = this.dataModel.details
      this.reqModel.details = this.dataModel.details
    }
    editorDetail.config.onchange = (newHtml: any) => {
      this.reqModel.details = newHtml;
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
    // InsertABCMenu
    // 注册菜单
    editorDetail.menus.extend('insertABC', InsertABCMenu)
    // 重新配置 editor.config.menus
    editorDetail.config.menus = editorDetail.config.menus.concat('insertABC')
    editorDetail.config.customFunction = (insert: any) => {
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
    setTimeout(() => {
      editorDetail.create();
    }, 100)

  }


  dayListSetValue() {
    if (this.dataDetailModel.product_trip.data.length === 0) {
      console.log("this.addForm.value.dayList", this.addForm.value.dayList);
      this.dayListData.forEach((element: any, index: any) => {
        element.title = this.addForm.value.dayList[index].name;
        element.inden_product_id = this.dataDetailModel.id;
        element['id'] = 0;
      });
    }
    else {
      this.dayListData.forEach((element: any, index: any) => {
        element.title = this.addForm.value.dayList[index].name;
        element.inden_product_id = this.dataDetailModel.id;
        if (this.dataDetailModel.product_trip.data[index]?.id === undefined || this.dataDetailModel.product_trip.data[index]?.id === 0) {
          element['id'] = 0;
        }
        else {
          element['id'] = this.dataDetailModel.product_trip.data[index].id;
        }
      });
    }
    console.log('this.dayList :>>23423423423 ', this.dayListData);
    this.addProductTrip.trip_arr = this.dayListData;
    this.addProductTrip.product_id = this.dataDetailModel.id;
    this.addProductTrip.trip_type = 1;
  }



  nextTab() {
    console.log('请求值', this.reqModel);
    if (this.choose_trip_type === '2') {
      this.freeTravelService.UpdateFreeTravelInfo(this.reqModel).subscribe(res => {

      })
    }
    else if (this.choose_trip_type === '1') {
      this.dayListSetValue();
      let flag = this.dayListData.every((ele: any) => ele.title != null && ele.content != '')
      console.log('flag :>> ', flag);
      if (flag) {
        this.freeTravelService.addProductTrip(this.addProductTrip).subscribe(res => {
          console.log('结果是', res)
        })
      }
      else if (!flag) {
        this.msg.error("请填写具体行程");
      }
    }

  }



  importImgs(i: any) {
    console.log("i是什么", i)
    const modal: NzModalRef = this.modal.create({
      nzTitle: '从图库导入资源',
      nzViewContainerRef: this.viewContainerRef,
      nzContent: ChooseGalleryComponent,
      nzComponentParams: {
        data: 1
      },
      nzWidth: 1105,
      nzFooter: null
    })
    modal.afterClose.subscribe(res => {
      let result = res || []
      result.forEach((item: any) => {
        this.featureList.push(item)
        if (this.featureList.length > 10) {
          this.msg.error('产品特色引用图片不能超过10张')
          return
        }
        // 将图片传到文本框
        console.log("document.getElementById(`detailBox${i}`)!.innerHTML", document.getElementById(`detailBox${i}`)!.innerHTML)
        document.getElementById(`detailBox${i}`)!.innerHTML += `<img src="${item.url}" style="max-width:100%;"/><br>`
      });
    });
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


  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataDetailModel'] && changes['dataDetailModel'].currentValue) {
      this.dataModel = changes['dataDetailModel'].currentValue
      console.log('dataDetailModel', this.dataModel);
      this.reqModel.id = this.dataModel.id
    }
  }
}
