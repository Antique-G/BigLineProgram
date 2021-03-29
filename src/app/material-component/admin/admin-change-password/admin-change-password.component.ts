import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminLoginService } from '../../../../services/admin-login/admin-login.service';
import { PassWordModel } from '../../../../interfaces/store/common/password';

@Component({
  selector: 'app-admin-change-password',
  templateUrl: './admin-change-password.component.html',
  styleUrls: ['./admin-change-password.component.css']
})
export class AdminChangePasswordComponent implements OnInit {
  addForm!: FormGroup;
  passWordModel: PassWordModel;


  constructor(public fb: FormBuilder, public router: Router, public adminLoginService: AdminLoginService) {
    this.addForm = this.fb.group({
      old_password: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required, this.confirmValidator]]
    });
    this.passWordModel = {
      old_password: '',
      password: '',
      password_confirmation: '',
    }
  }


  setValue() {
    this.passWordModel.old_password = this.addForm.value.old_password;
    this.passWordModel.password = this.addForm.value.password;
    this.passWordModel.password_confirmation = this.addForm.value.password_confirmation;
  }


  ngOnInit(): void {
  }



  update() {
    this.setValue();
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {
      this.adminLoginService.changePassword(this.passWordModel).subscribe(res => {
        console.log("res", res);
        window.localStorage.clear(); //清除缓存
        this.router.navigate(['/admin/login']);
      
      })
    }
  }



  //密码验证
  validateConfirmPassword(): void {
    setTimeout(() => this.addForm.controls.password_confirmation.updateValueAndValidity());
  };

  //确认密码与输入密码是否一致
  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.addForm.controls.password.value) {
      return { password_confirmation: true, error: true };
    }
    return {};
  };

}

