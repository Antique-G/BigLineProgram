import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddGoodsModel } from '../../../../../../interfaces/store/storeGoods/store-goods-model';
import { StoreGoodsService } from '../../../../../../services/store/store-goods/store-goods.service';
import { StoreRegionService } from '../../../../../../services/store/store-region/store-region.service';




@Component({
    selector: 'app-store-goods-pro-detai-info',
    templateUrl: './store-goods-pro-detai-info.component.html',
    styleUrls: ['./store-goods-pro-detai-info.component.css']
})
export class StoreGoodsProDetaiInfoComponent implements OnInit {
    isLoadingBtn = false;

    addForm!: FormGroup;
    public isSpinning: any = true;    //loading 
    detailId: any; //产品id
    addDataDetailModel: any;

    addGoodsModel: AddGoodsModel;

    //产地
    nzOptions: any[] | null = null;
    cityList: any[] = [];
    // 分类
    cateFistList: any;
    selectedcateFist: any;
    cateSecondList: any;
    selectedcateSecond: any;
    isCateId: any;
    // 预售时间
    isShow = false;

    constructor(public fb: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute,
        private storeRegionService: StoreRegionService, public storeGoodsService: StoreGoodsService,
        private msg: NzMessageService, private message: NzMessageService,
        private modal: NzModalService,) {
        // 表单初始化
        this.addForm = new FormGroup({
            title: new FormControl('', [Validators.required]),
            firstType: new FormControl('', [Validators.required]),
            secondType: new FormControl('', [Validators.required]),
            product_area: new FormControl('', [Validators.required]),
            is_order: new FormControl('0', [Validators.required]),
            send_time: new FormControl(null),
            delivery_type: new FormControl('1'),
            is_hot: new FormControl('0'),
            sort: new FormControl(),
            specificationList: this.fb.array([]),
            sales_note: new FormControl(),
        });
        this.addGoodsModel = {
            title: '',
            cate_id: '',
            is_order: '',
            send_time: '',
            sales_note: '',
            product_area: '',
            delivery_type: '',
            is_hot: '',
            sort: '',
            goods_specs: [],
            id: '',
            step: ''
        }

    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            this.detailId = params.detailId;
        });
        this.getRegionList();

    }

    // 规格
    get specificationArray() {
        return this.addForm.get("specificationList") as FormArray;
    }



    removeIcon(index: number) {
        if (this.specificationArray.length > 1) {
            this.specificationArray.removeAt(index);
        }
        else {
            this.message.create('warning', '无法删除，至少存在一组');
        }
    }

    addSpecification() {
        this.specificationArray.push(this.fb.group({
            spec_name: new FormControl('', [Validators.required]),
            price: new FormControl('', [Validators.required]),
            stock: new FormControl('', [Validators.required]),
            unit: new FormControl('', [Validators.required]),
            postage: new FormControl('2', [Validators.required]),
        }))
    }

    // 产地
    getRegionList() {
        this.storeRegionService.getAllRegionList().subscribe(res => {
            this.nzOptions = res;
            this.getCateListTree();
        })
    }

    // 分类
    getCateListTree() {
        this.storeGoodsService.getCateListTree().subscribe(res => {
            console.log("11111", res);
            this.cateFistList = res;
            this.getGoodsDetail();
        })
    }

    getGoodsDetail() {
        this.storeGoodsService.getGoodsDetail(this.detailId).subscribe(res => {
            console.log("结果是12", res)
            this.addDataDetailModel = res.data;
            this.isSpinning = false;
            this.setFormValue();
        })
    }


    setFormValue() {
        this.addForm.get('title')?.setValue(this.addDataDetailModel.title);
        //产地
        const str = this.addDataDetailModel.product_area;
        for (let i = 0; i < str.length / 4; i++) {
            let temp = this.cityList[i] || '' + str.substr(0, 4 * (i + 1))
            this.cityList.push(temp);
        }
        console.log('this.values产地', this.cityList);
        this.addForm.get('product_area')?.setValue(this.cityList);
      
        // // 初始化规格
        for (let i = 0; i < this.addDataDetailModel.goods_specs.length; i++) {
            this.specificationArray.push(new FormGroup({
                spec_name: new FormControl(this.addDataDetailModel.goods_specs[i].spec_name, [Validators.required]),
                price: new FormControl(this.addDataDetailModel.goods_specs[i].price, [Validators.required]),
                stock: new FormControl(this.addDataDetailModel.goods_specs[i].stock, [Validators.required]),
                unit: new FormControl(this.addDataDetailModel.goods_specs[i].unit, [Validators.required]),
                postage: new FormControl(this.addDataDetailModel.goods_specs[i].postage.toString(), [Validators.required]),
                id:new FormControl(this.addDataDetailModel.goods_specs[i].id)
            }));
        }
        this.addForm.get('sort')?.setValue(this.addDataDetailModel.sort);
        this.addForm.get('sales_note')?.setValue(this.addDataDetailModel.sales_note);

        // 预售时间赋值
        if (this.addDataDetailModel.is_order == 1) {
            this.addForm.get('send_time')?.setValue(this.addDataDetailModel.send_time);
        }
        
          //   给类别赋值
          let pid = this.addDataDetailModel.goods_cate.pid;
          let cate1 = this.cateFistList.filter((item: any) => item.id == pid);
          console.log("11111111", cate1);
          this.selectedcateFist = cate1[0];
          let cate2 = this.selectedcateFist?.children.filter((item: any) => item.id == this.addDataDetailModel.cate_id);
          console.log("22222", cate2);
          this.selectedcateSecond = cate2[0];
  
    }



    // 选择分类
    changeTypeFirst(event: any) {
        console.log("1111", event);
        if (event != undefined) {
            this.cateSecondList = event?.children;
            this.addForm.patchValue({
                secondType: this.cateSecondList[0] ? this.cateSecondList[0] : ''
            })
        }
    }


    changeTypeSecond(event: any) {
        console.log("2222", event);
        if (event != undefined) {
            this.isCateId = event.id;
        }
    }

    setValue() {
        this.addGoodsModel.title = this.addForm.value.title;
        this.addGoodsModel.cate_id = this.isCateId;
        this.addGoodsModel.product_area = this.cityList[this.cityList.length - 1];
        this.addGoodsModel.goods_specs = this.addForm.value.specificationList;
        this.addGoodsModel.is_order = this.addForm.value.is_order;
        this.addGoodsModel.send_time = this.addGoodsModel.is_order == '1' ? format(new Date(this.addForm.value.send_time), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd');
        this.addGoodsModel.delivery_type = this.addForm.value.delivery_type;
        this.addGoodsModel.is_hot = this.addForm.value.is_hot;
        this.addGoodsModel.sort = this.addForm.value.sort;
        this.addGoodsModel.sales_note = this.addForm.value.sales_note;
    }






    updateTab() {
        this.setValue();
        // 验证表单
        for (const i in this.addForm.controls) {
            this.addForm.controls[i].markAsDirty();
            this.addForm.controls[i].updateValueAndValidity();
        }
        console.log(this.addForm.valid);
        if (this.addForm.valid) {
            this.isLoadingBtn = true;
            this.addGoodsModel.id = this.addDataDetailModel.id;
            this.addGoodsModel.step = 0;
            this.storeGoodsService.updateGoods(this.addGoodsModel).subscribe(res => {
                this.isLoadingBtn = false;

            })

        }
        else {
            this.isLoadingBtn = false;
        }

    }



    changePresell(data: any) {
        // 预售
        if (data == 1) {
            this.addForm?.controls['send_time'].setValidators([Validators.required]);
            this.addForm?.controls['send_time'].updateValueAndValidity();
            this.isShow = true;
            return;
        }
        else {
            this?.addForm?.controls['send_time'].setValidators(null);
            this.isShow = false;
            return;
        }
    }
}


