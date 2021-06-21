import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreRegionService } from 'services/store/store-region/store-region.service';

@Component({
    selector: 'app-store-goods-pro',
    templateUrl: './store-goods-pro.component.html',
    styleUrls: ['./store-goods-pro.component.css']
})
export class StoreGoodsProComponent implements OnInit {
    searchForm: FormGroup;
    dataSource: any[] = [];   //1.4将数据添加到dataSource
    loading = true;
    page = 1;
    per_page = 20;
    total: any;

    // 城市
    nzOptions: any[] | null = null;


    firstLevelList: any;
    selectedFirst: any;
    selectedSecond: any;
    typeData: any;
    changeType1(event: any) { }
    //     //   selectedProvince = 'Zhejiang';
    //   selectedCity = 'Hangzhou';
    //   provinceData = ['Zhejiang', 'Jiangsu'];
    //   cityData: { [place: string]: string[] } = {
    //     Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
    //     Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang']
    //   };

    //   provinceChange(value: string): void {
    //     this.selectedCity = this.cityData[value][0];
    //   }



    constructor(public fb: FormBuilder, public storeRegionService: StoreRegionService, public router: Router,) {
        this.searchForm = this.fb.group({
            status: [''],
            checkStatus: [''],
            freeShipping: [''],
            name: [''],
            firstType: [''],
            secondType: [''],
            departure_city: [''],
        })
    }

    ngOnInit(): void {
        this.storeRegionService.getAllRegionList().subscribe(res => {
            this.nzOptions = res;
        })
    }



    search() {

    }



    changePageSize(per_page: number) {
        this.per_page = per_page;
        // this.getProductList();
    }

    changePageIndex(page: number) {
        console.log("当前页", page);
        this.page = page;
        // 筛选条件存进cookie
        // this.setQuery = {
        //     status: this.status, check_status: this.checkStatus, title: this.title,
        //     code: this.code, few_days: this.few_days, tag: this.tag,
        //     page: this.page, operation_id: this.operation_id,
        //     departure_city: this.departure_city, destination_city: this.destination_city
        // }
        // localStorage.setItem('storeGroupSearch', JSON.stringify(this.setQuery));
        // this.getProductList();
    }


    // 产地
    onChanges(data: any) {

    }

    reset() {

    }



    // 添加
    
    addStep() {
        this.router.navigate(['/store/main/storeGoods/create']);
    }
}
