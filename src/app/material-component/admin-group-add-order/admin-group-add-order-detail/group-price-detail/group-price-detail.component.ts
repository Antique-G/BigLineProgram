import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
    selector: 'app-group-price-detail',
    templateUrl: './group-price-detail.component.html',
    styleUrls: ['./group-price-detail.component.css']
})
export class GroupPriceDetailComponent implements OnInit {
    addForm!: FormGroup;
    @Input() data: any;
    audlts: any;
    audltAllPrice: any;
    childs: any;
    childAllPrice: any;
    babys: any;
    babyAllPrice: any;
    rooms: any;
    difAllPrice: any;
    totalPrice: any;

    basicPrice: any;
    precision = 2;
    cutValue = 0;

    baseIns: any;
    extraIns: any;

    constructor(public fb: FormBuilder, private msg: NzMessageService, private modal: NzModalService) {
        this.addForm = this.fb.group({
            money: [0,],
            other_price: [0,],
            discount_tit: [''],
            other_price_tit: [''],
        })
    }

    ngOnInit(): void {
        console.log('object :>> ', this.data);
        this.audlts = this.data?.audlts;
        this.audltAllPrice = Number(this.data?.feeAll?.adult_price) * Number(this.audlts);
        this.childs = this.data?.childs;
        this.childAllPrice = Number(this.data?.feeAll?.child_price) * Number(this.childs);
        this.babys = this.data?.babys;
        this.babyAllPrice = Number(this.data?.feeAll?.baby_price) * Number(this.babys);
        this.basicPrice = Number(this.audltAllPrice) + Number(this.childAllPrice) + Number(this.babyAllPrice);
        this.rooms = this.data?.rooms;
        this.difAllPrice = Number(this.data?.feeAll?.difference_price) * Number(this.rooms);
        this.baseIns = this.data?.baseInsurancePrice;
        this.extraIns = this.data?.extraInsurancePrice;
        this.totalPrice = Number(this.basicPrice) + Number(this.difAllPrice) + Number(this.baseIns) + Number(this.extraIns);
        this.totalPrice = this.toDecimal(this.totalPrice);

    }

    onEnter(data: any) {
        this.totalPrice = Number(this.basicPrice) + Number(this.difAllPrice) + Number(this.baseIns) + Number(this.extraIns) + Number(this.addForm.value.other_price);
        console.log('Number(data) :>> ', Number(data), Number(data) > Number(this.totalPrice));
        if (Number(data) > Number(this.totalPrice)) {
            this.msg.error('?????????????????????????????????');
            this.addForm.patchValue({
                money: 0
            });
            this.totalPrice = Number(this.basicPrice) + Number(this.difAllPrice) + Number(this.baseIns) + Number(this.extraIns) + Number(this.addForm.value.other_price);
        }
        else {
            this.totalPrice = Number(this.basicPrice) + Number(this.difAllPrice) - Number(this.addForm.value.money) + Number(this.addForm.value.other_price) + Number(this.baseIns) + Number(this.extraIns);
            this.totalPrice = this.toDecimal(this.totalPrice);
        }

    }


    onEnter1(data: any) {
        this.totalPrice = Number(this.basicPrice) + Number(this.difAllPrice) - Number(this.addForm.value.money) + Number(this.addForm.value.other_price) + Number(this.baseIns) + Number(this.extraIns);
        this.totalPrice = this.toDecimal(this.totalPrice);

    }


    toDecimal(x: any) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return;
        }
        f = Math.round(x * 100) / 100;
        return f;
    }

    update() {
        let a = {
            totalPrice: this.totalPrice, discount: Number(this.addForm.value.money),
            other_price: Number(this.addForm.value.other_price),
            discount_tit: this.addForm.value.discount_tit, other_price_tit: this.addForm.value.other_price_tit,
            baseInsurancePrice: this.baseIns, extraInsurancePrice: this.extraIns
        };
        return a
    }
}
