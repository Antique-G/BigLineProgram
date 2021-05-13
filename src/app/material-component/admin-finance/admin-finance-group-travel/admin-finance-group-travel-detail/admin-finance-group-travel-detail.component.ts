import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminMemberComponent } from '../../../admin-order-group-travel/admin-order-group-travel-detail/admin-member/admin-member.component';
import { format } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DetailsModel } from '../../../../../interfaces/store/storeOrder/store-order-group-travel-model';
import { EditInfoModel, EditMemberModel } from '../../../../../interfaces/store/storeOrder/store-order-model';
import { AdminOrderGroupTravelService } from '../../../../../services/admin/admin-order-group-travel.service';
import { AdminOrderService } from '../../../../../services/admin/admin-order.service';


@Component({
    selector: 'app-admin-finance-group-travel-detail',
    templateUrl: './admin-finance-group-travel-detail.component.html',
    styleUrls: ['./admin-finance-group-travel-detail.component.css']
})
export class AdminFinanceGroupTravelDetailComponent implements OnInit {

    public isSpinning = true;
    addForm!: FormGroup;
    detailId: any;
    detailModel!: DetailsModel;
    dataMember: any;
    audltPrice: any;
    childPrice: any;
    babyPrice: any;

    priceTotal: any;
    dataPayLog: any[] = [];
    refundLog: any[] = [];

    // 修改信息
    isChange = false;
    editMemberModel: EditMemberModel;
    editInfoModel: EditInfoModel;
    idChangeBir = false;
    idChangeBirDate: any;
    insuranceList: any[] = [];

    order_insurance_id: any;


    constructor(public fb: FormBuilder, public activatedRoute: ActivatedRoute, public router: Router, private msg: NzMessageService,
        public adminOrderGroupTravelService: AdminOrderGroupTravelService, private modal: NzModalService,
        public adminOrderService: AdminOrderService) {
        this.addForm = this.fb.group({
            order_id: ['', [Validators.required]],
            start_date: ['', [Validators.required]],
            contact_name: ['', [Validators.required]],
            contact_phone: ['', [Validators.required]],
            departure_city_name: [''],
            destination_city_name: [''],
            contact_wechat: [''],
            contact_qq: [''],
            contact_email: [''],
            emergency_contact_person: [''],
            emergency_contact_number: [''],
            customer_remarks: [''],
            internal_remarks: [''],
            days: [''],
        });
        this.editMemberModel = {
            id: '',
            name: '',
            eng_name: '',
            gender: '',
            phone: '',
            id_type: '',
            id_num: '',
            birthday: '',
            assembling_place: '',
            assembling_time: '',
        };
        this.editInfoModel = {
            id: '',
            contact_name: '',
            contact_phone: '',
            contact_wechat: '',
            contact_qq: '',
            contact_email: '',
            emergency_contact_person: '',
            emergency_contact_number: '',
            customer_remarks: '',
            internal_remarks: '',
        }
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            console.log("params", params)
            this.detailId = params?.detailId;
            // 详情
            this.isSpinning = true;
            this.getgroupTravelDetail();
        });
    }


    getgroupTravelDetail() {
        this.adminOrderGroupTravelService.getgroupTravelDetail(this.detailId).subscribe(res => {
            console.log("结果是", res);
            this.isSpinning = false;

            this.detailModel = res.data;
            // 支付流水
            let pagLogArr: any[] = [];
            res.data?.pay_log?.data.forEach((element: any) => {
                if (element.status == 2||element.status == 3) {
                    pagLogArr.push(element)
                }
            });
            this.dataPayLog = pagLogArr;

            // 退款流水
            let reFundLogArr: any[] = [];
            res.data?.refund?.data.forEach((element: any) => {
                if (element.status == 2 || element.status == 3) {
                    reFundLogArr.push(element)
                }
            });
            this.refundLog = reFundLogArr;

            this.dataMember = res.data?.member?.data;
            console.log("出行人信息内容", this.dataMember);
            this.dataMember.forEach((element: any) => {
                if (element.birthday === null) {
                    let year = element.id_num.slice(6, 10);
                    let month = element.id_num.slice(10, 12);
                    let date = element.id_num.slice(12, 14);
                    element.birthday = year + '-' + month + '-' + date;
                }
                element['edit'] = false;
                if (element?.assembling_time != null) {
                    let i = '2021-01-01' + ' ' + element?.assembling_time;
                    let newDate = new Date(i);
                    console.log('object :>> ', newDate, i);
                    element.assembling_time = format(new Date(newDate), 'yyyy-MM-dd HH:mm');
                }
            });

            // 保险信息
            this.insuranceList = this.detailModel?.insurance?.data;
            console.log('insuranceList', this.insuranceList);
            // 费用明细
            this.fee();
        })
    }

    fee() {
        // 费用明细
        this.audltPrice = Number(this.detailModel?.price_adult) * Number(this.detailModel?.num_adult);
        this.childPrice = Number(this.detailModel?.price_kid) * Number(this.detailModel?.num_kid);
        this.babyPrice = Number(this.detailModel?.price_baby) * Number(this.detailModel?.baby_num);
        this.priceTotal = Number(this.detailModel?.price_total) - Number(this.detailModel?.amount_received);
        this.priceTotal = this.toDecimal(this.priceTotal);
    }


    // 保留两位小数
    toDecimal(x: any) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return;
        }
        f = Math.round(x * 100) / 100;
        return f;
    }



    // 电子保单
    seeDetail(obj: any) {
        this.order_insurance_id = obj.id;
        const msgId = this.msg.loading('正在下载电子保单', { nzDuration: 0 }).messageId;
        this.adminOrderGroupTravelService.downloadFile(this.order_insurance_id).subscribe(res => {
            console.log("res", res)
            const link = document.createElement('a');
            const blob = new Blob([res], { type: 'application/pdf' });
            link.setAttribute('href', window.URL.createObjectURL(blob));
            link.setAttribute('download', obj.insurance_name + '-' + new Date().getTime() + '.pdf');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            this.msg.remove(msgId);
            this.msg.success('下载电子保单成功')
            // window.open('/bbbb/static/pdf/web/viewer.html?file=' +encodeURIComponent(res));
        })
    }

    member(data:any) {
        const editmodal = this.modal.create({
            nzTitle: '查看参保人',
            nzContent: AdminMemberComponent,
            nzWidth: 1000,
            nzComponentParams: {
                data: {
                    data:data,
                    detail:this.detailModel
                }
            },
            nzFooter: null
        })
        editmodal.afterClose.subscribe(res => {
            this.activatedRoute.queryParams.subscribe(params => {
                console.log("params", params)
                this.detailId = params?.detailId;
                // 详情
                this.getgroupTravelDetail();

            });
        })
    }
}
