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
    selector: 'app-store-goods-pro-editnotice',
    templateUrl: './store-goods-pro-editnotice.component.html',
    styleUrls: ['./store-goods-pro-editnotice.component.css']
})
export class StoreGoodsProEditnoticeComponent implements OnInit {
    @ViewChild("noticeBox") noticeBox: any;       //获取dom
    @Output() tabIndex = new EventEmitter;
    @Input() addDataDetailModel: any;
    dataModel: any;
    noticeList: any[] = [];
    isLoadingBtn = false;


    reqModel = {
        id: '',
        step: 2,
        notice: '',
    }


    isUpdateId: any;
    
    
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
            console.log("64564564588888", this.dataModel)
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
            this.tabIndex.emit({ id: this.reqModel.id, tabIndex: 3 })
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
                data:'0'
            },
            nzWidth: 1105,
            nzFooter: null
        })
        modal.afterClose.subscribe(res => {
            let result = res || []
            result.forEach((item: any) => {
                this.noticeList.push(item)
                this.noticeBox.nativeElement.innerHTML += `<img src="${item.url}" style="max-width:100%;"/><br>`
            });
        });

    }

    // 富文本
    textChange() {
        const editorNotice = new wangEditor("#editorNotice", "#editorNoticeContent");

        // 产品特色
        if (this.dataModel != undefined) {
            this.noticeBox.nativeElement.innerHTML = this.dataModel.notice;
            this.reqModel.notice = this.dataModel.notice;
        }
        editorNotice.config.onchange = (newHtml: any) => {
            this.reqModel.notice = newHtml;
        }
        // 配置菜单栏
        editorNotice.config.menus = [
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
        editorNotice.config.pasteFilterStyle = false;
        editorNotice.config.pasteTextHandle = function (pasteStr: any) {
            //  去除wps文档复制过来的style样式
            let str = pasteStr
            str = str.replace(/[\s\S.@]*{[\s\S]*?}/ig, '');
            return str
        }
        // InsertABCMenu
        // 注册菜单
        editorNotice.menus.extend('insertABC', InsertABCMenu)
        // 重新配置 editor.config.menus
        editorNotice.config.menus = editorNotice.config.menus.concat('insertABC')
        editorNotice.config.customFunction = (insert: any) => {
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
        editorNotice.create();




    }

}

