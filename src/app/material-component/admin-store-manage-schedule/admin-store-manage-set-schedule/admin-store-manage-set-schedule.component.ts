import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { differenceInCalendarDays, format } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AddScheduleModel } from '../../../../interfaces/adminStoreManage/admin-store-manage-model';
import { AdminStoreManageService } from '../../../../services/admin/admin-store-manage.service';


@Component({
  selector: 'app-admin-store-manage-set-schedule',
  templateUrl: './admin-store-manage-set-schedule.component.html',
  styleUrls: ['./admin-store-manage-set-schedule.component.css']
})
export class AdminStoreManageSetScheduleComponent implements OnInit {
  // data长度为4 表示修改 否则为添加
  @Input() data: any[]=[];
  today = new Date();
  addForm!: FormGroup;
  selectDate: any[]=[];

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
  // addScheduleModel: AddScheduleModel;
  resultArr: AddScheduleModel ;
  dateArr: any;


  constructor(public fb: FormBuilder, public adminStoreManageService: AdminStoreManageService,private message: NzMessageService) {
    this.addForm = this.fb.group({
      week: [false],
      name: [''],
      date: ['', [Validators.required]],
      admin_id: [[], [Validators.required]],
    });
    
    this.resultArr = {
      admin_id: [],
      date: [],
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

    // 修改排班信息
    if(this.data.length===4){
      console.log(this.data[2],'this.data[2]');
      let timeDate = this.data[2]
      this.selectDate=[timeDate,timeDate]
      // this.addForm.setValue({'admin_id':[this.data[2].admin_id]})
      let arrId = this.data[3].map((item:any)=>item.admin_id)
      this.addForm.patchValue({admin_id:arrId})
    }
  
  }



  setValue() {
    console.log(this.selectDate,'this.selectDate');
    this.dateArr = this.getAllDateCN(this.selectDate[0], this.selectDate[1])
   
    this.resultArr.admin_id = this.addForm.value.admin_id
    this.resultArr.date = this.dateArr
    this.resultArr.shop_id = this.data[0]

    console.log('添加值', this.resultArr);
    console.log('添加值', this.resultArr);

  }

  update() {
    if(this.selectDate.length != 2){
      this.message.create('error', `请选择排版日期`);
      return
    }
   
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {
      console.log(this.selectDate,'selectDate');
      this.setValue()

      // data长度为4 表示修改 否则为添加
      if(this.data.length===4){
        
        let ids = this.data[3].map((item:any)=>item.id)
        this.adminStoreManageService.DeleteShopScheduleInfo(ids).subscribe(del=>{
          this.adminStoreManageService.addScheduleList(this.resultArr).subscribe(res => {
            console.log('111111111',res);
          })
        })
      }else{
        // 添加
        this.adminStoreManageService.addScheduleList(this.resultArr).subscribe(res => {
          console.log('111111111',res);
        })
      }
    


    }
  }

  deleteDate(){
    let ids = this.data[3].map((item:any)=>item.id)
    this.adminStoreManageService.DeleteShopScheduleInfo(ids).subscribe(del=>{
     
    })
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
    console.log(data);
    console.log(this.addForm.value.admin_id);
  }



  getAllDateCN(startTime: Date, endTime: Date) {
    if (!startTime) return
    if (!endTime) return [format(startTime, 'yyyy-MM-dd')]
    if(startTime == endTime) return [format(startTime, 'yyyy-MM-dd')]
    var date_all = [];
    var i = 0;
    
    while ((endTime.getTime() - startTime.getTime()) >= 0) {
      if (this.weekValue.indexOf(startTime.getDay()) > -1) {
        date_all[date_all.length] = format(startTime, 'yyyy-MM-dd')
      }
      startTime.setDate(startTime.getDate() + 1)
      console.log(date_all, '1A',startTime);

      i += 1
    }
    console.log(date_all, 'date_all');

    return date_all
  }
}
