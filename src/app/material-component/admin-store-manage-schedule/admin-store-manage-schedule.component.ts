import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { differenceInCalendarDays, format } from 'date-fns';
import { NzCalendarMode } from 'ng-zorro-antd/calendar';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminStoreManageService } from '../../../services/admin/admin-store-manage.service';
import { AdminStoreManageSetScheduleComponent } from './admin-store-manage-set-schedule/admin-store-manage-set-schedule.component';
registerLocaleData(zh);


@Component({
  selector: 'app-admin-store-manage-schedule',
  templateUrl: './admin-store-manage-schedule.component.html',
  styleUrls: ['./admin-store-manage-schedule.component.css']
})



export class AdminStoreManageScheduleComponent implements OnInit {
  toDay = new Date();
  seletYearMonth: any = format(new Date(), 'yyyy-MM');
  selectedYear = format(new Date(), 'yyyy');
  yearList = ['2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031'];
  selectedDateValue = new Date();
  public isSpinning: boolean = true;
  nzPageIndex = new Date().getMonth() + 1;
  ids: any[] = [];


  listDataMap: any[] = [];
  page = 1;
  per_page = 100;
  admin_id: any;
  date: any = format(new Date(), 'yyyy-MM');
  shop_id: any;
  shopName: any;

  constructor(private modal: NzModalService, public activatedRoute: ActivatedRoute,
    private msg: NzMessageService, public adminStoreManageService: AdminStoreManageService,) {

  }


  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.shop_id = params.id;
      this.shopName = params.shopName;
      this.getList();
    })

  }

  getList() {
    this.isSpinning = false;
    this.adminStoreManageService.shopScheduleList(this.page, this.per_page, this.admin_id, this.date, this.shop_id).subscribe(res => {
      console.log('111111111', res);
      this.listDataMap = res?.data;
    })
  }

  nzPageIndexChange(index: any) {
    console.log('点击的index', index);
    let month = index < 10 ? '0' + index : index;
    let year = this.selectedYear;
    let day = new Date().getDate();
    console.log('month ', month, year + '-' + month + '-' + day, new Date(year + '-' + month + '-' + day));
    // 以1号为基准不会报错
    this.selectedDateValue = new Date(year + '-' + month + '-' + '01');
    console.log('111111111 ', this.selectedDateValue);
    this.seletYearMonth = this.selectedYear + '-' + month;
    console.log('2222222 ', this.seletYearMonth);
    this.nzPageIndex = index;
    this.isSpinning = true;
    this.date = this.seletYearMonth;
    this.getList();
  }



  // 单个
  selectChange(select: Date): void {
    console.log('选择的', select);
    this.seletYearMonth = format(new Date(select), 'yyyy-MM');
    let newMon = format(new Date(select), 'MM');
    newMon = newMon.replace(/\b(0+)/gi, "");
    this.nzPageIndex = Number(newMon);
    this.date = this.seletYearMonth;

    console.log(differenceInCalendarDays(select,this.toDay),'AAA');
    if(differenceInCalendarDays(select,this.toDay)<0){
      this.msg.warning('当前日期不能排班')
      return
    }else{
      this.adminStoreManageService.shopScheduleInfo(format(select,'yyyy-MM-dd'), this.shop_id).subscribe(res => {
        console.log('111111111', res);
        const editmodal = this.modal.create({
          nzTitle: '门店员工排班设置',
          nzContent: AdminStoreManageSetScheduleComponent,
          nzWidth: 1000,
          nzComponentParams: {
            data: [select,res.data]
          },
          nzFooter: [
            {
              label: '删除',
              danger: true,
              onClick: componentInstance=> {
                this.modal.confirm({
                  nzTitle: '提示?',
                  nzContent: '<b style="color: red;">请确认是否删除当天排班</b>',
                  nzOkText: '确认',
                  nzOkType: 'primary',
                  nzOnOk:async () => {
                   let flag = await componentInstance?.deleteDate().catch(err=>{
                    this.modal['error']({
                      nzMask: false,
                      nzTitle: `提示`,
                      nzContent: `删除失败：`+err,
                    })
                   })
                   if(flag){
                    this.modal['success']({
                      nzMask: false,
                      nzTitle: `提示`,
                      nzContent: `删除成功`,
                    })
                   }
                   setTimeout(() => this.modal.closeAll(), 1500);
                  },
                  nzCancelText: '取消',
                  nzOnCancel: () => console.log('Cancel')
                });
              }
            },
            {
              label: '提交',
              type: 'primary',
              onClick: componentInstance => {
                componentInstance?.update()
              }
            },
          ]
        })
        editmodal.afterClose.subscribe(res => {
          this.getList();
        })
      })
      
    }

    // this.getList();
    
  }


  // 选择年
  ngYearChange(year: any) {
    console.log('year :>> ', year);
    let month = this.nzPageIndex < 10 ? '0' + this.nzPageIndex : this.nzPageIndex;
    this.nzPageIndex = Number(month);
    this.selectedDateValue = new Date(year + '-' + month + '-' + '01');
    this.seletYearMonth = year + '-' + month;
    this.date = this.seletYearMonth;
    this.getList();
  }


  isMidDate(beginStr: any, endStr: any, str: any) {
    let beginDate = new Date(beginStr);
    let endDate = new Date(endStr);
    let strDate = new Date(str);
    if (strDate >= beginDate && strDate <= endDate) {
      return true;
    }
    return false;
  }

  getAllDateCN(startTime: Date, endTime: Date) {
    if (!startTime) return
    if (!endTime) return [format(startTime, 'yyyy-MM-dd')]
    var date_all = []
    var i = 0
    while ((endTime.getTime() - startTime.getTime()) >= 0) {
      date_all[i] = format(startTime, 'yyyy-MM-dd')
      startTime.setDate(startTime.getDate() + 1)
      i += 1
    }
    return date_all
  }


  mode: NzCalendarMode = 'month';





  changeId(item: any) {
    console.log('object :>> ', item);
    if (item.checked === true) {
      this.ids.push(item.id);
    }
    else if (item.checked === false) {
      this.ids = this.ids.filter(res => res != item.id);
      console.log("333333", this.ids);
    }
  }



  setSchedule() {
    const editmodal = this.modal.create({
      nzTitle: '门店员工排班设置',
      nzContent: AdminStoreManageSetScheduleComponent,
      nzWidth: 1000,
      // nzComponentParams: {
      //   data: [this.shop_id]
      // },
      nzFooter: [
        {
          label: '提交',
          type: 'primary',
          onClick: componentInstance => {
            componentInstance?.update()
          }
        }
      ]
    })
    editmodal.afterClose.subscribe(res => {
      this.getList();
    })
  }


}

