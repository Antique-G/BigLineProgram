import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminOrderGroupTravelService } from '../../../../services/admin/admin-order-group-travel.service';
import { DetailsModel } from '../../../../interfaces/store/storeOrder/store-order-group-travel-model';
import { format } from 'date-fns';
import { AOGTDetailChangeDataComponent } from './a-o-g-t-detail-change-data/a-o-g-t-detail-change-data.component';
import { AOGTDPartRefundComponent } from './a-o-g-t-d-part-refund/a-o-g-t-d-part-refund.component';
import { AOGTDChangePriceComponent } from './a-o-g-t-d-change-price/a-o-g-t-d-change-price.component';
import { AdminOrderService } from '../../../../services/admin/admin-order.service';
import { EditInfoModel, EditMemberModel } from '../../../../interfaces/store/storeOrder/store-order-model';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-admin-order-group-travel-detail',
  templateUrl: './admin-order-group-travel-detail.component.html',
  styleUrls: ['./admin-order-group-travel-detail.component.css']
})
export class AdminOrderGroupTravelDetailComponent implements OnInit {
  public isSpinning = true;
  addForm!: FormGroup;
  detailId: any;
  detailModel!: DetailsModel;
  dataMember: any;
  audltPrice: any;
  childPrice: any;
  babyPrice: any;

  priceTotal: any;
  dataPayLog: any[] = [];
  refundLog: any[] = [];

  // 修改信息
  isChange = false;
  editMemberModel: EditMemberModel;
  editInfoModel: EditInfoModel;
  idChangeBir = false;
  idChangeBirDate: any;



  constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute, public router: Router, private msg: NzMessageService,
    public adminOrderGroupTravelService: AdminOrderGroupTravelService, private modal: NzModalService,
    public adminOrderService: AdminOrderService) {
    this.addForm = this.fb.group({
      order_id: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      contact_name: ['', [Validators.required]],
      contact_phone: ['', [Validators.required]],
      contact_wechat: [''],
      contact_qq: [''],
      contact_email: [''],
      emergency_contact_person: [''],
      emergency_contact_number: [''],
      customer_remarks: [''],
      internal_remarks: [''],
      days: [''],
    });
    this.editMemberModel = {
      id: '',
      name: '',
      eng_name: '',
      gender: '',
      phone: '',
      id_type: '',
      id_num: '',
      birthday: '',
      assembling_place: '',
      assembling_time: '',
    };
    this.editInfoModel = {
      id: '',
      contact_name: '',
      contact_phone: '',
      contact_wechat: '',
      contact_qq: '',
      contact_email: '',
      emergency_contact_person: '',
      emergency_contact_number: '',
      customer_remarks: '',
      internal_remarks: '',
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log("params", params)
      this.detailId = params?.detailId;
      // 详情
      this.isSpinning = true;
      this.getgroupTravelDetail();
    });
  }


  getgroupTravelDetail() {
    this.adminOrderGroupTravelService.getgroupTravelDetail(this.detailId).subscribe(res => {
      console.log("结果是", res);
      this.isSpinning = false;

      this.detailModel = res.data;
      // 支付流水
      let pagLogArr: any[] = [];
      res.data?.pay_log?.data.forEach((element: any) => {
        if (element.status == 2) {
          pagLogArr.push(element)
        }
      });
      this.dataPayLog = pagLogArr;

      // 退款流水
      let reFundLogArr: any[] = [];
      res.data?.refund?.data.forEach((element: any) => {
        if (element.status == 2 || element.status == 3) {
          reFundLogArr.push(element)
        }
      });
      this.refundLog = reFundLogArr;

      this.dataMember = res.data?.member?.data;
      console.log("出行人信息内容", this.dataMember);
      this.dataMember.forEach((element: any) => {
        if (element.birthday === null) {
          let year = element.id_num.slice(6, 10);
          let month = element.id_num.slice(10, 12);
          let date = element.id_num.slice(12, 14);
          element.birthday = year + '-' + month + '-' + date;
        }
        element['edit'] = false;
        if (element?.assembling_time != null) {
          let i = '2021-01-01' + ' ' + element?.assembling_time;
          let newDate = new Date(i);
          console.log('object :>> ', newDate, i);
          element.assembling_time = format(new Date(newDate), 'yyyy-MM-dd HH:mm');
        }
      });

      // 费用明细
      this.fee();
    })
  }

  fee() {
    // 费用明细
    this.audltPrice = Number(this.detailModel?.price_adult) * Number(this.detailModel?.num_adult);
    this.childPrice = Number(this.detailModel?.price_kid) * Number(this.detailModel?.num_kid);
    this.babyPrice = Number(this.detailModel?.price_baby) * Number(this.detailModel?.baby_num);
    this.priceTotal = Number(this.detailModel?.price_total) - Number(this.detailModel?.amount_received);
    this.priceTotal = this.toDecimal(this.priceTotal);
  }


  // 保留两位小数
  toDecimal(x: any) {
    var f = parseFloat(x);
    if (isNaN(f)) {
      return;
    }
    f = Math.round(x * 100) / 100;
    return f;
  }

  // 订单修改日期
  changeDate() {
    const editmodal = this.modal.create({
      nzTitle: '订单修改日期',
      nzWidth: 800,
      nzContent: AOGTDetailChangeDataComponent,
      nzComponentParams: {
        data: this.detailModel
      },
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
      this.activatedRoute.queryParams.subscribe(params => {
        console.log("params", params)
        this.detailId = params?.detailId;
        // 详情
        this.getgroupTravelDetail();

      });
    })
  }





  orderPartRefund() {
    const editmodal = this.modal.create({
      nzTitle: '订单退款',
      nzWidth: 1000,
      nzMaskClosable: false,
      nzContent: AOGTDPartRefundComponent,
      nzComponentParams: {
        data: this.detailModel
      },
      nzFooter: [
        {
          label: '提交退款申请',
          type: 'primary',
          onClick: componentInstance => {
            componentInstance?.add()
          }
        }
      ]
    })
    editmodal.afterClose.subscribe(res => {
    })
  }





  // 订单改价
  changePrice() {
    const editmodal = this.modal.create({
      nzTitle: '订单改价',
      nzContent: AOGTDChangePriceComponent,
      nzComponentParams: {
        data: this.detailModel
      },
      nzFooter: null
    })
    editmodal.afterClose.subscribe(res => {
      this.activatedRoute.queryParams.subscribe(params => {
        console.log("params", params)
        this.detailId = params?.detailId;
        // 详情
        this.getgroupTravelDetail();

      });
    })
  }


  // 修改联系人信息
  setValue() {
    this.editInfoModel.id = this.detailId;
    this.editInfoModel.contact_name = this.addForm.value.contact_name;
    this.editInfoModel.contact_phone = this.addForm.value.contact_phone;
    this.editInfoModel.contact_wechat = this.addForm.value.contact_wechat;
    this.editInfoModel.contact_qq = this.addForm.value.contact_qq;
    this.editInfoModel.contact_email = this.addForm.value.contact_email;
    this.editInfoModel.emergency_contact_person = this.addForm.value.emergency_contact_person;
    this.editInfoModel.emergency_contact_number = this.addForm.value.emergency_contact_number;
    this.editInfoModel.customer_remarks = this.addForm.value.customer_remarks;
    this.editInfoModel.internal_remarks = this.addForm.value.internal_remarks;

  }

  changeDetail() {
    this.isChange = true;
  }


  commitDetail() {
    this.setValue();
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {
      this.modal.confirm({
        nzTitle: "<h4>提示</h4>",
        nzContent: "<h6>确认修改联系人信息</h6>",
        nzOnOk: () =>
          this.adminOrderService.editInfo(this.editInfoModel).subscribe(res => {
            console.log('res :>> ', res);
            this.getgroupTravelDetail();
            this.isChange = false;
          })
      });
    }

  }

  cancelDetail() {
    this.isChange = false;
  }

  // 修改出行人信息
  startEdit(data: any): void {
    console.log('点击的饿id :>> ', data, data.is_kid, data.is_kid == 2);
    // 处理婴儿
    if (data.is_kid == 2) {
      if (data.birthday = '--') {
        data.birthday = null;
      }
      if (data.assembling_time == '') {
        data.assembling_time = format(new Date(), 'yyyy-MM-dd HH:mm');
      }
    }
    this.dataMember.filter(function (item: any, index: any) {
      if (item.id === data.id) {
        item.edit = true;
      }
    });

  }


  cancelEdit(id: string): void {
    console.log('id :>> ', id);
    this.dataMember.filter(function (item: any, index: any) {
      if (item.id === id) {
        item.edit = false;
      }
    });
  }

  saveEdit(data: any): void {
    this.editMemberModel.id = data.id;
    this.editMemberModel.name = data.name;
    this.editMemberModel.eng_name = data.eng_name;
    this.editMemberModel.gender = data.gender;
    this.editMemberModel.phone = data.phone;
    this.editMemberModel.id_type = data.id_type;
    this.editMemberModel.id_num = data.id_num;
    if (this.idChangeBir === false) {
      this.editMemberModel.birthday = data.birthday;
    }
    else {
      this.editMemberModel.birthday = this.idChangeBirDate;
    }
    this.editMemberModel.assembling_place = data.assembling_place;
    if (data.assembling_time != null) {
      this.editMemberModel.assembling_time = format(new Date(data.assembling_time), 'HH:mm');
    }
    console.log('v33333333 ', this.editMemberModel);

    // 证件照必填
    if (this.detailModel?.product?.data?.request_id_num == 1) {
      if (this.editMemberModel.birthday == null) {
        this.msg.error('出生年月日不能为空');
      }
      else {
        this.adminOrderService.editMember(this.editMemberModel).subscribe((res: any) => {
          console.log('结果是 :>> ', res);
          this.dataMember.filter(function (item: any, index: any) {
            if (item.id === data.id) {
              item.edit = false;
            }
          });
          this.getgroupTravelDetail();
        })
      }
    }
    else {
      if (this.editMemberModel.birthday == null) {
        this.editMemberModel.birthday = '';
      }
      this.adminOrderService.editMember(this.editMemberModel).subscribe((res: any) => {
        console.log('结果是 :>> ', res);
        this.dataMember.filter(function (item: any, index: any) {
          if (item.id === data.id) {
            item.edit = false;
          }
        });
        this.getgroupTravelDetail();
      })
    }


  }

  // 修改出生日期
  onChangeBir(event: any) {
    console.log('event :>> ', event);
    if (event != null) {
      this.idChangeBir = true;
      this.idChangeBirDate = format(new Date(event), 'yyyy-MM-dd');
    }
  }
}

