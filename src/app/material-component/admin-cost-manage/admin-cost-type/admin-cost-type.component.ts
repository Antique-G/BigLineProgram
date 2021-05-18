import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminCostTypeCreateComponent } from './admin-cost-type-create/admin-cost-type-create.component';
import { AdminCostTypeDetailComponent } from './admin-cost-type-detail/admin-cost-type-detail.component';


@Component({
    selector: 'app-admin-cost-type',
    templateUrl: './admin-cost-type.component.html',
    styleUrls: ['./admin-cost-type.component.css']
})
export class AdminCostTypeComponent implements OnInit {
    searchForm!: FormGroup;
    dataSource: any[] = [];   //1.4将数据添加到dataSource
    loading = true;
    page = 1;
    per_page = 20;
    total = 1;
    status: any;
    title: any;
    setQuery: any;

    constructor(public fb: FormBuilder, private modal: NzModalService,) {
        this.searchForm = this.fb.group({
            status: [''],
            title: [''],
        })
    }

    ngOnInit(): void {
    }


    getList() {

    }

    changePageSize(per_page: number) {
        this.per_page = per_page;
        this.getList();
    }

    changePageIndex(page: number) {
        console.log("当前页", page);
        this.page = page;
        // 筛选条件存进cookie
        this.setQuery = {
            status: this.status, title: this.title,
        }
        localStorage.setItem('adminCostListSearch', JSON.stringify(this.setQuery));
        this.getList();
    }


    search() {
        this.status = this.searchForm.value.status;
        this.title = this.searchForm.value.title;

        // 筛选条件存进cookie
        this.setQuery = {
            status: this.status, title: this.title,
        }
        localStorage.setItem('adminCostListSearch', JSON.stringify(this.setQuery));
        this.getList();

    }

    // 重置
    reset() {
        this.searchForm.patchValue({
            status: '',
            title: '',

        });

    }


    edit(data: any) {
        const editmodal = this.modal.create({
            nzTitle: '修改',
            nzContent: AdminCostTypeDetailComponent,
            nzComponentParams: {
                data: data
            },
            nzFooter: [
                {
                    label: '提交',
                    onClick: componentInstance => {
                        componentInstance?.update()
                    }
                }
            ]
        })
        editmodal.afterClose.subscribe(res => {
            this.getList();
        })
    }



    add() {
        const addmodal = this.modal.create({
            nzTitle: '添加',
            nzContent: AdminCostTypeCreateComponent,
            nzFooter: [
                {
                    label: '添加',
                    type: 'primary',
                    onClick: componentInstance => {
                        componentInstance?.add()

                    }
                }
            ]
        })
        addmodal.afterClose.subscribe(res => {
            this.getList();
        })

    }

}
