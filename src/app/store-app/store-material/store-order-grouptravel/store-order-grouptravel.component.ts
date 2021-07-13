import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StoreOrderGroupTravelService } from '../../../../services/store/store-order/store-order-group-travel.service';
import { StoreRegionService } from '../../../../services/store/store-region/store-region.service';
import { StoreOrderGroupMoneyComponent } from './store-order-group-money/store-order-group-money.component';
import { StoreOrderGroupOperateLogComponent } from './store-order-group-operate-log/store-order-group-operate-log.component';



@Component({
    selector: 'app-store-order-grouptravel',
    templateUrl: './store-order-grouptravel.component.html',
    styleUrls: ['./store-order-grouptravel.component.css']
})

export class StoreOrderGrouptravelComponent implements OnInit {
    searchForm: FormGroup;
    dataSource: any;
    page = 1;
    per_page = 20;
    total = 1;
    loading = true;
    status: any;
    product_id: any;
    product_name: any;
    order_number: any;
    date_start: any;
    contact_name: any;
    contact_phone: any;
    date_end: any;
    dateArray: any[] = [];
    dateArray1: any[] = [];
    product_code: any;
    order_start_date: any;
    order_end_date: any;
    // 筛选条件
    setQuery: any;


    // 城市
    nzOptions: any[] | null = null;
    departure_city: any;
    destination_city: any;
    isDeparture: any;
    isDestination: any;

    constructor(public fb: FormBuilder, public router: Router, public storeRegionService: StoreRegionService,
        public modal: NzModalService, public storeOrderGroupTravelService: StoreOrderGroupTravelService) {
        this.searchForm = fb.group({
            status: [''],
            product_id: [''],
            product_name: [''],
            order_number: [''],
            date_starts: [''],
            product_code: [''],
            order_start_dates: [''],
            contact_name: [''],
            contact_phone: [''],
            departure_city: [''],
            destination_city: [''],
        });
    }

    ngOnInit(): void {
        this.storeRegionService.getAllRegionList().subscribe(res => {
            this.nzOptions = res;
        })
        // 将上次查询的筛选条件赋值
        let getSeatch = JSON.parse(localStorage.getItem("storeOrderGroupSearch")!);
        this.status = getSeatch?.status ? getSeatch.status : '';
        this.product_id = getSeatch?.product_id ? getSeatch?.product_id : '';
        this.product_name = getSeatch?.product_name ? getSeatch?.product_name : '';
        this.order_number = getSeatch?.order_number ? getSeatch?.order_number : '';
        this.product_code = getSeatch?.product_code ? getSeatch?.product_code : '';
        this.contact_name = getSeatch?.contact_name ? getSeatch?.contact_name : '';
        this.contact_phone = getSeatch?.contact_phone ? getSeatch?.contact_phone : '';
        this.date_start = getSeatch?.date_start ? getSeatch?.date_start : null;
        this.date_end = getSeatch?.date_end ? getSeatch?.date_end : null;
        this.order_start_date = getSeatch?.order_start_date ? getSeatch?.order_start_date : null;
        this.order_end_date = getSeatch?.order_end_date ? getSeatch?.order_end_date : null;
        this.departure_city = getSeatch?.departure_city ? getSeatch?.departure_city : '';
        this.destination_city = getSeatch?.destination_city ? getSeatch?.destination_city : '';

        this.searchForm.patchValue({
            status: this.status,
            product_id: this.product_id,
            product_name: this.product_name,
            order_number: this.order_number,
            date_starts: this.date_start == null ? [] : [this.date_start, this.date_end],
            product_code: this.product_code,
            order_start_dates: this.order_start_date == null ? [] : [this.order_start_date, this.order_end_date],
            contact_name: this.contact_name,
            contact_phone: this.contact_phone,
            departure_city: this.departure_city ? this.cityChange(this.departure_city) : '',
            destination_city: this.destination_city ? this.cityChange(this.destination_city) : '',
        })
        this.getFreeTravel();
    }

    getFreeTravel() {
        this.storeOrderGroupTravelService.groupTravelList(this.page, this.per_page, this.status, this.product_id, this.product_name, this.order_number, this.date_start, this.date_end, this.product_code, this.order_start_date, this.order_end_date, this.contact_name, this.contact_phone, this.departure_city, this.destination_city).subscribe(res => {
            console.log("结果是", res);
            this.dataSource = res?.data;
            this.total = res.meta?.pagination?.total;
            this.loading = false;
        })
    }


    changePageIndex(page: number) {
        console.log("当前页", page);
        this.page = page;
        // 筛选条件存进cookie
        this.setQuery = {
            status: this.status, product_id: this.product_id, product_name: this.product_name,
            order_number: this.order_number, product_code: this.product_code, contact_name: this.contact_name,
            contact_phone: this.contact_phone,
            date_start: this.date_start, date_end: this.date_end, order_start_date: this.order_start_date,
            order_end_date: this.order_end_date, page: this.page,
            departure_city: this.departure_city, destination_city: this.destination_city
        }
        localStorage.setItem('storeOrderGroupSearch', JSON.stringify(this.setQuery));
        this.getFreeTravel();
    }


    changePageSize(per_page: number) {
        console.log("一页显示多少", per_page);
        this.per_page = per_page;
        this.getFreeTravel();
    }

    onChanges(data: any): void {
        console.log("点击的结果是", data);
        if (data !== null) {
            this.isDeparture = data[data.length - 1];
        }
    }

    onChangesDest(data: any): void {
        console.log("点击的结果是", data);
        if (data !== null) {
            this.isDestination = data[data.length - 1];
        }
    }


    //区域解析
    cityChange(data: any) {
        let arr: any[] = []
        for (let i = 0; i < data.length / 4; i++) {
            let temp = arr[i] || '' + data.substr(0, 4 * (i + 1))
            arr.push(temp);
        }
        return arr
    }



    search() {
        this.status = this.searchForm.value.status;
        this.product_id = this.searchForm.value.product_id;
        this.product_name = this.searchForm.value.product_name;
        this.order_number = this.searchForm.value.order_number;
        this.product_code = this.searchForm.value.product_code;
        this.contact_name = this.searchForm.value.contact_name;
        this.contact_phone = this.searchForm.value.contact_phone;
        this.date_start = this.dateArray[0];
        this.date_end = this.dateArray[1];
        this.order_start_date = this.dateArray1[0];
        this.order_end_date = this.dateArray1[1];
        this.departure_city = this.isDeparture;
        this.destination_city = this.isDestination;
        this.page = 1;

        // 筛选条件存进cookie
        this.setQuery = {
            status: this.status, product_id: this.product_id, product_name: this.product_name,
            order_number: this.order_number, product_code: this.product_code, contact_name: this.contact_name,
            contact_phone: this.contact_phone,
            date_start: this.date_start, date_end: this.date_end, order_start_date: this.order_start_date,
            order_end_date: this.order_end_date, page: this.page,
            departure_city: this.departure_city, destination_city: this.destination_city
        }
        localStorage.setItem('storeOrderGroupSearch', JSON.stringify(this.setQuery));

        this.getFreeTravel();
    }


    onChangeDate(event: any) {
        this.dateArray = [];
        const datePipe = new DatePipe('en-US');
        const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
        this.dateArray.push(myFormattedDate);
        const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
        this.dateArray.push(myFormattedDate1);
        console.log("event", this.dateArray);

    }


    onChangeDateOrder(event: any) {
        this.dateArray1 = [];
        const datePipe = new DatePipe('en-US');
        const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
        this.dateArray1.push(myFormattedDate);
        const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
        this.dateArray1.push(myFormattedDate1);
        console.log("event", this.dateArray);
    }


    edit(data: any) {
        this.router.navigate(['/store/main/storeOrdergroupTravel/detail'], { queryParams: { detailId: data.id } });
    }


    addOrder() {
        this.router.navigate(['/store/main/storeOrdergroupTravel/storeOrdergroupTravelAddOrder'],);
    }


    money(data: any) {
        const addmodal = this.modal.create({
            nzTitle: '收款',
            nzContent: StoreOrderGroupMoneyComponent,
            nzComponentParams: {
                data: data
            },
            nzFooter: [
                {
                    label: '提交',
                    type: 'primary',
                    onClick: componentInstance => {
                        componentInstance?.add()

                    }
                }
            ]
        })
        addmodal.afterClose.subscribe(res => {
            this.getFreeTravel();
        })
    }


    // 重置
    reset() {
        this.searchForm.patchValue({
            status: '',
            product_id: '',
            product_name: '',
            order_number: '',
            date_starts: '',
            product_code: '',
            order_start_dates: '',
            contact_name: '',
            contact_phone: '',
            departure_city: '',
            destination_city: '',
        })
    }

    // 查看操作记录
    getTimeLine(data: any) {
        const addmodal = this.modal.create({
            nzTitle: '操作记录',
            nzContent: StoreOrderGroupOperateLogComponent,
            nzWidth: 1000,
            nzComponentParams: {
                data: data
            },
            nzFooter: null
        })
        addmodal.afterClose.subscribe((res: any) => {
        })
    }
}


