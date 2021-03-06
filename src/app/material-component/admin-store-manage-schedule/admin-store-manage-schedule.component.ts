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
  
  getDay = format(new Date(), 'yyyy-MM-dd');

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
      console.log(params)
      this.getList();
    })

  }

  getList() {
    this.isSpinning = false;
    this.adminStoreManageService.shopScheduleList(this.page, this.per_page, this.admin_id, this.date, this.shop_id).subscribe(res => {
      console.log('111111111', res);
      this.listDataMap = res?.data;
      this.listDataMap.map((item: any)=>{
        item['checked'] = false
      })
      console.log(this.listDataMap,'this.listDataMap');
    })
  }

  nzPageIndexChange(index: any) {
    console.log('?????????index', index);
    let month = index < 10 ? '0' + index : index;
    let year = this.selectedYear;
    let day = new Date().getDate();
    console.log('month ', month, year + '-' + month + '-' + day, new Date(year + '-' + month + '-' + day));
    // ???1????????????????????????
    this.selectedDateValue = new Date(year + '-' + month + '-' + '01');
    console.log('111111111 ', this.selectedDateValue);
    this.seletYearMonth = this.selectedYear + '-' + month;
    console.log('2222222 ', this.seletYearMonth);
    this.nzPageIndex = index;
    this.isSpinning = true;
    this.date = this.seletYearMonth;
    this.getList();
  }



  // ??????
  selectChange(select: Date): void {
    console.log('?????????', select);
    this.seletYearMonth = format(new Date(select), 'yyyy-MM');
    let newMon = format(new Date(select), 'MM');
    newMon = newMon.replace(/\b(0+)/gi, "");
    this.nzPageIndex = Number(newMon);
    this.date = this.seletYearMonth;

    console.log(differenceInCalendarDays(select,this.toDay),'AAA');
    if(differenceInCalendarDays(select,this.toDay)<0){
      this.msg.warning('????????????????????????')
      return
    }else{
      this.adminStoreManageService.shopScheduleInfo(format(select,'yyyy-MM-dd'), this.shop_id).subscribe(res => {
        console.log('111111111', res);
        const editmodal = this.modal.create({
          nzTitle: '????????????????????????',
          nzContent: AdminStoreManageSetScheduleComponent,
          nzWidth: 1000,
          nzComponentParams: {
            data: [select,res.data]
          },
          nzFooter: [
            {
              label: '??????',
              danger: true,
              onClick: componentInstance=> {
                this.modal.confirm({
                  nzTitle: '???????',
                  nzContent: '<b style="color: red;">?????????????????????????????????</b>',
                  nzOkText: '??????',
                  nzOkType: 'primary',
                  nzOnOk:async () => {
                   let flag = await componentInstance?.deleteDate().catch(err=>{
                    this.modal['error']({
                      nzMask: false,
                      nzTitle: `??????`,
                      nzContent: `???????????????`+err,
                    })
                   })
                   if(flag){
                    this.modal['success']({
                      nzMask: false,
                      nzTitle: `??????`,
                      nzContent: `????????????`,
                    })
                   }
                   setTimeout(() => this.modal.closeAll(), 1500);
                  },
                  nzCancelText: '??????',
                  nzOnCancel: () => console.log('Cancel')
                });
              }
            },
            {
              label: '??????',
              type: 'primary',
              onClick: componentInstance => {
                componentInstance?.update()
              }
            },
          ]
        })
        editmodal.afterClose.subscribe(res => {
          this.getList();
          this.ids=[]

        })
      })
      
    }

    // this.getList();
    
  }


  // ?????????
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





  changeId(obj: any) {
    console.log('object :>>123123 ', obj);
    this.listDataMap.map(item=>{
      if(item.date == obj.date && obj.checked)  this.ids.push(item.id)
      else{
        if(item.date == obj.date){
          var index = this.ids.indexOf(item.id)
          if(index > -1){
            this.ids.splice(index, 1);
          }
        }
       
      }
    })
    
    console.log('ids',this.ids);
    // if (item.checked === true) {
    //   this.ids.push(item.id);
    //   this.ids.forEach((element: any, index: any) => {
    //     if (element != item.id) {
    //       this.listDataMap.filter(function (item: any, index: any) {
    //         if (item.id === element) {
    //           item.checked = false;

    //         }
    //       });
    //     }
    //   })
    // }
    // else if (item.checked === false) {
    //   this.ids = this.ids.filter(res => res != item.id);
    //   console.log("333333", this.ids);
    // }
  }



  setSchedule() {
    const editmodal = this.modal.create({
      nzTitle: '????????????????????????',
      nzContent: AdminStoreManageSetScheduleComponent,
      nzWidth: 1000,
      nzComponentParams: {
        data: [this.shop_id]
      },
      nzFooter: [
        {
          label: '??????',
          type: 'primary',
          onClick: componentInstance => {
            componentInstance?.update()
          }
        }
      ]
    })
    editmodal.afterClose.subscribe(res => {
      this.getList();
      this.ids=[]
    })
  }
  // ????????????
  delSchedule(){
    if(this.ids.length===0){
      this.msg.create('error','???????????????????????????')
      return
    }
    this.modal.confirm({
      nzTitle: '??????????????????',
      nzContent: '?????????????????????????????????',
      nzOkText: '??????',
      nzCancelText: '??????',
      nzOnOk:()=>{
        this.adminStoreManageService.DeleteShopScheduleInfo(this.ids).subscribe(res=>{
          console.log('????????????');
          let str = this.modal.success({nzTitle: '????????????'});
          this.ids = []
          this.getList();
          setTimeout(() => str.close(), 1500);
        })
      }
    });

  }

}

