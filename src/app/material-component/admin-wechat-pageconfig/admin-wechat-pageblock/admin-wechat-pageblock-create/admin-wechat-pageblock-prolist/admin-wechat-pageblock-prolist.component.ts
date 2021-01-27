import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminWechatPageconfigService } from '../../../../../../services/admin/admin-wechat/admin-wechat-pageconfig.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-admin-wechat-pageblock-prolist',
  templateUrl: './admin-wechat-pageblock-prolist.component.html',
  styleUrls: ['./admin-wechat-pageblock-prolist.component.css']
})
export class AdminWechatPageblockProlistComponent implements OnInit {
  addForm!: FormGroup;
  type: any;
  key_word: any;
  dataSource: any[] = [];
  selectedIndex: any;
  selectedContent: any;

  constructor(public dialogRef: MatDialogRef<AdminWechatPageblockProlistComponent>, private msg: NzMessageService,
    public adminWechatPageconfigService: AdminWechatPageconfigService,) {
    this.addForm = new FormGroup({
      type: new FormControl('', Validators.required),
      key_word: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {

  }

  search() {
    this.type = this.addForm.value.type;
    this.key_word = this.addForm.value.key_word;
    this.adminWechatPageconfigService.proList(this.key_word, this.type).subscribe(res => {
      console.log("222", res)
      this.dataSource = res.data;
    })
  }


  rowClick(data: any, i: any) {
    console.log("data是什么", data);
    console.log("iiiii是什么", i);
    this.selectedIndex = i;
    this.selectedContent = data;
  }


  submit() {
    this.dialogRef.close(this.selectedContent);
  }



  close() {
    this.dialogRef.close();
  }
}

