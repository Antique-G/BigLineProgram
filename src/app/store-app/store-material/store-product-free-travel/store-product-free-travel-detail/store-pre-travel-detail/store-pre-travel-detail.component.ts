import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import wangEditor from 'wangeditor';
import { StoreFreeTravelModel } from '../../../../../../interfaces/store/storeProductFreeTravel/storeProductFreeTravel';
import { StoreProductTreeTravelService } from '../../../../../../services/store/store-product-free-travel/store-product-tree-travel.service';
import { StoreProductService } from '../../../../../../services/store/store-product/store-product.service';
import { StoreRegionService } from '../../../../../../services/store/store-region/store-region.service';
import { ChooseGalleryComponent } from '../../../../../layouts/choose-gallery/choose-gallery';
import { CommonModelComponent } from '../../../common/common-model/common-model.component';
import { InsertABCMenu } from '../../../InsertABCMenu';


@Component({
    selector: 'app-store-pre-travel-detail',
    templateUrl: './store-pre-travel-detail.component.html',
    styleUrls: ['./store-pre-travel-detail.component.css']
})
export class StorePreTravelDetailComponent implements OnInit {
    addForm!: FormGroup;
    public isSpinning: any = true;    //loading 
    detailId: any //产品id
    dataModel: any //数据存储容器
    freeTravelModel: StoreFreeTravelModel
    earlierTime = new Date('2021-01-01 18:00');

    featureList: any[] = []
    detailList: any[] = []
    isLoadingBtn = false;

    selectedTag: any[] = [];  //标签
    tagList: any[] = [];

    // 区域联动
    valuesDestination_city: any[] = [];//目的城市
    nzOptions: any[] | null = null;
    departure_city: any[] = [];//出发城市

    @ViewChild("feeBox") feeBox: any;       // 费用 获取dom
    feeList: any[] = []    //图片

    isReserveAhead = '0';

    cateId: any;
    newDay: any;
    newHour: any;
    newMin: any;

    // 日期有效期
    dateArray: any[] = [];



    // 报价类型
    isQuoteType = false;


    constructor(public fb: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute,
        public storeProductService: StoreProductService,
        private freeTravelService: StoreProductTreeTravelService, private storeRegionService: StoreRegionService,
        public dialog: MatDialog, private msg: NzMessageService,
        private modal: NzModalService, private viewContainerRef: ViewContainerRef) {
        this.addForm = new FormGroup({
            title: new FormControl('', [Validators.required]),
            sub_title: new FormControl('', [Validators.required]),
            few_days: new FormControl(2, [Validators.required]),
            few_nights: new FormControl(1, [Validators.required]),
            tag_id: new FormControl('', [Validators.required]),
            departure_city: new FormControl(''),
            destination_city: new FormControl('', [Validators.required]),
            service_phone: new FormControl(''),
            earlier1: new FormControl(1, [Validators.required]),
            earlier2: new FormControl(null),
            reserve_ahead: new FormControl(1, [Validators.required]),
            reserve_num: new FormControl('0', [Validators.required]),
            reserve_children: new FormControl(0, [Validators.required]),
            child_age_min: new FormControl(''),
            children_age: new FormControl(''),
            child_height_min: new FormControl(''),
            child_height_max: new FormControl(''),
            quote_type: new FormControl('1', [Validators.required]),
            buy_num_max: new FormControl(0, [Validators.required]),
            copies_max: new FormControl(0),
            use_num: new FormControl(1),
            inclusive: new FormControl(0),
            request_id_num: new FormControl(0, [Validators.required]),
            sales_note: new FormControl(0),
            dateValid: new FormControl(null, [Validators.required]),
            ticket_price: new FormControl('', [Validators.required]),
            inventory: new FormControl('', [Validators.required]),
            show_price: new FormControl('', [Validators.required]),
        });
        this.freeTravelModel = {
            title: '',
            sub_title: '',
            earlier: 0,
            pay_method: 0,
            few_days: 0,
            few_nights: 0,
            departure_city: 0,
            destination_city: 0,
            service_phone: '',
            reserve_num: 0,
            reserve_children: 0,
            reserve_ahead: 0,
            child_age_min: 0,
            children_age: 0,
            child_height_min: 0,
            child_height_max: 0,
            fee: '',
            status: 0,
            tag_id: [],
            step: 0,
            quote_type: '',
            copies_max: '',
            use_num: '',
            inclusive: '',
            buy_num_max: '',
            request_id_num: 0,
            sales_note: '',
            is_presell: '',
            ticket_price: '',
            show_price: '',
            inventory: '',
            start_date: '',
            end_date: '',
        }

    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            this.detailId = params.detailId;
        });
        console.log('this.detailId', this.detailId);
        this.addForm.controls['tag_id'].setValue([]);
        this.getCateList();
    }



    getDetail() {
        this.freeTravelService.GetFreeTravelDetail(this.detailId).subscribe((res: any) => {
            console.log(res);
            this.isSpinning = false
            this.dataModel = res.data
            this.setFormValue();
            this.textChange()
        })
    }


    setFormValue() {
        this.addForm.get('title')?.setValue(this.dataModel.title);
        this.addForm.get('sub_title')?.setValue(this.dataModel.sub_title);
        this.addForm.controls['few_days'].setValue(this.dataModel.few_days);
        this.addForm.get('few_nights')?.setValue(this.dataModel.few_nights);
        this.addForm.get('service_phone')?.setValue(this.dataModel.service_phone);
        this.addForm.get('reserve_ahead')?.setValue(this.dataModel.reserve_ahead);
        this.addForm.get('reserve_num')?.setValue(this.dataModel.reserve_num);
        this.addForm.get('reserve_children')?.setValue(this.dataModel.reserve_children);
        this.addForm.get('child_age_min')?.setValue(this.dataModel.child_age_min);
        this.addForm.get('children_age')?.setValue(this.dataModel.children_age);
        this.addForm.get('child_height_min')?.setValue(this.dataModel.child_height_min);
        this.addForm.get('child_height_max')?.setValue(this.dataModel.child_height_max);
        this.addForm.get('copies_max')?.setValue(this.dataModel.copies_max);
        this.addForm.get('use_num')?.setValue(this.dataModel.use_num);
        this.addForm.get('inclusive')?.setValue(this.dataModel.inclusive);
        this.addForm.get('sales_note')?.setValue(this.dataModel.sales_note);
        this.addForm.get('ticket_price')?.setValue(this.dataModel?.product_ticket?.data[0]?.ticket_price);
        this.addForm.get('inventory')?.setValue(this.dataModel?.product_ticket?.data[0]?.inventory);
        this.addForm.get('show_price')?.setValue(this.dataModel?.product_ticket?.data[0]?.show_price);
        this.addForm.get('dateValid')?.setValue([this.dataModel?.product_ticket?.data[0]?.start_date,this.dataModel?.product_ticket?.data[0]?.end_date]);

        let b = this.dataModel.tag.data;
        let bNums: any[] = []
        for (let ints of b) {
            bNums.push(ints.id)
            this.selectedTag = bNums
        }
        const str = this.dataModel.departure_city;
        for (let i = 0; i < str.length / 4; i++) {
            let temp = this.departure_city[i] || '' + str.substr(0, 4 * (i + 1))
            this.departure_city.push(temp);
        }
        console.log(this.departure_city, 'this.values');
        this.addForm.get('departure_city')?.setValue(this.departure_city);   //出发城市

        const strs = this.dataModel.destination_city;
        for (let i = 0; i < strs.length / 4; i++) {
            let temp = this.valuesDestination_city[i] || '' + strs.substr(0, 4 * (i + 1))
            this.valuesDestination_city.push(temp);
        }
        console.log(this.valuesDestination_city, '目的城市');
        this.addForm.get('destination_city')?.setValue(this.valuesDestination_city);   //目的城市
        // 时间处理
        let timeArr = this.timeStamp(this.dataModel.earlier);
        this.addForm.get('earlier1')?.setValue(timeArr[0]);   //目的城市
        let timeDate = format(this.earlierTime, 'yyyy-MM-dd') + ' ' + timeArr[1] + ':' + timeArr[2];
        this.earlierTime = new Date(timeDate)
    }


    //传入的分钟数  转换成天、时、分 [天,时,分]
    timeStamp(minutes: any) {
        console.log("minutes11111111111", minutes)
        this.newDay = Math.floor(minutes / 60 / 24);
        this.newMin = Math.floor(minutes % 60);
        if (this.newMin === 0) {
            this.newHour = Math.floor(24 - minutes / 60 % 24);
        }
        else if (this.newMin != 0) {
            this.newMin = 60 - this.newMin;
            this.newHour = Math.floor(24 - minutes / 60 % 24);
        }
        let str: any = [this.newDay, this.newHour, this.newMin];
        console.log('2423423', this.newDay, this.newHour, this.newMin)
        //三元运算符 传入的分钟数不够一分钟 默认为0分钟，else return 运算后的minutes 
        return str;
    }

    changeTag(a: any) {
        this.freeTravelModel.tag_id = a;
    }

    // 标签分类列表
    getCateList() {
        this.storeProductService.productCateList().subscribe(res => {
            console.log("结果是111", res.data)
            console.log("name", res.data[0].name)
            console.log("name", res.data[1].name)
            let name1 = res.data[0].name;
            let name2 = res.data[1].name;
            if (name1 === '自由行') {
                this.cateId = res.data[0].id
            }
            else if (name2 === '自由行') {
                this.cateId = res.data[1].id
            }
            this.getTagList();
        })
    }

    getTagList() {
        this.freeTravelService.GetProductTagList(this.cateId).subscribe((res: any) => {
            for (let i of res.data) {
                this.tagList.push({ value: i.id, label: i.name });
            }
            this.getRegionList()
        })
        console.log(this.tagList, '  this.tagList');
    }

    // 区域
    getRegionList() {
        this.storeRegionService.getAllRegionList().subscribe(res => {
            this.nzOptions = res;
            console.log(this.detailId, 1234123421341234);
            if (this.detailId === undefined) {
                this.isSpinning = false
            } else {
                this.getDetail()
            }

        })
    }

    // 日期有效期
    onChangeDate(event: any) {
        this.dateArray = [];
        const datePipe = new DatePipe('en-US');
        console.log('object :>> ', event);
        const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
        this.dateArray.push(myFormattedDate);
        const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
        this.dateArray.push(myFormattedDate1);
        console.log("event", this.dateArray);

    }

    // 修改
    updateInfo() {
        this.setValue();
        // 验证表单
        for (const i in this.addForm.controls) {
            this.addForm.controls[i].markAsDirty();
            this.addForm.controls[i].updateValueAndValidity();
        }
        console.log(this.addForm.valid);
        if (this.addForm.valid) {
            if (Number(this.freeTravelModel.child_height_min) > Number(this.freeTravelModel.child_height_max)) {
                this.msg.error("儿童最大身高不能小于最小身高");
            }
            else {
                this.isLoadingBtn = true;
                this.freeTravelService.UpdateFreeTravelInfo(this.freeTravelModel).subscribe(res => {
                    this.isLoadingBtn = false;
                    if (res.message == "更新成功") {
                        localStorage.setItem("few_days", this.addForm.value.few_days);
                    }
                },
                    error => {
                        this.isLoadingBtn = false;
                    })
            }

        }

    }


    setValue() {
        if (this.detailId != undefined) {
            this.freeTravelModel.id = this.dataModel.id;
        }
        this.freeTravelModel.title = this.addForm.value.title;
        this.freeTravelModel.sub_title = this.addForm.value.sub_title;
        this.freeTravelModel.few_days = this.addForm.value.few_days;;
        this.freeTravelModel.few_nights = this.addForm.value.few_nights;
        this.freeTravelModel.service_phone = this.addForm.value.service_phone;
        this.freeTravelModel.reserve_ahead = this.addForm.value.reserve_ahead;
        if (parseInt(this.isReserveAhead) === 0) {
            this.freeTravelModel.earlier = 0;
        }
        else if (parseInt(this.isReserveAhead) === 1) {
            // 时间处理
            let earlier1 = this.addForm.value.earlier1;
            let date = new Date(this.addForm.value.earlier2);
            let min = date.getMinutes();
            let hour = date.getHours();
            if (min > 0) {
                let resMin = earlier1 * 24 * 60 + ((24 - hour - 1) * 60 + (60 - min));
                this.freeTravelModel.earlier = resMin;
            }
            else if (min === 0) {
                let resMin = earlier1 * 24 * 60 + (24 - hour) * 60;
                this.freeTravelModel.earlier = resMin;
            }
            console.log('date是多少', this.freeTravelModel.earlier);
        }
        this.freeTravelModel.reserve_num = 0;
        this.freeTravelModel.reserve_children = this.addForm.value.reserve_children;
        this.freeTravelModel.child_age_min = this.addForm.value.child_age_min;
        this.freeTravelModel.children_age = this.addForm.value.children_age;
        this.freeTravelModel.child_height_min = this.addForm.value.child_height_min;
        this.freeTravelModel.child_height_max = this.addForm.value.child_height_max;
        this.freeTravelModel.departure_city = this.departure_city[this.departure_city.length - 1]
        this.freeTravelModel.destination_city = this.valuesDestination_city[this.valuesDestination_city.length - 1]
        this.freeTravelModel.quote_type = 1;
        this.freeTravelModel.request_id_num = this.addForm.value.request_id_num;
        this.freeTravelModel.sales_note = this.addForm.value.sales_note;
        this.freeTravelModel.start_date = this.dateArray[0];
        this.freeTravelModel.end_date = this.dateArray[1];
        this.freeTravelModel.is_presell = 1;
        this.freeTravelModel.ticket_price = this.addForm.value.ticket_price;
        this.freeTravelModel.inventory = this.addForm.value.inventory;
        this.freeTravelModel.show_price = this.addForm.value.show_price;
        this.freeTravelModel.copies_max = this.addForm.value.copies_max == '' ? 0 : this.addForm.value.copies_max;
        this.freeTravelModel.use_num = this.addForm.value.use_num == '' ? 1 : this.addForm.value.use_num;
        this.freeTravelModel.inclusive = this.addForm.value.inclusive == null || this.addForm.value.inclusive == '' ? '' : this.addForm.value.inclusive;
        this.freeTravelModel.buy_num_max = 0;

    }


    // 富文本
    textChange() {
        // 预约须知
        const editorFee = new wangEditor("#editorFee", "#feeContent");
        // 产品详情

        this.feeBox.nativeElement.innerHTML = this.dataModel.fee
        this.freeTravelModel.fee = this.dataModel.fee

        editorFee.config.onchange = (newHtml: any) => {
            console.log("213123", newHtml);
            this.freeTravelModel.fee = newHtml;
        }
        // 配置菜单栏
        editorFee.config.menus = [
            'head',
            'bold',
            'fontSize',
            'fontName',
            'italic',
            'underline',
            'strikeThrough',
            'indent',
            'lineHeight',
            'foreColor',
            'backColor',
            'list',
            'todo',
            'justify',
            'quote',
            'emoticon',
            'table',
            'splitLine',
            'undo',
            'redo',
            'image'
        ];
        // 对粘贴的文本进行处理
        editorFee.config.pasteFilterStyle = false;
        editorFee.config.pasteTextHandle = function (pasteStr: any) {
            //  去除wps文档复制过来的style样式
            let str = pasteStr
            str = str.replace(/[\s\S.@]*{[\s\S]*?}/ig, '');
            return str
        }
        // InsertABCMenu
        // 注册菜单
        editorFee.menus.extend('insertABC', InsertABCMenu)
        // 重新配置 editor.config.menus
        editorFee.config.menus = editorFee.config.menus.concat('insertABC')
        editorFee.config.customFunction = (insert: any) => {
            const modal: NzModalRef = this.modal.create({
                nzTitle: '图片上传',
                nzViewContainerRef: this.viewContainerRef,
                nzContent: CommonModelComponent,
                nzWidth: 660,
                nzFooter: null
            })
            modal.afterClose.subscribe(result => {
                let res = result?.data || []
                res.forEach((item: any) => {
                    insert(item.url)
                });
            });
        }
        editorFee.create();

    }

    onDestChange(values: any): void {
        console.log("点击的结果是", values);
        localStorage.setItem('regionData', values);
    }


    importImg() {
        const modal: NzModalRef = this.modal.create({
            nzTitle: '从图库导入资源',
            nzViewContainerRef: this.viewContainerRef,
            nzContent: ChooseGalleryComponent,
            nzComponentParams: {
                data: 1
            },
            nzWidth: 1105,
            nzFooter: null
        })
        modal.afterClose.subscribe(res => {
            let result = res || []
            result.forEach((item: any) => {
                this.feeList.push(item)
                // if (this.feeList.length > 10) {
                //   this.msg.error('产品特色引用图片不能超过10张')
                //   return
                // }
                this.feeBox.nativeElement.innerHTML += `<img src="${item.url}" style="max-width:100%;"/><br>`;
                console.log("this.addStoreProductModel.fee", this.freeTravelModel.fee)
            });
        });

    }


    isReserveAheadChange(status: any) {
        console.log(status, 'status');
        this.isReserveAhead = status;
        this.addForm.value.reserve_ahead = this.isReserveAhead
    }




    // 只输入整数
    numTest($event: any) {
        $event.target.value = $event.target.value.replace(/[^\d]/g, '');
    }



    // 报价类型
    quoteType(event: any) {
        if (event == 1) {
            this.isQuoteType = false;
            this.addForm?.controls['use_num'].setValidators(Validators.required);
            this.addForm?.controls['use_num'].updateValueAndValidity();
        }
        else {
            this.isQuoteType = true;
            this.addForm?.controls['use_num'].setValidators(null);
            this.addForm?.controls['use_num'].updateValueAndValidity();
        }
    }
}
