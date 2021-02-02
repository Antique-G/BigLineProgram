import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-order-detail',
  templateUrl: './admin-order-detail.component.html',
  styleUrls: ['./admin-order-detail.component.css']
})
export class AdminOrderDetailComponent implements OnInit {
  public isSpinning = false;
  addForm!: FormGroup;


  constructor(public fb: FormBuilder,) {
     this.addForm = this.fb.group({
      teamId: ['', [Validators.required]],
      returnDate: ['', [Validators.required]],
      orderDate: ['', [Validators.required]],
      groupPeople: ['', [Validators.required]],
      automaticGroupDate: ['', [Validators.required]],
      groupDate: ['', [Validators.required]]
     })
   }

  ngOnInit(): void {
  }

}
