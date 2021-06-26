import { Component, Input, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import wangEditor from 'wangeditor';
import { AdminGoodsService } from '../../../../../../services/admin/admin-goods.service';



@Component({
  selector: 'app-admin-goods-pro-detail-detail',
  templateUrl: './admin-goods-pro-detail-detail.component.html',
  styleUrls: ['./admin-goods-pro-detail-detail.component.css']
})
export class AdminGoodsProDetailDetailComponent implements OnInit {
    @ViewChild("detailBox") detailBox: any;       //获取dom
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
       public activatedRoute: ActivatedRoute, public adminGoodsService: AdminGoodsService,
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
    const editorDetail = new wangEditor("#editorDetail", "#editorDetailContent");
    console.log("拿到的details", this.addDataDetailModel?.details);
    this.detailBox.nativeElement.innerHTML = this.addDataDetailModel?.details;    //赋值
    this.reqModel.details = this.addDataDetailModel.details;
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
    editorDetail.create();

  }

}
