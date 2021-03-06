import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminProductSetStatusModel } from '../../../../interfaces/adminProduct/product-management-model';
import { AdminProductManagementService } from '../../../../services/admin/admin-product-management.service';
import { AdminProductTagService } from '../../../../services/admin/admin-product-tag.service';
import { AdminRegionService } from '../../../../services/admin/admin-region.service';
import { AdminProductMiniCodeComponent } from './admin-product-mini-code/admin-product-mini-code.component';
import { AdminProductOprateLogComponent } from './admin-product-oprate-log/admin-product-oprate-log.component';
import { AdminProductReviewComponent } from './admin-product-review/admin-product-review.component';


@Component({
    selector: 'app-admin-product-management',
    templateUrl: './admin-product-management.component.html',
    styleUrls: ['./admin-product-management.component.css']
})
export class AdminProductManagementComponent implements OnInit {
    searchForm!: FormGroup;
    dataSource: any[] = [];   //1.4将数据添加到dataSource
    loading = true;
    page = 1;
    per_page = 20;
    total = 1;
    status: any;
    check_status: any;
    title: any;
    store_id: any;
    adminProductSetStatusModel: AdminProductSetStatusModel;
    storeList: any[] = [];
    isReason: any;
    code: any;
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



    constructor(public fb: FormBuilder, public dialog: MatDialog, public adminProductManagementService: AdminProductManagementService,
        public router: Router, private modal: NzModalService, public adminRegionService: AdminRegionService,
        private message: NzMessageService, public adminProductTagService: AdminProductTagService,) {
        this.adminProductSetStatusModel = {
            id: 0,
            status: 0
        }
        this.searchForm = this.fb.group({
            status: [''],
            checkStatus: [''],
            title: [''],
            store_id: [''],
            code: [''],
            tag: [''],
            few_days: [''],
            departure_city: [''],
            destination_city: [''],
        })

    }


    ngOnInit(): void {
        this.adminProductManagementService.storeList('').subscribe(res => {
            console.log("24234", res);
            this.storeList = res;
            this.adminProductTagService.getProductTagList(1, 100, 1, '', '').subscribe((result: any) => {
                console.log("jieguo", result);
                this.tagList = result.data;
                // 城市
                this.adminRegionService.getAllRegionList().subscribe(res => {
                    this.nzOptions = res;
                })
            });

            // 将上次查询的筛选条件赋值
            let getSeatch = JSON.parse(localStorage.getItem("adminGroupSearch")!)
            this.status = getSeatch?.status ? getSeatch?.status : '';
            this.check_status = getSeatch?.check_status ? getSeatch?.check_status : '';
            this.title = getSeatch?.title ? getSeatch?.title : '';
            this.store_id = getSeatch?.store_id ? getSeatch?.store_id : '';
            this.code = getSeatch?.code ? getSeatch?.code : '';
            this.few_days = getSeatch?.few_days ? getSeatch?.few_days : '';
            this.tag = getSeatch?.tag ? getSeatch?.tag : '';
            this.page = getSeatch?.page ? getSeatch?.page : 1;
            this.departure_city = getSeatch?.departure_city ? getSeatch?.departure_city : '';
            this.destination_city = getSeatch?.destination_city ? getSeatch?.destination_city : '';
            console.log("111111", this.status, this.check_status)
            this.searchForm.patchValue({
                status: this.status,
                checkStatus: this.check_status,
                title: this.title,
                store_id: this.store_id,
                code: this.code,
                tag: this.tag,
                few_days: this.few_days,
                departure_city: this.departure_city ? this.cityChange(this.departure_city) : '',
                destination_city: this.destination_city ? this.cityChange(this.destination_city) : '',
            })
            this.getProductList();
        })

    }


    getProductList() {
        this.loading = true;
        this.adminProductManagementService.productList(this.page, this.per_page, this.status, this.check_status, this.title, this.store_id, this.code, this.few_days, this.tag, this.departure_city, this.destination_city).subscribe(res => {
            console.log("结果是", res)
            this.loading = false;
            this.total = res.meta.pagination.total;   //总页数
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
            status: this.status, check_status: this.check_status, title: this.title,
            store_id: this.store_id, code: this.code, few_days: this.few_days, tag: this.tag, page: this.page,
            departure_city: this.departure_city, destination_city: this.destination_city

        }
        localStorage.setItem('adminGroupSearch', JSON.stringify(this.setQuery));
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

    search() {
        this.status = this.searchForm.value.status;
        this.check_status = this.searchForm.value.checkStatus;
        this.title = this.searchForm.value.title;
        this.store_id = this.searchForm.value.store_id;
        this.code = this.searchForm.value.code;
        this.few_days = this.searchForm.value.few_days;
        this.tag = this.searchForm.value.tag;
        this.page = 1;
        this.departure_city = this.isDeparture;
        this.destination_city = this.isDestination;

        // 筛选条件存进cookie
        this.setQuery = {
            status: this.status, check_status: this.check_status, title: this.title, store_id: this.store_id,
            code: this.code, few_days: this.few_days, tag: this.tag, page: this.page,
            departure_city: this.departure_city, destination_city: this.destination_city
        }
        localStorage.setItem('adminGroupSearch', JSON.stringify(this.setQuery));
        this.getProductList();

    }


    // 查看详情
    edit(data: any) {
        this.router.navigate(['/admin/main/productManagement/detail'], { queryParams: { detailDataId: data.id, storeSupplierType: data?.store?.data[0]?.type } });
    }


    // 审核
    review(data: any) {
        console.log("编辑", data);
        this.adminProductManagementService.checkLog(data.id).subscribe(res => {
            console.log("122", res);
            console.log("24452", res[0]);
            this.isReason = res[0]?.reason;
            const dialogRef = this.dialog.open(AdminProductReviewComponent, {
                width: '800px',
                data: [data, this.isReason]
            })
            dialogRef.afterClosed().subscribe(result => {
                if (result !== undefined) {
                    this.getProductList();
                }
            })
        })

    }



    // 上下架操作
    up(data: any) {
        console.log("nadao", data);
        this.adminProductSetStatusModel.id = data.id;
        if (data.status === 1) {
            this.adminProductSetStatusModel.status = 0;
        }
        else if (data.status === 0) {
            this.adminProductSetStatusModel.status = 1;
        }
        this.modal.confirm({
            nzTitle: '<h4>提示</h4>',
            nzContent: '<h6>请确认操作</h6>',
            nzOnOk: () =>
                this.adminProductManagementService.productSetStatus(this.adminProductSetStatusModel).subscribe(res => {
                    this.getProductList();
                })
        });
    }

    quteDateClick(data: any) {
        console.log('data :>> ', data);
        this.adminProductManagementService.productDetail(data.id).subscribe(res => {
            console.log('res :>> ', res);
            let childStatus = res.data.child_status;
            this.router.navigate(['/admin/main/productManagement/qutedate'], { queryParams: { detailId: data.id, proName: data.title, childStatus: childStatus, few_nights: data?.few_nights } });

        })
    }



    // 审核日志
    viewLog(data: any) {
        this.adminProductManagementService.checkLog(data.id).subscribe(res => {
            console.log("122", res);
            console.log("24452", res[0]);
            this.isReason = res[0]?.reason;
        })
    }



    getCode(data: any) {
        // console.log('data :>> ', data, data?.status === 0);
        // if (data?.status === 0) {
        //     this.message.create('error', `该产品暂未上架，无法生成小程序码`)
        // }
        // else {
     
        // }
        const addmodal = this.modal.create({
            nzTitle: '生成小程序码',
            nzContent: AdminProductMiniCodeComponent,
            nzWidth: 800,
            nzComponentParams: {
                data: [data, 0]
            },
            nzFooter: null
        })
        addmodal.afterClose.subscribe((res: any) => {
        })
    }


    // 重置
    reset() {
        this.searchForm.patchValue({
            status: '',
            checkStatus: '',
            title: '',
            store_id: '',
            code: '',
            tag: '',
            few_days: '',
            departure_city: '',
            destination_city: '',
        });
        this.page = 1;

    }


    // 查看操作记录
    getTimeLine(data: any) {
        const addmodal = this.modal.create({
            nzTitle: '操作记录',
            nzContent: AdminProductOprateLogComponent,
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
