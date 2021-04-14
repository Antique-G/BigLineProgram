import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-a-o-g-t-d-full-refund',
  templateUrl: './a-o-g-t-d-full-refund.component.html',
  styleUrls: ['./a-o-g-t-d-full-refund.component.css']
})
export class AOGTDFullRefundComponent implements OnInit {
  @Input() data: any;
  addForm!: FormGroup;

  constructor(public fb: FormBuilder, ) { 
    this.addForm = fb.group({
      order_id: [''],
      reason: [''],
    })
  }

  ngOnInit(): void {
  }


  add(){}
}
