import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-a-o-g-t-d-part-refund',
  templateUrl: './a-o-g-t-d-part-refund.component.html',
  styleUrls: ['./a-o-g-t-d-part-refund.component.css']
})
export class AOGTDPartRefundComponent implements OnInit {
  @Input() data: any;
  addForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }




  add() {

  }

  cancel() { }
}
