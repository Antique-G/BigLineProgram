import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminFinaceGroupService } from '../../../../services/admin/admin-finace-group.service';
import { AdminProductManagementService } from '../../../../services/admin/admin-product-management.service';


@Component({
    selector: 'app-admin-finance-order-report',
    templateUrl: './admin-finance-order-report.component.html',
    styleUrls: ['./admin-finance-order-report.component.css']
})
export class AdminFinanceOrderReportComponent implements OnInit {
    searchForm: FormGroup;
    dataSource: any[] = [];
    loading = false;
    dateArray: any[] = [];

    store_id: any;
    start_time: any;
    end_time: any;
    storeList: any[] = [];
    setQuery: any;

    constructor(public fb: FormBuilder, public adminFinaceGroupService: AdminFinaceGroupService,
        public adminProductManagementService: AdminProductManagementService, public router: Router,) {
        this.searchForm = fb.group({
            store_id: [''],
            time: [''],
        });
    }

    ngOnInit(): void {
        this.adminProductManagementService.storeList('').subscribe(res => {
            this.storeList = res;
        })
        // 将上次查询的筛选条件赋值
        let getSeatch = JSON.parse(localStorage.getItem("adminFinanceOrderReportSearch")!);
        this.store_id = getSeatch?.store_id ? getSeatch?.store_id : '';
        this.start_time = getSeatch?.start_time ? getSeatch?.start_time : null;
        this.end_time = getSeatch?.end_time ? getSeatch?.end_time : null;
        this.searchForm.patchValue({
            store_id: this.store_id,
            time: this.start_time == null ? [] : [this.start_time, this.end_time]
        });
        this.getList();
    }


    onChangeApplyTime(event: any) {
        this.dateArray = [];
        const datePipe = new DatePipe('en-US');
        const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
        this.dateArray.push(myFormattedDate);
        const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
        this.dateArray.push(myFormattedDate1);
    }



    search() {
        
        this.store_id = this.searchForm.value.store_id;
        this.start_time = this.dateArray[0];
        this.end_time = this.dateArray[1];
        // 筛选条件存进cookie
        this.setQuery = {
           user_id: this.store_id, start_time: this.start_time,end_time: this.end_time
        }
        localStorage.setItem('adminFinanceOrderReportSearch', JSON.stringify(this.setQuery));
        this.getList();
    }


    getList() {
        this.adminFinaceGroupService.financeOrderReport(this.store_id, this.start_time, this.end_time).subscribe(res => {
                console.log("Jieguoshi ", res);
                this.dataSource = res?.data;
            })
    }



    reset() {
        this.searchForm.patchValue({
            store_id:  '',
            time: '',
        });
    }



}
