import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-store-set-new-password',
  templateUrl: './store-set-new-password.component.html',
  styleUrls: ['./store-set-new-password.component.css']
})
export class StoreSetNewPasswordComponent implements OnInit {
  validateForm!: FormGroup;
  constructor(public fb: FormBuilder, ) {
    this.validateForm = this.fb.group({
      password: ['', [Validators.required, Validators.maxLength(16)]],
      password_confirmation: ['', [Validators.required, this.confirmValidator]],
    })
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


  add(){
    for (const key in this.validateForm.controls) {  //验证表单输入内容不能为空
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    };
    
  }
}


