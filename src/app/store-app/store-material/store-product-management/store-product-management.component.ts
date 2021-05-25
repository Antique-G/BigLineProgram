import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StoreRegionService } from '../../../../services/store/store-region/store-region.service';
import { StoreProductService } from '../../../../services/store/store-product/store-product.service';
import { StoreQuoteBydateService } from '../../../../services/store/store-quote-bydate/store-quote-bydate.service';
import { SetCommissionComponent } from '../common/set-commission/set-commission.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { StoreProductMiniCodeComponent } from './store-product-mini-code/store-product-mini-code.component';

@Component({
    selector: 'app-store-product-management',
    templateUrl: './store-product-management.component.html',
    styleUrls: ['./store-product-management.component.css']
})

export class StoreProductManagementComponent implements OnInit {
    searchForm: FormGroup;
    checkStatus: any;
    title: any;
    few_days: any;
    code: any;
    status: any;
    tag: any;
    dataSource: any[] = [];   //1.4将数据添加到dataSource
    loading = true;
    page = 1;
    per_page = 20;
    total: any;

    isReason: any;


    newDay: any
    newHour: any;
    newMin: any;
    operation_id: any;

    isEar: any;
    tagList: any[] = [];
    setRewardModel: any;
    setQuery: any;
    product_id: any;
    accountList: any;

    // 城市
    nzOptions: any[] | null = null;
    departure_city: any;
    destination_city: any;
    isDeparture: any;
    isDestination: any;


    constructor(public fb: FormBuilder, public storeProductService: StoreProductService, public router: Router,
        private modal: NzModalService, private nzContextMenuService: NzContextMenuService, private message: NzMessageService, 
        public storeRegionService: StoreRegionService, public quoteBydateService: StoreQuoteBydateService) {
        this.searchForm = this.fb.group({
            checkStatus: [''],
            title: [''],
            few_days: [''],
            code: [''],
            status: [''],
            tag: [''],
            operation_id: [''],
            departure_city: [''],
            destination_city: [''],
        })
    }


    ngOnInit(): void {
        this.operation_id = Number(localStorage.getItem("storeAccountId"));
        this.storeRegionService.getAllRegionList().subscribe(res => {
            this.nzOptions = res;
            this.getTagList();
        })

        // 将上次查询的筛选条件赋值
        let getSeatch = JSON.parse(localStorage.getItem("storeGroupSearch")!);
        this.status = getSeatch?.status ? getSeatch?.status : '';
        this.checkStatus = getSeatch?.check_status ? getSeatch?.check_status : '';
        this.title = getSeatch?.title ? getSeatch?.title : '';
        this.code = getSeatch?.code ? getSeatch?.code : '';
        this.few_days = getSeatch?.few_days ? getSeatch?.few_days : '';
        this.tag = getSeatch?.tag ? getSeatch?.tag : '';
        this.page = getSeatch?.page ? getSeatch?.page : 1;
        this.operation_id = getSeatch?.operation_id == undefined ? this.operation_id : getSeatch?.operation_id;
        this.departure_city = getSeatch?.departure_city ? getSeatch?.departure_city : '';
        this.destination_city = getSeatch?.destination_city ? getSeatch?.destination_city : '';


        this.searchForm.patchValue({
            status: this.status,
            checkStatus: this.checkStatus,
            title: this.title,
            code: this.code,
            tag: this.tag,
            few_days: this.few_days,
            operation_id: Number(this.operation_id),
            departure_city: this.departure_city ? this.cityChange(this.departure_city) : '',
            destination_city: this.destination_city ? this.cityChange(this.destination_city) : '',
        });

        this.accountListData();



    }

    accountListData() {
        this.storeProductService.accountList().subscribe(res => {
            this.accountList = res?.data;
            this.getProductList();
        })
    }

    getTagList() {
        this.storeProductService.productTagList(1).subscribe(res => {
            console.log("标签", res.data);
            this.tagList = res.data;
        })
    }

    contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
        this.nzContextMenuService.create($event, menu);
    }

    closeMenu(): void {
        this.nzContextMenuService.close();
    }

    getProductList() {
        this.loading = true;
        this.storeProductService.getProduct(this.page, this.per_page, this.checkStatus, this.title, this.few_days, this.code, this.status, this.tag, this.operation_id, this.departure_city, this.destination_city).subscribe(res => {
            this.loading = false;
            console.log("11111", res);
            this.total = res.meta.pagination.total;   //总页数
            console.log("页码", this.total);
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
            code: this.code, few_days: this.few_days, tag: this.tag,
            page: this.page, operation_id: this.operation_id,
            departure_city: this.departure_city, destination_city: this.destination_city
        }
        localStorage.setItem('storeGroupSearch', JSON.stringify(this.setQuery));
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
        this.checkStatus = this.searchForm.value.checkStatus;
        this.title = this.searchForm.value.title;
        this.few_days = this.searchForm.value.few_days;
        this.code = this.searchForm.value.code;
        this.status = this.searchForm.value.status;
        this.tag = this.searchForm.value.tag;
        this.operation_id = this.searchForm.value.operation_id;
        this.page = 1;
        this.departure_city = this.isDeparture;
        this.destination_city = this.isDestination;

        // 筛选条件存进cookie
        this.setQuery = {
            status: this.status, check_status: this.checkStatus,
            title: this.title, code: this.code, few_days: this.few_days,
            tag: this.tag, page: this.page, operation_id: this.operation_id,
            departure_city: this.departure_city, destination_city: this.destination_city
        }
        localStorage.setItem('storeGroupSearch', JSON.stringify(this.setQuery));
        this.getProductList();

    }

    // 查看详情
    edit(data: any) {
        this.router.navigate(['/store/main/storeProduct/detail'], { queryParams: { detailDataId: data.id } });
    }

    // 克隆
    copy(data: any) {
        this.product_id = data?.id;
        this.modal.confirm({
            nzTitle: '<h5>请确认</h5>',
            nzContent: '<h6>是否生成该产品副本？</h6>',
            nzOnOk: () => {
                this.storeProductService.copyProduct(this.product_id).subscribe(res => {
                    console.log(res);
                    this.getProductList();
                })
            }
        });
    }

    // 提交审核
    checkStatusClick(data: any) {
        this.modal.confirm({
            nzTitle: '<h5>请确认操作?</h5>',
            nzContent: '提交审核',
            nzOnOk: () => {
                this.storeProductService.checkStatusFreeTravel(data.id, 1).subscribe(res => {
                    console.log(res);
                    this.getProductList();
                })
            }
        });
    }


    // 撤销审核
    revokeStatus(data: any) {
        this.modal.confirm({
            nzTitle: '<h5>请确认操作?</h5>',
            nzContent: '撤销审核',
            nzOnOk: () => {
                this.storeProductService.checkStatusFreeTravel(data.id, 0).subscribe(res => {
                    console.log(res);
                    this.getProductList();
                })
            }
        });
    }


    // 报价
    goToQuoteClick(data: any) {
        console.log('data', data);
        this.storeProductService.getProductDetail(data.id).subscribe(res => {
            console.log("结果是", res.data.id, res.data.earlier)
            console.log('res,2132323 :>> ', res.data.child_status, res.data?.insurance_base_info?.data?.insurance_expense);
            let child_status = Number(res.data.child_status)
            // 处理时间，预计多久报名
            let minutes = res.data.earlier;
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
            this.router.navigate(['/store/main/storeProduct/storeQuote'], { queryParams: { productId: res.data.id, type: 'management', earlier: this.isEar, proName: data.title, childStatus: child_status, few_nights: data?.few_nights, include_insurance_fee: res.data?.include_insurance_fee, insurance_expense: res.data?.insurance_base_info?.data?.insurance_expense } });
        })
    }


    // 上下架操作
    up(data: any) {
        console.log("nadao", data);
        this.modal.confirm({
            nzTitle: '<h4>提示</h4>',
            nzContent: '<h6>请确认操作</h6>',
            nzOnOk: () =>
                this.storeProductService.patchProductStatus(data.id).subscribe(res => {
                    this.getProductList();
                })
        });
    }




    addStep() {
        this.router.navigate(['/store/main/storeProduct/createByStep']);
    }



    // 审核日志
    viewLog(data: any) {
        this.storeProductService.checkLog(data.id).subscribe(res => {
            console.log("122", res);
            console.log("24452", res[0]);
            this.isReason = res[0]?.reason;
        })
    }



    // 设置佣金
    setCommission(obj: any) {
        console.log(obj, '设置佣金');

        this.quoteBydateService.getQuoteDateList(obj.id, 'management', '', '', '').subscribe(res => {
            let { data } = res
            let nowDate = format(new Date(), 'yyyy-MM-dd')
            console.log("nowDate", nowDate);
            let flag = data.some((item: any) => new Date(item.date).getTime() >= new Date(nowDate).getTime())

            if (!flag) {
                this.modal.confirm({
                    nzTitle: '<h5>提示</h5>',
                    nzContent: '该日期无产品报价，请先进行日期报价，再设置佣金',
                    nzOnOk: () => {

                    }
                });
                return
            }

            const addmodal = this.modal.create({
                nzTitle: '设置佣金',
                nzContent: SetCommissionComponent,
                nzComponentParams: {
                    data: {
                        id: obj.id,
                        title: obj.title,
                        day: obj.few_days,
                        obj: obj
                    }
                },
                nzFooter: [
                    {
                        label: '添加',
                        type: 'primary',
                        onClick: componentInstance => {
                            let flag = componentInstance?.Add()
                            if (flag) {
                                let obj = componentInstance?.getValue();
                                this.setRewardModel = obj;
                                this.storeProductService.setReward(this.setRewardModel).subscribe(res => {
                                    console.log('res :>> ', res);
                                    if (res === null) {
                                        setTimeout(() => this.modal.closeAll(), 1000);  //1s后消失
                                    }
                                })

                            }
                        }
                    }
                ]
            })
            addmodal.afterClose.subscribe(res => {
                this.getProductList();
            })

        })

    }

    // 生成小程序码
    getCode(data: any) {
        console.log('data :>> ', data, data?.status === 0);
        if (data?.status === 0) {
            this.message.create('error', `该产品暂未上架，无法生成小程序码`)
        }
        else {
            const addmodal = this.modal.create({
                nzTitle: '生成小程序码',
                nzContent: StoreProductMiniCodeComponent,
                nzWidth: 800,
                nzComponentParams: {
                    data: [data, 0]
                },
                nzFooter: null
            })
            addmodal.afterClose.subscribe((res: any) => {
            })
        }

    }


    // 重置
    reset() {
        this.searchForm.patchValue({
            checkStatus: '',
            title: '',
            few_days: '',
            code: '',
            status: '',
            tag: '',
            operation_id: '',
            departure_city: '',
            destination_city: '',
        })
    }
}
