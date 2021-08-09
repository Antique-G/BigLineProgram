import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminGoodsService } from 'services/admin/admin-goods.service';
import wangEditor from 'wangeditor';



@Component({
    selector: 'app-admin-goods-pro-detail-notice',
    templateUrl: './admin-goods-pro-detail-notice.component.html',
    styleUrls: ['./admin-goods-pro-detail-notice.component.css']
})
export class AdminGoodsProDetailNoticeComponent implements OnInit {
    @ViewChild("noticeBox") noticeBox: any;       //获取dom
    @Input() addDataDetailModel: any;
    dataModel: any;
    detailList: any[] = [];
    isLoadingBtn = false;



    reqModel = {
        id: '',
        step: 2,
        notice: '',
    }

    isUpdateId: any;

    constructor(public dialog: MatDialog,
        public adminGoodsService: AdminGoodsService, public activatedRoute: ActivatedRoute,
        private modal: NzModalService,) { }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            this.isUpdateId = params?.detailId;
        });
    }


    // 拿到id
    ngOnChanges(changes: SimpleChanges) {
        if (changes['addDataDetailModel'] && changes['addDataDetailModel'].currentValue) {
            this.dataModel = changes['addDataDetailModel'].currentValue;
            console.log("645645645", this.dataModel)
            this.reqModel.id = this.dataModel.id;
        }
    }



    ngAfterViewInit() {
        this.textChange();
    }


    updateInfo() {
        this.isLoadingBtn = true;
        console.log('请求值', this.reqModel);
        this.adminGoodsService.updateGoods(this.reqModel).subscribe(res => {
            this.isLoadingBtn = false;
        }
            ,
            error => {
                this.isLoadingBtn = false;
            })
    }


    // 富文本
    textChange() {
        // 产品特色
        const editorNotice = new wangEditor("#editorNotice", "#editorNoticeContent");
        console.log("拿到的notice", this.addDataDetailModel?.notice);
        this.noticeBox.nativeElement.innerHTML = this.addDataDetailModel?.notice;    //赋值
        this.reqModel.notice = this.addDataDetailModel.notice;
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
        editorNotice.create();

    }

}
