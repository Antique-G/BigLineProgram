import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { StoreProductService } from '../../../../../../services/store/store-product/store-product.service';
import wangEditor from 'wangeditor';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InsertABCMenu } from '../../../InsertABCMenu';
import { CommonModelComponent } from '../../../common/common-model/common-model.component';
import { ChooseGalleryComponent } from '../../../../../../app/layouts/choose-gallery/choose-gallery';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-store-product-management-detail-editordetail',
  templateUrl: './store-product-management-detail-editordetail.component.html',
  styleUrls: ['./store-product-management-detail-editordetail.component.css']
})
export class StoreProductManagementDetailEditordetailComponent implements OnInit {
  detailUpdateModel: any;
  @Input() dataDetailModel: any;
  @ViewChild("detailBox") detailBox: any;     //获取dom
  detailList: any[] = []    //图片

  detailId: any;

  addForm!: FormGroup;
  choose_trip_type = '1';
  addProductTrip: any;
  newArray: any[] = [];


  tripDayList = {
    dayList: [
      {
        day: 1,
        title: null,
        product_id: '',
        content: '',
        id: 1
      }
    ]
  }


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

  constructor(public fb: FormBuilder, public storeProductService: StoreProductService, public activatedRoute: ActivatedRoute,
    public dialog: MatDialog, private msg: NzMessageService, private modal: NzModalService, private viewContainerRef: ViewContainerRef) {
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
    this.activatedRoute.queryParams.subscribe(params => {
      this.detailId = JSON.parse(params["detailDataId"]);
    });
    // console.log("dataDetailModel是什么", this.dataDetailModel, this.dataDetailModel.product_trip.data);
    // this.choose_trip_type = this.dataDetailModel.trip_type.toString();
    // // 按天添加
    // if (this.choose_trip_type === '1') {
    //   this.addForm.patchValue({
    //     title: this.dataDetailModel.product_trip.data[0].title
    //   })
    //   let dayList = this.dataDetailModel.product_trip.data;
    //   dayList.forEach((element: any, index: any) => {
    //     if (element.day != 1) {
    //       this.newArray.push(element)
    //     }
    //     console.log("imgArray111", this.newArray, dayList);
    //   });
    //   this.newArray.forEach((element: any, index: any) => {
    //     (this.addForm.controls['imageList'] as FormArray).push(new FormGroup({
    //       name: new FormControl(element.title)
    //     }));
    //     setTimeout(() => {
    //       const newEditor = new wangEditor(`#newEditor${index}`, `#newEditorContent${index}`);
    //       document.getElementById(`detailBox${index}`)!.innerHTML = element.content;
    //       console.log(' `element.content` :>> ', element.content);
    //       newEditor.config.onchange = (newHtml: any) => {
    //         this.newArray[index].content = newHtml;
    //       }
    //       // 配置菜单栏
    //       newEditor.config.menus = this.editMenu;
    //       // 注册菜单
    //       newEditor.menus.extend('insertABC', InsertABCMenu)
    //       // 重新配置 editor.config.menus
    //       newEditor.config.menus = newEditor.config.menus.concat('insertABC')
    //       newEditor.config.customFunction = (insert: any) => {
    //         const modal: NzModalRef = this.modal.create({
    //           nzTitle: '图片上传',
    //           nzViewContainerRef: this.viewContainerRef,
    //           nzContent: CommonModelComponent,
    //           nzWidth: 660,
    //           nzFooter: null
    //         })
    //         modal.afterClose.subscribe(result => {
    //           let res = result?.data || []
    //           res.forEach((item: any) => {
    //             insert(item.url)
    //           });
    //         });
    //       }
    //       newEditor.create();
    //     }, 500);
    //   })
    // }



  }

  ngAfterViewInit(): void {
    this.textChange();
  }



  // 图片
  get imgageArray() {
    return this.addForm.get("imageList") as FormArray;
  }


  // 富文本
  textChange() {
    // 详情
    const editorDetail = new wangEditor("#editorDetail", "#editorContent");
    this.detailBox.nativeElement.innerHTML = this.dataDetailModel.details;    //赋值
    this.detailUpdateModel.details = this.dataDetailModel.details;
    editorDetail.config.onchange = (newHtml: any) => {
      this.detailUpdateModel.details = newHtml;
    }
    // if (this.dataDetailModel.trip_type === 2) {
    //   this.detailBox.nativeElement.innerHTML = this.dataDetailModel.details;    //赋值
    //   this.detailUpdateModel.details = this.dataDetailModel.details;
    //   editorDetail.config.onchange = (newHtml: any) => {
    //     this.detailUpdateModel.details = newHtml;
    //   }
    // }
    // else if (this.dataDetailModel.trip_type === 1) {
    //   this.detailBox.nativeElement.innerHTML = this.dataDetailModel.product_trip.data[0].content;    //赋值
    //   editorDetail.config.onchange = (newHtml: any) => {
    //     this.detailUpdateModel.details = newHtml;
    //   }
    // }
    // 配置菜单栏
    editorDetail.config.menus = this.editMenu;
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
    editorDetail.create();

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
        this.detailList.push(item)
        if (this.detailList.length > 10) {
          this.msg.error('产品特色引用图片不能超过10张')
          return
        }
        this.detailBox.nativeElement.innerHTML += `<img src="${item.url}" style="max-width:100%;"/><br>`
      });
    });


  }



  nextTab() {
    this.detailUpdateModel.id = this.detailId;
    this.storeProductService.updateProduct(this.detailUpdateModel).subscribe(res => {
    })
    // if (this.choose_trip_type === '2') {
    //   this.detailUpdateModel.id = this.detailId;
    //   this.storeProductService.updateProduct(this.detailUpdateModel).subscribe(res => {
    //   })
    // }
    // else if (this.choose_trip_type === '1') {
    //   this.dayListSetValue();
    //   this.storeProductService.addProductTrip(this.addProductTrip).subscribe(res => {
    //     console.log('结果是', res)

    //   })

    // }
  }


  dayListSetValue() {
    console.log("this.addForm.value.imageList", this.addForm.value.imageList);
    this.tripDayList.dayList[0].day = this.dataDetailModel.product_trip.data[0].day;
    this.tripDayList.dayList[0].title = this.addForm.value.title;
    this.tripDayList.dayList[0].product_id = this.detailId;
    this.tripDayList.dayList[0].content = this.detailUpdateModel.details;
    this.tripDayList.dayList[0].id = this.dataDetailModel.product_trip.data[0].id;
    console.log("43423423this.editorList", this.tripDayList.dayList);

    this.newArray[0].title = this.addForm.value.imageList[0].name;
    this.newArray[1].title = this.addForm.value.imageList[1].name;
    console.log("this.newArray", this.newArray);

    console.log("this.dataDetailModel.product_trip.data是什么", this.dataDetailModel.product_trip.data);
    console.log('拼接后的this.tripDayList.dayList ', this.tripDayList.dayList);
    this.addProductTrip.trip_arr = this.tripDayList.dayList.concat(this.newArray);
    this.addProductTrip.trip_type = 1;
    this.addProductTrip.product_id = this.detailId;
    console.log("提交的是", this.addProductTrip)

  }




  addMore() {

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



  remove() { }
}


