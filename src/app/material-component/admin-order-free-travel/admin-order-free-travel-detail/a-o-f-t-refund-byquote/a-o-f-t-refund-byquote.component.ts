import { format } from 'date-fns';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminRefundService } from '../../../../../services/admin/admin-refund.service';
import { CreateReundModel, ReundCheckModel } from '../../../../../interfaces/store/storeRefund/storerefund';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-a-o-f-t-refund-byquote',
  templateUrl: './a-o-f-t-refund-byquote.component.html',
  styleUrls: ['./a-o-f-t-refund-byquote.component.css']
})
export class AOFTRefundByquoteComponent implements OnInit {
  @Input() data: any;
  addForm!: FormGroup;
  detailModel: any;

  price_other: any;
  price_total: any;
  price_receive: any;

  advance: any;

  basicRefund: any;
  isStandard: any;
  percentage: any;
  percent: any;
  createReundModel: CreateReundModel
  refund_amount: any;
  bascie_money: any;




  // 套餐
  packAge: any;
  isPackRefundBasic: any;
  isPackbasicRefund: any;
  isPack_refund_amount: any;
  selectPack: any;


  constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute, public router: Router,
    private modal: NzModalService, public adminRefundService: AdminRefundService, public message: NzMessageService,) {
    this.addForm = this.fb.group({
      ispackNum: [''],
      order_id: [''],
      product_start_date: [''],
      packAge: [''],
      price_total: [''],
      standard: [''],
      selectPack: [''],
      isPackbasicRefund: [''],
      amount_add: [0],
      amount_cut: [0],
      remarks: [''],
    })
    this.createReundModel = {
      id: '',
      refund_amount: '',
      amount_add: '',
      amount_cut: '',
      members: [],
      remark: '',
      type: '',
      reason: '',
    }
  }

  ngOnInit(): void {
    this.detailModel = this.data;
    this.price_total = '￥' + this.detailModel?.price_total;
    this.price_receive = '￥' + this.detailModel?.price_receive;
 
    let date1 = new Date(format(new Date(this.detailModel?.start_date), 'yyyy,MM,dd'));
    let date2 = new Date(format(new Date(), 'yyyy,MM,dd'));
    this.advance = (date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24);
    console.log('312312312312312', date1, date2, this.advance, 4 <= this.advance && this.advance <= 5);
    if (this.advance > 7) {
      this.isStandard = 0;
      this.percentage = 1;
      this.percent = 100;
    }
    else if (6 <= this.advance && this.advance <= 7) {
      this.isStandard = 1;
      this.percentage = 0.8;
      this.percent = 80;
    }
    else if (4 <= this.advance && this.advance <= 5) {
      this.isStandard = 2;
      this.percentage = 0.7;
      this.percent = 70;
    }
    else if (1 <= this.advance && this.advance <= 3) {
      this.isStandard = 3;
      this.percentage = 0.5;
      this.percent = 50;
    }
    else {
      this.isStandard = 4;
      this.percentage = 0;
      this.percent = 0;
    }
    // 按套餐
    this.packAge = '￥' + this.detailModel?.price_inclusive + '*' + this.detailModel?.num_total;

    if (this.detailModel.type == 0) {
      this.addForm.patchValue({
        ispackNum: this.detailModel?.num_total
      })
      this.onEnterPack(this.detailModel?.num_total);
    }
  }


  OnChanges() {
    // 优惠附加收费
    let priceArr = this.detailModel?.price_detail?.data;
    priceArr.forEach((element: any) => {
      if (element.type === 0) {
        element.price = '+￥' + element?.price;
      }
      else {
        element.price = '-￥' + element?.price;
      }
    });
    for (let i = 0; i < priceArr.length; i++) {
      this.otherArray.push(this.fb.group({
        name: new FormControl(priceArr[i]?.title),
        namePrice: new FormControl(priceArr[i]?.price),
      }))
    }
    console.log('otherArray.controls :>> ', this.otherArray.controls);
  }


  // 附加
  get otherArray() {
    return this.addForm.get("otherList") as FormArray;
  }


  numStay(data: any) {
    data.target.value = data.target.value.replace(/[^\d.]/g, '').replace(/\.{2,}/g, '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
  }

  numStay1(data: any) {
    data.target.value = data.target.value.replace(/[^\d.]/g, '').replace(/\.{2,}/g, '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
  }



  setPackValue() {
    this.createReundModel.id = this.detailModel?.id;
    this.createReundModel.members = '';
    this.createReundModel.refund_amount = this.isPack_refund_amount;
    this.createReundModel.amount_add = this.addForm.value.amount_add;
    this.createReundModel.amount_cut = this.addForm.value.amount_cut;
    this.createReundModel.remark = this.addForm.value.remarks;
    this.createReundModel.number = this.addForm.value.ispackNum;
    this.createReundModel.reason = this.addForm.value.reason;

  }



  toDecimal(x: any) {
    var f = parseFloat(x);
    if (isNaN(f)) {
      return;
    }
    f = Math.round(x * 100) / 100;
    return f;
  }


  // 套餐
  onEnterPack(data: any) {
    console.log('data :>> ', data);
    this.selectPack = this.addForm.value.ispackNum + '份';
    if (Number(this.addForm.value.ispackNum) > Number(this.detailModel?.num_total)) {

      this.message.error('退款套餐数不能大于付款的套餐份数，请重新输入');
      this.isPackRefundBasic = Number(this.detailModel?.num_total) * Number(this.detailModel?.price_inclusive) * Number(this.percentage);
      this.isPackbasicRefund = '（' + this.detailModel?.num_total + '*' + this.detailModel?.price_inclusive + '）*比例' + this.percent + '%=￥' + this.isPackRefundBasic;
      this.isPackRefundBasic = this.toDecimal(this.isPackRefundBasic);

      // 可退款总金额=基础退款金额+额外退款金额-其他扣除费用
      this.isPack_refund_amount = Number(this.isPackRefundBasic) + Number(this.addForm.value.amount_add) - Number(this.addForm.value.amount_cut);
      this.isPack_refund_amount = this.toDecimal(this.isPack_refund_amount);
      if (this.isPack_refund_amount < 0) {
        this.message.create('error', `总金额不能小于0`)
      }
    }
    else {
      this.isPackRefundBasic = Number(this.addForm.value.ispackNum) * Number(this.detailModel?.price_inclusive) * Number(this.percentage);
      this.isPackbasicRefund = '（' + this.addForm.value.ispackNum + '*' + this.detailModel?.price_inclusive + '）*比例' + this.percent + '%=￥' + this.isPackRefundBasic;
      this.isPackRefundBasic = this.toDecimal(this.isPackRefundBasic);
      // 可退款总金额=基础退款金额+额外退款金额-其他扣除费用
      this.isPack_refund_amount = Number(this.isPackRefundBasic) + Number(this.addForm.value.amount_add) - Number(this.addForm.value.amount_cut);
      this.isPack_refund_amount = this.toDecimal(this.isPack_refund_amount);
      if (this.isPack_refund_amount < 0) {
        this.message.create('error', `总金额不能小于0`)
      }
    }
  }


  // isPackRefundBasic
  numTestPack(data: any) {
    console.log('Number(this.isPackbasicRefund)111111 :>> ', Number(this.isPackRefundBasic), Number(this.addForm.value.amount_add), Number(this.addForm.value.amount_cut));
    this.isPack_refund_amount = Number(this.isPackRefundBasic) + Number(this.addForm.value.amount_add) - Number(this.addForm.value.amount_cut);
    this.isPack_refund_amount = this.toDecimal(this.isPack_refund_amount);
    if (this.isPack_refund_amount < 0) {
      this.message.create('error', `总金额不能小于0`)
    }
  }

  numTestPack2(data: any) {
    console.log('Number(this.isP44444444411 :>> ', Number(this.isPackRefundBasic), Number(this.addForm.value.amount_add), Number(this.addForm.value.amount_cut));

    this.isPack_refund_amount = Number(this.isPackRefundBasic) + Number(this.addForm.value.amount_add) - Number(this.addForm.value.amount_cut);
    this.isPack_refund_amount = this.toDecimal(this.isPack_refund_amount);
    if (this.isPack_refund_amount < 0) {
      this.message.create('error', `总金额不能小于0`)
    }
  }




  add() {
    this.setPackValue();
    // 部分退款
    if (this.detailModel.type == 1) {
      if (Number(this.addForm.value.ispackNum) < Number(this.detailModel?.num_total)) {
        this.createReundModel.type = this.detailModel.type;
        console.log('提交的 :>> ', this.createReundModel);
        this.modal.confirm({
          nzTitle: '<h4>确认提交退款</h4>',
          nzContent: '<h5>如果您确认提交退款处理信息无误，提交后财务工作员将审核退款，退款进度请联系财务管理人员。</h5>',
          nzOnOk: () =>
            this.adminRefundService.postRefundCheck(this.createReundModel).subscribe(res => {
              console.log('res :>> ', res);
              if (res === null) {
             
              }
            })
        });
      }
      else {
        this.createReundModel.type = 0;
        console.log('提交的 :>> ', this.createReundModel);
        this.modal.confirm({
          nzTitle: '<h4>确认提交退款</h4>',
          nzContent: '<h5>因所有套餐份数已选择退款，所以此单改成全额退款</h5><h5>如果您确认提交退款处理信息无误，提交后财务工作员将审核退款，退款进度请联系财务管理人员。</h5>',
          nzOnOk: () =>
            this.adminRefundService.postRefundCheck(this.createReundModel).subscribe(res => {
              console.log('res :>> ', res);
              if (res === null) {
              
              }
            })
        });
      }
    }
    else {
      this.createReundModel.type = 0;
      console.log('提交的 :>> ', this.createReundModel);
      this.modal.confirm({
        nzTitle: '<h4>确认提交退款</h4>',
        nzContent: '<h5>如果您确认提交退款处理信息无误，提交后财务工作员将审核退款，退款进度请联系财务管理人员。</h5>',
        nzOnOk: () =>
          this.adminRefundService.postRefundCheck(this.createReundModel).subscribe(res => {
            console.log('res :>> ', res);
            if (res === null) {
        
            }
          })
      });
    }


  }
}



