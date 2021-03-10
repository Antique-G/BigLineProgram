import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { StoreProductService } from '../../../../../../services/store/store-product/store-product.service';
import wangEditor from 'wangeditor';
import { MatDialog } from '@angular/material/dialog';
import { InsertABCMenu } from '../../../InsertABCMenu';
import { CommonModelComponent } from '../../../common/common-model/common-model.component';
import { ChooseGalleryComponent } from '../../../../../../app/layouts/choose-gallery/choose-gallery';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-store-product-editordetail',
  templateUrl: './store-product-editordetail.component.html',
  styleUrls: ['./store-product-editordetail.component.css']
})
export class StoreProductEditordetailComponent implements OnInit {
  @Output() tabIndex = new EventEmitter;
  @Input() addDataDetailModel: any;

  detailUpdateModel: any;
  @ViewChild("detailBox") detailBox: any;     //获取dom
  detailList: any[] = []    //图片

  addForm!: FormGroup;
  choose_trip_type = '1';
  addProductTrip: any;


  dayNum: any;


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


  // 按天添加行程
  tempId = 1;
  tripDayList = {
    dayList: [
      {
        day: this.tempId,
        title: null,
        product_id: '',
        content: '',
      }
    ]
  }



  constructor(public fb: FormBuilder, public storeProductService: StoreProductService, public dialog: MatDialog, private msg: NzMessageService,
    private modal: NzModalService, private viewContainerRef: ViewContainerRef) {
    this.addForm = this.fb.group({
      trip_type: ['1'],
      title: [''],
      imageList: this.fb.array([]),
    });

    this.detailUpdateModel = {
      step: 2,
      details: '',
      trip_type: 2
    };
    this.addProductTrip = {
      product_id: '',
      trip_type: 1,
      trip_arr: []
    }
  }

  ngOnInit(): void {
    console.log('父组件的值 ', this.addDataDetailModel);
    console.log("few_days", this.addDataDetailModel.few_days);
    this.dayNum = this.addDataDetailModel.few_days;

  }

  ngAfterViewInit(): void {
    // this.textChange();
    // // setTimeout(()=>：
    // //   this.create();},1000)
    this.dayEditor()

  }


  // 图片
  get imgageArray() {
    return this.addForm.get("imageList") as FormArray;
  }

  dayEditor() {
    for (var i = 0; i < this.dayNum;i++) {
      console.log('111111111 :>> ', i);
      this.imgageArray.push(this.fb.group({
        name: new FormControl(''),
      }))
      const newEditor = new wangEditor(`#newEditor${i + 1}`, `#newEditorContent${i + 1}`);
      newEditor.config.onchange = (newHtml: any) => {
        // this.tripDayList.dayList[index].content = newHtml;
      }
      // 配置菜单栏
      newEditor.config.menus = this.editMenu;
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
      newEditor.create();
      return
    }
    console.log('this.imgageArray :>> ', this.imgageArray);
  }


  // 富文本
  textChange() {
    // 详情
    const editorDetail = new wangEditor("#editorDetail", "#editorContent");
    if (this.addDataDetailModel?.details === undefined) {
      this.detailBox.nativeElement.innerHTML = '';
    }
    else {
      this.detailBox.nativeElement.innerHTML = this.addDataDetailModel.details;    //赋值
    }
    this.detailUpdateModel.details = this.addDataDetailModel?.details;
    editorDetail.config.onchange = (newHtml: any) => {
      this.detailUpdateModel.details = newHtml;
    }
    // 配置菜单栏
    editorDetail.config.menus = this.editMenu;
    // InsertABCMenu
    // 注册菜单
    editorDetail.menus.extend('insertABC', InsertABCMenu);
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
    editorDetail.create();

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
        this.detailList.push(item)
        if (this.detailList.length > 10) {
          this.msg.error('产品特色引用图片不能超过10张')
          return
        }
        this.detailBox.nativeElement.innerHTML += `<img src="${item.url}" style="max-width:100%;"/><br>`
      });
    });

  }




  addMore() {
    // 第二天开始
    this.tempId = this.tempId + 1;
    let obj = {
      day: this.tempId,
      title: null,
      product_id: '',
      content: '',

    };
    console.log("点击添加", this.tripDayList.dayList);

    this.tripDayList.dayList.push(obj);
    let length = this.tripDayList.dayList.length;
    let content = `#newEditor${this.tempId - 2}`;
    let id = `#newEditorContent${this.tempId - 2}`;
    console.log("423423423423", content, id);
    setTimeout(() => {
      this.create(content, id, length - 1);
    }, 1000);

    this.imgageArray.push(this.fb.group({
      name: new FormControl(''),
    }))
  }

  // 添加富文本
  create(content: any, detail: any, index: any) {
    const newEditor = new wangEditor(content, detail);
    newEditor.config.onchange = (newHtml: any) => {
      this.tripDayList.dayList[index].content = newHtml;
    }
    // 配置菜单栏
    newEditor.config.menus = this.editMenu;
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
    newEditor.create();

  }


  dayListSetValue() {
    console.log("this.addForm.value.imageList", this.addForm.value.imageList);
    console.log("43423423this.editorList", this.tripDayList.dayList);
    this.tripDayList.dayList[0].title = this.addForm.value.title;
    this.tripDayList.dayList[0].product_id = this.addDataDetailModel.id;
    this.tripDayList.dayList[0].content = this.detailUpdateModel.details;
    let newArr = this.tripDayList.dayList.shift()!;
    console.log("newArr", this.tripDayList.dayList);
    this.tripDayList.dayList.forEach((value: any, index: any) => {
      value.title = this.addForm.value.imageList[index].name;
      value.product_id = this.addDataDetailModel.id;
    });
    this.tripDayList.dayList.unshift(newArr);
    console.log("赋值后", this.tripDayList.dayList);
    this.addProductTrip.trip_arr = this.tripDayList.dayList;
    this.addProductTrip.trip_type = 1;
    this.addProductTrip.product_id = this.addDataDetailModel.id;
  }




  nextTab() {
    if (this.choose_trip_type === '2') {
      this.detailUpdateModel.id = this.addDataDetailModel.id;
      this.storeProductService.updateProduct(this.detailUpdateModel).subscribe(res => {
        if (res === null) {
          this.tabIndex.emit({ id: this.addDataDetailModel.id, tabIndex: 3 })
        }
      })
    }
    else if (this.choose_trip_type === '1') {
      this.dayListSetValue();
      this.storeProductService.addProductTrip(this.addProductTrip).subscribe(res => {
        console.log('结果是', res)
        this.tabIndex.emit({ id: this.addDataDetailModel.id, tabIndex: 3 })
      })

    }

  }





  importImgs(i: any) {
    console.log("i是什么", i)
    // this.imgageArray
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
        this.detailList.push(item)
        if (this.detailList.length > 10) {
          this.msg.error('产品特色引用图片不能超过10张')
          return
        }
        // 将图片传到文本框
        console.log("document.getElementById(`detailBox${i}`)!.innerHTML", document.getElementById(`detailBox${i}`)!.innerHTML)
        document.getElementById(`detailBox${i}`)!.innerHTML += `<img src="${item.url}" style="max-width:100%;"/><br>`;


      });
    });
  }


  changeVideo(event: any) {
    console.log('event123', event, event === 1, event === '1');
    if (event === '1') {
      setTimeout(() => {
        this.dayEditor();
      }, 5000)
    }
    else if (event === '2') {
      // setTimeout(() => {
      //   this.textChange();
      // }, 2000)
      this.textChange();
    }
  }


}

