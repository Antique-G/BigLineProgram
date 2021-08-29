import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UpdateGoodsOrderConsigneeModel } from 'interfaces/store/storeGoods/store-goods-model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminGoodsService } from 'services/admin/admin-goods.service';
import { AdminRegionService } from 'services/admin/admin-region.service';
import { AdminGoodsProOrderDetailModifyComponent } from './admin-goods-pro-order-detail-modify/admin-goods-pro-order-detail-modify.component';

@Component({
    selector: 'app-admin-goods-pro-order-detail',
    templateUrl: './admin-goods-pro-order-detail.component.html',
    styleUrls: ['./admin-goods-pro-order-detail.component.css']
})
export class AdminGoodsProOrderDetailComponent implements OnInit {
    public isSpinning = false;
    addForm!: FormGroup;
    detailModel: any;
    detailId: any;
    // 修改信息
    isChange = false;
    dataPayLog: any[] = [];

    // 区域
    nzOptions: any[] | null = null;
    values: any[] = [];
    isRegion_code: any;
    updateGoodsOrderConsigneeModel: UpdateGoodsOrderConsigneeModel;
    isHadExpress = true;

    // 请款跳过来的
    isGoodReq:any;

    constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute, public adminGoodsService: AdminGoodsService,
        private modal: NzModalService, public adminRegionService: AdminRegionService,) {
        this.addForm = this.fb.group({
            order_id: [''],
            orderDate: [''],
            bind_name: [''],
            consignee: ['', [Validators.required]],
            phone: ['', [Validators.required]],
            region_code: [''],
            region_code_id: ['', [Validators.required]],
            address: ['', [Validators.required]],
            remark: [''],
            user_phone: [''],
        });
        this.updateGoodsOrderConsigneeModel = {
            consignee: '',
            phone: '',
            region_code: '',
            address: '',
            remark: '',
        }
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            console.log("params", params);
            this.isGoodReq = params?.isGoodReq;
            this.detailId = params?.id;
            // 详情
            this.isSpinning = true;
            this.adminRegionService.getAllRegionList(4).subscribe(res => {
                this.nzOptions = res;
                this.getOrderDetail();
            })

        });
    }

    getOrderDetail() {
        this.adminGoodsService.orderDetail(this.detailId).subscribe(res => {
            this.isSpinning = false;
            this.detailModel = res.data;
            this.dataPayLog = this.detailModel?.pay_log?.data;
            this.detailModel?.sub_order?.data.forEach((element: any) => {
                // 已发货不显示
                if (element?.express_status == 1) {
                    this.isHadExpress = false;
                    return
                }
            });
            console.log("订单详情", res)
            console.log("333", this.isHadExpress)
        })
    }


    // 修改商品信息
    changeGoods(data: any) {
        const editmodal = this.modal.create({
            nzTitle: "修改商品信息",
            nzContent: AdminGoodsProOrderDetailModifyComponent,
            nzWidth: 1000,
            nzComponentParams: {
                data: data,
            },
            nzFooter: null
        });
        editmodal.afterClose.subscribe((res) => {
            this.getOrderDetail();
        });
    }


    // 修改收货人信息
    changeDetail() {
        this.isChange = true;
        // 收货人所在地区
        const str = this.detailModel.region_code;
        this.values = [];
        for (let i = 0; i < str.length / 4; i++) {
            let temp = this.values[i] || '' + str.substr(0, 4 * (i + 1))
            this.values.push(temp);
        }
        this.addForm.get('region_code_id')?.setValue(this.values);   //区域
    }

    commitDetail() {
        this.setValue();
        for (const i in this.addForm.controls) {
            this.addForm.controls[i].markAsDirty();
            this.addForm.controls[i].updateValueAndValidity();
        }
        if (this.addForm.valid) {
            this.modal.confirm({
                nzTitle: "<h4>提示</h4>",
                nzContent: "<h6>确认修改联系人信息</h6>",
                nzOnOk: () =>
                    this.adminGoodsService.updateGoodsOrderCon(this.updateGoodsOrderConsigneeModel).subscribe(res => {
                        console.log('res :>> ', res);
                        this.getOrderDetail();
                        this.isChange = false;
                    })
            });
        }

    }

    cancelDetail() {
        this.isChange = false;
    }


    setValue() {
        this.updateGoodsOrderConsigneeModel.consignee = this.addForm.value.consignee;
        this.updateGoodsOrderConsigneeModel.phone = this.addForm.value.phone;
        this.updateGoodsOrderConsigneeModel.region_code = this.isRegion_code;
        this.updateGoodsOrderConsigneeModel.address = this.addForm.value.address;
        this.updateGoodsOrderConsigneeModel.id = this.detailModel.id;
        this.updateGoodsOrderConsigneeModel.remark = this.addForm.value.remark;
    }

    // 修改区域
    onChanges(values: any): void {
        console.log("点击的结果是", values);
        if (values !== null) {
            this.isRegion_code = values[values.length - 1];
        }
    }
}
