import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyValidators } from '../../../../app/util/phone';
import { PhoneCodeService } from '../../../../services/common/phone-code.service';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { TouristDetailModel, TouristUpdateRequestModel } from '../../../../interfaces/store/storeTourist/store-tourist-model';
import { AdminTouristService } from '../../../../services/admin/admin-tourist.service';

@Component({
  selector: 'app-admin-tourist-detail',
  templateUrl: './admin-tourist-detail.component.html',
  styleUrls: ['./admin-tourist-detail.component.css']
})
export class AdminTouristDetailComponent implements OnInit {
  addForm!: FormGroup;
  disabledClick = false;
  paracont = '发送验证码';
  isCodeValue = 'show';
  touristDetailModel: TouristDetailModel;
  touristUpdateRequestModel: TouristUpdateRequestModel

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AdminTouristDetailComponent>, public phoneCodeService: PhoneCodeService,
     @Inject(MAT_DIALOG_DATA) public data: any,public adminTouristService: AdminTouristService,) {
    this.touristDetailModel = this.data;
    this.forms();
    this.touristUpdateRequestModel = {
      id: '',
      name: '',
      mobile: '',
      code: '',
      status: '',
    }
  }

  forms() {
    // 校验手机
    const { mobile } = MyValidators;
    this.addForm = this.fb.group({
      name: [this.touristDetailModel.name, [Validators.required]],
      mobile: [this.touristDetailModel.mobile, [Validators.required, mobile]],
      verificationCode: [''],
      status: [this.touristDetailModel.status, [Validators.required]]
    });
  }


  ngOnInit(): void {
  }


  getverifycode() {
    this.addForm.controls['mobile'].markAsDirty();           // 点击获取验证码要以输入了手机号为前提 
    this.addForm.controls['mobile'].updateValueAndValidity();
    this.phoneCodeService.sendCode(this.addForm.controls.mobile.value).subscribe(res => {   // 如果手机号验证通过
      console.log("res", res)
      if (res) {
        const numbers = interval(1000);
        const takeFourNumbers = numbers.pipe(take(60));
        takeFourNumbers.subscribe(res => {
          this.paracont = (60 - res) + "秒后可重发";
          this.disabledClick = true;
        },
          error => { },
          () => {
            this.paracont = "重新发送";
            this.disabledClick = false;
          });
      }
    });
  }


  setValue() {
    this.touristUpdateRequestModel.name = this.addForm.value.name;
    this.touristUpdateRequestModel.mobile = this.addForm.value.mobile;
    this.touristUpdateRequestModel.code = this.addForm.value.verificationCode;
    this.touristUpdateRequestModel.status = this.addForm.value.status;
  }


  update() {
    this.setValue();
    console.log('this.touristUpdateModel', this.touristUpdateRequestModel)
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    console.log('this.touristDetailModel.id', this.addForm, this.touristDetailModel.id)
    if (this.addForm.valid) {
      this.touristUpdateRequestModel.id = this.touristDetailModel.id;
      this.adminTouristService.updataTourist(this.touristUpdateRequestModel).subscribe(res => {
        console.log("resjieguo", res);
        this.dialogRef.close();

      })
    }
  }



  isCode(data: any) {
    if (this.addForm.value.mobile != this.touristDetailModel.mobile) {
      console.log("1111", this.addForm.value.mobile)
      this.isCodeValue = 'hidden';
      this?.addForm?.controls['verificationCode'].setValidators(Validators.required);
      this?.addForm?.controls['verificationCode'].updateValueAndValidity();
    }
    else if (this.addForm.value.mobile === this.touristDetailModel.mobile) {
      console.log("222", this.addForm.value.mobile)
      this.isCodeValue = 'show';
      this?.addForm?.controls['verificationCode'].setValidators(null);
      this?.addForm?.controls['verificationCode'].updateValueAndValidity();
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}

