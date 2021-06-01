import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StoreRegionService } from '../../../../services/store/store-region/store-region.service';
import { StoreProductTreeTravelService } from '../../../../services/store/store-product-free-travel/store-product-tree-travel.service';
import { StoreProductService } from '../../../../services/store/store-product/store-product.service';
import { SetCommissionComponent } from '../common/set-commission/set-commission.component';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-store-product-pre-free-travel',
    templateUrl: './store-product-pre-free-travel.component.html',
    styleUrls: ['./store-product-pre-free-travel.component.css']
})
export class StoreProductPreFreeTravelComponent implements OnInit {
    searchForm: FormGroup;
    checkStatus: any;
    title: any;
    few_days: any;
    id: any;
    status: any;
    tag: any;

    dataSource: any[] = [];   //1.4将数据添加到dataSource
    loading = true;
    page = 1;
    per_page = 20;
    total = 1;
    tagList: any[] = [];


    newDay: any
    newHour: any;
    newMin: any;

    isEar: any;
    setRewardModel: any;

    setQuery: any;


    // 城市
    nzOptions: any[] | null = null;
    departure_city: any;
    destination_city: any;
    isDeparture: any;
    isDestination: any;

    // 预售
    dateArray: any[] = [];
    dateArray1: any[] = [];
    start_date: any;  //预售开始时间
    end_date: any;  //  预售结束时间
    use_start_date: any;  //  可使用开始时间
    use_end_date: any;  //  可使用结束时间


    constructor(public fb: FormBuilder, private freeTrvelService: StoreProductTreeTravelService, public router: Router,
        public dialog: MatDialog, private modal: NzModalService, public storeProductService: StoreProductService,
        private nzContextMenuService: NzContextMenuService, public storeRegionService: StoreRegionService,) {
        this.searchForm = this.fb.group({
            checkStatus: [''],
            title: [''],
            few_days: [''],
            id: [''],
            status: [''],
            tag: [''],
            departure_city: [''],
            destination_city: [''],
            preDate: [''],
            useDate: [''],
        })
    }


    ngOnInit(): void {
        this.storeRegionService.getAllRegionList().subscribe(res => {
            this.nzOptions = res;
            this.getTagList();
        })
        // 将上次查询的筛选条件赋值
        let getSeatch = JSON.parse(localStorage.getItem("storePreFreeSearch")!)
        this.status = getSeatch?.status ? getSeatch?.status : '';
        this.checkStatus = getSeatch?.check_status ? getSeatch?.check_status : '';
        this.title = getSeatch?.title ? getSeatch?.title : '';
        this.id = getSeatch?.id ? getSeatch?.id : '';
        this.few_days = getSeatch?.few_days ? getSeatch?.few_days : '';
        this.tag = getSeatch?.tag ? getSeatch?.tag : '';
        this.page = getSeatch?.page ? getSeatch?.page : 1;
        this.departure_city = getSeatch?.departure_city ? getSeatch?.departure_city : '';
        this.destination_city = getSeatch?.destination_city ? getSeatch?.destination_city : '';
        this.start_date = getSeatch?.start_date ? getSeatch?.start_date : null;
        this.end_date = getSeatch?.end_date ? getSeatch?.end_date : null;
        this.use_start_date = getSeatch?.use_start_date ? getSeatch?.use_start_date : null;
        this.use_end_date = getSeatch?.use_end_date ? getSeatch?.use_end_date : null;

        this.searchForm.patchValue({
            status: this.status,
            checkStatus: this.checkStatus,
            title: this.title,
            id: this.id,
            tag: this.tag,
            few_days: this.few_days,
            departure_city: this.departure_city ? this.cityChange(this.departure_city) : '',
            destination_city: this.destination_city ? this.cityChange(this.destination_city) : '',
            preDate: this.start_date == null ? [] : [this.start_date, this.end_date],
            useDate: this.use_start_date == null ? [] : [this.use_start_date, this.use_end_date],
        })
        this.getProductList();
    }

    contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
        this.nzContextMenuService.create($event, menu);
    }

    closeMenu(): void {
        this.nzContextMenuService.close();
    }

    getTagList() {
        this.storeProductService.productTagList(2).subscribe(res => {
            console.log("标签", res.data);
            this.tagList = res.data;
        })
    }

    getProductList() {
        this.loading = true;
        this.freeTrvelService.GetPreFreeTravelList(this.page, this.per_page, this.status, this.checkStatus, this.title, this.few_days, this.id, this.tag, this.departure_city, this.destination_city, this.start_date, this.end_date, this.use_start_date, this.use_end_date).subscribe(res => {
            this.loading = false;
            console.log("结果是", res);
            this.total = res.total;   //总页数
            this.dataSource = res.data;

        })
    }

    changePageSize(per_page: number) {
        this.per_page = per_page;
        this.getProductList();
    }

    changePageIndex(page: number) {
        console.log("当前页", page);
        this.page = page;
        // 筛选条件存进cookie
        this.setQuery = {
            status: this.status, check_status: this.checkStatus, title: this.title,
            id: this.id, few_days: this.few_days, tag: this.tag, page: this.page,
            departure_city: this.departure_city, destination_city: this.destination_city,
            start_date: this.start_date, end_date: this.end_date, use_start_date: this.use_start_date, use_end_date: this.use_end_date
        }
        localStorage.setItem('storePreFreeSearch', JSON.stringify(this.setQuery));
        this.getProductList();
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


    // 预售日期
    onChangePreDate(event: any) {
        this.dateArray = [];
        const datePipe = new DatePipe('en-US');
        console.log('object :>> ', event);
        const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
        this.dateArray.push(myFormattedDate);
        const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
        this.dateArray.push(myFormattedDate1);
        console.log("event", this.dateArray);
    }

    onChangeUseDate(event: any) {
        this.dateArray1 = [];
        const datePipe = new DatePipe('en-US');
        console.log('object :>> ', event);
        const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
        this.dateArray1.push(myFormattedDate);
        const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
        this.dateArray1.push(myFormattedDate1);
        console.log("event", this.dateArray1);
    }


    search() {
        this.checkStatus = this.searchForm.value.checkStatus;
        this.title = this.searchForm.value.title;
        this.few_days = this.searchForm.value.few_days;
        this.id = this.searchForm.value.id;
        this.status = this.searchForm.value.status;
        this.tag = this.searchForm.value.tag;
        this.page = 1;
        this.departure_city = this.isDeparture;
        this.destination_city = this.isDestination;
        this.start_date = this.dateArray[0];
        this.end_date = this.dateArray[1];
        this.use_start_date = this.dateArray1[0];
        this.use_end_date = this.dateArray1[1];
        // 筛选条件存进cookie
        this.setQuery = {
            status: this.status, check_status: this.checkStatus, title: this.title, id: this.id,
            few_days: this.few_days, tag: this.tag, page: this.page,
            departure_city: this.departure_city, destination_city: this.destination_city,
            start_date: this.start_date, end_date: this.end_date, use_start_date: this.use_start_date, use_end_date: this.use_end_date

        }
        localStorage.setItem('storePreFreeSearch', JSON.stringify(this.setQuery));
        this.getProductList();

    }



    // 查看详情
    edit(data: any) {
        this.router.navigate(['/store/main/storeFreeTravel/detail'], { queryParams: { detailId: data.product_id, is_presell: 1 } });
    }

    // 报价
    goToQuoteClick(data: any) {
        console.log('data', data);
        let child_status = Number(data.product?.reserve_children)
        // 处理时间，预计多久报名
        let minutes = data.product?.earlier;
        this.newMin = Math.floor(minutes % 60);
        if (this.newMin === 0) {
            this.newHour = Math.floor(24 - minutes / 60 % 24);
        }
        else if (this.newMin != 0) {
            this.newMin = 60 - this.newMin;
            this.newHour = Math.floor(24 - minutes / 60 % 24);
        }
        this.newDay = format(new Date(), 'HH');
        console.log('2423423', this.newHour, new Date(), this.newMin, this.newDay, this.newHour <= this.newDay)
        if (this.newHour <= this.newDay) {
            this.isEar = Math.floor(minutes / 60 / 24) + 1;
        }
        else {
            this.isEar = Math.floor(minutes / 60 / 24);
        }
        let start_date = data?.start_date;
        let end_date = data?.end_date;
        let use_start_date = data?.use_start_date;
        let use_end_date = data?.use_end_date;
        let ticket_price = data?.ticket_price;
        let subsidy_price = data?.subsidy_price;
        this.router.navigate(['/store/main/storePreFree/quote'], {
            queryParams: {
                productId: data.product_id,
                type: 'freeTravel', earlier: this.isEar, proName: data.product?.title,
                childStatus: child_status, few_nights: data?.product?.few_nights,
                use_num: data?.product?.use_num, is_presell: data?.product?.is_presell,
                start_date: start_date, end_date: end_date,
                use_start_date: use_start_date, use_end_date: use_end_date,
                ticket_price: ticket_price, subsidy_price: subsidy_price,
                isPrePro: 1
            }
        });
    }




    // 重置
    reset() {
        this.searchForm.patchValue({
            checkStatus: '',
            title: '',
            few_days: '',
            id: '',
            status: '',
            tag: '',
            departure_city: '',
            destination_city: '',
            preDate: '',
            useDate: '',
        })
    }
}
