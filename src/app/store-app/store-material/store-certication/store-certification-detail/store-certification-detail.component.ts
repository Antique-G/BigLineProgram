import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { format } from 'date-fns';
// 银行卡校验
import { NzSafeAny } from "ng-zorro-antd/core/types";
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StoreApplyCertifiModel } from '../../../../../interfaces/store/storeApply/store-apply-model';
import { StoreApplyService } from '../../../../../services/store/store-apply/store-apply.service';
import { UploadCertificationComponent } from './upload-certification/upload-certification.component';
import { UploadPdfComponent } from './upload-pdf/upload-pdf.component';




export type MyErrorsOptions = { 'zh-cn': string; en: string } & Record<string, NzSafeAny>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;
export class Bank extends Validators {
  static bank_num(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;
    if (isEmptyInputValue(value)) {
      return null;
    }
    return isBank(value) ? null : { bank_num: { 'zh-cn': `银行卡号格式不正确`, en: `` } };
  }
}

function isEmptyInputValue(value: NzSafeAny): boolean {
  return value == null || value.length === 0;
}

function isBank(value: string): boolean {
  return typeof value === 'string' && /[1-9]\d{12,18}/.test(value);
}


// 身份证号
export class IdCard extends Validators {
  static id_num(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;
    if (isEmptyInputValue(value)) {
      return null;
    }
    return isId_num(value) ? null : { id_num: { 'zh-cn': `身份证号格式不正确`, en: `` } };
  }
}

function isId_num(value: string): boolean {
  return typeof value === 'string' && /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value);
}


@Component({
  selector: 'app-store-certification-detail',
  templateUrl: './store-certification-detail.component.html',
  styleUrls: ['./store-certification-detail.component.css']
})
export class StoreCertificationDetailComponent implements OnInit {
  @Output() tabIndex = new EventEmitter;

  certificationForm!: FormGroup;
  storeApplyCertifiModel: StoreApplyCertifiModel;
  detailModel: any;
  certificationModel: any;
  store_id: any;

  Id1 = '';
  Id2 = '';
  business_license = '';
  travel_agency = '';
  bank1 = '';
  bank2 = '';
  insuranceName = '';
  insuranceUrl = '';
  is_approve = 0;
  id_card_deadlineDate: any;
  business_deadlineDate: any;
  travel_deadlineDate: any;
  insurance_deadlineDate: any;
  isShowId_card = false;
  isShowBusiness = false;
  isShowTravel = false;
  isShowInsurance = false;
  isMin: any;
  isText: any;
  isShowText = false;
  isShowText1 = false;
  isLoadingBtn = false;



  constructor(public fb: FormBuilder, public dialog: MatDialog, private msg: NzMessageService,
    private modal: NzModalService, public storeApplyService: StoreApplyService,) {
    // 校验手机
    const { bank_num } = Bank;
    const { id_num } = IdCard;
    this.certificationForm = this.fb.group({
      supplier_name: [''],
      legal_person: ['', [Validators.required]],
      id_num: ['', [Validators.required, id_num]],
      taxpayer_num: ['', [Validators.required]],
      bank_type: ['', [Validators.required]],
      bank_open: ['', [Validators.required]],
      bank_num: ['', [Validators.required, bank_num]],
      bank_account_name: ['', [Validators.required]],
      id_card_deadline: [null, [Validators.required]],
      business_deadline: [null, [Validators.required]],
      travel_deadline: [null, [Validators.required]],
      insurance_deadline: [null, [Validators.required]],
    });
    this.storeApplyCertifiModel = {
      legal_person: '',
      id_num: '',
      taxpayer_num: '',
      bank_type: '',
      bank_open: '',
      bank_num: '',
      bank_account_name: '',
      id_card_front: '',
      id_card_reverse: '',
      business_license: '',
      travel_agency: '',
      bank_front: '',
      bank_reverse: '',
      insurance: '',
      id_card_deadline: '',
      business_deadline: '',
      travel_deadline: '',
      insurance_deadline: '',
    }
  }

  ngOnInit(): void {
    this.detailModel = JSON.parse(localStorage.getItem("storeAccountDetail")!);
    this.store_id = this.detailModel?.store?.store_id;
    this.is_approve = Number(localStorage.getItem("storeApprove"));
    this.storeApplyService.getDetail(this.store_id).subscribe(res => {
      this.certificationModel = res?.data;
      if (this.certificationModel != '') {
        console.log('this.certificationModel', this.certificationModel);
        this.Id1 = this.certificationModel?.id_card_front;
        this.Id2 = this.certificationModel?.id_card_reverse;
        this.business_license = this.certificationModel?.business_license;
        this.travel_agency = this.certificationModel?.travel_agency;
        this.bank1 = this.certificationModel?.bank_front;
        this.bank2 = this.certificationModel?.bank_reverse;
        this.insuranceUrl = this.certificationModel?.insurance;
        this.insuranceName = this.certificationModel?.insurance;
        this.id_card_deadlineDate = this.certificationModel?.id_card_deadline;
        this.business_deadlineDate = this.certificationModel?.business_deadline;
        this.travel_deadlineDate = this.certificationModel?.travel_deadline;
        this.insurance_deadlineDate = this.certificationModel?.insurance_deadline;
        // 时间有效期
        let arrValue: any[] = [];
        let a = this.getDay(this.id_card_deadlineDate);
        if (a < 0) {
          this.isShowId_card = true;
        }
        else {
          this.isShowId_card = false;
        }
        arrValue.push(a);
        let a1 = this.getDay(this.business_deadlineDate);
        if (a1 < 0) {
          this.isShowBusiness = true;
        }
        else {
          this.isShowBusiness = false;
        }
        arrValue.push(a1);
        let a2 = this.getDay(this.travel_deadlineDate);
        if (a2 < 0) {
          this.isShowTravel = true;
        }
        else {
          this.isShowTravel = false;
        }
        arrValue.push(a2);
        let a3 = this.getDay(this.insurance_deadlineDate);
        if (a3 < 0) {
          this.isShowInsurance = true;
        }
        else {
          this.isShowInsurance = false;
        }
        arrValue.push(a3);
        let newArr = [
          { name: '法人身份证', value: a },
          { name: '工商营业执照', value: a1 },
          { name: '旅行社资质', value: a2 },
          { name: '保险单', value: a3 },
        ]
        // 获取最小的值
        let min = arrValue.sort(function (a, b) {
          return a - b;
        })
        this.isMin = min[0];
        if (this.isMin < 30 && this.isMin > 0) {
          this.isShowText = true;
          this.isShowText1 = false;
          newArr.forEach((item: any) => {
            if (item.value === min[0]) {
              this.isText = item.name;
            }
          });
        }
        if (this.isMin < 0) {
          this.isShowText = false;
          this.isShowText1 = true;
        }
        else if (this.isMin > 30) {
          this.isShowText = false;
          this.isShowText1 = false;
        }
        console.log('min', this.isMin, this.isText);

        console.log('aqqqqqqqqq :>> ', a, a1, a2, a3);

      }
    })
  }



  setValue() {
    this.storeApplyCertifiModel.legal_person = this.certificationForm.value.legal_person;
    this.storeApplyCertifiModel.id_num = this.certificationForm.value.id_num;
    this.storeApplyCertifiModel.taxpayer_num = this.certificationForm.value.taxpayer_num;
    this.storeApplyCertifiModel.bank_type = this.certificationForm.value.bank_type;
    this.storeApplyCertifiModel.bank_open = this.certificationForm.value.bank_open;
    this.storeApplyCertifiModel.bank_num = this.certificationForm.value.bank_num;
    this.storeApplyCertifiModel.bank_account_name = this.certificationForm.value.bank_account_name;
    this.storeApplyCertifiModel.id_card_front = this.Id1;
    this.storeApplyCertifiModel.id_card_reverse = this.Id2;
    this.storeApplyCertifiModel.business_license = this.business_license;
    this.storeApplyCertifiModel.travel_agency = this.travel_agency;
    this.storeApplyCertifiModel.bank_front = this.bank1;
    this.storeApplyCertifiModel.bank_reverse = this.bank2;
    this.storeApplyCertifiModel.insurance = this.insuranceUrl;
    this.storeApplyCertifiModel.id_card_deadline = format(new Date(this.certificationForm.value.id_card_deadline), 'yyyy-MM-dd');
    this.storeApplyCertifiModel.business_deadline = format(new Date(this.certificationForm.value.business_deadline), 'yyyy-MM-dd');
    this.storeApplyCertifiModel.travel_deadline = format(new Date(this.certificationForm.value.travel_deadline), 'yyyy-MM-dd');
    this.storeApplyCertifiModel.insurance_deadline = format(new Date(this.certificationForm.value.insurance_deadline), 'yyyy-MM-dd');
  }



  next() {
    this.setValue();
    for (const i in this.certificationForm.controls) {
      this.certificationForm.controls[i].markAsDirty();
      this.certificationForm.controls[i].updateValueAndValidity();
    }
    if (this.certificationForm.valid) {
      if (this.storeApplyCertifiModel.insurance != '' && this.storeApplyCertifiModel.bank_reverse != '' && this.storeApplyCertifiModel.bank_front != ''
        && this.storeApplyCertifiModel.travel_agency != '' && this.storeApplyCertifiModel.business_license != ''
        && this.storeApplyCertifiModel.id_card_reverse != '' && this.storeApplyCertifiModel.id_card_front != '') {
        console.log('提交的', this.storeApplyCertifiModel);
        this.isLoadingBtn = true;
        this.storeApplyService.storeApproveDetail(this.storeApplyCertifiModel).subscribe(res => {
          console.log('res :>> ', res);
          if (res?.message) {
            this.tabIndex.emit({ tabIndex: 2 })
            localStorage.setItem('storeApprove', '1');
            localStorage.setItem("loginApprove", '1');
            this.isLoadingBtn = false;
          }
          else {

          }
        },
          error => {
            this.isLoadingBtn = false;
          })
      }
      else {
        this.msg.error('请选择上传文件')
      }
    }
  }



  // 身份证正面
  uploadId1() {
    const dialogRef = this.dialog.open(UploadCertificationComponent, {
      width: '550px',
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log("result", res);
      if (res !== undefined) {
        this.Id1 = res.url;
      }
    });
  }

  deleteId1() {
    this.modal.confirm({
      nzTitle: '<h5>提示</h5>',
      nzContent: '确定删除?',
      nzOnOk: () => {
        this.Id1 = '';
      }
    });
  }


  // 身份证fan面
  uploadId2() {
    const dialogRef = this.dialog.open(UploadCertificationComponent, {
      width: '550px',
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log("result", res);
      if (res !== undefined) {
        this.Id2 = res.url;
      }
    });
  }

  deleteId2() {
    this.modal.confirm({
      nzTitle: '<h5>提示</h5>',
      nzContent: '确定删除?',
      nzOnOk: () => {
        this.Id2 = '';
      }
    });
  }


  // 工商营业执照
  uploadBusiness_license() {
    const dialogRef = this.dialog.open(UploadCertificationComponent, {
      width: '550px',
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log("result", res);
      if (res !== undefined) {
        this.business_license = res.url;
      }
    });
  }

  deleteBusiness_license() {
    this.modal.confirm({
      nzTitle: '<h5>提示</h5>',
      nzContent: '确定删除?',
      nzOnOk: () => {
        this.business_license = '';
      }
    });
  }

  // 旅行社资质
  uploadTravel_agency() {
    const dialogRef = this.dialog.open(UploadCertificationComponent, {
      width: '550px',
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log("result", res);
      if (res !== undefined) {
        this.travel_agency = res.url;
      }
    });
  }

  deleteTravel_agency() {
    this.modal.confirm({
      nzTitle: '<h5>提示</h5>',
      nzContent: '确定删除?',
      nzOnOk: () => {
        this.travel_agency = '';
      }
    });
  }


  // 保险单
  uploadInsurance() {
    const dialogRef = this.dialog.open(UploadPdfComponent, {
      width: '550px',
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log("result", res);
      if (res !== undefined) {
        this.insuranceUrl = res.url;
        this.insuranceName = res.contract_name;
      }
    });
  }


  // 银行卡正面
  uploadBank1() {
    const dialogRef = this.dialog.open(UploadCertificationComponent, {
      width: '550px',
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log("result", res);
      if (res !== undefined) {
        this.bank1 = res.url;
      }
    });
  }

  deleteBank1() {
    this.modal.confirm({
      nzTitle: '<h5>提示</h5>',
      nzContent: '确定删除?',
      nzOnOk: () => {
        this.bank1 = '';
      }
    });
  }

  // 银行卡反面
  uploadBank2() {
    const dialogRef = this.dialog.open(UploadCertificationComponent, {
      width: '550px',
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log("result", res);
      if (res !== undefined) {
        this.bank2 = res.url;
      }
    });
  }

  deleteBank2() {
    this.modal.confirm({
      nzTitle: '<h5>提示</h5>',
      nzContent: '确定删除?',
      nzOnOk: () => {
        this.bank2 = '';
      }
    });
  }


  reNext() {
    this.setValue();
    for (const i in this.certificationForm.controls) {
      this.certificationForm.controls[i].markAsDirty();
      this.certificationForm.controls[i].updateValueAndValidity();
    }
    if (this.certificationForm.valid) {
      if (this.storeApplyCertifiModel.insurance != '' && this.storeApplyCertifiModel.bank_reverse != '' && this.storeApplyCertifiModel.bank_front != ''
        && this.storeApplyCertifiModel.travel_agency != '' && this.storeApplyCertifiModel.business_license != ''
        && this.storeApplyCertifiModel.id_card_reverse != '' && this.storeApplyCertifiModel.id_card_front != '') {
        console.log('提交的', this.storeApplyCertifiModel);
        this.isLoadingBtn = true;
        this.storeApplyService.storeApproveDetail(this.storeApplyCertifiModel).subscribe(res => {
          console.log('res :>> ', res);
          if (res?.message) {
            localStorage.setItem('storeApprove', '1');
            localStorage.setItem("loginApprove", '1');
            this.isLoadingBtn = false;
            window.location.reload();
          }
          else {

          }
        },
        error => {
          this.isLoadingBtn = false;
        })
      }
      else {
        this.msg.error('请选择上传文件')
      }
    }
  }


  reCommit() {
    this.modal.confirm({
      nzTitle: '<h4>提示</h4>',
      nzContent: '<h5>是否重新提交认证</h5>',
      nzOnOk: () =>
        this.reNext()
    });
  }

  /**
  * 获取当前月的总天数
  */
  getDays() {
    let date = new Date();
    //将当前月份加1，下移到下一个月
    date.setMonth(date.getMonth() + 1);
    //将当前的日期置为0，
    date.setDate(0);
    //再获取天数即取上个月的最后一天的天数
    let days = date.getDate();
    console.log('days111111111 :>> ', days);
    return days;
  }


    getDay(day: any) {
      console.log("data",day)
    let s1 = new Date(day?.replace(/-/g, "/"));
    let s2 = new Date();//当前日期
    let days = s1.getTime() - s2.getTime();
    let a: any = days / (1000 * 60 * 60 * 24)
    let b: any = parseInt(a);
    return b
  }
}