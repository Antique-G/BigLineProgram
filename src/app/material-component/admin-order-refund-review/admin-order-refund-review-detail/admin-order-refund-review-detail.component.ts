import { format } from 'date-fns';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminRefundService } from '../../../../services/admin/admin-refund.service';

@Component({
  selector: 'app-admin-order-refund-review-detail',
  templateUrl: './admin-order-refund-review-detail.component.html',
  styleUrls: ['./admin-order-refund-review-detail.component.css']
})
export class AdminOrderRefundReviewDetailComponent implements OnInit {
  detailId: any;
  selectedTabIndex = 0;    //选中的tab 默认第一个
  addForm!: FormGroup;
  detailModel: any;
  isType: any;
  dataSource: any;
  isFinished: any;
  pro_num_adult: any;
  pro_num_kid: any;
  price_diff: any;
  price_other: any;
  price_total: any;
  price_receive: any;
  dataMember: any[] = [];
  selectMemberData: any[] = [];
  setOfCheckedId = new Set<number>();
  setArr = new Set<any>();
  advance: any;
  selectHumans: any;
  basicRefund: any;
  isStandard: any;
  percentage: any;

  constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute, public router: Router,
    private modal: NzModalService, public adminRefundService: AdminRefundService) {
    this.addForm = this.fb.group({
      store_name: [''],
      order_id: [''],
      id: [''],
      type: [''],
      refund_reason: [''],
      remark: [''],
      created_at: [''],
      product_name: [''],
      product_type: [''],
      product_order_id: [''],
      product_start_date: [''],
      product_num_total: [''],
      product_contact_name: [''],
      product_contact_phone: [''],
      pro_num_adult: [''],
      pro_num_kid: [''],
      price_diff: [''],
      price_other: [''],
      price_total: [''],
      otherList: this.fb.array([]),
      customer_remarks: [''],
      standard: [''],
      selectHumans: [''],
      basicRefund: [''],
    })

  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.detailId = params.detailId;
      this.isFinished = params.isFinished;
      this.adminRefundService.getRefundDetail(this.detailId).subscribe(res => {
        this.detailModel = res.data;
        console.log('结果是 :>> ', this.detailModel);
        this.isType = this.detailModel.type === 0 ? "全部退款" : "部分退款";
        this.pro_num_adult = '￥' + this.detailModel.order?.data?.price_adult * this.detailModel.order?.data?.num_adult;
        this.pro_num_kid = '￥' + this.detailModel.order?.data?.price_kid * this.detailModel.order?.data?.num_kid;
        this.price_diff = '￥' + this.detailModel.order?.data?.price_diff;
        this.price_total = '￥' + this.detailModel.order?.data?.price_total;
        this.price_receive = '￥' + this.detailModel.order?.data?.price_receive;

        console.log('object :>> ', this.detailModel.price_detail.data);
        // this.detailModel.price_detail.
        let priceArr = this.detailModel.price_detail.data;
        priceArr.forEach((element: any) => {
          if (element.type === 0) {
            element.price = '+￥' + element.price;
          }
          else {
            element.price = '-￥' + element.price;
          }
        });
        for (let i = 0; i < priceArr.length; i++) {
          this.otherArray.push(this.fb.group({
            name: new FormControl(priceArr[i]?.title),
            namePrice: new FormControl(priceArr[i]?.price),
          }))
        }
        console.log('otherArray.controls :>> ', this.otherArray.controls);
        this.dataMember = this.detailModel?.member?.data;
        this.selectMemberData = this.detailModel?.member?.data;

        let date1 = new Date(format(new Date(this.detailModel?.order?.data?.start_date), 'yyyy,MM,dd'));
        let date2 = new Date(format(new Date(this.detailModel?.created_at), 'yyyy,MM,dd'))
        this.advance = (date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24);
        console.log('date1 ', date1, date2, this.advance);

        switch (this.advance) {
          case this.advance > 7:
            this.isStandard = 0;
            this.percentage = 1;
            break;
          case 5 < this.advance && this.advance <= 7:
            this.isStandard = 0;
            this.percentage = 1;
            break;
        }
      })
    });
  }


  // 附加
  get otherArray() {
    return this.addForm.get("otherList") as FormArray;
  }


  onTabChange(event: any) {
    this.selectedTabIndex = event;
  }

  next1() {
    this.selectedTabIndex = 1;
  }

  next2() {
    this.selectedTabIndex = 2;
  }


  add() {
    this.modal.confirm({
      nzTitle: '<h4>确认提交退款</h4>',
      nzContent: '<h5>如果您确认提交退款处理信息无误，提交后财务工作员将审核退款，退款进度请联系财务管理人员。</h5>',
      // nzOnOk: () =>
      // this.adminProductManagementService.productSetStatus(this.adminProductSetStatusModel).subscribe(res => {
      //   this.getProductList();
      // })
    });
  }


  return() {
    this.router.navigate(['/admin/main/refund'], { queryParams: { tabIndex: 1 } });
  }


  updateCheckedSet(data: any, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(data.id);
      this.setArr.add(data);

    } else {
      this.setOfCheckedId.delete(data.id);
      this.setArr.delete(data);
    }
  }



  onItemChecked(data: any, checked: boolean): void {
    this.updateCheckedSet(data, checked);
    let newArr = [...this.setArr];
    let adultNum: any[] = [];
    let kidNum: any[] = [];
    let adultName: any[] = [];
    let kidName: any[] = [];
    console.log('this.setArr.add(data); :>> ', [...this.setArr]);
    newArr.forEach((ele: any) => {
      if (ele.is_kid === 0) {
        adultNum.push(ele);
        adultName.push(ele.name)
      }
      else {
        kidNum.push(ele);
        kidName.push(ele.name)
      }
    })
    console.log('选择的 ', adultNum, adultName, kidNum, kidName);
    let ad_names: any;
    let ad_i: any;
    let kid_names: any;
    let kid_i: any;
    if (adultNum.length != 0) {
      ad_names = adultName.toString();
      ad_i = '成人' + adultNum.length + '个' + '(' + ad_names + ')';
    }
    if (kidNum.length != 0) {
      kid_names = kidName.toString();
      kid_i = '儿童' + kidNum.length + '个' + '(' + kid_names + ')';
    }
    this.selectHumans = ad_i != undefined ? ad_i : '' + '|' + kid_i != undefined ? kid_i : '';
  }


  select(event: any) {
  }
}