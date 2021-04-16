import { format } from 'date-fns';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminRefundService } from '../../../../services/admin/admin-refund.service';
import { ReundCheckModel } from '../../../../interfaces/store/storeRefund/storerefund';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-admin-order-refund-edit',
  templateUrl: './admin-order-refund-edit.component.html',
  styleUrls: ['./admin-order-refund-edit.component.css']
})
export class AdminOrderRefundEditComponent implements OnInit {
  detailId: any;
  selectedTabIndex = 0;    //选中的tab 默认第一个
  addForm!: FormGroup;
  detailModel: any;
  isType: any;
  dataSource: any;
  pro_num_adult: any;
  pro_num_kid: any;
  pro_num_baby: any;
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
  percent: any;
  reundCheckModel: ReundCheckModel;
  refund_amount: any;
  bascie_money: any;
  checked = false;
  // 勾选的成人数
  checkAdultNum: any;
  checkkidNum: any;
  checkbaNum: any;
  // 出行人成人数
  allAdultNum: any;
  // 出行人儿童数
  allKidNum: any;
  // 出行人婴儿数
  allbabyNum: any;

  addMoney: any;
  deleteMoney: any;
  isKidR: any;
  isBabyR: any;



  constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute, public router: Router,
    private modal: NzModalService, public adminRefundService: AdminRefundService, public message: NzMessageService,) {
    this.addForm = this.fb.group({
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
      pro_num_baby: [''],
      price_diff: [''],
      price_other: [''],
      price_total: [''],
      otherList: this.fb.array([]),
      customer_remarks: [''],
      standard: [''],
      selectHumans: [''],
      basicRefund: [''],
      amount_add: [0],
      amount_cut: [0],
      remarks: [''],
    })
    this.reundCheckModel = {
      id: '',
      refund_amount: '',
      amount_add: '',
      amount_cut: '',
      members: [],
      remark: '',
      type: ''
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.detailId = params.detailId;
      this.adminRefundService.getRefundDetail(this.detailId).subscribe(res => {
        this.detailModel = res.data;
        console.log('退款2323结果是 :>> ', this.detailModel);
        this.isType = this.detailModel.type === 0 ? "全部退款" : "部分退款";
        this.pro_num_adult = '￥' + this.detailModel.order?.data?.price_adult + '*' + this.detailModel.order?.data?.num_adult;
        this.pro_num_kid = '￥' + this.detailModel.order?.data?.price_kid + '*' + this.detailModel.order?.data?.num_kid;
        this.pro_num_baby = '￥' + this.detailModel.order?.data?.price_baby + '*' + this.detailModel.order?.data?.baby_num;
        this.isKidR = Number(this.detailModel.order?.data?.price_kid) * Number(this.detailModel.order?.data?.num_kid);
        this.isBabyR = Number(this.detailModel.order?.data?.price_baby) * Number(this.detailModel.order?.data?.baby_num);
        this.price_diff = '￥' + this.detailModel.order?.data?.price_diff;
        this.price_total = '￥' + this.detailModel.order?.data?.price_total;
        this.price_receive = '￥' + this.detailModel.order?.data?.price_receive;
        console.log('object :>> ', this.detailModel.price_detail.data,);
        // 优惠附加收费
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
        // 筛选出行人未申请过退款的
        let newMember: any[] = [];


        this.selectMemberData.forEach((ele: any) => {
          if (ele.refund_status === 0) {
            newMember.push(ele);
          }
        })
        this.selectMemberData = newMember;
        // 总成人数
        let adAllArr: any[] = [];
        let kidAllArr: any[] = [];
        let baAllArr: any[] = [];
        this.selectMemberData.forEach((ele: any) => {
          if (ele.is_kid === 0) {
            adAllArr.push(ele);
          }
          if (ele.is_kid === 1) {
            kidAllArr.push(ele);
          }
          if (ele.is_kid === 2) {
            baAllArr.push(ele);
          }
        })
        // 应退款的那些人
        this.allAdultNum = adAllArr;  //成人
        this.allKidNum = kidAllArr;   //儿童
        this.allbabyNum = baAllArr;   //婴儿


        console.log('5666565656 ', this.selectMemberData, this.allAdultNum, this.allKidNum, this.allbabyNum);
        let date1 = new Date(format(new Date(this.detailModel?.order?.data?.start_date), 'yyyy,MM,dd'));
        let date2 = new Date(format(new Date(this.detailModel?.created_at), 'yyyy,MM,dd'))
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

        // 退款方案  this.isType = this.detailModel.type === 0 ? "全部退款" : "部分退款";
        if (this.detailModel.type === 0) {
          this.selectMemberData.forEach((ele: any) => {
            ele['disabled'] = true;
            this.setOfCheckedId.add(ele.id);
            this.onItemChecked(ele, true)
          })
        }
        console.log('234234234 :>> ', this.selectMemberData, this.detailModel.type === 0);

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



  onAllChecked(checked: boolean): void {
    this.selectMemberData.filter(({ disabled }) => !disabled).forEach((data) => this.updateCheckedSet(data, checked));

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
    let babyNum: any[] = [];
    let babyName: any[] = [];
    console.log('this.setArr.add(data); :>> ', [...this.setArr]);
    newArr.forEach((ele: any) => {
      if (ele.is_kid === 0) {
        adultNum.push(ele);
        adultName.push(ele.name);
      }
      else if (ele.is_kid === 1) {
        kidNum.push(ele);
        kidName.push(ele.name);
      }
      else if (ele.is_kid === 2) {
        babyNum.push(ele);
        babyName.push(ele.name);
      }
    })
    console.log('选择的 ', adultNum, adultName, kidNum, kidName);
    // 已勾选的成人数
    this.checkAdultNum = adultNum.length;
    this.checkkidNum = kidNum.length;
    this.checkbaNum = babyNum.length;
    console.log('已勾选的成人数', this.checkAdultNum, this.checkkidNum, this.checkbaNum);


    let ad_names: any;
    let ad_i: any;
    let kid_names: any;
    let kid_i: any;
    let baby_names: any;
    let baby_i: any;
    if (adultNum.length != 0) {
      ad_names = adultName.toString();
      ad_i = '成人' + adultNum.length + '个' + '(' + ad_names + ')';
    }
    if (kidNum.length != 0) {
      kid_names = kidName.toString();
      kid_i = '儿童' + kidNum.length + '个' + '(' + kid_names + ')';
    }
    if (babyNum.length != 0) {
      baby_names = babyName.toString();
      baby_i = '婴儿' + babyNum.length + '个' + '(' + baby_names + ')';
    }


    if (adultNum.length != 0) {
      this.selectHumans = ad_i;
      if (kidNum.length != 0) {
        this.selectHumans = ad_i + '|' + kid_i;
        if (babyNum.length != 0) {
          this.selectHumans = ad_i + '|' + kid_i + '|' + baby_i;
        }
      }
      else if (babyNum.length != 0) {
        this.selectHumans = ad_i + '|' + baby_i;
      }
    }
    else if (kidNum.length != 0) {
      this.selectHumans = kid_i;
      if (babyNum.length != 0) {
        this.selectHumans = kid_i + '|' + baby_i;
      }
    }
    else if (babyNum.length != 0) {
      this.selectHumans = baby_i;
    }
    else if (adultNum.length === 0 && kidNum.length === 0 && babyNum.length === 0) {
      this.selectHumans = '';
    }

    // 基础金额:
    //  应付：（出行总成人数-退款成人数）*单价+（出行总儿童数-退款儿童数）*单价+（出行总婴儿数-退款婴儿数）*单价+手续费
    let last: any;
    let adultSSSS = Number(this.allAdultNum.length) - Number(this.checkAdultNum);
    let kidSSSS = Number(this.allKidNum.length) - Number(this.checkkidNum);
    let babySSSS = Number(this.allbabyNum.length) - Number(this.checkbaNum);

    console.log('剩余的人数 :>> ', adultSSSS, kidSSSS,babySSSS);
    let adultfff = Number(adultSSSS) * Number(this.detailModel.order?.data?.price_adult);
    let KidFff = Number(kidSSSS) * Number(this.detailModel.order?.data?.price_kid);
    let babyFff = Number(babySSSS) * Number(this.detailModel.order?.data?.price_baby);
    console.log('剩余的人付钱 :>> ', adultfff, KidFff,babyFff);
    if (Number(this.detailModel.order?.data?.service_charge) != 0 || this.detailModel.order?.data?.service_charge != '') {
     console.log("肤浅的",Number(adultfff),Number(KidFff), Number(babyFff))
      last = Number(adultfff) + Number(KidFff) + Number(babyFff) + Number(this.detailModel.order?.data?.service_charge);
    }
    else {
      last = Number(adultfff) + Number(KidFff)+Number(babyFff) ;
    }



    console.log('最后应付', last);


    // 剩下的成人数
    let remain = Number(this.allAdultNum.length) - Number(this.checkAdultNum);
    console.log('remain ', remain);

    // 剩下的成人是单数，不退房差
    if ((Number(remain)) % 2 != 0) {
      // 应该退的钱=订单-剩余的人的钱-房差  （实付总金额-应付总金额）*比例%
      this.bascie_money = (Number(this.detailModel.order?.data?.price_total) - last - Number(this.detailModel.order?.data?.price_diff)) * Number(this.percentage);
      // 保留两位小数
      this.bascie_money = this.toDecimal(this.bascie_money);

      console.log('1121212', this.bascie_money);
      let i = Number(this.detailModel.order?.data?.price_total);
      let ii = last;
      let iii = Number(this.detailModel.order?.data?.price_diff);
      if (iii === 0) {
        this.basicRefund = '（' + i + '-' + ii + '）*比例' + this.percent + '%=￥' + this.bascie_money;
      }
      else {
        this.basicRefund = '（' + i + '-（' + ii + '+' + iii + '）*比例' + this.percent + '%=￥' + this.bascie_money;
      }

    }
    else {
      this.bascie_money = (Number(this.detailModel.order?.data?.price_total) - last) * Number(this.percentage);
      console.log('object :>> ', this.bascie_money, this.toDecimal(this.bascie_money));
      // 保留两位小数
      this.bascie_money = this.toDecimal(this.bascie_money);
      let i = Number(this.detailModel.order?.data?.price_total);
      let ii = last;
      this.basicRefund = '（' + i + '-' + ii + '）*比例' + this.percent + '%=￥' + this.bascie_money;

    }


    // 可退款总金额=基础退款金额+额外退款金额-其他扣除费用
    this.refund_amount = Number(this.bascie_money) + Number(this.addForm.value.amount_add) - Number(this.addForm.value.amount_cut);
    this.refund_amount = this.toDecimal(this.refund_amount);
    if (this.refund_amount < 0) {
      this.message.create('error', `总金额不能小于0`)
    }
  }


  numTest(data: any) {
    console.log('1111111111', data, this.addForm.value.amount_add);
    console.log('Number(this.bascie_money) :>> ', Number(this.bascie_money), Number(this.addForm.value.amount_add), Number(this.addForm.value.amount_cut));
    this.refund_amount = Number(this.bascie_money) + Number(this.addForm.value.amount_add) - Number(this.addForm.value.amount_cut);
    this.refund_amount = this.toDecimal(this.refund_amount);
    if (this.refund_amount < 0) {
      this.message.create('error', `总金额不能小于0`)
    }
  }

  numTest1(data: any) {
    console.log('2222222', data)
    this.refund_amount = Number(this.bascie_money) + Number(this.addForm.value.amount_add) - Number(this.addForm.value.amount_cut);
    this.refund_amount = this.toDecimal(this.refund_amount);
    if (this.refund_amount < 0) {
      this.message.create('error', `总金额不能小于0`)
    }
  }


  numStay(data: any) {
    data.target.value = data.target.value.replace(/[^\d.]/g, '').replace(/\.{2,}/g, '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
  }

  numStay1(data: any) {
    data.target.value = data.target.value.replace(/[^\d.]/g, '').replace(/\.{2,}/g, '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
  }


  setValue() {
    this.reundCheckModel.id = this.detailModel?.id;
    this.reundCheckModel.members = [...this.setOfCheckedId];
    this.reundCheckModel.refund_amount = this.refund_amount;
    this.reundCheckModel.amount_add = this.addForm.value.amount_add;
    this.reundCheckModel.amount_cut = this.addForm.value.amount_cut;
    this.reundCheckModel.remark = this.addForm.value.remarks;
  }



  add() {
    if (this.refund_amount < 0) {
      this.message.create('error', `总金额不能小于0`)
    }
    else {
      if (Number(this.refund_amount) > Number(this.detailModel.order?.data?.price_total)) {
        this.message.create('error', `退款总金额不能大于订单付款总金额`)
      }
      else {
        console.log('Number(this.refund_amount) :>> ', Number(this.refund_amount), Number(this.price_total), Number(this.refund_amount) > Number(this.price_receive));
        this.setValue();
        console.log('this.checkAdultNum.length :>> ', this.checkAdultNum, this.allAdultNum.length);
        if (this.checkAdultNum === this.allAdultNum.length) {
          if (this.checkkidNum != this.allKidNum.length || this.checkbaNum != this.allbabyNum.length) {
            this.message.create('error', `所有出行人为成人的已选择退款，儿童和婴儿也必须退款`);
          }
          else {
            if (this.detailModel?.type === 0) {
              this.reundCheckModel.type = 0;
              this.modal.confirm({
                nzTitle: '<h4>确认提交退款</h4>',
                nzContent: '<h5>如果您确认提交退款处理信息无误，提交后财务工作员将审核退款，退款进度请联系财务管理人员。</h5>',
                nzOnOk: () =>
                  this.adminRefundService.postRefundCheck(this.reundCheckModel).subscribe(res => {
                    console.log('res :>> ', res);
                    if (res === null) {
                      this.router.navigate(['/admin/main/refund']);
                    }
                  })
              });
            }
            else if (this.detailModel?.type === 1) {
              this.reundCheckModel.type = 0;
              this.modal.confirm({
                nzTitle: '<h4>确认提交退款</h4>',
                nzContent: '<h5>因所有出行人为成人的已选择退款，所以此单改成全额退款</h5><h5>如果您确认提交退款处理信息无误，提交后财务工作员将审核退款，退款进度请联系财务管理人员。</h5>',
                nzOnOk: () =>
                  this.adminRefundService.postRefundCheck(this.reundCheckModel).subscribe(res => {
                    console.log('res :>> ', res);
                    if (res === null) {
                      this.router.navigate(['/admin/main/refund']);
                    }
                  })
              });
            }

          }
        }
        else {
          this.reundCheckModel.type = 1;
          this.modal.confirm({
            nzTitle: '<h4>确认提交退款</h4>',
            nzContent: '<h5>如果您确认提交退款处理信息无误，提交后财务工作员将审核退款，退款进度请联系财务管理人员。</h5>',
            nzOnOk: () =>
              this.adminRefundService.postRefundCheck(this.reundCheckModel).subscribe(res => {
                console.log('res :>> ', res);
                if (res === null) {
                  this.router.navigate(['/admin/main/refund']);
                }
              })
          });
        }
      }

    }
  }


  toDecimal(x: any) {
    var f = parseFloat(x);
    if (isNaN(f)) {
      return;
    }
    f = Math.round(x * 100) / 100;
    return f;
  }
}


