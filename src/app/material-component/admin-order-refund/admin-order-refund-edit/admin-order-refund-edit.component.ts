import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ReundCheckModel } from '../../../../interfaces/store/storeRefund/storerefund';
import { AdminRefundService } from '../../../../services/admin/admin-refund.service';

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
  checkAdultNum = 0;
  checkkidNum = 0;
  checkbaNum = 0;
  // 出行人成人数
  allAdultNum: any;
  // 出行人儿童数
  allKidNum: any;
  // 出行人婴儿数
  allbabyNum: any;
  
  // 剩余房间数
  refundRoomNum = 0;
  // 房差数
  difRoom = 0;
  isDia = false;
  // 价格变动
  priceDetail:any[] = []

  // 套餐
  packAge: any;
  isPackRefundBasic: any;
  isPackbasicRefund: any;
  isPack_refund_amount: any;
  selectPack: any;
  isRoomTrue = false;
  // 还需支付金额
  playMoney:any = 0
  nowOrderMoney:any = 0
  oldPriceArr:any[] = []
  dueInMoney:any = 0//代收款金额
  newMoneyArr:any[] = []//改价后的金额

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
      packAge: [''],
      ispackNum: [1, [Validators.required]],
      isPackbasicRefund: [''],
      selectPack: [''],
      store_name: [''],
      refundRooms: [0],
    })
    this.reundCheckModel = {
      id: '',
      refund_amount: '',
      amount_add: '',
      amount_cut: '',
      members: [],
      remark: '',
      type: '',
      number: '',
      num_room: '',
      change:[]
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.detailId = params.detailId;
      this.adminRefundService.getRefundDetail(this.detailId).subscribe(res => {
        this.detailModel = res.data;
        console.log('退款2323结果是 :>> ', this.detailModel);
        this.isType = this.detailModel.type === 0 ? "全部退款" : "部分退款";
        // 订单价格显示
        this.pro_num_adult = '￥' + this.detailModel.order?.data?.price_adult + '*' + this.detailModel.order?.data?.num_adult;
        this.pro_num_kid = '￥' + this.detailModel.order?.data?.price_kid + '*' + this.detailModel.order?.data?.num_kid;
        this.pro_num_baby = '￥' + this.detailModel.order?.data?.price_baby + '*' + this.detailModel.order?.data?.baby_num;
        this.price_diff = '￥' + this.detailModel.order?.data?.price_diff + '*' + this.detailModel.order?.data?.num_diff;
        this.price_total = this.detailModel.order?.data?.price_total;
        this.nowOrderMoney = this.detailModel.order?.data?.price_total;
        this.price_receive = this.detailModel.order?.data?.price_receive;
        this.playMoney = (Number(this.detailModel.order?.data?.price_total)*100-Number(this.detailModel.order?.data?.amount_received)*100)/100
        console.log('object :>> ', this.detailModel.price_detail.data,);
        this.dataMember = this.detailModel?.member?.data;
        // 优惠附加收费
        this.priceDetail = JSON.parse(JSON.stringify(this.detailModel.price_detail.data))
        let priceArr =JSON.parse(JSON.stringify(this.detailModel.price_detail.data));
        priceArr.forEach((element: any,index:any) => {
          this.oldPriceArr[index] = false
          if (element.type === 0) {
            element.namePrice = '+￥' + element.price+'*'+element.num;
          }
          else {
            element.namePrice = '-￥' + element.price+'*'+element.num;
          }
        });
        for (let i = 0; i < priceArr.length; i++) {
          this.otherArray.push(this.fb.group({
            name: new FormControl(priceArr[i]?.title),
            namePrice: new FormControl(priceArr[i]?.namePrice),
            price:new FormControl(priceArr[i]?.price),
            num:new FormControl(priceArr[i]?.num),
            item_type:new FormControl(priceArr[i]?.item_type),
            type:new FormControl(priceArr[i]?.type),
            id:new FormControl(priceArr[i]?.id),
          }))
        }
        console.log('otherArray.controls :>> ', this.otherArray.controls);
        //最开始剩余房间数为原始的
        if (this.detailModel.type == 1) {
          this.refundRoomNum = this.detailModel.order?.data?.num_room;
        }
        else {
          this.refundRoomNum = 0;
          this.isDia = true;
        }

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

        // 提前天数
        let date1 = new Date(format(new Date(this.detailModel?.order?.data?.start_date), 'yyyy,MM,dd'));
        let date2 = new Date(format(new Date(this.detailModel?.created_at), 'yyyy,MM,dd'));
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

        // 退款方案  this.isType = this.detailModel.type === 0 ? "全部退款" : "部分退款"; 全部退款就全选
        if (this.detailModel.type === 0) {
          this.selectMemberData.forEach((ele: any) => {
            ele['disabled'] = true;
            this.setOfCheckedId.add(ele.id);
            this.onItemChecked(ele, true)
          })
        }

        // 按套餐
        this.packAge = '￥' + this.detailModel?.order?.data?.price_inclusive + '*' + this.detailModel?.order?.data?.num_total;
        if (this.detailModel.type == 0) {
          this.addForm.patchValue({
            ispackNum: this.detailModel?.order?.data?.num_total
          })
          this.onEnterPack(this.detailModel?.order?.data?.num_total);
        }
        else{
          this.onEnterPack(this.addForm.value.ispackNum);
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

    this.roomChange(this.refundRoomNum);
    this.priceAll();


  }



  // 退款房间数
  numRefundRooms(data: any) {
    console.log('删除前', this.refundRoomNum, data != '')
    console.log('55555 :>> ', data);
    if (data != '' || data == 0) {
      console.log('房间数的修改', data);
      this.refundRoomNum = data;
      this.roomChange(data);
      this.priceAll();
    }
    else {
      this.refundRoomNum = this.refundRoomNum;
      this.roomChange(data);
    }

  }


  // 房间数校验
  roomChange(a: any) {
    // 剩余的成人数
    if (this.detailModel.type != 0) {
      console.log('11111111123123123', this.refundRoomNum);
      let reAudlt = Number(this.allAdultNum.length) - Number(this.checkAdultNum);
      // 剩余的儿童数
      let reKid = Number(this.allKidNum.length) - Number(this.checkkidNum);

      let min = Math.ceil(Number(reAudlt / 2));
      let max = Math.ceil((Number(reAudlt) + Number(reKid)) / 2);
      console.log('11111111 :>> ', min, max, a);
      if (a >= min && a <= max) {
        console.log('zhengque :>> ', 'zhengque');
        this.isRoomTrue = false;

      }
      else {
        // this.message.error("剩余房间数不对，请重新输入剩余房间数");
        this.refundRoomNum = this.refundRoomNum;
        this.isRoomTrue = true;

      }
    }
  }


  priceAll() {
    // 基础金额:
    //  应付：（出行总成人数-退款成人数）*单价+（出行总儿童数-退款儿童数）*单价+（出行总婴儿数-退款婴儿数）*单价+手续费
    let last: any;
    let adultSSSS = Number(this.allAdultNum.length) - Number(this.checkAdultNum);
    let kidSSSS = Number(this.allKidNum.length) - Number(this.checkkidNum);
    let babySSSS = Number(this.allbabyNum.length) - Number(this.checkbaNum);

    let adultfff = Number(adultSSSS) * Number(this.detailModel.order?.data?.price_adult);
    let KidFff = Number(kidSSSS) * Number(this.detailModel.order?.data?.price_kid);
    let babyFff = Number(babySSSS) * Number(this.detailModel.order?.data?.price_baby);
    console.log('剩余的人付钱 :>> ', adultfff, KidFff, babyFff);

    if (Number(this.detailModel.order?.data?.service_charge) != 0 || this.detailModel.order?.data?.service_charge != '') {
      console.log("肤浅的", Number(adultfff), Number(KidFff), Number(babyFff))
      last = Number(adultfff) + Number(KidFff) + Number(babyFff) + Number(this.detailModel.order?.data?.service_charge) + Number(this.detailModel.order?.data?.price_other) - Number(this.detailModel.order?.data?.discount_other);
    }
    else {
      last = Number(adultfff) + Number(KidFff) + Number(babyFff) + Number(this.detailModel.order?.data?.price_other) - Number(this.detailModel.order?.data?.discount_other);
    }
    console.log('最后应付', last);


    // 剩下的成人数
    let remain = Number(this.allAdultNum.length) - Number(this.checkAdultNum);
    console.log('remain ', remain);
     
    //剩余房差房间数
    this.difRoom = Number(this.refundRoomNum) * 2 - Number(remain) - Number(this.detailModel?.order.data?.shared_status);
    if (Number(this.difRoom) < 0) {
      this.difRoom = 0;
    }
    else {
      this.difRoom = Number(this.difRoom)
    }
    console.log('this.difRoom1111', Number(this.refundRoomNum) * 2, Number(this.detailModel?.order.data?.shared_status), this.difRoom);

    // 剩余保险
    let insuMoney = 0
    let totalPeopel = adultSSSS + kidSSSS + babySSSS
    this.priceDetail.map((item:any)=>{
      if(item.type==0&&[1,2].indexOf(item.item_type)>-1)
      {
        insuMoney +=(item.price*100*totalPeopel)/100
      }
    })
   console.log('insuMoney,totalPeopel', insuMoney,totalPeopel);

    // 不拼房
    if (this.detailModel?.order.data?.shared_status == 0) {
      //应该退的钱=订单-剩余的人的钱-剩余的房差  （实付总金额-应付总金额）*比例%
      this.bascie_money = (Number(this.detailModel.order?.data?.price_total) - last - Number(this.detailModel.order?.data?.price_diff) * Number(this.difRoom)) * Number(this.percentage)- Number(insuMoney);
      // 保留两位小数
      this.bascie_money = this.toDecimal(this.bascie_money);

      console.log('1121212', this.bascie_money);
      // 总价
      let total = Number(this.detailModel.order?.data?.price_total);
      // 剩余的人付钱
      let member = Number(adultfff) + Number(KidFff) + Number(babyFff);
      // 房差
      let price_diff = Number(this.detailModel.order?.data?.price_diff) * Number(this.difRoom);
      // +附加收费
      let other = Number(this.detailModel.order?.data?.price_other);
      // -优惠
      let discount_other = Number(this.detailModel.order?.data?.discount_other);

      this.basicRefund = (total - (member + price_diff + other - discount_other))
      this.basicRefund = '（' + total + '-(' + member + '+' + insuMoney +'+' + price_diff + '+' + other + '-' + discount_other + '）*比例' + this.percent + '%=￥' + this.bascie_money;

    }
    // 拼房
    else {
      this.bascie_money = (Number(this.detailModel.order?.data?.price_total) - last - Number(this.detailModel.order?.data?.price_other) + Number(this.detailModel.order?.data?.discount_other)) * Number(this.percentage)-Number(insuMoney);
      console.log('object :>> ', this.bascie_money, this.toDecimal(this.bascie_money));
      // 保留两位小数
      this.bascie_money = this.toDecimal(this.bascie_money);
      let total = Number(this.detailModel.order?.data?.price_total);
      let member = Number(adultfff) + Number(KidFff) + Number(babyFff);
      let other = Number(this.detailModel.order?.data?.price_other);
      let discount_other = Number(this.detailModel.order?.data?.discount_other);

      this.basicRefund = '（' + total + '-(' + member + '+' + insuMoney +'+' + other + '-' + discount_other + '）*比例' + this.percent + '%=￥' + this.bascie_money;

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
    this.reundCheckModel.num_room = this.refundRoomNum;
  }

  setPackValue() {
    this.reundCheckModel.id = this.detailModel?.id;
    this.reundCheckModel.members = '';
    this.reundCheckModel.refund_amount = this.isPack_refund_amount;
    this.reundCheckModel.amount_add = this.addForm.value.amount_add;
    this.reundCheckModel.amount_cut = this.addForm.value.amount_cut;
    this.reundCheckModel.remark = this.addForm.value.remarks;
    this.reundCheckModel.number = this.addForm.value.ispackNum;
    this.reundCheckModel.num_room = 0
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


  // 套餐
  onEnterPack(data: any) {
    console.log('data :>> ', data);
    this.selectPack = this.addForm.value.ispackNum + '份';
    if (Number(this.addForm.value.ispackNum) > Number(this.detailModel?.order?.data?.num_total)) {

      this.message.error('退款套餐数不能大于付款的套餐份数，请重新输入');
      this.isPackRefundBasic = Number(this.detailModel?.order?.data?.num_total) * Number(this.detailModel?.order?.data?.price_inclusive) * Number(this.percentage);
      this.isPackbasicRefund = '（' + this.detailModel?.order?.data?.num_total + '*' + this.detailModel?.order?.data?.price_inclusive + '）*比例' + this.percent + '%=￥' + this.isPackRefundBasic;
      this.isPackRefundBasic = this.toDecimal(this.isPackRefundBasic);

      // 可退款总金额=基础退款金额+额外退款金额-其他扣除费用
      this.isPack_refund_amount = Number(this.isPackRefundBasic) + Number(this.addForm.value.amount_add) - Number(this.addForm.value.amount_cut);
      this.isPack_refund_amount = this.toDecimal(this.isPack_refund_amount);
      if (this.isPack_refund_amount < 0) {
        this.message.create('error', `总金额不能小于0`)
      }
    }
    else {
      this.isPackRefundBasic = Number(this.addForm.value.ispackNum) * Number(this.detailModel?.order?.data?.price_inclusive) * Number(this.percentage);
      this.isPackbasicRefund = '（' + this.addForm.value.ispackNum + '*' + this.detailModel?.order?.data?.price_inclusive + '）*比例' + this.percent + '%=￥' + this.isPackRefundBasic;
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




  addPack() {
    this.setPackValue();
    // 部分退款
    if (this.detailModel.type == 1) {
      if (Number(this.addForm.value.ispackNum) < Number(this.detailModel?.order?.data?.num_total)) {
        this.reundCheckModel.type = this.detailModel.type;
        console.log('提交的 :>> ', this.reundCheckModel);
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
      else {
        this.reundCheckModel.type = 0;
        console.log('提交的 :>> ', this.reundCheckModel);
        this.modal.confirm({
          nzTitle: '<h4>确认提交退款</h4>',
          nzContent: '<h5>因所有套餐份数已选择退款，所以此单改成全额退款</h5><h5>如果您确认提交退款处理信息无误，提交后财务工作员将审核退款，退款进度请联系财务管理人员。</h5>',
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
    else {
      this.reundCheckModel.type = 0;
      console.log('提交的 :>> ', this.reundCheckModel);
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

  priceChange(price:any,i:any){
    this.oldPriceArr[i]=true
    let money = Number(this.priceDetail[i].price)-price
    this.newMoneyArr[i] = money
  
    this.amountMoney()
    // this.reundCheckModel.change.push({id:this.priceDetail[i].id,price})
    console.log('priceChange',price,i,this.nowOrderMoney);
  }

  amountMoney(){
      let total = 0
      this.newMoneyArr.map(item=>{
        if(item){
          total+=item
        }
      })
      this.nowOrderMoney= (this.price_total*100 + total*100)/100
  }
  
}


