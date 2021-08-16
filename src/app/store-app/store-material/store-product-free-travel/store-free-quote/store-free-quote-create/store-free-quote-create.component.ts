import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { differenceInCalendarDays, format } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FreeTraveQuoteBydateModel, StoreQuoteBydateModel, StoreQuoteBydateRequestModel } from '../../../../../../interfaces/store/storeQuote/store-quote-bydate';
import { StoreQuoteBydateService } from '../../../../../../services/store/store-quote-bydate/store-quote-bydate.service';
import { isNumber } from '../../../../../util/validators';

@Component({
    selector: 'app-store-free-quote-create',
    templateUrl: './store-free-quote-create.component.html',
    styleUrls: ['./store-free-quote-create.component.css']
})
export class StoreFreeQuoteCreateComponent implements OnInit {
    @Input() data: any;
    today = new Date();
    addForm!: FormGroup;
    quoteBydateRequestModel: StoreQuoteBydateRequestModel;
    quoteBydateModel: StoreQuoteBydateModel;
    type: any;//freeTravel 自由行 management 产品管理   是从自由行 还是产品跳过来的
    isEarlier: any;
    public isSpinning: boolean = true;
    //自由行
    freeTraveModel!: FreeTraveQuoteBydateModel;

    productId: number = 0;
    selectDate: any;
    dateArr: any;
    selectItem: any; ////当前点击项

    listDataMap: any[] = [];

    isSetInventory = '0';
    isAllowOver = '0';

    resultArr: FreeTraveQuoteBydateModel[] = [];

    confirmValue: any;
    freeTravelModel: any;
    currentDate = null;
    childStatus: any;

    isShowPrice_diff = true;   //0晚


    // 删除
    ids: any

    // 选择了周几
    weekValue: any[] = [1, 2, 3, 4, 5, 6, 0];
    // 选择周几
    checkWeeks = [
        { label: '周一', value: 1, checked: true },
        { label: '周二', value: 2, checked: true },
        { label: '周三', value: 3, checked: true },
        { label: '周四', value: 4, checked: true },
        { label: '周五', value: 5, checked: true },
        { label: '周六', value: 6, checked: true },
        { label: '周日', value: 0, checked: true },
    ]

    precision = 2;
    is_use_num: any;

    //预售产品信息
    is_presell: any;
    start_date: any;
    end_date: any;
    use_start_date: any;
    use_end_date: any;
    ticket_price: any;
    subsidy_price: any;
    is_start_date: any;
    is_use_start_date: any;


    constructor(public fb: FormBuilder, public quoteBydateService: StoreQuoteBydateService, private modal: NzModalService,
        private msg: NzMessageService) {
        this.quoteBydateRequestModel = { data: [] }
        this.quoteBydateModel = {
            date: ''
        }
        this.buildForm();



    }

    ngOnInit(): void {
        console.log(this.data, 'this.data');
        this.productId = this.data.productId;
        this.type = this.data.type;
        this.isEarlier = this.data.earlier;
        this.childStatus = this.data.childStatus;
        this.isShowPrice_diff = this.data.isShowPrice_diff;
        this.is_use_num = this.data.is_use_num;
        this.is_presell = this.data.is_presell;
        this.start_date = this.data.start_date;
        this.end_date = this.data.end_date;
        this.use_start_date = this.data.use_start_date;
        this.use_end_date = this.data.use_end_date;
        this.ticket_price = this.data.ticket_price;
        this.subsidy_price = this.data.subsidy_price;
        console.log('object :>> ', this.isEarlier);
        this.selectItem = this.data.date ? this.data.date[0] : ''; //当前点击项
        this.GetDetail();
        this.is_start_date = this.start_date + '~' + this.end_date;
        this.is_use_start_date = this.use_start_date + '~' + this.use_end_date;
        console.log(this.selectItem, 'this.selectItem');

    }

    updateLoading() {
        this.isSpinning = true;
    }

    buildForm() {
        console.log('buildForm');
        this.addForm = this.fb.group({
            week: [false],
            is_use_num: [''],
            date: ['', [Validators.required]],
            inclusive_price: ['', [Validators.required]],
            inventory_num: [1, [Validators.required, isNumber]],
            set_inventory: [0, [Validators.required]],
            allow_over: [0, [Validators.required]],
            start_date: [''],
            use_start_date: [''],
            ticket_price: [''],
            subsidy_price: [''],
        });
    }

    // 获取详情
    GetDetail() {
        if (this.selectItem) {
            console.log('GetDetail');
            console.log(this.productId, 'this.productId');
            this.quoteBydateService.getFreeTravelQuoteDateDetail(this.selectItem.id).subscribe(res => {
                this.isSpinning = false;
                if (res.data) {
                    this.freeTravelModel = res.data;
                    console.log('拿到的data', res.data);
                    this.setfreeTravelFormValue();
                }
            })
        } else {
            this.isSpinning = false;
        }

    }


    setfreeTravelFormValue() {
        this.selectDate = [new Date(this.freeTravelModel.date), new Date(this.freeTravelModel.date)];
        this.addForm.controls["inclusive_price"].setValue(this.freeTravelModel.inclusive_price);
        this.addForm.controls["inventory_num"].setValue(this.freeTravelModel.inventory_num || 0);
        console.log(this.freeTravelModel.set_inventory, ' this.freeTravelModel.set_inventory');
        this.isSetInventory = (this.freeTravelModel.set_inventory).toString() || '0';
        this.isAllowOver = (this.freeTravelModel.allow_over).toString() || 0;
    }



    getAllDateCN(startTime: Date, endTime: Date) {
        if (!startTime) return
        if (!endTime) return [format(startTime, 'yyyy-MM-dd')]
        var date_all = [];
        var i = 0;
        while ((endTime.getTime() - startTime.getTime()) >= 0) {
            console.log(this.weekValue, startTime.getDay());
            if (this.weekValue.indexOf(startTime.getDay()) > -1) {
                console.log(123);
                date_all[date_all.length] = format(startTime, 'yyyy-MM-dd')
            }
            console.log(date_all, 'date_all');
            startTime.setDate(startTime.getDate() + 1)
            i += 1
        }
        return date_all
    }


    ngCheckBoxChange(value: object[]): void {
        this.weekValue = value;
        console.log(value);
    }

    onDateChange(dateStr: any) {
    }

    ngRadioChange(status: EventEmitter<string>) {
        console.log(status, 'status');
        if (status.toString() == '0') {
            this.addForm.controls["inventory_num"].setValue(1)
            this.isAllowOver = '0';
        }
    }


    disabledDate = (current: Date): boolean => {
        // 禁用之前的日期
        let i = 1 + Number(this.isEarlier);
        return differenceInCalendarDays(current, this.today) < i;
    };



    // 自由行报价
    setFreeTravelValue() {
        this.dateArr = this.getAllDateCN(this.selectDate[0], this.selectDate[1])
        this.dateArr.forEach((date: any) => {
            this.freeTraveModel = {
                id: 0,
                date: '',
                independent_product_id: 0,
                inclusive_price: '',
                inventory_num: 1,
                set_inventory: 0,
                allow_over: 0,
                check_status: 0,
                adult_price: 0,
                child_price: 0,
                baby_price: 0,
                difference_price: 0,
            }
            this.freeTraveModel.date = date;
            this.freeTraveModel.independent_product_id = this.productId;
            this.freeTraveModel.inclusive_price = this.addForm.value.inclusive_price;
            this.freeTraveModel.inventory_num = this.addForm.value.inventory_num;
            this.freeTraveModel.set_inventory = this.addForm.value.set_inventory;
            this.freeTraveModel.allow_over = this.addForm.value.allow_over;
            this.resultArr.push(this.freeTraveModel);
        });
        console.log('添加值', this.resultArr);
    }



    add() {
        for (const i in this.addForm.controls) {
            this.addForm.controls[i].markAsDirty();
            this.addForm.controls[i].updateValueAndValidity();
        }
        if (this.selectDate === '') {
            this.msg.error("请输入日期范围")
            return
        }
        if (this.addForm.valid) {
            console.log('自由行产品编辑 ');
            // 自由行添加
            this.setFreeTravelValue();
            // 修改
            if (this.selectItem) {
                this.quoteBydateService.createFreeTravelQuteDate(this.resultArr).subscribe(res => {
                    console.log(res);
                }, error => {
                    this.isSpinning = false
                })
            } else {
                // // 添加
                this.quoteBydateService.createFreeTravelQuteDate(this.resultArr).subscribe(res => {
                    console.log(res);
                }, error => {
                    this.isSpinning = false
                })

            }
        }
        else {
            this.isSpinning = false
        }
    }



    deleteInfo() {
        let i: any[] = [];
        i.push(this.selectItem.id);
        this.ids = i;
        this.modal.confirm({
            nzTitle: `<h2>删除<h2>`,
            nzContent: `<h6>请确认是否删除</h6>`,
            nzOnOk: () => {
                this.quoteBydateService.delQuoteInfo(this.selectItem.id, this.ids).subscribe(res => {
                })
            }

        });
    }


    numTest1(data: any) {
        console.log('data :>> ', data,)
        data.target.value = data.target.value.replace(/[^\d.]/g, '').replace(/\.{2,}/g, '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
    }

}
