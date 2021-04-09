import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, } from "@angular/forms";
import { AdminInsuranceCreateRequestModel } from "../../../../interfaces/adminInsurance/admin-insurance-model";
import { AdminInsuranceService } from "../../../../services/admin/admin-insurance.service";

@Component({
  selector: "app-admin-insurance-create",
  templateUrl: "./admin-insurance-create.component.html",
  styleUrls: ["./admin-insurance-create.component.css"],
})
export class AdminInsuranceCreateComponent implements OnInit {
  validateForm!: FormGroup;
  adminInsuranceCreateRequestModel: AdminInsuranceCreateRequestModel;
  status = '1';


  validationMessage: any = {
    code: {
      maxlength: "保险产品方案代码长度最多为20个字符",
      required: "请输入保险产品方案代码！",
    },
    name: {
      maxlength: "保险名称长度最多为32个字符",
      required: "请输入保险名称！",
    },
    insurance_amount: {
      required: "请输入保额！",
    },
    article: {
      required: "请输入保险条款！",
    }
  };
  
  formErrors: any = {
    name: '',
    code: '',
    insurance_amount: '',
    article: '',
  };
  


  constructor(private fb: FormBuilder, private adminInsuranceService: AdminInsuranceService) {
    this.forms();
    this.adminInsuranceCreateRequestModel = {
      name: "",
      insured_date: [],
      status: 1,
      code: "",
      insurance_amount: "",
      article: "",
    };
  }


  forms() {
    this.validateForm = this.fb.group({
      name: new FormControl(null, [Validators.required, Validators.maxLength(32)]),
      code: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      insured_date: new FormArray([new FormControl(null, [Validators.required, Validators.min(0)])]),
      insurance_amount: new FormControl(null, [Validators.required]),
      article: new FormControl(null, [Validators.required]),
      status: new FormControl('1'),
    });
    // 每次表单数据发生变化的时候更新错误信息
    this.validateForm.valueChanges.subscribe((data) => {
      this.onValueChanged(data);
    });
    // 初始化错误信息
    this.onValueChanged();
  }


  // 表单验证
  onValueChanged(data?: any) {
    // 如果表单不存在则返回
    if (!this.validateForm) return;
    // 获取当前的表单
    const form = this.validateForm;
    // 遍历错误消息对象
    for (const field in this.formErrors) {
      // 清空当前的错误消息
      this.formErrors[field] = "";
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


  ngOnInit(): void { }

  get insuredDateArray() {
    return this.validateForm.get("insured_date") as FormArray;
  }

  //添加
  add() {
    this.insuredDateArray.push(new FormControl(null, [Validators.required, Validators.min(0),]));
  }

  //删除
  remove(index: number) {
    if (this.insuredDateArray.length > 1) {
      this.insuredDateArray.removeAt(index);
    }
  }

  setValue() {
    let dataList = this.validateForm.value.insured_date;
    dataList.forEach((value: any, index: any) => {
      if (dataList.length > 1) {
        if (value == null || value == "" || value == "0") {
          this.insuredDateArray.removeAt(index);
        }
      }
    });
    this.adminInsuranceCreateRequestModel.name = this.validateForm.value.name;
    this.adminInsuranceCreateRequestModel.code = this.validateForm.value.code;
    this.adminInsuranceCreateRequestModel.insurance_amount = this.validateForm.value.insurance_amount;
    this.adminInsuranceCreateRequestModel.article = this.validateForm.value.article;
    this.adminInsuranceCreateRequestModel.status = this.validateForm.value.status;
    this.adminInsuranceCreateRequestModel.insured_date = this.validateForm.value.insured_date;
  }



  submitForm(): void {
    this.setValue();
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log("提交结果", this.adminInsuranceCreateRequestModel);
    if (this.validateForm.valid) {
      this.adminInsuranceService.addAdminInsurance(this.adminInsuranceCreateRequestModel).subscribe((res) => {
        console.log("jieguo", res);
        if (res === null) { }
        else { }
      }
      );
    }
  }
}
