import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditContractModel } from '../../../../../../interfaces/store/storeApply/store-apply-model';
import { format } from 'date-fns';
import { StoreApplyService } from '../../../../../../services/store/store-apply/store-apply.service';


@Component({
  selector: 'app-store-certifi-change',
  templateUrl: './store-certifi-change.component.html',
  styleUrls: ['./store-certifi-change.component.css']
})
export class StoreCertifiChangeComponent implements OnInit {
  addForm!: FormGroup;
  storeDetailModel: any;
  // 选择了周几
  weekValue: any[] = [1, 2, 3, 4, 5, 6, 0];
  // 选择周几
  checkWeeks = [
    { label: '周一', value: 1, checked: false },
    { label: '周二', value: 2, checked: false },
    { label: '周三', value: 3, checked: false },
    { label: '周四', value: 4, checked: false },
    { label: '周五', value: 5, checked: false },
    { label: '周六', value: 6, checked: false },
    { label: '周日', value: 0, checked: false },
  ]
  time1: any;
  time2: any;
  editContractModel: EditContractModel;

  constructor(public fb: FormBuilder, public storeApplyService: StoreApplyService) {
    this.addForm = this.fb.group({
      fax: ['',],
      phone: ['',],
      contact: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      week: ['', [Validators.required]],
      date1: [null, [Validators.required]],
      date2: [null, [Validators.required]],
    });
    this.editContractModel = {
      contact: '',
      mobile: '',
      phone: '',
      fax: '',
      work_date: '',
      work_time: '',
      id: '',
    }
  }

  ngOnInit(): void {
    this.storeDetailModel = JSON.parse(localStorage.getItem("storeAccountDetail")!);
    if (this.storeDetailModel?.store?.work_date != '') {
      this.weekValue = eval('(' + this.storeDetailModel?.store?.work_date + ')');
      console.log('this.weekValue111111 ', this.weekValue);
      this.checkWeeks.forEach((item: any, index: any) => {
        if (this.weekValue.includes(item.value)) {
          item.checked = true;
        }
        else {
          item.checked = false;
        }
      });
    }
    else {
      this.checkWeeks.forEach((element: any) => {
        element.checked = false;
      });
    }
    if (this.storeDetailModel?.store?.work_time != '') {
      let arr = this.storeDetailModel?.store?.work_time.split("-");
      console.log('arr :>> ', arr);
      let time11 = '2021-01-01' + ' ' + arr[0];
      this.time1 = new Date(time11);
      let time22 = '2021-01-01' + ' ' + arr[1];
      this.time2 = new Date(time22);
    }
    else {
      this.time1 = new Date();
      this.time2 = new Date();
    }
  }



  setValue() {
    this.editContractModel.id = this.storeDetailModel?.store_account?.account_id;
    this.editContractModel.contact = this.addForm.value.contact;
    this.editContractModel.mobile = this.addForm.value.mobile;
    this.editContractModel.phone = this.addForm.value.phone
    this.editContractModel.fax = this.addForm.value.fax;
    this.editContractModel.work_date = this.weekValue;
    this.editContractModel.work_time = format(new Date(this.addForm.value.date1), 'HH:mm') + '-' + format(new Date(this.addForm.value.date2), 'HH:mm');
  }



  update() {
    this.setValue();
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {
      this.storeApplyService.editContract(this.editContractModel).subscribe(res=>{
        console.log('res :>> ', res);
      })
    }
  }



  ngCheckBoxChange(value: object[]): void {
    let a: any;
    a = value;
    let i: any[] = [];
    a.forEach((element: any) => {
      console.log('11111111 :>> ', element);
      if (element['checked'] === true) {
        i.push(element['value'])
      }
    })
    this.weekValue = i;
    console.log('11111111111', value, this.weekValue);

  }
}
