import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-store-order-group-detail',
  templateUrl: './store-order-group-detail.component.html',
  styleUrls: ['./store-order-group-detail.component.css']
})
export class StoreOrderGroupDetailComponent implements OnInit {
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

