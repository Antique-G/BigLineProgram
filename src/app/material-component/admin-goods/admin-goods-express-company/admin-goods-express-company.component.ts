import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminGoodsService } from 'services/admin/admin-goods.service';
import { AdminGoodsExpressCompanyCreateComponent } from './admin-goods-express-company-create/admin-goods-express-company-create.component';


@Component({
    selector: 'app-admin-goods-express-company',
    templateUrl: './admin-goods-express-company.component.html',
    styleUrls: ['./admin-goods-express-company.component.css']
})
export class AdminGoodsExpressCompanyComponent implements OnInit {
    searchForm: FormGroup;
    dataSource: any;   //1.4将数据添加到dataSource
    loading = true;
    page = 1;
    per_page = 20;
    total = 1;
    status: any;
    name: any;

    constructor(public fb: FormBuilder, public adminGoodsService: AdminGoodsService,
        private modal: NzModalService) {
        this.searchForm = fb.group({
            status: [''],
            name: ['']
        })
    }

    ngOnInit(): void {
        this.getList();
    }

    getList() {
        this.adminGoodsService.expressCompanyList(this.page, this.per_page, this.status, this.name).subscribe(res => {
            this.loading = false;
            this.dataSource = res?.data;
            this.total = res?.total;
            console.log("1231", res)
        })
    }

    setValue() {
        this.status = this.searchForm.value.status;
        this.name = this.searchForm.value.name;
    }

    search() {
        this.setValue();
        this.page = 1;
        this.getList();
    }


    changePageSize(per_page: number) {
        this.per_page = per_page;
        this.getList();
    }

    changePageIndex(page: number) {
        console.log("当前页", page);
        this.page = page;
        this.getList();
    }


    reset() {
        this.searchForm.patchValue({
            status: '',
            name: '',
        })
    }


    add() {
        const addmodal = this.modal.create({
            nzTitle: '添加快递公司',
            nzContent: AdminGoodsExpressCompanyCreateComponent,
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



    edit(data: any) {
        const editmodal = this.modal.create({
            nzTitle: '编辑',
            nzContent: AdminGoodsExpressCompanyCreateComponent,
            nzComponentParams: {
                data: data
            },
            nzFooter: [
                {
                    label: '提交',
                    type: 'primary',
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
}
