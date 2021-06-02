import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminProductFreeTravelService } from '../../../../services/admin/admin-product-free-travel.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AdminProductTagService } from '../../../../services/admin/admin-product-tag.service';
import { AdminProductMiniCodeComponent } from '../admin-product-management/admin-product-mini-code/admin-product-mini-code.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminRegionService } from '../../../../services/admin/admin-region.service';
import { AdminProductFreeReviewComponent } from '../admin-produc-free-travel/admin-product-free-review/admin-product-free-review.component';


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
    status: any;
    check_status: any;
    title: any;
    store_name: any;
    confirmModal?: NzModalRef; // g-zorro model 提示框
    id: any;
    few_days: any;
    tag: any;
    tagList: any[] = [];
    setQuery: any;

    // 城市
    nzOptions: any[] | null = null;
    departure_city: any;
    destination_city: any;
    isDeparture: any;
    isDestination: any;


    constructor(public fb: FormBuilder, public dialog: MatDialog, private modal: NzModalService,
        public adminProductFreeTravelService: AdminProductFreeTravelService, private message: NzMessageService,
        public router: Router, public adminProductTagService: AdminProductTagService,
        public adminRegionService: AdminRegionService,) {
        this.searchForm = this.fb.group({
            status: [''],
            checkStatus: [''],
            title: [''],
            store_name: [''],
            id: [''],
            tag: [''],
            few_days: [''],
            departure_city: [''],
            destination_city: [''],
        })

    }


    ngOnInit(): void {
        this.adminProductTagService.getProductTagList(1, 100, 2, '', '').subscribe((result: any) => {
            console.log("jieguo", result);
            this.tagList = result.data;
            // 城市
            this.adminRegionService.getAllRegionList().subscribe(res => {
                this.nzOptions = res;
            })

        });
        // 将上次查询的筛选条件赋值
        let getSeatch = JSON.parse(localStorage.getItem("adminPreFreeSearch")!)
        this.status = getSeatch?.status ? getSeatch?.status : '';
        this.check_status = getSeatch?.check_status ? getSeatch?.check_status : '';
        this.title = getSeatch?.title ? getSeatch?.title : '';
        this.store_name = getSeatch?.store_name ? getSeatch?.store_name : '';
        this.id = getSeatch?.id ? getSeatch?.id : '';
        this.few_days = getSeatch?.few_days ? getSeatch?.few_days : '';
        this.tag = getSeatch?.tag ? getSeatch?.tag : '';
        this.page = getSeatch?.page ? getSeatch?.page : 1;
        this.departure_city = getSeatch?.departure_city ? getSeatch?.departure_city : '';
        this.destination_city = getSeatch?.destination_city ? getSeatch?.destination_city : '';

        this.searchForm.patchValue({
            status: this.status,
            checkStatus: this.check_status,
            title: this.title,
            id: this.id,
            tag: this.tag,
            store_name: this.store_name,
            few_days: this.few_days,
            departure_city: this.departure_city ? this.cityChange(this.departure_city) : '',
            destination_city: this.destination_city ? this.cityChange(this.destination_city) : '',
        })
        this.getFeeTravelList();
    }


    getFeeTravelList() {
        this.loading = true;
        this.adminProductFreeTravelService.preFreeTravelList(this.page, this.per_page, this.status, this.check_status, this.title, this.store_name, this.id, this.few_days, this.tag, this.departure_city, this.destination_city).subscribe(res => {
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
            status: this.status, check_status: this.check_status, title: this.title,
            store_name: this.store_name, id: this.id, few_days: this.few_days,
            tag: this.tag, page: this.page, departure_city: this.departure_city, destination_city: this.destination_city
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
        this.status = this.searchForm.value.status;
        this.check_status = this.searchForm.value.checkStatus;
        this.title = this.searchForm.value.title;
        this.store_name = this.searchForm.value.store_name;
        this.id = this.searchForm.value.id;
        this.few_days = this.searchForm.value.few_days;
        this.tag = this.searchForm.value.tag;
        this.page = 1;
        this.departure_city = this.isDeparture;
        this.destination_city = this.isDestination;


        // 筛选条件存进cookie
        this.setQuery = {
            status: this.status, check_status: this.check_status, title: this.title,
            store_name: this.store_name, id: this.id, few_days: this.few_days,
            tag: this.tag, page: this.page, departure_city: this.departure_city, destination_city: this.destination_city
        }
        localStorage.setItem('adminPreFreeSearch', JSON.stringify(this.setQuery));
        this.getFeeTravelList();

    }


    // 查看详情
    edit(data: any) {
        this.router.navigate(['/admin/main/preFree/detail'], { queryParams: { detailId: data.product_id, is_presell: 1 } });
    }


    // review(data: any) {
    //     console.log("编辑", data);
    //     const dialogRef = this.dialog.open(AdminProductFreeReviewComponent, {
    //         width: '800px',
    //         data: data
    //     })
    //     dialogRef.afterClosed().subscribe(result => {
    //         if (result !== undefined) {
    //             this.getFeeTravelList();
    //         }
    //     })
    // }


    // // 上架
    // up(data: any) {
    //     this.confirmModal = this.modal.confirm({
    //         nzTitle: '是否确定该操作?',
    //         nzContent: '请确认操作的数据是否正确',
    //         nzOnOk: () => {
    //             this.adminProductFreeTravelService.freeTravelUp(data.id).subscribe(res => {
    //                 console.log("结果是", res)
    //                 this.getFeeTravelList();
    //             })
    //         }
    //     })

    // }


    goToQuoteClick(data: any) {
        console.log('data :>> ', data);
        this.router.navigate(['/admin/main/preFree/qutedate'], { queryParams: { detailId: data.product_id, proName: data.product_name, childStatus: data.product?.reserve_children, few_nights: data?.product?.few_nights, quote_type: data?.product?.quote_type, is_presell: 1,prePrice: data?.ticket_price} });
}






    // 重置
    reset() {
        this.searchForm.patchValue({
            status: '',
            checkStatus: '',
            title: '',
            store_name: '',
            id: '',
            tag: '',
            few_days: '',
            departure_city: '',
            destination_city: '',
        });
        this.page = 1;
    }
}
