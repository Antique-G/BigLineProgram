import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import wangEditor from 'wangeditor';
import { StoreGoodsService } from '../../../../../../services/store/store-goods/store-goods.service';
import { ChooseGoodsGalleryComponent } from '../../../common/choose-goods-gallery/choose-goods-gallery.component';
import { UploadGoodsImgComponent } from '../../../common/upload-goods-img/upload-goods-img.component';
import { InsertABCMenu } from '../../../InsertABCMenu';


@Component({
    selector: 'app-store-goods-pro-editdetail',
    templateUrl: './store-goods-pro-editdetail.component.html',
    styleUrls: ['./store-goods-pro-editdetail.component.css']
})
export class StoreGoodsProEditdetailComponent implements OnInit {
    @ViewChild("detailBox") detailBox: any;       //获取dom
    @Output() tabIndex = new EventEmitter;
    @Input() addDataDetailModel: any;
    dataModel: any;
    detailList: any[] = [];
    isLoadingBtn = false;


    reqModel = {
        id: '',
        step: 1,
        details: '',
    }

    isUpdateId:any;

    constructor(public dialog: MatDialog, private msg: NzMessageService,
        public storeGoodsService: StoreGoodsService,public activatedRoute: ActivatedRoute,
        private modal: NzModalService, private viewContainerRef: ViewContainerRef) { }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            this.isUpdateId = params?.detailId;
          });
    }


    // 拿到id
    ngOnChanges(changes: SimpleChanges) {
        if (changes['addDataDetailModel'] && changes['addDataDetailModel'].currentValue) {
            this.dataModel = changes['addDataDetailModel'].currentValue;
            console.log("645645645",this.dataModel)
            this.reqModel.id = this.dataModel.id;
        }
    }



    ngAfterViewInit() {
        this.textChange();
    }


    updateInfo() {
        this.isLoadingBtn = true;
        console.log('请求值', this.reqModel);
        this.storeGoodsService.updateGoods(this.reqModel).subscribe(res => {
            this.isLoadingBtn = false;
            this.tabIndex.emit({ id: this.reqModel.id, tabIndex: 2 })
        }
            ,
            error => {
                this.isLoadingBtn = false;
            })
    }



    importImg() {
        const modal: NzModalRef = this.modal.create({
            nzTitle: '从图库导入资源',
            nzViewContainerRef: this.viewContainerRef,
            nzContent: ChooseGoodsGalleryComponent,
            nzComponentParams: {
                data: '0'
            },
            nzWidth: 1105,
            nzFooter: null
        })
        modal.afterClose.subscribe(res => {
            let result = res || []
            result.forEach((item: any) => {
                this.detailList.push(item)
                this.detailBox.nativeElement.innerHTML += `<img src="${item.url}" style="max-width:100%;"/><br>`
            });
        });

    }

    // 富文本
    textChange() {
        const editorDetail = new wangEditor("#editorDetail", "#editorDetailContent");

        // 商品详情
        if (this.dataModel != undefined) {
            this.detailBox.nativeElement.innerHTML = this.dataModel.details;
            this.reqModel.details = this.dataModel.details;
        }
        editorDetail.config.onchange = (newHtml: any) => {
            this.reqModel.details = newHtml;
        }
        // 配置菜单栏
        editorDetail.config.menus = [
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
                nzContent: UploadGoodsImgComponent,
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

}
