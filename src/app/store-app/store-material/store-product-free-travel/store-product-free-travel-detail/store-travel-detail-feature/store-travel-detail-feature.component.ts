import { Component,  Input, OnInit, ViewChild ,OnChanges, ViewContainerRef} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ChooseGalleryComponent } from '../../../../../layouts/choose-gallery/choose-gallery';
import wangEditor from 'wangeditor';
import {InsertABCMenu} from '../../../InsertABCMenu';
import { CommonModelComponent } from '../../../common/common-model/common-model.component';
import { SimpleChanges } from '@angular/core';
import { StoreProductTreeTravelService } from '../../../../../../services/store/store-product-free-travel/store-product-tree-travel.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-store-travel-detail-feature',
  templateUrl: './store-travel-detail-feature.component.html',
  styleUrls: ['./store-travel-detail-feature.component.css']
})
export class StoreTravelDetailFeatureComponent implements OnInit {
  reqModel ={
    id:0,
    step:2,
    feature:'',
  }
  @Input() dataDetailModel: any;
  dataModel:any
  featureList:any[] = []
 
  @ViewChild("featureBox") featureBox: any;       //获取dom
  constructor(public dialog: MatDialog,private msg: NzMessageService,private freeTravelService:StoreProductTreeTravelService,
    private modal: NzModalService,private viewContainerRef: ViewContainerRef) { }

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
      if(res.message=="更新成功"){
        // this.router.navigate(['/store/main/storeFreeTravel']);
      }
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
      const modal:NzModalRef = this.modal.create({
        nzTitle:'图片上传',
        nzViewContainerRef: this.viewContainerRef,
        nzContent:CommonModelComponent,
        nzWidth:660,
        nzFooter:null
      })
      modal.afterClose.subscribe(result =>{
        let res = result?.data||[]
        res.forEach((item: any) => {
              insert(item.url)
            });
      });
    }
    editorFeature.create();
    



}

}
