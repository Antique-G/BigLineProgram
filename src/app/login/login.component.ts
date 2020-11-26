import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AdminLoginService } from '../../services/admin-login/admin-login.service';
import { LoginRequestModel, LoginResponseModel } from '../../interfaces/adminLogin/login-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginRequestModel: LoginRequestModel
  loginResponseModel: LoginResponseModel | undefined;


  constructor(public fb: FormBuilder, public adminLoginService: AdminLoginService) {
    this.loginForm = fb.group({
      userName: new FormControl(' '),
      password: new FormControl(' ')
    });
    this.loginRequestModel = {
      account: 'admin',
      password: '123456'
    }
  }

  ngOnInit(): void {
  }


  login() {
    // routerLink="/admin/main/admin"
    this.adminLoginService.login(this.loginRequestModel).subscribe(res => {
      console.log("res结果", res)
    })
  }
}
