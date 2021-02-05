import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-order-group-detail-subgroup-moveorder',
  templateUrl: './store-order-group-detail-subgroup-moveorder.component.html',
  styleUrls: ['./store-order-group-detail-subgroup-moveorder.component.css']
})
export class StoreOrderGroupDetailSubgroupMoveorderComponent implements OnInit {
  @Input() data: any;


  constructor() { }

  ngOnInit(): void {
    console.log('弹窗拿到的值', this.data);
  }

  add(){}
}
