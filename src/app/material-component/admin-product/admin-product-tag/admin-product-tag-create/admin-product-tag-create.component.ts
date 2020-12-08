import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, } from '@angular/material/dialog';
import { AdminProductTagComponent } from '../admin-product-tag.component';
import { AdminProductTagService } from '../../../../../services/admin/admin-product-tag.service';
import { AddAdminProductTagRequestModel } from '../../../../../interfaces/adminProduct/ProductTagModel';


@Component({
  selector: 'app-admin-product-tag-create',
  templateUrl: './admin-product-tag-create.component.html',
  styleUrls: ['./admin-product-tag-create.component.css']
})
export class AdminProductTagCreateComponent implements OnInit {
  addForm: FormGroup;
  statusValue = 2;
  addAdminProductTagRequestModel: AddAdminProductTagRequestModel;
  optionList: any[] = [];


  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<AdminProductTagComponent>,
    public adminProductTagService: AdminProductTagService) {

    this.addForm = fb.group({
      name: ['', [Validators.required]],
      cate_id: ['', Validators.required],
      status: [null, [Validators.required]]
    });
    this.addAdminProductTagRequestModel = {
      name: '',
      cate_id: 0,
      status: 0,
    }

  }

  ngOnInit(): void {
    this.getCateList();
  }


  setValue() {
    this.addAdminProductTagRequestModel.name = this.addForm.value.name;
    this.addAdminProductTagRequestModel.cate_id = this.addForm.value.cate_id;
    this.addAdminProductTagRequestModel.status = parseInt(this.addForm.value.status);
  }

  addProductTag() {
    this.setValue();
    this.adminProductTagService.createProductTag(this.addAdminProductTagRequestModel).subscribe(res => {
      console.log('分类的结果', res);
      if(res.status_code){
        alert("添加失败");
      }
      else{
        alert("添加成功");
        this.dialogRef.close(1);
      }
    })


  }


  // 分类
  getCateList() {
    this.adminProductTagService.getProdectCateList().subscribe(res => {
      console.log('分类的结果', res.data);
      let a = { label: res.data[0].name, value: res.data[0].name, id: parseInt(res.data[0].id)};
      console.log("aaaa", a)
      this.optionList.push(a);
      let b = { label: res.data[1].name, value: res.data[1].name, id: parseInt(res.data[1].id)};
      this.optionList.push(b);
      console.log("this.optionList", this.optionList);
    })
  }


  close() {
    this.dialogRef.close();
  }


  log(a:any): void {
    console.log('选择的值是', a);
    this.addAdminProductTagRequestModel.cate_id = a;
  }

}
