import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-order-group-detail-subgroup-sentsms',
  templateUrl: './store-order-group-detail-subgroup-sentsms.component.html',
  styleUrls: ['./store-order-group-detail-subgroup-sentsms.component.css']
})
export class StoreOrderGroupDetailSubgroupSentsmsComponent implements OnInit {
  addForm!: FormGroup;
  @Input() data: any;
  dataSource: any;

  // 表格
  setOfCheckedId = new Set<number>();

  constructor(public fb: FormBuilder) {
    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    console.log('this.data', this.data);
    this.dataSource = this.data;
  }

  // 表格
  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }


  add() { }
}
