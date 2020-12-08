import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { AdminProductTagService } from '../../../../../services/admin/admin-product-tag.service';
import { AddAdminProductTagRequestModel, Datum, UpdateAdminProductRequestModel } from '../../../../../interfaces/adminProduct/ProductTagModel';


@Component({
  selector: 'app-admin-product-tag-detail',
  templateUrl: './admin-product-tag-detail.component.html',
  styleUrls: ['./admin-product-tag-detail.component.css']
})
export class AdminProductTagDetailComponent implements OnInit {
  detailModel: Datum;
  updateAdminProductRequestModel: UpdateAdminProductRequestModel;
  addForm: FormGroup;
  optionList: any[] = [];
  selectedValue: any;


  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<AdminProductTagDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public adminProductTagService: AdminProductTagService) {
    this.detailModel = this.data;
    this.selectedValue = this.detailModel.cate_id;
    this.addForm = fb.group({
      name: [this.detailModel.name, [Validators.required]],
      cate_id: [this.detailModel.cate_id, Validators.required],
      status: [this.detailModel.status, [Validators.required]]
    });

    this.updateAdminProductRequestModel = {
      name: '',
      cate_id: 0,
      status: 0,
    }

  }

  ngOnInit(): void {
    this.selectedValue = this.detailModel.cate_id;
    this.getCateList();
  }


  setValue() {
    this.updateAdminProductRequestModel.name = this.addForm.value.name;
    this.updateAdminProductRequestModel.cate_id = this.addForm.value.cate_id;
    this.updateAdminProductRequestModel.status = this.addForm.value.status;
  }

  update() {
    this.setValue();
    this.updateAdminProductRequestModel.id = this.detailModel.id;
    this.adminProductTagService.updateProductTag(this.updateAdminProductRequestModel).subscribe(res => {
      console.log('分类的结果', res);
      if (res.status_code) {
        alert("更新失败");
      }
      else {
        alert("更新成功");
        this.dialogRef.close(1);
      }
    })


  }


  // 分类
  getCateList() {
    this.adminProductTagService.getProdectCateList().subscribe(res => {
      console.log('分类的结果', res.data);
      let a = { label: res.data[0].name, value: res.data[0].name, id: parseInt(res.data[0].id) };
      console.log("aaaa", a)
      this.optionList.push(a);
      let b = { label: res.data[1].name, value: res.data[1].name, id: parseInt(res.data[1].id) };
      this.optionList.push(b);
      console.log("this.optionList", this.optionList);
    })
  }


  close() {
    this.dialogRef.close();
  }


  log(a: any): void {
    console.log('选择的值是', a);
    this.updateAdminProductRequestModel.cate_id = a;
  }

}
