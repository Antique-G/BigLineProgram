import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminOrderGroupTravelService } from '../../../services/admin/admin-order-group-travel.service';
import { AdminRegionService } from '../../../services/admin/admin-region.service';

@Component({
    selector: 'app-admin-group-add-order',
    templateUrl: './admin-group-add-order.component.html',
    styleUrls: ['./admin-group-add-order.component.css']
})
export class AdminGroupAddOrderComponent implements OnInit {
    searchForm: FormGroup;
    dataSource: any;
    page = 1;
    per_page = 20;
    total = 1;
    loading = true;
    title: any;
    departure_start: any;
    departure_end: any;
    departure_city: any;
    destination_city: any;
    few_days: any;
    date = null;

    // 目的城市
    nzOptions: any[] | null = null;
    idRegion: any;
    isDeparture_city: any;
    isDestination_city: any;
    sortName: any;
    sortValue: any;
    sort_field = 'minimum_price';
    sort: any;


    setQuery: any;
    code: any;
    dateArray: any[] = [];

    constructor(public fb: FormBuilder, public router: Router, public adminRegionService: AdminRegionService,
        public adminOrderGroupTravelService: AdminOrderGroupTravelService, public modal: NzModalService,) {
        this.searchForm = fb.group({
            title: [''],
            dateStart: [''],
            departure_city: [''],
            destination_city: [''],
            few_days: [''],
            group_status: [''],
            code: [''],
        });
    }

    ngOnInit(): void {
        this.adminRegionService.getAllRegionList().subscribe(res => {
            this.nzOptions = res;
        })
        // 将上次查询的筛选条件赋值
        let getSeatch = JSON.parse(localStorage.getItem("adminAddGroupOrderSearch")!);
        this.title = getSeatch?.title ? getSeatch.title : '';
        this.departure_start = getSeatch?.departure_start ? getSeatch?.departure_start : null;
        this.departure_end = getSeatch?.departure_end ? getSeatch?.departure_end : null;
        this.departure_city = getSeatch?.departure_city ? getSeatch?.departure_city : '';
        this.destination_city = getSeatch?.destination_city ? getSeatch?.destination_city : '';
        this.few_days = getSeatch?.few_days ? getSeatch?.few_days : '';
        this.code = getSeatch?.code ? getSeatch?.code : '';
        this.page = getSeatch?.page ? getSeatch?.page : '';

        this.searchForm.patchValue({
            title: this.title,
            dateStart: this.departure_start == null ? [] : [this.departure_start, this.departure_end],
            departure_city: this.departure_city ? this.cityChange(this.departure_city) : '',
            destination_city: this.destination_city ? this.cityChange(this.destination_city) : '',
            few_days: this.few_days,
            code: this.code,
        })
        this.getPro();
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


    getPro() {
        this.adminOrderGroupTravelService.getPro(this.page, this.per_page, this.title, this.departure_start, this.departure_end, this.departure_city, this.destination_city, this.few_days, this.code).subscribe(res => {
            console.log('结果是 :>> ', res);
            this.loading = false;
            this.dataSource = res?.data;
            this.dataSource.forEach((value: any, index: any) => {
                value['expand'] = false; //展开属性
                // if (value.schedule_file_url != '') {
                //     let filePath = value.schedule_file_url;
                //     //获取最后一个.的位置
                //     let index = filePath.lastIndexOf(".");
                //     //获取后缀
                //     let ext = filePath.substr(index + 1);
                //     //输出结果
                //     console.log('1212121', ext, ext == 'doc', ext != 'pdf', ext == 'pdf');
                //     if (ext != 'pdf') {
                //         value.schedule_file_url = 'https://view.officeapps.live.com/op/view.aspx?src=' + value.schedule_file_url;
                //     }
                //     else {
                //         value.schedule_file_url = value.schedule_file_url;
                //     }
                // }
                // 行程文件若是doc为2或者docx为3的需要转化，pdf为1不需要转化
                if (value.schedule_file_url != '') {
                    if (value.schedule_file != 1) {
                        value.schedule_file_url = 'https://view.officeapps.live.com/op/view.aspx?src=' + value.schedule_file_url;
                    }
                    else {
                        value.schedule_file_url = value.schedule_file_url;
                    } 
                }
            })
            this.total = res?.total;
        })
    }


    setValue() {
        this.title = this.searchForm.value.title;
        console.log('this.searchForm.value.start_date :>> ', this.searchForm.value.start_date);
        this.departure_city = this.isDeparture_city;
        this.destination_city = this.isDestination_city;
        this.few_days = this.searchForm.value.few_days;
        this.code = this.searchForm.value.code;
        this.departure_start = this.dateArray[0];
        this.departure_end = this.dateArray[1];
        // 筛选条件存进cookie
        this.setQuery = {
            title: this.title, departure_start: this.departure_start, departure_end: this.departure_end, departure_city: this.departure_city,
            destination_city: this.destination_city, few_days: this.few_days, code: this.code, page: this.page
        }
        localStorage.setItem('adminAddGroupOrderSearch', JSON.stringify(this.setQuery));

    }


    changePageIndex(page: number) {
        console.log("当前页", page);
        this.page = page;
        // 筛选条件存进cookie
        this.setQuery = {
            title: this.title, departure_start: this.departure_start, departure_end: this.departure_end, departure_city: this.departure_city,
            destination_city: this.destination_city, few_days: this.few_days, code: this.code, page: this.page
        }
        localStorage.setItem('adminAddGroupOrderSearch', JSON.stringify(this.setQuery));
        this.getPro();
    }


    changePageSize(per_page: number) {
        console.log("一页显示多少", per_page);
        this.per_page = per_page;
        this.getPro();
    }


    anOrder(data: any) {
        this.router.navigate(['/admin/main/addGroupOrder/add'], { queryParams: { id: data.id } })
    }



    search() {
        this.loading = true;
        this.page = 1;
        this.setValue();

        this.adminOrderGroupTravelService.getPro(this.page, this.per_page, this.title, this.departure_start, this.departure_end, this.departure_city, this.destination_city, this.few_days, this.code).subscribe(res => {
            console.log('结果是 :>> ', res);
            this.loading = false;
            this.dataSource = res?.data;
            this.dataSource.forEach((value: any, index: any) => {
                value['expand'] = false; //展开属性
                if (value.schedule_file_url != '') {
                    let filePath = value.schedule_file_url;
                    //获取最后一个.的位置
                    let index = filePath.lastIndexOf(".");
                    //获取后缀
                    let ext = filePath.substr(index + 1);
                    //输出结果
                    console.log('1212121', ext, ext == 'doc', ext != 'pdf', ext == 'pdf');
                    if (ext != 'pdf') {
                        value.schedule_file_url = 'https://view.officeapps.live.com/op/view.aspx?src=' + value.schedule_file_url;
                    }
                    else {
                        value.schedule_file_url = value.schedule_file_url;
                    }
                }
            })
            this.total = res?.total;
        })
    }




    // 城市
    onChangesdestinationCity(data: any): void {
        console.log("点击的结果是", data);
        if (data !== null) {
            this.isDestination_city = data[data.length - 1];

        }
    }

    onChangesdepartureCity(data: any): void {
        console.log("点击的结果是", data);
        if (data !== null) {
            this.isDeparture_city = data[data.length - 1];
        }
    }


    // 出发日期
    onChangeDateOrder(event: any) {
        this.dateArray = [];
        const datePipe = new DatePipe('en-US');
        const myFormattedDate = datePipe.transform(event[0], 'yyyy-MM-dd');
        this.dateArray.push(myFormattedDate);
        const myFormattedDate1 = datePipe.transform(event[1], 'yyyy-MM-dd');
        this.dateArray.push(myFormattedDate1);
        console.log("event", this.dateArray);
    }

    sortAsc() {
        this.setValue();
        this.sort = 'asc';
        this.loading = true;
        this.adminOrderGroupTravelService.getPro(this.page, this.per_page, this.title, this.departure_start, this.departure_end, this.departure_city, this.destination_city, this.few_days, this.sort_field, this.sort, this.code).subscribe(res => {
            console.log('结果是 :>> ', res);
            this.loading = false;
            this.dataSource = res?.data;
            this.dataSource?.forEach((value: any) => {
                value['checked'] = false;
                value['expand'] = false; //展开属性
                if (value.schedule_file_url != '') {
                    let filePath = value.schedule_file_url;
                    //获取最后一个.的位置
                    let index = filePath.lastIndexOf(".");
                    //获取后缀
                    let ext = filePath.substr(index + 1);
                    //输出结果
                    console.log('1212121', ext, ext == 'doc', ext != 'pdf', ext == 'pdf');
                    if (ext != 'pdf') {
                        value.schedule_file_url = 'https://view.officeapps.live.com/op/view.aspx?src=' + value.schedule_file_url;
                    }
                    else {
                        value.schedule_file_url = value.schedule_file_url;
                    }
                }
            })
            this.total = res?.total;
        })
    }


    sortDesc() {
        this.setValue();
        this.sort = 'desc';
        this.loading = true;
        this.adminOrderGroupTravelService.getPro(this.page, this.per_page, this.title, this.departure_start, this.departure_end, this.departure_city, this.destination_city, this.few_days, this.sort_field, this.sort, this.code).subscribe(res => {
            console.log('结果是 :>> ', res);
            this.loading = false;
            this.dataSource = res?.data;
            this.dataSource?.forEach((value: any) => {
                value['checked'] = false;
                value['expand'] = false; //展开属性
                if (value.schedule_file_url != '') {
                    let filePath = value.schedule_file_url;
                    //获取最后一个.的位置
                    let index = filePath.lastIndexOf(".");
                    //获取后缀
                    let ext = filePath.substr(index + 1);
                    //输出结果
                    console.log('1212121', ext, ext == 'doc', ext != 'pdf', ext == 'pdf');
                    if (ext != 'pdf') {
                        value.schedule_file_url = 'https://view.officeapps.live.com/op/view.aspx?src=' + value.schedule_file_url;
                    }
                    else {
                        value.schedule_file_url = value.schedule_file_url;
                    }
                }
            })
            this.total = res?.total;
        })
    }




    onExpandChange(id: number, checked: boolean): void {
        console.log("点击的是", id, checked)
    }


    // 重置
    reset() {
        this.searchForm.patchValue({
            title: '',
            dateStart: '',
            departure_city: '',
            destination_city: '',
            few_days: '',
            group_status: '',
            code: '',
        });
    }

}
