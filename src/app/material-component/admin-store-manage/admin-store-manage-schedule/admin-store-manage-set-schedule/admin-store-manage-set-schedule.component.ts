import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { differenceInCalendarDays, format } from 'date-fns';
import { AddScheduleModel } from '../../../../../interfaces/adminStoreManage/admin-store-manage-model';
import { AdminStoreManageService } from '../../../../../services/admin/admin-store-manage.service';


@Component({
  selector: 'app-admin-store-manage-set-schedule',
  templateUrl: './admin-store-manage-set-schedule.component.html',
  styleUrls: ['./admin-store-manage-set-schedule.component.css']
})
export class AdminStoreManageSetScheduleComponent implements OnInit {
  @Input() data: any;
  today = new Date();
  addForm!: FormGroup;
  selectDate: any;

  // 选择了周几
  weekValue: any[] = [1, 2, 3, 4, 5, 6, 0];
  // 选择周几
  checkWeeks = [
    { label: '周一', value: 1, checked: true },
    { label: '周二', value: 2, checked: true },
    { label: '周三', value: 3, checked: true },
    { label: '周四', value: 4, checked: true },
    { label: '周五', value: 5, checked: true },
    { label: '周六', value: 6, checked: true },
    { label: '周日', value: 0, checked: true },
  ]

  adminList: any[] = [];
  name: any;
  addScheduleModel: AddScheduleModel;
  resultArr: AddScheduleModel[] = [];

  dateArr: any;


  constructor(public fb: FormBuilder, public adminStoreManageService: AdminStoreManageService) {
    this.addForm = this.fb.group({
      week: [false],
      name: [''],
      date: ['', [Validators.required]],
      admin_id: ['', [Validators.required]],
    });
    this.addScheduleModel = {
      admin_id: '',
      date: '',
      shop_id: ''
    }
  }

  ngOnInit(): void {
    console.log('data :>> ', this.data);
    this.name = this.data[1];
    this.adminStoreManageService.shopAccountList(this.data[0]).subscribe(res => {
      console.log('res :>> ', res);
      this.adminList = res.data;
    })
  }



  setValue() {
    this.dateArr = this.getAllDateCN(this.selectDate[0], this.selectDate[1])
    this.dateArr.forEach((date: any) => {
      this.addScheduleModel = {
        admin_id: '',
        date: '',
        shop_id: ''
      }
      this.addScheduleModel.date = date;
      this.addScheduleModel.admin_id = this.addForm.value.admin_id;
      this.addScheduleModel.shop_id = this.data[0]
      this.resultArr.push(this.addScheduleModel);
    });
    console.log('添加值', this.resultArr);
    console.log('添加值', this.resultArr);

  }

  update() {
    this.setValue()
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {
      this.adminStoreManageService.addScheduleList(this.resultArr).subscribe(res => {
        console.log('111111111',res);
      })
    }
  }


  disabledDate = (current: Date): boolean => {
    // 禁用之前的日期
    return differenceInCalendarDays(current, this.today) < 0;
  };


  onDateChange(dateStr: any) {
  }


  ngCheckBoxChange(value: object[]): void {
    this.weekValue = value;
    console.log(value);
  }


  changeAdmin(data: any) {

  }



  getAllDateCN(startTime: Date, endTime: Date) {
    if (!startTime) return
    if (!endTime) return [format(startTime, 'yyyy-MM-dd')]
    var date_all = [];
    var i = 0;
    while ((endTime.getTime() - startTime.getTime()) >= 0) {
      console.log(this.weekValue, startTime.getDay());
      if (this.weekValue.indexOf(startTime.getDay()) > -1) {
        console.log(123);
        date_all[date_all.length] = format(startTime, 'yyyy-MM-dd')
      }
      console.log(date_all, 'date_all');
      startTime.setDate(startTime.getDate() + 1)
      i += 1
    }
    return date_all
  }
}
