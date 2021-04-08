import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute } from '@angular/router';
import { AdminStoreService } from '../../../../../services/admin/admin-store.service';
import { AdminStoreCertifiCheckComponent } from './admin-store-certifi-check/admin-store-certifi-check.component';


@Component({
  selector: 'app-admin-store-certifi-data',
  templateUrl: './admin-store-certifi-data.component.html',
  styleUrls: ['./admin-store-certifi-data.component.css']
})
export class AdminStoreCertifiDataComponent implements OnInit {
  certificationForm!: FormGroup;
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
  disabled = true;

  constructor(public fb: FormBuilder, public dialog: MatDialog, private msg: NzMessageService,
    private modal: NzModalService, public activatedRoute: ActivatedRoute, public adminStoreService: AdminStoreService) {
    this.certificationForm = this.fb.group({
      supplier_name: [''],
      legal_person: ['', [Validators.required]],
      id_num: ['', [Validators.required]],
      taxpayer_num: ['', [Validators.required]],
      bank_type: ['', [Validators.required]],
      bank_open: ['', [Validators.required]],
      bank_num: ['', [Validators.required]],
      bank_account_name: ['', [Validators.required]],
      id_card_deadline: ['', [Validators.required]],
      business_deadline: ['', [Validators.required]],
      travel_deadline: ['', [Validators.required]],
      insurance_deadline: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.detailModel = JSON.parse(localStorage.getItem("certification")!);
    this.is_approve = Number(localStorage.getItem("certifiApprove"));
    this.activatedRoute.queryParams.subscribe(params => {
      this.store_id = params.id;
    });
    this.adminStoreService.getDetail(this.store_id).subscribe(res => {
      console.log('结果是 :>> ', res);
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




  next() {
    const dialogRef = this.dialog.open(AdminStoreCertifiCheckComponent, {
      width: '550px',
      data: this.certificationModel.id
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("result", result);
      if (result !== undefined) {
        if (result === 1) {
          this.is_approve = 2;
          localStorage.setItem("certifiApprove", this.is_approve.toString());
        }
        else if (result === 2){
          this.is_approve = 3;
          localStorage.setItem("certifiApprove", this.is_approve.toString());
       
        }
      }

    });
  }



}
