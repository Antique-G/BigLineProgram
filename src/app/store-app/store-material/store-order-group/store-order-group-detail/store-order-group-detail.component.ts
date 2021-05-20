import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreOrderService } from '../../../../../services/store/store-order/store-order.service';
import { DataOrderDetail, SubgroupDeatilModel } from '../../../../../interfaces/store/storeOrder/store-order-model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StoreOrderRequestMoneyComponent } from './store-order-request-money/store-order-request-money.component';



@Component({
    selector: 'app-store-order-group-detail',
    templateUrl: './store-order-group-detail.component.html',
    styleUrls: ['./store-order-group-detail.component.css']
})
export class StoreOrderGroupDetailComponent implements OnInit {
    public isSpinning = true;
    addForm!: FormGroup;
    detailId: any;
    detailModel!: DataOrderDetail;
    isReturnDate: any;
    isActiveDate: any;
    isMemberMax: any;
    subGroupModel!: DataOrderDetail;

    constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute, public router: Router,
                public modal: NzModalService, public storeOrderService: StoreOrderService, ) {
        this.addForm = this.fb.group({
            group_id: ['', [Validators.required]],
            member_min: ['', [Validators.required]],
            active_date: ['', [Validators.required]],
            returnDate: ['', [Validators.required]],
            member_max: ['', [Validators.required]],
        });
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            console.log('params', params);
            this.detailId = params?.detailId;
            // 详情
            this.storeOrderService.getOrderGroupDetail(this.detailId).subscribe(res => {
                console.log('结果是', res);
                this.detailModel = res.data;
                // 最大成团人数
                if (this.detailModel?.member_max === 0) {
                    this.isMemberMax = '-';
                }
                else {
                    this.isMemberMax = this.detailModel?.member_max;
                }
                // 成团日期
                this.isActiveDate = this.detailModel.active_date ? this.detailModel.active_date : '-';
                // 往返日期
                this.isReturnDate = this.detailModel?.start_date + '~' + this.detailModel?.end_date;
                this.subGroupModel = this.detailModel;
                this.isSpinning = false;
            });
        });
    }


    // 团队请款
    groupRequest(data: any) {
        const addmodal = this.modal.create({
            nzTitle: '团队请款',
            nzWidth: 1000,
            nzContent: StoreOrderRequestMoneyComponent,
            nzComponentParams: {
                data
            },
            nzFooter: [
                {
                    label: '提交',
                    type: 'primary',
                    onClick: componentInstance => {
                        componentInstance?.add();

                    }
                }
            ]
        });
        addmodal.afterClose.subscribe(res => {

        });
    }
}

