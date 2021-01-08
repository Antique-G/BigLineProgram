import { Component,  Input, OnInit, ViewChild ,OnChanges, Output, EventEmitter} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { ChooseGalleryComponent } from '../../../../../layouts/choose-gallery/choose-gallery';
import wangEditor from 'wangeditor';
import {InsertABCMenu} from '../../../InsertABCMenu';
import { CommonModelComponent } from '../../../common/common-model/common-model.component';
import { SimpleChanges } from '@angular/core';
import { StoreProductTreeTravelService } from '../../../../../../services/store/store-product-free-travel/store-product-tree-travel.service';

@Component({
  selector: 'app-store-free-desc',
  templateUrl: './store-free-desc.component.html',
  styleUrls: ['./store-free-desc.component.css']
})
export class StoreFreeDescComponent implements OnInit {
  @Input() dataDetailModel: any;
  @Output() tabIndex = new EventEmitter;
  dataModel:any
  featureList:any[] = []
  reqModel ={
    id:0,
    step:1,
    details:'',
  }
  @ViewChild("detailBox") detailBox: any;       //获取dom
  constructor(public dialog: MatDialog,private msg: NzMessageService,
    private freeTravelService:StoreProductTreeTravelService,public router: Router,) { }

  ngOnInit(): void {
    
  }
  ngOnChanges(changes: SimpleChanges) {
    if(changes['dataDetailModel'] && changes['dataDetailModel'].currentValue) {
      this.dataModel = changes['dataDetailModel'].currentValue
      console.log('dataDetailModel', this.dataModel);
      this.reqModel.id = this.dataModel.id
    }
    // this.textChange();
  }
  ngAfterViewInit(){
    this.textChange();
  }
  updateInfo(){
    console.log('请求值',this.reqModel);
    this.freeTravelService.UpdateFreeTravelInfo(this.reqModel).subscribe(res=>{
      this.tabIndex.emit({id:this.reqModel.id,tabIndex:2})
    })
  }

  importImg(){
    console.log(123);
    const dialogRef = this.dialog.open(ChooseGalleryComponent, {
      width: '1105px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("result", result);
      if(result === undefined) return
      result.forEach((item:any) => {
      
          this.featureList.push(item)
          if(this.featureList.length>10){
            this.msg.error('产品详情引用图片不能超过10张')
            return 
          }
          this.detailBox.nativeElement.innerHTML+=`<img src="${item.url}" style="max-width:100%;"/><br>`
      });
      // 
    });
  }
  
  // 富文本
  textChange() {
    const  editorDetail = new wangEditor("#editorDetail", "#editorContent");
    // 产品详情
    if(this.dataModel!=undefined){
      this.detailBox.nativeElement.innerHTML= this.dataModel.details
      this.reqModel.details = this.dataModel.details
    }
    editorDetail.config.onchange = (newHtml: any) => {
      this.reqModel.details = newHtml;
    }
    // InsertABCMenu
      // 注册菜单
      editorDetail.menus.extend('insertABC', InsertABCMenu)
    // 重新配置 editor.config.menus
    editorDetail.config.menus = editorDetail.config.menus.concat('insertABC')
    editorDetail.config.customFunction = (insert:any)=>{
      const dialogRef = this.dialog.open(CommonModelComponent, {
        width: '660px',
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log("result", result);
        let str =''
        result.forEach((item:any) => {
          insert(item.url)
        });
      });
    }
    editorDetail.create();
    



}

}
