import { Component,  Input, OnInit, ViewChild ,OnChanges, EventEmitter, Output} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ChooseGalleryComponent } from '../../../../../layouts/choose-gallery/choose-gallery';
import wangEditor from 'wangeditor';
import {InsertABCMenu} from '../../../InsertABCMenu';
import { CommonModelComponent } from '../../../common/common-model/common-model.component';
import { SimpleChanges } from '@angular/core';
import { StoreProductTreeTravelService } from '../../../../../../services/store/store-product-free-travel/store-product-tree-travel.service';

@Component({
  selector: 'app-store-free-feature',
  templateUrl: './store-free-feature.component.html',
  styleUrls: ['./store-free-feature.component.css']
})
export class StoreFreeFeatureComponent implements OnInit {
  @Output() tabIndex = new EventEmitter;
  reqModel ={
    id:0,
    step:2,
    feature:'',
  }
  @Input() dataDetailModel: any;
  dataModel:any
  featureList:any[] = []
 
  @ViewChild("featureBox") featureBox: any;       //获取dom
  constructor(public dialog: MatDialog,private msg: NzMessageService,private freeTravelService:StoreProductTreeTravelService) { }

  ngOnInit(): void {
    
  }
  ngOnChanges(changes: SimpleChanges) {
    if(changes['dataDetailModel'] && changes['dataDetailModel'].currentValue) {
      this.dataModel = changes['dataDetailModel'].currentValue
      this.reqModel.id = this.dataModel.id
    }
  }
  ngAfterViewInit(){
    this.textChange();
  }

  updateInfo(){
    console.log('请求值',this.reqModel);
    this.freeTravelService.UpdateFreeTravelInfo(this.reqModel).subscribe(res=>{
      this.tabIndex.emit({id:this.reqModel.id,tabIndex:3})
    })
  }
  importImg(){
    console.log(123);
    const dialogRef = this.dialog.open(ChooseGalleryComponent, {
      width: '1105px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("result", result);
      result.forEach((item:any) => {
      
          this.featureList.push(item)
          if(this.featureList.length>10){
            this.msg.error('产品特色引用图片不能超过10张')
            return 
          }
          this.featureBox.nativeElement.innerHTML+=`<img src="${item.url}" style="max-width:100%;"/><br>`
      });
      // 
    });
  }

  // 富文本
  textChange() {
    const  editorFeature = new wangEditor("#editorFeature", "#editor");

    // 产品特色
    if(this.dataModel!=undefined){
      this.featureBox.nativeElement.innerHTML= this.dataModel.feature
      this.reqModel.feature = this.dataModel.feature
    }
    editorFeature.config.onchange = (newHtml: any) => {
      this.reqModel.feature = newHtml;
    }
    // InsertABCMenu
      // 注册菜单
      editorFeature.menus.extend('insertABC', InsertABCMenu)
    // 重新配置 editor.config.menus
    editorFeature.config.menus = editorFeature.config.menus.concat('insertABC')
    editorFeature.config.customFunction = (insert:any)=>{
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
    editorFeature.create();
    



}

}
