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
    isParentName: any;
    level: any;
    oldPid: any;
    oldParentName: any;

    constructor(public fb: FormBuilder, public adminGoodsService: AdminGoodsService,
        private modal: NzModalService) {
        this.searchForm = fb.group({
            status: [''],
            name: ['']
        })
    }

    ngOnInit(): void {
        this.cateList();
        // 初始化等级为1级
        this.level = 1;
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
        if (element.level == 1) {
            this.oldParentName = element.name;
        }
        console.log("22222",element)
        this.reset();
        this.name = '';
        this.oldPid = element.pid;
        let id = element?.id;
        this.pid = id;
        this.page = 1;
        this.isParentName = element?.name;
        this.cateList();
        this.level = Number(element?.level)+1;
    }


    // 返回父级
    backToUp() {
        console.log("等级", this.level);
        this.page = 1;
        this.pid = this.oldPid;
        this.level = Number(this.level)-1;
        this.cateList();
    }


    backToFirst() {
        this.level = 1;
        this.page = 1;
        this.pid = 0;
        this.cateList();
    }
}
