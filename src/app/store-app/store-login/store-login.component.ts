import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreLoginRequestModel } from '../../../interfaces/store/storeLogin/store-login-model';
import { StoreLoginService } from '../../../services/store/store-login/store-login.service';

@Component({
  selector: 'app-store-login',
  templateUrl: './store-login.component.html',
  styleUrls: ['./store-login.component.css']
})
export class StoreLoginComponent implements OnInit {
  loginForm: FormGroup;
  storeLoginRequestModel: StoreLoginRequestModel;

  constructor(public fb: FormBuilder, public storeLoginService: StoreLoginService, public router: Router) {
    this.loginForm = fb.group({
      mobile: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.storeLoginRequestModel = {
      mobile: '',
      password: ''
    }
  }

  ngOnInit(): void {
  }


  setValue() {
    this.storeLoginRequestModel.mobile = this.loginForm.value.mobile;
    this.storeLoginRequestModel.password = this.loginForm.value.password;
  }


  login() {
    this.setValue();
    console.log("提交的model是什么", this.storeLoginRequestModel);
    this.storeLoginService.storeLogin(this.storeLoginRequestModel).subscribe(res => {
      console.log("res结果", res);
      if (res.access_token != '') {
        this.storeLoginService.setToken(res.access_token);
        localStorage.setItem('mobile', this.storeLoginRequestModel.mobile);
        localStorage.setItem('storeRegion', res.store.region_code);
        localStorage.setItem('storeAccountId', res.store_account.account_id);
        localStorage.setItem('storeId', res.store.store_id);
        localStorage.setItem("loginApprove",res?.store?.is_approve.toString())
        if(res?.store?.is_approve===2){
          this.router.navigate(['/store/main/storeProduct'])
        }
        else{
          this.router.navigate(['/store/main/storeCertification'])
        }
       
      }
    })
  }


  // enter键进入首页
  onEnter() {
    this.login();
  }


}
