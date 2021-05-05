import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { format } from 'date-fns';


@Component({
    selector: 'app-admin-order-surrender',
    templateUrl: './admin-order-surrender.component.html',
    styleUrls: ['./admin-order-surrender.component.css']
})
export class AdminOrderSurrenderComponent implements OnInit {
    @Input() data: any;
    addForm!: FormGroup;
    detail: any;
    isStandard: any;
    percentage: any;
    percent: any;
    advance: any;


    constructor(public fb: FormBuilder,) {
        this.addForm = this.fb.group({
            order_id: [''],



            basicRefund: [''],
        })
     }

    ngOnInit(): void {
         // 订单出发日期
    let date1 = new Date(format(new Date(this.detail?.start_date), 'yyyy,MM,dd'));
    // 当前申请时间
    let date2 = new Date(format(new Date(), 'yyyy,MM,dd'))
    this.advance = (date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24);
    console.log('312312312312312', date1, date2, this.advance);
    if (this.advance > 7) {
      this.isStandard = 0;
      this.percentage = 1;
      this.percent = 100;
    }
    else if (6 <= this.advance && this.advance <= 7) {
      this.isStandard = 1;
      this.percentage = 0.8;
      this.percent = 80;
    }
    else if (4 <= this.advance && this.advance <= 5) {
      this.isStandard = 2;
      this.percentage = 0.7;
      this.percent = 70;
    }
    else if (1 <= this.advance && this.advance <= 3) {
      this.isStandard = 3;
      this.percentage = 0.5;
      this.percent = 50;
    }
    else {
      this.isStandard = 4;
      this.percentage = 0;
      this.percent = 0;
    }
        
    }

    update() {
        
    }
}
