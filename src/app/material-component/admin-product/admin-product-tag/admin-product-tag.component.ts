import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminProductTagService } from '../../../../services/admin/admin-product-tag.service';
import { AdminDeleteComponent } from '../../admin-common/admin-delete/admin-delete.component';
import { AdminProductTagCreateComponent } from './admin-product-tag-create/admin-product-tag-create.component';
import { AdminProductTagDetailComponent } from './admin-product-tag-detail/admin-product-tag-detail.component';



@Component({
    selector: 'app-admin-product-tag',
    templateUrl: './admin-product-tag.component.html',
    styleUrls: ['./admin-product-tag.component.css']
})
export class AdminProductTagComponent implements OnInit {
    searchForm!: FormGroup;
    page = 1;
    per_page = 10;
    total: any;
    cate_id: any;
    status: any;
    name: any;
    dataSource = [];
    loading = true;
    sortList: any[] = [];


    constructor(public fb: FormBuilder, public dialog: MatDialog, private modal: NzModalService,
        public adminProductTagService: AdminProductTagService,) {
        this.searchForm = fb.group({
            cate_id: [''],
            status: [''],
            name: ['']
        });
    }


    ngOnInit(): void {
        this.adminProductTagService.getProdectCateList().subscribe((result: any) => {
            console.log("分类的结果", result.data);
            let a = { label: result.data[0].name, value: result.data[0].name, id: parseInt(result.data[0].id) };
            console.log("aaaa", a)
            this.sortList.push(a);
            let b = { label: result.data[1].name, value: result.data[1].name, id: parseInt(result.data[1].id) };
            this.sortList.push(b);
            this.getData();
        });

    }

    getData(): void {
        this.loading = true;
        this.adminProductTagService.getProductTagList(this.page, this.per_page, this.cate_id, this.name, this.status).subscribe((result: any) => {
            console.log("jieguo", result);
            this.loading = false;  //总页数
            this.dataSource = result.data;
            this.total = result.total;
        });
    };

    changePageIndex(page: number) {
        console.log("当前页", page);
        this.page = page;
        this.getData();
    }
    changePageSize(per_page: number) {
        console.log("一页显示多少", per_page);
        this.per_page = per_page;
        this.getData();
    }


    search() {
        this.cate_id = this.searchForm.value.cate_id;
        this.name = this.searchForm.value.name;
        this.status = this.searchForm.value.status;
        this.page = 1;

        this.getData();

    }



    edit(data: any) {
        const editmodal = this.modal.create({
            nzTitle: '修改',
            nzContent: AdminProductTagDetailComponent,
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
            this.getData();
        })
    }



    addTag() {
        const addmodal = this.modal.create({
            nzTitle: '添加',
            nzContent: AdminProductTagCreateComponent,
            nzFooter: [
                {
                    label: '添加',
                    type: 'primary',
                    onClick: componentInstance => {
                        componentInstance?.addProductTag()

                    }
                }
            ]
        })
        addmodal.afterClose.subscribe(res => {
            this.getData();
        })

    }


    // AdminDeleteComponent

    delete(data: any) {
        const dialogRef = this.dialog.open(AdminDeleteComponent, {
            width: '500px'
        })
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result !== undefined) {
                console.log("传的值", data);
                this.adminProductTagService.deleteProductTag(data.id).subscribe(res => {
                    if (res?.status_code) {
                        // alert("删除失败");
                        this.getData();
                    }
                    else {
                        alert("删除成功");
                        // this.getData();
                        this.getData();
                    }
                })
            }
        })
    }


    // 重置
    reset() {
        this.searchForm.patchValue({
            status: '',
            cate_id: '',
            name: '',
        });
    }
}


