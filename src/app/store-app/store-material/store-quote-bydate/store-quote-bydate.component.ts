import { Component, OnInit, ElementRef, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// antd日历
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);
// 引用报价组件
import { StoreQuoteBydateCreateComponent } from './store-quote-bydate-create/store-quote-bydate-create.component';
// 接收传过来的参数
import { ActivatedRoute, Router } from '@angular/router';

import { StoreQuoteBydateService } from '../../../../services/store/store-quote-bydate/store-quote-bydate.service';

import { StoreQuoteBydateRsponseListModel, FreeTraveRsponseListModel } from '../../../../interfaces/store/storeQuote/store-quote-bydate';
import { differenceInCalendarDays, format } from 'date-fns';

import { FreeTraveQuoteBydateModel } from '../../../../interfaces/store/storeQuote/store-quote-bydate';
import { NzCalendarMode } from 'ng-zorro-antd/calendar';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-store-quote-bydate',
  templateUrl: './store-quote-bydate.component.html',
  styleUrls: ['./store-quote-bydate.component.css']
})
export class StoreQuoteBydateComponent implements OnInit {
  pageClick: any;
  productId: any;    //修改信息
  type: any;     //freeTravel 自由行 management 产品管理   是从自由行 还是产品跳过来的
  toDay = new Date();
  listDataMap: StoreQuoteBydateRsponseListModel | FreeTraveRsponseListModel;
  seletYearMonth: any = format(new Date(), 'yyyy-MM');
  selectedYear = format(new Date(), 'yyyy');
  yearList = ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031'];
  selectedDateValue = new Date();
  public isSpinning: boolean = true;
  freeTraveQuoteBydateModel: FreeTraveQuoteBydateModel;
  nzPageIndex = new Date().getMonth() + 1;
  isEarlier: any;
  ids: any[] = [];
  allChecked = false;
  proName: any;
  childStatus: any;
  isShowPrice_diff = true;



  constructor(private modal: NzModalService, public dialog: MatDialog, public activatedRoute: ActivatedRoute,
    private msg: NzMessageService, public quoteBydateService: StoreQuoteBydateService, private el: ElementRef) {
    this.listDataMap = {
      data: []
    }

    this.freeTraveQuoteBydateModel = {
      id: 0,
      date: '',
      independent_product_id: 0,
      adult_price: 0,
      child_price: 0,
      difference_price: 0,
      inventory_num: 0,
      set_inventory: 0,
      allow_over: 0,
      check_status: 0,
      created_at: '',
      updated_at: '',
    }
  }


  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.productId = params.productId;
      this.type = params.type;
      this.isEarlier = params.earlier;
      this.proName = params.proName;
      this.childStatus = params.childStatus;
      this.isShowPrice_diff = params.few_nights === '0' ? false : true;
      console.log('儿童是否可以预定 0否 :>> ', this.childStatus, this.childStatus === '0');
      console.log(this.seletYearMonth, 'ngOnInit');
      this.getQuoteList();
    });
  }


  nzPageIndexChange(index: any) {
    console.log(index);
    let month = index < 10 ? '0' + index : index;
    let year = new Date().getFullYear();
    let day = new Date().getDate();
    this.selectedDateValue = new Date(year + '-' + month + '-' + day);
    this.seletYearMonth = this.selectedYear + '-' + month;
    this.nzPageIndex = index;
    this.isSpinning = true;
    this.getQuoteList();
  }

  selectChange(select: Date): void {
    console.log('选择的', select);
    this.seletYearMonth = format(new Date(select), 'yyyy-MM');
    let newMon = format(new Date(select), 'MM');
    newMon = newMon.replace(/\b(0+)/gi, "");
    this.nzPageIndex = Number(newMon);
    let newDay = format(new Date(select), 'yyyy-MM-dd');
    // 处理不能点击的日期
    let i = 1 + Number(this.isEarlier);
    console.log("differenceInCalendarDays(select, this.toDay) < i", differenceInCalendarDays(select, this.toDay) < i)
    if (differenceInCalendarDays(select, this.toDay) < i) {
      this.msg.error('当前日期不能进行报价');
    }

    else {
      this.quoteBydateService.getQuoteDateList(this.productId, this.type, 1, newDay, 42).subscribe(data => {
        console.log('datadatadatadata', data);
        const modal: NzModalRef = this.modal.create({
          nzTitle: '批量报价',
          nzWidth: 720,
          nzContent: StoreQuoteBydateCreateComponent,
          nzComponentParams: {
            data: {
              date: [data?.data[0], select],
              type: this.type,
              productId: this.productId,
              listDataMap: this.listDataMap,
              earlier: this.isEarlier,
              childStatus: this.childStatus,
              isShowPrice_diff: this.isShowPrice_diff


            }
          },
          nzFooter: [
            {
              label: '取消',
              onClick: () => modal.destroy()
            },
            {
              label: '删除',
              type: 'danger',
              onClick(componentInstance) {
                componentInstance?.deleteInfo()
              }
            },
            {
              label: '确认',
              type: 'primary',
              onClick(componentInstance) {
                if (componentInstance?.isSpinning == true) return;
                componentInstance?.updateLoading()
                componentInstance?.add()
              }
            },
          ]

        })
        modal.afterClose.subscribe(res => {
          this.getQuoteList();
        })
      })
    }




  }


  getQuoteList() {
    console.log(this.productId, 'this.productId', this.seletYearMonth);
    this.quoteBydateService.getQuoteDateList(this.productId, this.type, 1, this.seletYearMonth, 42).subscribe(data => {
      this.listDataMap.data = data.data;
      this.listDataMap.data.forEach((value: any) => {
        value['checked'] = false;
      })
      this.isSpinning = false;
      console.log('listDataMap', this.listDataMap.data);
    })
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


  // 选择年
  ngYearChange(year: any) {
    let month = this.nzPageIndex < 10 ? '0' + this.nzPageIndex : this.nzPageIndex;
    this.seletYearMonth = this.selectedYear + '-' + month;
    this.getQuoteList()
  }

  panelChange(change: { date: Date; mode: string }): void {
    console.log('panelChange', change.date, change.mode);
  }


  // 批量报价
  quoteClick() {
    console.log(123);
    const modal: NzModalRef = this.modal.create({
      nzTitle: '批量报价',
      nzWidth: 720,
      nzContent: StoreQuoteBydateCreateComponent,
      nzComponentParams: {
        data: {
          productId: this.productId,
          type: this.type,
          listDataMap: this.listDataMap,
          earlier: this.isEarlier,
          childStatus: this.childStatus,
          isShowPrice_diff: this.isShowPrice_diff
        }
      },
      nzFooter: [
        {
          label: '取消',
          onClick: () => modal.destroy()
        }, {
          label: '确认',
          type: 'primary',
          loading: false,
          onClick(componentInstance) {
            if (componentInstance?.isSpinning == true) return;
            componentInstance?.updateLoading()
            componentInstance?.add()
          },


        }
      ]

    })
    modal.afterClose.subscribe(res => {
      this.getQuoteList();
    })
  }


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


  quoteDelete() {
    console.log("2324234", this.ids, this.ids.length === 0)
    if (this.ids.length === 0) {
      this.msg.error("请选择需要删除的日期报价");
    }
    else {
      this.modal.confirm({
        nzTitle: `<h2>删除<h2>`,
        nzContent: `<h6>请确认是否删除</h6>`,
        nzOnOk: () => {
          if (this.type == 'management') {
            this.quoteBydateService.deleteQuoteInfo(this.ids[0], this.ids).subscribe(res => {
              this.getQuoteList();
            })
          }
          else if (this.type == 'freeTravel') {
            this.quoteBydateService.delQuoteInfo(this.ids[0], this.ids).subscribe(res => {
              this.getQuoteList();

            })
          }
        }

      });
    }
  }


  allCheckedChoose(data: any) {
    console.log("daya231231", data);
    if (data === true) {
      this.listDataMap.data.forEach((value: any) => {
        console.log("1212312", value, value.id)
        value['checked'] = true;
        this.ids.push(value.id);
        console.log("t2342342", this.ids);

      })
    }
    else if (data === false) {
      this.listDataMap.data.forEach((value: any) => {
        value['checked'] = false;
        this.ids = [];
        console.log("this.ids3423", this.ids);
      })
    }
  }
}
