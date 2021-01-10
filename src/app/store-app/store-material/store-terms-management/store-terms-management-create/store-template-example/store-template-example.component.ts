import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import wangEditor from 'wangeditor';

@Component({
  selector: 'app-store-template-example',
  templateUrl: './store-template-example.component.html',
  styleUrls: ['./store-template-example.component.css']
})
export class StoreTemplateExampleComponent implements OnInit {
  @ViewChild("featureBox") featureBox: any;       //获取dom
  detailModel: any

  constructor(public dialogRef: MatDialogRef<StoreTemplateExampleComponent>, @Inject(MAT_DIALOG_DATA) public data: any,) {
    console.log("data", data)
    this.detailModel = data;
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.textChange();
  }



  // 富文本
  textChange() {
    // 产品特色
    const editorFeature = new wangEditor("#editorFeature", "#editor");
    this.featureBox.nativeElement.innerHTML = this.detailModel.content;    //赋值
    editorFeature.create();
    editorFeature.$textElem.attr('contenteditable', 'false')
  }


  
  close() {
    this.dialogRef.close();
  }

  confirm() {
    this.dialogRef.close();
  }


}
