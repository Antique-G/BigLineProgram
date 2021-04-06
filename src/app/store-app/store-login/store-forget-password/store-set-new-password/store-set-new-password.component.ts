import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ResetPasswordModel } from '../../../../../interfaces/store/storeForgetPassword/storeForgetPassword.model';
import { StoreForgetPasswordService } from '../../../../../services/store/store-forget-password/store-forget-password.service';

@Component({
  selector: 'app-store-set-new-password',
  templateUrl: './store-set-new-password.component.html',
  styleUrls: ['./store-set-new-password.component.css']
})
export class StoreSetNewPasswordComponent implements OnInit {
  validateForm!: FormGroup;
  token:any;
  mobile:any;
  resetPasswordModel: ResetPasswordModel;
  
  constructor(public fb: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute, public storeForgetPasswordService:StoreForgetPasswordService) {
    this.activatedRoute.queryParams.subscribe(params =>{
      console.log("params",params)
      this.token = params.token
      this.mobile = params.mobile
    })

    this.validateForm = this.fb.group({
      password: ['', [Validators.required, Validators.maxLength(16)]],
      password_confirmation: ['', [Validators.required, this.confirmValidator]],
    })
    
    this.resetPasswordModel ={
      mobile: '',
      token: '',
      password: '',
      password_confirmation: '',
    }
  }

  ngOnInit(): void {
      
  }

  //密码验证
  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.password_confirmation.updateValueAndValidity());
  };

  //确认密码与输入密码是否一致
  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { password_confirmation: true, error: true };
    }
    return {};
  };

  setValue(){
    this.resetPasswordModel.mobile = this.mobile;
    this.resetPasswordModel.token = this.token;
    this.resetPasswordModel.password = this.validateForm.value.password;
    this.resetPasswordModel.password_confirmation = this.validateForm.value.password_confirmation;
  }

  add(){
    this.setValue();
    console.log('resetPasswordModel',this.resetPasswordModel)
    for (const key in this.validateForm.controls) {  //验证表单输入内容不能为空
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    };
    if (this.validateForm.valid) {
      this.storeForgetPasswordService.storeResetPassword(this.resetPasswordModel).subscribe(res => {
        console.log('res',res.message)
        if (res.message == "重置成功") {
          setTimeout(() =>{
            this.router.navigate(['/store/newPassword/success'])
          }, 1000);
        }
      })
    }
  

  }
}


