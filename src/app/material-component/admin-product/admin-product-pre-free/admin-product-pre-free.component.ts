import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AdminProductManagementService } from 'services/admin/admin-product-management.service';
import { AdminProductFreeTravelService } from '../../../../services/admin/admin-product-free-travel.service';
import { AdminRegionService } from '../../../../services/admin/admin-region.service';


@Component({
    selector: 'app-admin-product-pre-free',
    templateUrl: './admin-product-pre-free.component.html',
    styleUrls: ['./admin-product-pre-free.component.css']
})
export class AdminProductPreFreeComponent implements OnInit {
    searchForm!: FormGroup;
    dataSource: any[] = [];   //1.4将数据添加到dataSource
    loading = true;
    page = 1;
    per_page = 20;
    total = 1;
    title: any;
    store_id: any;
    confirmModal?: NzModalRef; // g-zorro model 提示框
    id: any;
    few_days: any;
    setQuery: any;

    // 城市
    nzOptions: any[] | null = null;
    departure_city: any;
    destination_city: any;
    isDeparture: any;
    isDestination: any;

    start_date: any;
    end_date: any;
    dateArray: any[] = [];
    storeList: any[] = [];

    constructor(public fb: FormBuilder, public dialog: MatDialog, private modal: NzModalService,
        public adminProductFreeTravelService: AdminProductFreeTravelService, private message: NzMessageService,
        public router: Router, public adminRegionService: AdminRegionService,public adminProductManagementService: AdminProductManagementService, ) {
        this.searchForm = this.fb.group({
            title: [''],
            store_id: [''],
            id: [''],
            few_days: [''],
            departure_city: [''],
            destination_city: [''],
            date_starts: [''],
        })

    }


    ngOnInit(): void {
        this.adminRegionService.getAllRegionList().subscribe(res => {
            this.nzOptions = res;
            this.adminProductManagementService.storeList('').subscribe(res => {
                console.log('24234', res);
                this.storeList = res;
            })
        })
        // 将上次查询的筛选条件赋值
        let getSeatch = JSON.parse(localStorage.getItem("adminPreFreeSearch")!);
        this.title = getSeatch?.title ? getSeatch?.title : '';
        this.store_id = getSeatch?.store_id ? getSeatch?.store_id : '';
        this.id = getSeatch?.id ? getSeatch?.id : '';
        this.few_days = getSeatch?.few_days ? getSeatch?.few_days : '';
        this.page = getSeatch?.page ? getSeatch?.page : 1;
        this.departure_city = getSeatch?.departure_city ? getSeatch?.departure_city : '';
        this.destination_city = getSeatch?.destination_city ? getSeatch?.destination_city : '';
        this.start_date = getSeatch?.start_date ? getSeatch?.start_date : null;
        this.end_date = getSeatch?.end_date ? getSeatch?.end_date : null;

        this.searchForm.patchValue({
            title: this.title,
            id: this.id,
            store_id: this.store_id,
            few_days: this.few_days,
            departure_city: this.departure_city ? this.cityChange(this.departure_city) : '',
            destination_city: this.destination_city ? this.cityChange(this.destination_city) : '',
            date_starts: this.start_date == null ? [] : [this.start_date, this.end_date],
        })
        this.getFeeTravelList();
    }


    getFeeTravelList() {
        this.loading = true;
        this.adminProductFreeTravelService.preFreeTravelList(this.page, this.per_page, this.title, this.store_id, this.id, this.few_days, this.departure_city, this.destination_city,this.start_date,this.end_date).subscribe(res => {
            console.log("结果是", res)
            this.loading = false;
            this.total = res.total;   //总页数
            this.dataSource = res.data;
        })
    }


    changePageSize(per_page: number) {
        this.per_page = per_page;
        this.getFeeTravelList();
    }

    changePageIndex(page: number) {
        console.log("当前页", page);
        this.page = page;
        // 筛选条件存进cookie
        this.setQuery = {
            title: this.title, store_id: this.store_id, id: this.id, few_days: this.few_days,
            page: this.page, departure_city: this.departure_city, destination_city: this.destination_city,
            start_date:this.start_date,end_date:this.end_date
        }
        localStorage.setItem('adminPreFreeSearch', JSON.stringify(this.setQuery));
        this.getFeeTravelList();
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
        this.title = this.searchForm.value.title;
        this.store_id = this.searchForm.value.store_id;
        this.id = this.searchForm.value.id;
        this.few_days = this.searchForm.value.few_days;
        this.page = 1;
        this.departure_city = this.isDeparture;
        this.destination_city = this.isDestination;
       this.start_date = this.dateArray[0];
        this.end_date = this.dateArray[1];
        // 筛选条件存进cookie
        this.setQuery = {
            title: this.title, store_id: this.store_id, id: this.id, few_days: this.few_days,
            page: this.page, departure_city: this.departure_city, destination_city: this.destination_city,
            start_date:this.start_date,end_date:this.end_date
        }
        localStorage.setItem('adminPreFreeSearch', JSON.stringify(this.setQuery));
        this.getFeeTravelList();

    }


    // 查看详情
    edit(data: any) {
        this.router.navigate(['/admin/main/preFree/detail'], { queryParams: { detailId: data.product_id, is_presell: 1 } });
    }




    goToQuoteClick(data: any) {
        console.log('data :>> ', data);
        this.router.navigate(['/admin/main/preFree/qutedate'], { queryParams: { detailId: data.product_id, proName: data.product_name, childStatus: data.product?.reserve_children, few_nights: data?.product?.few_nights, quote_type: data?.product?.quote_type, is_presell: 1, prePrice: data?.ticket_price } });
    }






    // 重置
    reset() {
        this.searchForm.patchValue({
            title: '',
            store_id: '',
            id: '',
            few_days: '',
            departure_city: '',
            destination_city: '',
            date_starts: '',
        });
        this.page = 1;
    }



    onChangeDate(event: any) {
        this.dateArray = [];
        const datePipe = new DatePipe('en-US');
        const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
        this.dateArray.push(myFormattedDate);
        const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
        this.dateArray.push(myFormattedDate1);
        console.log('event', this.dateArray);
    }
}
