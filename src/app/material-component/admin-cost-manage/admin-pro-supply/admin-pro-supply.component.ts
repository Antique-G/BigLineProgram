import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminProSupplyCreateComponent } from './admin-pro-supply-create/admin-pro-supply-create.component';
import { AdminProSupplyDetailComponent } from './admin-pro-supply-detail/admin-pro-supply-detail.component';
import { AdminCostService } from '../../../../services/admin/admin-cost.service';


@Component({
    selector: 'app-admin-pro-supply',
    templateUrl: './admin-pro-supply.component.html',
    styleUrls: ['./admin-pro-supply.component.css']
})
export class AdminProSupplyComponent implements OnInit {
    searchForm!: FormGroup;
    dataSource: any[] = [];   // 1.4将数据添加到dataSource
    loading = true;
    page = 1;
    per_page = 20;
    total = 1;
    status: any;
    supplier_name: any;
    setQuery: any;


    constructor(public fb: FormBuilder, private modal: NzModalService, public adminCostService: AdminCostService) {
        this.searchForm = this.fb.group({
            status: [''],
            supplier_name: [''],
        });
    }

    ngOnInit(): void {
        // 将上次查询的筛选条件赋值
        const getSeatch = JSON.parse(localStorage.getItem('adminCostListSearch')!);
        this.status = getSeatch?.status ? getSeatch.status : '';
        this.supplier_name = getSeatch?.supplier_name ? getSeatch.supplier_name : '';
        this.searchForm.patchValue({
            status: this.status,
            supplier_name: this.supplier_name,
        });

        this.getList();
    }


    getList() {
        this.loading = true;
        this.adminCostService.getSupplyList(this.page, this.per_page, this.status, this.supplier_name).subscribe(res => {
            console.log('1212', res);
            this.loading = false;
            this.dataSource = res?.data?.data;
            this.total = res?.data?.total;   // 总页数
        });
    }

    changePageSize(per_page: number) {
        this.per_page = per_page;
        this.getList();
    }

    changePageIndex(page: number) {
        console.log('当前页', page);
        this.page = page;
        // 筛选条件存进cookie
        this.setQuery = {
            status: this.status, supplier_name: this.supplier_name,
        };
        localStorage.setItem('adminCostListSearch', JSON.stringify(this.setQuery));
        this.getList();
    }


    search() {
        this.status = this.searchForm.value.status;
        this.supplier_name = this.searchForm.value.supplier_name;
        // 筛选条件存进cookie
        this.setQuery = {
            status: this.status, supplier_name: this.supplier_name,
        };
        localStorage.setItem('adminCostListSearch', JSON.stringify(this.setQuery));
        this.getList();

    }

    // 重置
    reset() {
        this.searchForm.patchValue({
            status: '',
            supplier_name: '',
        });
    }



    edit(data: any) {
        const editmodal = this.modal.create({
            nzTitle: '修改',
            nzContent: AdminProSupplyDetailComponent,
            nzComponentParams: {
                data
            },
            nzFooter: [
                {
                    label: '提交',
                    type: 'primary',
                    onClick: componentInstance => {
                        componentInstance?.update();
                    }
                }
            ]
        });
        editmodal.afterClose.subscribe(res => {
            this.getList();
        });
    }




    add() {
        const addmodal = this.modal.create({
            nzTitle: '添加',
            nzContent: AdminProSupplyCreateComponent,
            nzFooter: [
                {
                    label: '添加',
                    type: 'primary',
                    onClick: componentInstance => {
                        componentInstance?.add();

                    }
                }
            ]
        });
        addmodal.afterClose.subscribe(res => {
            this.getList();
        });

    }
}
