import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  isName: any
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


  // 按天添加行程
  dayListData: any;
  isSpecial = true;



  constructor(public fb: FormBuilder, public storeProductService: StoreProductService, public dialog: MatDialog, private msg: NzMessageService,
    private modal: NzModalService, private viewContainerRef: ViewContainerRef) {
    this.addForm = this.fb.group({
      trip_type: ['1'],
      title: [''],
      dayList: this.fb.array([]),
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
    this.dayNum = localStorage.getItem("few_days");
    if (this.addDataDetailModel?.trip_type.toString()) {
      this.choose_trip_type = this.addDataDetailModel?.trip_type.toString()
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
        name: new FormControl(this.addDataDetailModel.product_trip.data[i]?.title),
      }))
      const newEditor = new wangEditor(`#newEditor${i + 1}`, `#newEditorContent${i + 1}`);
      newEditor.config.onchange = (newHtml: any) => {
        this.dayListData[i].content = newHtml;
      }
      // 配置菜单栏
      newEditor.config.menus = this.editMenu;
      // 配置菜单栏
      newEditor.config.menus = this.editMenu;
      // 对粘贴的文本进行处理
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
        console.log('this.addDataDetailModel?.product_trip.data === [] :>> ', this.addDataDetailModel?.product_trip.data.length === 0, this.addDataDetailModel?.product_trip.data === []);
        if (this.addDataDetailModel?.product_trip.data.length === 0) {
          newEditor.txt.html()
        }
        else {
          newEditor.txt.html(this.addDataDetailModel?.product_trip.data[i]?.content) // 重i新设置编辑器内容
        }
      }, 100)


    }
    console.log('this.dayArray :>> ', this.dayArray);
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

    setTimeout(() => {
      editorDetail.create();
    }, 100)

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




  dayListSetValue() {
    console.log('6867867 ', this.addDataDetailModel.product_trip.data, this.addDataDetailModel.product_trip.data.length === 0);
    if (this.addDataDetailModel.product_trip.data.length === 0) {
      console.log("this.addForm.value.dayList", this.addForm.value.dayList);
      this.dayListData.forEach((element: any, index: any) => {
        element.title = this.addForm.value.dayList[index].name;
        element.product_id = this.addDataDetailModel.id;
        element['id'] = 0;
      });
    }
    else {
      this.dayListData.forEach((element: any, index: any) => {
        element.title = this.addForm.value.dayList[index].name;
        element.product_id = this.addDataDetailModel.id;
        if (this.addDataDetailModel.product_trip.data[index]?.id === undefined || this.addDataDetailModel.product_trip.data[index]?.id === 0) {
          element['id'] = 0;
        }
        else {
          element['id'] = this.addDataDetailModel.product_trip.data[index].id;
        }
      });
    }
    console.log('this.dayList :>>23423423423 ', this.dayListData);
    this.addProductTrip.trip_arr = this.dayListData;
    this.addProductTrip.product_id = this.addDataDetailModel.id;
    this.addProductTrip.trip_type = 1;

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
      let flag = this.dayListData.every((ele: any) => ele.title != null && ele.content != '')
      console.log('flag :>> ', flag);
      if (flag) {
        this.storeProductService.addProductTrip(this.addProductTrip).subscribe(res => {
          if (this.dayNum < this.addDataDetailModel.product_trip.data.length) {
            let newIds: any[] = [];
            this.addDataDetailModel.product_trip.data.forEach((element: any, index: any) => {
              if (element.id != this.dayListData[index]?.id) {
                newIds.push(element.id);
              }
            });
            this.delids = newIds;
            this.storeProductService.deleteProductTrip(this.delids).subscribe(res => {
              this.tabIndex.emit({ id: this.addDataDetailModel.id, tabIndex: 3 })
            })
          }
          this.tabIndex.emit({ id: this.addDataDetailModel.id, tabIndex: 3 })

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
        this.detailList.push(item)
        if (this.detailList.length > 10) {
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

