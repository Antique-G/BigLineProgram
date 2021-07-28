import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { environment } from '../../../environments/environment';
import { AdminOrderFreeTravelService } from '../../../services/admin/admin-order-free-travel.service';
import { AdminOrderGroupTravelService } from '../../../services/admin/admin-order-group-travel.service';
import { AdminProductManagementService } from '../../../services/admin/admin-product-management.service';
import { AdminRegionService } from '../../../services/admin/admin-region.service';
import { AdminOrderGroupChooseExportExcelComponent } from '../admin-order-group-travel/admin-order-group-choose-export-excel/admin-order-group-choose-export-excel.component';
import { AdminOrderGroupMoneyComponent } from '../admin-order-group-travel/admin-order-group-money/admin-order-group-money.component';
import { AdminOrderGroupOprateLogComponent } from '../admin-order-group-travel/admin-order-group-oprate-log/admin-order-group-oprate-log.component';


@Component({
    selector: 'app-admin-order-free-travel',
    templateUrl: './admin-order-free-travel.component.html',
    styleUrls: ['./admin-order-free-travel.component.css']
})
export class AdminOrderFreeTravelComponent implements OnInit {
    searchForm: FormGroup;
    dataSource: any;
    page = 1;
    per_page = 20;
    total = 1;
    loading = true;
    status: any;
    product_id: any;
    product_name: any;
    store_id: any;
    order_number: any;
    contact_name: any;
    contact_phone: any;
    date_start: any;
    date_end: any;
    order_start_date: any;
    order_end_date: any;
    dateArray: any[] = [];
    dateArray1: any[] = [];
    product_code: any;
    storeList: any[] = [];
    totalModel: any;
    push_status: any;

    show_type: any;  //导出的角色

    setQuery: any;
    api = environment.baseUrl;
    isExport: any;

    // 城市
    nzOptions: any[] | null = null;
    departure_city: any;
    destination_city: any;
    isDeparture: any;
    isDestination: any;

    // 下单人
    admin_id: any;
    adminList: any[] = [];
    constructor(public fb: FormBuilder, public router: Router, public modal: NzModalService,
        public adminOrderFreeTravelService: AdminOrderFreeTravelService, public adminRegionService: AdminRegionService,
        public adminProductManagementService: AdminProductManagementService, public adminOrderGroupTravelService: AdminOrderGroupTravelService,) {
        this.searchForm = fb.group({
            status: [''],
            product_id: [''],
            product_name: [''],
            order_number: [''],
            date_starts: [''],
            product_code: [''],
            store_id: [''],
            order_start_dates: [''],
            contact_name: [''],
            contact_phone: [''],
            departure_city: [''],
            destination_city: [''],
            admin_id: [''],
            push_status: [''],
        });
    }

    ngOnInit(): void {
        this.adminProductManagementService.storeList('').subscribe(res => {
            console.log("24234", res);
            this.storeList = res;
            // 城市
            this.adminRegionService.getAllRegionList().subscribe(res => {
                this.nzOptions = res;
                this.adminOrderGroupTravelService.getAdminOptData().subscribe(res => {
                    console.log("333333", res);
                    this.adminList = res.data;
                })
            })

            if (JSON.parse(localStorage.getItem("adminOrderFreeSearch")!) == null) {
                // 第一次进来页面
                // // 从缓存拿到登陆的账号是否为员工accountIsStaff，若是，则默认展示该员工accountAdminId的下单内容
                let accountIsStaff = Number(localStorage.getItem("accountIsStaff"));
                let accountAdminId = Number(localStorage.getItem("adminId"));
                if (accountIsStaff == 1) {
                    this.admin_id = accountAdminId;
                    this.searchForm.patchValue({
                        admin_id: accountAdminId,
                    })
                    console.log("22222222", this.admin_id);
                }
                else {
                    this.admin_id = '';
                    this.searchForm.patchValue({
                        admin_id: '',
                    })
                }
                this.getFreeTravel();
                this.getTotal();
            }
            else {
                // 将上次查询的筛选条件赋值
                let getSeatch = JSON.parse(localStorage.getItem("adminOrderFreeSearch")!);
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
                this.store_id = getSeatch?.store_id ? getSeatch?.store_id : '';
                this.departure_city = getSeatch?.departure_city ? getSeatch?.departure_city : '';
                this.destination_city = getSeatch?.destination_city ? getSeatch?.destination_city : '';
                this.admin_id = getSeatch?.admin_id ? getSeatch?.admin_id : '';
                this.page = getSeatch?.page ? getSeatch?.page : 1;
                this.push_status = getSeatch?.push_status ? getSeatch?.push_status : '';

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
                    store_id: this.store_id,
                    departure_city: this.departure_city ? this.cityChange(this.departure_city) : '',
                    destination_city: this.destination_city ? this.cityChange(this.destination_city) : '',
                    admin_id: this.admin_id,
                    push_status: this.push_status,

                })
                this.getFreeTravel();
                this.getTotal();
                // 拿到统计的值
                let adminOrderFreeTotalModel = JSON.parse(localStorage.getItem("adminOrderFreeTotalModel")!);
                this.totalModel = adminOrderFreeTotalModel;
            }

        })

    }

    getFreeTravel() {
        this.adminOrderFreeTravelService.freeTravelList(this.page, this.per_page, this.status, this.product_id, this.product_name, this.order_number, this.date_start, this.date_end, this.product_code, this.store_id, this.order_start_date, this.order_end_date, this.contact_name, this.contact_phone, this.departure_city, this.destination_city, this.admin_id, this.push_status).subscribe(res => {
            console.log("结果是", res)
            this.dataSource = res?.data;
            this.total = res.meta?.pagination?.total;
            this.loading = false;
            if (this.page == 1) {
                this.totalModel = res?.meta?.statistics;
                localStorage.setItem('adminOrderFreeTotalModel', JSON.stringify(this.totalModel));
            }
        })
    }


    getTotal() {
        // this.adminOrderFreeTravelService.getIndenOrderTotal(this.status, this.product_id, this.product_name, this.order_number, this.date_start, this.date_end, this.product_code, this.store_id, this.order_start_date, this.order_end_date, this.contact_name, this.contact_phone, this.departure_city, this.destination_city, this.admin_id,this.push_status).subscribe(res => {
        //     console.log('统计', res?.data);
        //     this.totalModel = res?.data;
        // })
    }


    changePageIndex(page: number) {
        console.log("当前页", page);
        this.page = page;
        // 筛选条件存进cookie
        this.setQuery = {
            status: this.status, product_id: this.product_id, product_name: this.product_name,
            order_number: this.order_number, product_code: this.product_code, contact_name: this.contact_name,
            contact_phone: this.contact_phone, store_id: this.store_id,
            date_start: this.date_start, date_end: this.date_end, order_start_date: this.order_start_date,
            order_end_date: this.order_end_date, page: this.page,
            departure_city: this.departure_city, destination_city: this.destination_city,
            admin_id: this.admin_id, push_status: this.push_status
        }
        localStorage.setItem('adminOrderFreeSearch', JSON.stringify(this.setQuery));
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


    setValue() {
        this.status = this.searchForm.value.status;
        this.product_id = this.searchForm.value.product_id;
        this.product_name = this.searchForm.value.product_name;
        this.product_code = this.searchForm.value.product_code;
        this.order_number = this.searchForm.value.order_number;
        this.contact_name = this.searchForm.value.contact_name;
        this.contact_phone = this.searchForm.value.contact_phone;
        this.store_id = this.searchForm.value.store_id;
        this.date_start = this.dateArray[0];
        this.date_end = this.dateArray[1];
        this.order_start_date = this.dateArray1[0];
        this.order_end_date = this.dateArray1[1];
        this.departure_city = this.isDeparture;
        this.destination_city = this.isDestination;
        this.admin_id = this.searchForm.value.admin_id;
        this.push_status = this.searchForm.value.push_status;
        this.loading = true;
        // 筛选条件存进cookie
        this.setQuery = {
            status: this.status, product_id: this.product_id, product_name: this.product_name,
            order_number: this.order_number, product_code: this.product_code, contact_name: this.contact_name,
            contact_phone: this.contact_phone, store_id: this.store_id,
            date_start: this.date_start, date_end: this.date_end, order_start_date: this.order_start_date,
            order_end_date: this.order_end_date, page: this.page,
            departure_city: this.departure_city, destination_city: this.destination_city,
            admin_id: this.admin_id, push_status: this.push_status
        }
        localStorage.setItem('adminOrderFreeSearch', JSON.stringify(this.setQuery));
    }

    search() {
        this.page = 1;
        this.setValue();
        this.getFreeTravel();
        this.getTotal();
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
        this.router.navigate(['/admin/main/freeTravelOrder/detail'], { queryParams: { detailId: data.id } });

        // 自由行预售
        // this.router.navigate(['/admin/main/freeTravelOrder/pre/detail'], { queryParams: { detailId: data.id } });

    }



    addOrder() {
        this.router.navigate(['/admin/main/freeTravelOrder/order'],);
    }

    money(data: any) {
        const addmodal = this.modal.create({
            nzTitle: '收款',
            nzContent: AdminOrderGroupMoneyComponent,
            nzComponentParams: {
                data: data
            },
            nzFooter: null
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
            store_id: '',
            order_start_dates: '',
            contact_name: '',
            contact_phone: '',
            departure_city: '',
            destination_city: '',
            admin_id: '',
            push_status: '',
        });
    }



    // 导出
    export() {
        const editmodal = this.modal.create({
            nzTitle: '选择角色',
            nzWidth: 600,
            nzContent: AdminOrderGroupChooseExportExcelComponent,
            nzFooter: [
                {
                    label: '确定',
                    type: 'primary',
                    onClick: componentInstance => {
                        let a = componentInstance?.update();
                        editmodal.close(a)
                    }
                }
            ]
        })
        editmodal.afterClose.subscribe(res => {
            console.log("关闭后res", res);
            if (res) {
                this.show_type = res;
                this.setValue();
                this.date_start = this.date_start == null ? '' : this.date_start;
                this.date_end = this.date_end == null ? '' : this.date_end;
                this.order_start_date = this.order_start_date == null ? '' : this.order_start_date;
                this.order_end_date = this.order_end_date == null ? '' : this.order_end_date;
                this.departure_city = this.isDeparture ? this.isDeparture : '';
                this.destination_city = this.isDestination ? this.isDestination : '';
                this.admin_id = this.admin_id ? this.admin_id : '';


                this.isExport = this.api + '/admin/order/export/1?page=' + this.page + '&per_page=' + this.per_page + '&status=' + this.status +
                    '&product_id=' + this.product_id + '&product_name=' + this.product_name + '&order_number=' + this.order_number +
                    '&date_start=' + this.date_start + '&date_end=' + this.date_end + '&product_code=' + this.product_code +
                    '&store_id=' + this.store_id + '&order_start_date=' + this.order_start_date + '&order_end_date=' + this.order_end_date +
                    '&contact_name=' + this.contact_name + '&contact_phone=' + this.contact_phone +
                    '&departure_city=' + this.departure_city + '&destination_city=' + this.destination_city +
                    '&admin_id=' + this.admin_id + '&push_status=' + this.push_status+'&show_type=' + this.show_type;
                console.log('object :>> ', this.isExport);
                window.open(this.isExport);

            }
        })






    }





    // 查看操作记录
    getTimeLine(data: any) {
        const addmodal = this.modal.create({
            nzTitle: '操作记录',
            nzContent: AdminOrderGroupOprateLogComponent,
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

