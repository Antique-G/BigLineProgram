import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ChangeDateRequestModel } from '../../../../../interfaces/store/storeOrder/store-order-group-travel-model';
import { AdminOrderGroupTravelService } from '../../../../../services/admin/admin-order-group-travel.service';



@Component({
    selector: 'app-a-o-g-t-detail-change-data',
    templateUrl: './a-o-g-t-detail-change-data.component.html',
    styleUrls: ['./a-o-g-t-detail-change-data.component.css']
})
export class AOGTDetailChangeDataComponent implements OnInit {
    @Input() data: any;
    addForm!: FormGroup;
    order_id: any;
    new_date: any;
    dateList: any;
    isShow = false;
    dataModel: any;
    changeDateRequestModel: ChangeDateRequestModel;
    type: any;
    detailModel: any;
    choiceData: any;


    //  public storeQuoteBydateService: StoreQuoteBydateService
    constructor(public fb: FormBuilder, public adminOrderGroupTravelService: AdminOrderGroupTravelService,
        private modal: NzModalService,) {
        this.addForm = fb.group({
            old_date: [''],
            new_date: [''],
            adult_price: [''],
            new_adult_price: [''],
            child_price: [''],
            new_child_price: [''],
            difference_price: [''],
            new_difference_price: [''],
            diff_price: [''],
            old_pack_price: [''],
            new_pack_price: [''],
            baby_price: [''],
            new_baby_price: [''],
        });
        this.changeDateRequestModel = {
            order_id: '',
            new_date: '',
            diff_price: '',
        }
    }

    ngOnInit(): void {
        console.log("传过来的值", this.data);
        this.detailModel = this.data.data;
        this.type = this.data.type;
        this.adminOrderGroupTravelService.getAdminOrderDateList(this.detailModel.product_id, this.type).subscribe(res => {
            console.log('object :>> ', res.data);
            this.dateList = res.data;
        })
    }


    changeDate(data: any) {
        console.log("选择的是", data);
        this.choiceData = data;
        this.order_id = this.detailModel.id;
        this.new_date = data.date;
        this.isShow = true;
        this.adminOrderGroupTravelService.changGetDateGroup(this.order_id, this.new_date).subscribe(res => {
            console.log('结果是', res);
            this.dataModel = res;
            this.addForm.patchValue({
                adult_price: this.dataModel?.date_quote?.adult_price,
                new_adult_price: this.dataModel?.new_date_quote?.adult_price,
                child_price: this.dataModel?.date_quote?.child_price,
                new_child_price: this.dataModel?.new_date_quote?.child_price,
                difference_price: this.dataModel?.date_quote?.difference_price,
                new_difference_price: this.dataModel?.new_date_quote?.difference_price,
                diff_price: this.dataModel?.diff_price_total,
                old_pack_price:this.dataModel?.date_quote?.inclusive_price,
                new_pack_price: this.dataModel?.new_date_quote?.inclusive_price,
                baby_price: this.dataModel?.date_quote?.baby_price,
                new_baby_price: this.dataModel?.new_date_quote?.baby_price,
            })
        })
    }


    update() {
        this.changeDateRequestModel.order_id = this.detailModel.id;
        this.changeDateRequestModel.new_date = this.new_date;
        this.changeDateRequestModel.diff_price = this.addForm.value.diff_price;
        this.modal.confirm({
            nzTitle: "<h4>提示</h4>",
            nzContent: "<h6>确认修改该订单的出行日期？</h6>",
            nzOnOk: () =>
                this.adminOrderGroupTravelService.changeDateGroup(this.changeDateRequestModel).subscribe(res => {
                    console.log('11111 ', res);
                })
        });

    }
}
