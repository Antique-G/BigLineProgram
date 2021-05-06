import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminLoginService } from '../../services/admin-login/admin-login.service';
import { LoginRequestModel } from '../../interfaces/adminLogin/login-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginRequestModel: LoginRequestModel;
  permission:any = [];

  constructor(public fb: FormBuilder, public adminLoginService: AdminLoginService, public router: Router) {
    this.loginForm = fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.loginRequestModel = {
      account: '',
      password: ''
    }
  }

  ngOnInit(): void {
  }

  setValue() {
    this.loginRequestModel.account = this.loginForm.value.userName;
    this.loginRequestModel.password = this.loginForm.value.password;
  }


  login() {
    this.setValue();
    console.log("提交的model是什么", this.loginRequestModel);
    this.adminLoginService.login(this.loginRequestModel).subscribe(res => {
      console.log("res结果", res);
      if (res.access_token != '') {
        this.adminLoginService.setToken(res.access_token);
        localStorage.setItem('account', res.admin.account);
        localStorage.setItem('adminId', res.admin.admin_id);
        localStorage.setItem("permission", JSON.stringify(res.permission));
        this.router.navigate(['/admin/main/welcome'])
        
      }
    })
  }


  // enter键进入首页
  onEnter() {
    this.login();
  }
}
