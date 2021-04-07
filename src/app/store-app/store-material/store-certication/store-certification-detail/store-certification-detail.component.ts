import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StoreApplyService } from '../../../../../services/store/store-apply/store-apply.service';
import { StoreApplyCertifiModel } from '../../../../../interfaces/store/storeApply/store-apply-model';
import { UploadCertificationComponent } from './upload-certification/upload-certification.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UploadPdfComponent } from './upload-pdf/upload-pdf.component';
import { NzMessageService } from 'ng-zorro-antd/message';


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

  constructor(public fb: FormBuilder, public dialog: MatDialog, private msg: NzMessageService,
    private modal: NzModalService, public storeApplyService: StoreApplyService,) {
    this.certificationForm = this.fb.group({
      supplier_name: [''],
      legal_person: ['', [Validators.required]],
      id_num: ['', [Validators.required]],
      taxpayer_num: ['', [Validators.required]],
      bank_type: ['', [Validators.required]],
      bank_open: ['', [Validators.required]],
      bank_num: ['', [Validators.required]],
      bank_account_name: ['', [Validators.required]],
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
        this.storeApplyService.storeApproveDetail(this.storeApplyCertifiModel).subscribe(res => {
          console.log('res :>> ', res);
          if (res?.message) {
            localStorage.setItem('storeApprove', '1');
          }
          else {

          }
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
        this.storeApplyService.storeApproveDetail(this.storeApplyCertifiModel).subscribe(res => {
          console.log('res :>> ', res);
          if (res?.message) {
            localStorage.setItem('storeApprove', '1');
            window.location.reload(); 
          }
          else {

          }
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

}