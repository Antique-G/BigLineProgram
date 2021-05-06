import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminRegionService } from '../../../../services/admin/admin-region.service';
import { AdminDetailModel, UpdateRequestModel } from '../../../../interfaces/adminAdmin/admin-admin-model';
import { AdminAdminService } from '../../../../services/admin/admin-admin.service';
import { AdminStoreManageService } from '../../../../services/admin/admin-store-manage.service';
import { AdminRoleService } from '../../../../services/admin/admin-role.service';



@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.css']
})
export class AdminDetailComponent implements OnInit {
  addForm!: FormGroup;
  adminDetailModel: AdminDetailModel;
  updateRequestModel: UpdateRequestModel;
  @Input() data: any;

  validationMessage: any = {
    account: {
      'maxlength': '用户名长度最多为32个字符',
      'required': '请输入用户名！'
    },
    name: {
      'maxlength': '真实姓名长度最多为32个字符',
      'required': '请输入真实姓名！'
    },
    phoneNumber: {
      'isNumber': '请输入非零的正整数',
      'required': '请输入您的手机号！'
    },
  };
  formErrors: any = {
    account: '',
    name: '',
    phoneNumber: '',
  };

  listDataMap: any;
  statussss: any;

  
  listOfOption: string[] = [];
  listOfTagOptions: any[] = [];



  // 城市
  nzOptions: any[] | null = null;
  destinationPalce: any[] = [];
  isCity: any[] = [];

  constructor(public fb: FormBuilder, public adminRegionService: AdminRegionService,
    public adminAdminService: AdminAdminService, public adminStoreManageService: AdminStoreManageService, public adminRoleService:AdminRoleService ) {
    this.adminDetailModel = this.data;
    this.forms();
    this.updateRequestModel = {
      real_name: '',
      mobile: '',
      status: '',
      staff_type: '',
      region_code: '',
      role_id: '',
    }
  }


  forms() {
    this.addForm = this.fb.group({
      account: ['', [Validators.required]],
      name: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      status: ['', [Validators.required]],
      staff_type: ['', [Validators.required]],
      region_code: ['', [Validators.required]],
      role_id: [[], [Validators.required]],
    });
    // 每次表单数据发生变化的时候更新错误信息
    this.addForm.valueChanges.subscribe(data => {
      this.onValueChanged(data);
    });
    // 初始化错误信息
    this.onValueChanged();
  }

  // 表单验证
  onValueChanged(data?: any) {
    // 如果表单不存在则返回
    if (!this.addForm) return;
    // 获取当前的表单
    const form = this.addForm;
    // 遍历错误消息对象
    for (const field in this.formErrors) {
      // 清空当前的错误消息
      this.formErrors[field] = '';
      // 获取当前表单的控件
      const control: any = form.get(field);
      // 当前表单存在此空间控件 && 此控件没有被修改 && 此控件验证不通过
      if (control && !control.valid) {
        // 获取验证不通过的控件名，为了获取更详细的不通过信息
        const messages = this.validationMessage[field];
        // 遍历当前控件的错误对象，获取到验证不通过的属性
        for (const key in control.errors) {
          // 把所有验证不通过项的说明文字拼接成错误消息
          this.formErrors[field] = messages[key];
        }
      }
    }
  }



  setValue() {
    this.updateRequestModel.real_name = this.addForm.value.name;
    this.updateRequestModel.mobile = this.addForm.value.phoneNumber;
    this.updateRequestModel.status = this.addForm.value.status;
    this.updateRequestModel.staff_type = this.addForm.value.staff_type;
    this.updateRequestModel.region_code = this.isCity;
    this.updateRequestModel.role_id = this.addForm.value.role_id;
  }


  ngOnInit(): void {
    this.adminStoreManageService.storeManageList(1, 50, 1, '', '').subscribe(res => {
      console.log('res :>> ', res);
      this.listDataMap = res?.data;
      this.adminRegionService.getAllRegionList().subscribe(res => {
        this.nzOptions = res;
      })
    })
    this.adminDetailModel = this.data;
    console.log('this.data :>> ', this.data);
    this.statussss = this.adminDetailModel?.shop_id;
    console.log(' this.statussss :>> ', this.statussss, typeof (this.statussss));
    // 区域
    const strDest = this.adminDetailModel.region_code;
    for (let i = 0; i < strDest.length / 4; i++) {
      let temp = this.destinationPalce[i] || '' + strDest.substr(0, 4 * (i + 1))
      this.destinationPalce.push(temp);
    }
    this.addForm.get('region_code')?.setValue(this.destinationPalce);   //区域

    this.roleData();
  }

  roleData(){
    this.adminRoleService.roleList(1, 50,'',).subscribe((result: any) => {  
      this.listOfOption = result.data   //角色选项
      this.listOfOption =this.listOfOption .filter((item:any) => item.status == 1);
    })
    let roleId:any[] = [];
    for (let i of this.data.role){
      roleId.push(i.id)
    }
    console.log('roleIdroleIdroleId',roleId)
    this.listOfTagOptions = roleId;
  }

  // 城市
  onDestChange(values: any): void {
    console.log("点击的结果是", values);
    if (values !== null) {
      this.isCity = values[values.length - 1];
    }
  }




  update() {
    console.log("this.adminDetaiupdateRequestModellModel", this.updateRequestModel);
    this.setValue();
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {
      this.updateRequestModel.admin_id = this.adminDetailModel.admin_id;
      this.adminAdminService.updateUser(this.updateRequestModel).subscribe(res => {
        console.log("res", res);
        if (res === null) {
          // alert("更新成功");

        }
        else {
          // alert("更新失败");
        }
      })
    }
  }
}
