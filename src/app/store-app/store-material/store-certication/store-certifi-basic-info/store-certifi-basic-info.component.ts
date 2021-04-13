import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StoreCertifiChangeComponent } from './store-certifi-change/store-certifi-change.component';
import { StoreApplyService } from '../../../../../services/store/store-apply/store-apply.service';

@Component({
  selector: 'app-store-certifi-basic-info',
  templateUrl: './store-certifi-basic-info.component.html',
  styleUrls: ['./store-certifi-basic-info.component.css']
})
export class StoreCertifiBasicInfoComponent implements OnInit {
  detailForm!: FormGroup;
  detailModel: any;
  workTime: any;
  week: any[] = [];
  newWeek: any[] = [];
  is_approve: any;


  constructor(public fb: FormBuilder,  private modal: NzModalService, public storeApplyService: StoreApplyService) {
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
      type: [''],
    })
  }

  ngOnInit(): void {
    this.storeApplyService.storeDetail().subscribe(res => {
      console.log('1212121 ', res);
      this.detailModel = res;
      this.is_approve = Number(res?.store?.is_approve);
      localStorage.setItem('storeApprove', this.is_approve.toString());

      
    if (this.detailModel?.store?.work_date != '') {
      this.week = eval('(' + this.detailModel?.store?.work_date + ')');
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
      this.workTime = a + '   ' + this.detailModel?.store?.work_time;
    }
    })


  }



  change(){
    const editmodal = this.modal.create({
      nzTitle: '修改联系人信息',
      nzWidth: 1000,
      nzContent: StoreCertifiChangeComponent,
     
      nzFooter: [
        {
          label: '提交',
          onClick: componentInstance => {
            componentInstance?.update()
          }
        }
      ]
    })
    editmodal.afterClose.subscribe(res => {
    
    });
  }
}
