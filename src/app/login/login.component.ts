import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(public fb: FormBuilder, ) {
    this.loginForm = fb.group({
      userName: new FormControl(' '),
      password: new FormControl(' ')
    });
   }

  ngOnInit(): void {
  }

}
