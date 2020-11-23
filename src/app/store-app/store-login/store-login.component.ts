import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-store-login',
  templateUrl: './store-login.component.html',
  styleUrls: ['./store-login.component.css']
})
export class StoreLoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(public fb: FormBuilder, ) {
    this.loginForm = fb.group({
      userName: new FormControl(' '),
      password: new FormControl(' '),
      logged: new FormControl(' ')
    });
   }

  ngOnInit(): void {
  }

}
