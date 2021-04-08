import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-store-certifi-basic',
  templateUrl: './admin-store-certifi-basic.component.html',
  styleUrls: ['./admin-store-certifi-basic.component.css']
})

export class AdminStoreCertifiBasicComponent implements OnInit {
  detailForm!: FormGroup;
  detailModel: any;
  workTime: any;
  week: any[] = [];
  newWeek: any[] = [];
  is_approve = 0;

  constructor(public fb: FormBuilder,) {
    this.detailForm = this.fb.group({
      account: [''],
      supplyName: [''],
      region: [''],
      address: [''],
      contact: [''],
      mobile: [''],
      fax: [''],
      phone: [''],
      workTime: [''],
      week: [''],
      money: [''],
      remark: [''],
    })
  }

  ngOnInit(): void {
    this.detailModel = JSON.parse(localStorage.getItem("certification")!);
    this.is_approve = Number(localStorage.getItem("certifiApprove"));

    console.log('2323232323 ', this.detailModel);
    if (this.detailModel?.work_date != '') {
      this.week = eval('(' + this.detailModel?.work_date + ')');
      console.log('week :>> ', this.week, typeof (this.week));
      this.week.forEach((element: any) => {
        console.log('element :>> ', element, element === 0);
        if (element === 0) {
          element = '周日';
          this.newWeek.push(element);
        }
        if (element === 1) {
          element = '周一';
          this.newWeek.push(element);
        }
        if (element === 2) {
          element = '周二';
          this.newWeek.push(element);
        }
        if (element === 3) {
          element = '周三';
          this.newWeek.push(element);
        }
        if (element === 4) {
          element = '周四';
          this.newWeek.push(element);
        }
        if (element === 5) {
          element = '周五';
          this.newWeek.push(element);
        }
        if (element === 6) {
          element = '周六';
          this.newWeek.push(element);
        }

      });
      console.log('object :>> ', this.newWeek);
      let a = this.newWeek.toString();  //把数组转换为字符串
      console.log('a :>> ', a);
      this.workTime = a + '   ' + this.detailModel?.work_time;
    }

  }

}
