import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StoreApplyService } from '../../../../../services/store/store-apply/store-apply.service';
import { AtoreCertifiChangeJobNumComponent } from './atore-certifi-change-job-num/atore-certifi-change-job-num.component';
import { StoreCertifiChangeComponent } from './store-certifi-change/store-certifi-change.component';


@Component({
    selector: 'app-store-certifi-basic-info',
    templateUrl: './store-certifi-basic-info.component.html',
    styleUrls: ['./store-certifi-basic-info.component.css']
})
export class StoreCertifiBasicInfoComponent implements OnInit {
    detailForm!: FormGroup;
    detailModel: any;
    workTime: any;
    week: any[] = [];
    newWeek: any[] = [];
    is_approve: any;


    constructor(public fb: FormBuilder, private modal: NzModalService, public storeApplyService: StoreApplyService) {
        this.detailForm = this.fb.group({
            account: [''],
            supplyName: [''],
            region: [''],
            address: [''],
            contact: [''],
            mobile: [''],
            fax: [''],
            phone: [''],
            workTime: [''],
            week: [''],
            money: [''],
            remark: [''],
            type: [''],
            account_id: [''],
            job_num: [''],
        })
    }

    ngOnInit(): void {
        this.storeApplyService.storeDetail().subscribe(res => {
            console.log('1212121 ', res);
            this.detailModel = res;
            this.is_approve = Number(res?.store?.is_approve);
            localStorage.setItem('storeApprove', this.is_approve.toString());


            if (this.detailModel?.store?.work_date != '') {
                this.week = eval('(' + this.detailModel?.store?.work_date + ')');
                console.log('week :>> ', this.week, typeof (this.week));
                this.week.forEach((element: any) => {
                    console.log('element :>> ', element, element === 0);
                    if (element === 0) {
                        element = '??????';
                        this.newWeek.push(element);
                    }
                    if (element === 1) {
                        element = '??????';
                        this.newWeek.push(element);
                    }
                    if (element === 2) {
                        element = '??????';
                        this.newWeek.push(element);
                    }
                    if (element === 3) {
                        element = '??????';
                        this.newWeek.push(element);
                    }
                    if (element === 4) {
                        element = '??????';
                        this.newWeek.push(element);
                    }
                    if (element === 5) {
                        element = '??????';
                        this.newWeek.push(element);
                    }
                    if (element === 6) {
                        element = '??????';
                        this.newWeek.push(element);
                    }

                });
                console.log('object :>> ', this.newWeek);
                let a = this.newWeek.toString();  //???????????????????????????
                console.log('a :>> ', a);
                this.workTime = a + '   ' + this.detailModel?.store?.work_time;
            }
        })


    }



    change() {
        const editmodal = this.modal.create({
            nzTitle: '?????????????????????',
            nzWidth: 1000,
            nzContent: StoreCertifiChangeComponent,

            nzFooter: [
                {
                    label: '??????',
                    onClick: componentInstance => {
                        componentInstance?.update()
                    }
                }
            ]
        })
        editmodal.afterClose.subscribe(res => {

        });
    }

    changeJobNum(data:any) {
        const editmodal = this.modal.create({
            nzTitle: '????????????',
            nzContent: AtoreCertifiChangeJobNumComponent,
            nzComponentParams: {
                data: data
            },
            nzFooter: [
                {
                    label: '??????',
                    onClick: componentInstance => {
                        componentInstance?.add()
                    }
                }
            ]
        })
        editmodal.afterClose.subscribe(res => {
            this.storeApplyService.storeDetail().subscribe(res => {
                console.log('1212121 ', res);
                this.detailModel = res;
                this.is_approve = Number(res?.store?.is_approve);
                localStorage.setItem('storeApprove', this.is_approve.toString());


                if (this.detailModel?.store?.work_date != '') {
                    this.week = eval('(' + this.detailModel?.store?.work_date + ')');
                    console.log('week :>> ', this.week, typeof (this.week));
                    this.week.forEach((element: any) => {
                        console.log('element :>> ', element, element === 0);
                        if (element === 0) {
                            element = '??????';
                            this.newWeek.push(element);
                        }
                        if (element === 1) {
                            element = '??????';
                            this.newWeek.push(element);
                        }
                        if (element === 2) {
                            element = '??????';
                            this.newWeek.push(element);
                        }
                        if (element === 3) {
                            element = '??????';
                            this.newWeek.push(element);
                        }
                        if (element === 4) {
                            element = '??????';
                            this.newWeek.push(element);
                        }
                        if (element === 5) {
                            element = '??????';
                            this.newWeek.push(element);
                        }
                        if (element === 6) {
                            element = '??????';
                            this.newWeek.push(element);
                        }

                    });
                    console.log('object :>> ', this.newWeek);
                    let a = this.newWeek.toString();  //???????????????????????????
                    console.log('a :>> ', a);
                    this.workTime = a + '   ' + this.detailModel?.store?.work_time;
                }
            })
        });
    }
}
