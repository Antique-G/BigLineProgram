import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StoreCostTypeCreateComponent } from './store-cost-type-create/store-cost-type-create.component';
import { StoreCostTypeDetailComponent } from './store-cost-type-detail/store-cost-type-detail.component';
import { StoreCostService } from '../../../../services/store/store-cost/store-cost.service';


@Component({
    selector: 'app-store-cost-type',
    templateUrl: './store-cost-type.component.html',
    styleUrls: ['./store-cost-type.component.css']
})
export class StoreCostTypeComponent implements OnInit {
    searchForm!: FormGroup;
    dataSource: any[] = [];   // 1.4将数据添加到dataSource
    loading = true;
    page = 1;
    per_page = 20;
    total = 1;
    status: any;
    setQuery: any;

    constructor(public fb: FormBuilder, private modal: NzModalService, public storeCostService: StoreCostService) {
        this.searchForm = this.fb.group({
            status: [''],
        });
    }

    ngOnInit(): void {
        // 将上次查询的筛选条件赋值
        const getSeatch = JSON.parse(localStorage.getItem('adminTypeSearch')!);
        this.status = getSeatch?.status ? getSeatch?.status : '';
        this.searchForm.patchValue({
            status: this.status
        });
        this.getList();
    }


    getList() {
        this.loading = true;
        this.storeCostService.getTypeList(this.page, this.per_page, this.status).subscribe(res => {
            console.log('jieguoshi', res);
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
            status: this.status, page: this.page
        };
        localStorage.setItem('adminTypeSearch', JSON.stringify(this.setQuery));
        this.getList();
    }


    search() {
        this.status = this.searchForm.value.status;
        // 筛选条件存进cookie
        this.setQuery = {
            status: this.status, page: this.page
        };
        localStorage.setItem('adminTypeSearch', JSON.stringify(this.setQuery));
        this.getList();

    }

    // 重置
    reset() {
        this.searchForm.patchValue({
            status: '',
        });

    }


    edit(data: any) {
        const editmodal = this.modal.create({
            nzTitle: '修改',
            nzContent: StoreCostTypeDetailComponent,
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
            nzContent: StoreCostTypeCreateComponent,
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



    // 删除
    delete(data: any) {
        console.log('nadao', data);
        this.modal.confirm({
            nzTitle: '<h4>提示</h4>',
            nzContent: '<h6>是否要进行删除操作？</h6>',
            nzOnOk: () =>
                this.storeCostService.deleteType(data.id).subscribe(res => {
                    this.getList();
                })
        });
    }
}
