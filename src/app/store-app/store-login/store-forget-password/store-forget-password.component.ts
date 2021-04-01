import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-forget-password',
  templateUrl: './store-forget-password.component.html',
  styleUrls: ['./store-forget-password.component.css']
})
export class StoreForgetPasswordComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }



  next() {
    this.router.navigate(['/store/forgetPassword/setNewPassword'])

  }
}
