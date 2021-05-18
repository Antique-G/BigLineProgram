import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-store-request-money',
    templateUrl: './store-request-money.component.html',
    styleUrls: ['./store-request-money.component.css']
})
export class StoreRequestMoneyComponent implements OnInit {
    searchForm: FormGroup;
    status: any;
    group_id: any;
    supply_name: any;
    date_starts: any;
    dataSource: any;
    page = 1;
    per_page = 20;
    total = 1;
    loading = true;
    setQuery: any;

    constructor(public fb: FormBuilder, ) {
        this.searchForm = fb.group({
            status: [''],
            group_id: [''],
            supply_name: [''],
            date_starts: [''],
        });
    }

    ngOnInit(): void {
    }



    getList() {

    }

    search() {
        this.status = this.searchForm.value.status;
        this.group_id = this.searchForm.value.group_id;
        this.supply_name = this.searchForm.value.supply_name;
        this.date_starts = this.searchForm.value.date_starts;


        // 筛选条件存进cookie
        this.setQuery = {
            status: this.status, group_id: this.group_id, supply_name: this.supply_name,
            date_starts: this.date_starts
        };
        localStorage.setItem('requestSearch', JSON.stringify(this.setQuery));
    }




    changePageIndex(page: number) {
        console.log('当前页', page);
        this.page = page;
        // 筛选条件存进cookie
        this.setQuery = {
            status: this.status, group_id: this.group_id, supply_name: this.supply_name,
            date_starts: this.date_starts
        };
        localStorage.setItem('requestSearch', JSON.stringify(this.setQuery));
        this.getList();
    }


    changePageSize(per_page: number) {
        console.log('一页显示多少', per_page);
        this.per_page = per_page;
        this.getList();
    }







    reset() {
        this.searchForm.patchValue({
            status: '',
            group_id: '',
            supply_name: '',
            date_starts: null,
        });
    }
}
