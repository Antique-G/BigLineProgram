import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminGoodsService } from '../../../../services/admin/admin-goods.service';
import { AdminGoodsCateAddComponent } from './admin-goods-cate-add/admin-goods-cate-add.component';
import { AdminGoodsCateEditComponent } from './admin-goods-cate-edit/admin-goods-cate-edit.component';


@Component({
    selector: 'app-admin-goods-cate',
    templateUrl: './admin-goods-cate.component.html',
    styleUrls: ['./admin-goods-cate.component.css']
})
export class AdminGoodsCateComponent implements OnInit {
    searchForm: FormGroup;
    dataSource: any;   //1.4将数据添加到dataSource
    loading = true;
    page = 1;
    per_page = 20;
    total = 1;
    status: any;
    name: any;
    pid = 0;
    isParent: boolean = true;
    isParentName: any;

    constructor(public fb: FormBuilder, public adminGoodsService: AdminGoodsService,
        private modal: NzModalService) {
        this.searchForm = fb.group({
            status: [''],
            name: ['']
        })
    }

    ngOnInit(): void {
        this.cateList();
    }


    cateList() {
        this.adminGoodsService.cateList(this.page, this.per_page, this.status, this.name, this.pid).subscribe(res => {
            console.log("结果是", res.data);
            this.loading = false;
            this.dataSource = res?.data?.data;
            this.total = res?.data?.total;
        })
    }

    setValue() {
        this.status = this.searchForm.value.status;
        this.name = this.searchForm.value.name;
    }

    search() {
        this.setValue();
        this.page = 1;
        this.cateList();
    }


    changePageSize(per_page: number) {
        this.per_page = per_page;
        this.cateList();
    }

    changePageIndex(page: number) {
        console.log("当前页", page);
        this.page = page;
        this.cateList();
    }


    reset() {
        this.searchForm.patchValue({
            status: '',
            name: '',
        })
    }



    add() {
        const addmodal = this.modal.create({
            nzTitle: '添加分类',
            nzContent: AdminGoodsCateAddComponent,
            nzComponentParams: {
                data: {
                    isParent: this.isParent,
                    pid:this.pid
                }
            },
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
            this.cateList();
        })
    }



    edit(data: any) {
        const editmodal = this.modal.create({
            nzTitle: '编辑分类',
            nzContent: AdminGoodsCateEditComponent,
            nzComponentParams: {
                data: {
                    detail:data,
                    isParent: this.isParent,
                    pid:this.pid
                }
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
            this.cateList();
        })
    }







    nextLevel(element: any) {
        let id = element?.id;
        this.pid = id;
        this.page = 1;
        this.isParentName = element?.name;
        this.cateList();
        this.isParent = false;
    }


    // 返回父级
    backToUp() {
        this.pid =0;
        this.page = 1;
        this.cateList();
        this.isParent = true;
    }
}
