import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNumber } from '../../../../app/util/validators';
import { DataDetailStoreAccountResponseModel, StoreAccountDetailUpdateRequestModel } from '../../../../interfaces/adminStoreAccount/admin-store-account-model';
import { AdminStoreAccountService } from './../../../../services/admin/admin-store-account.service';


@Component({
    selector: 'app-admin-store-account-detail',
    templateUrl: './admin-store-account-detail.component.html',
    styleUrls: ['./admin-store-account-detail.component.css']
})

export class AdminStoreAccountDetailComponent implements OnInit {
    detaileForm!: FormGroup;  //1.1使用form表单时需要实例化一个FormGroup
    status = 3;
    storeAccountDetailUpdateRequestModel: StoreAccountDetailUpdateRequestModel;
    dataDetailStoreAccountResponseModel: DataDetailStoreAccountResponseModel;


    validationMessage: any = {
        name: {
            'maxlength': '姓名长度最多为64个字符',
            'required': '请输入姓名！'
        },
        password: {
            'maxlength': '密码长度最多为16个字符',
            'required': '请输入密码！'
        },
        mobile: {
            'isNumber': '请输入非零的正整数',
            'required': '请输入您的手机号！'
        },
    };
    formErrors: any = {
        name: '',
        password: '',
        mobile: '',
    };



    constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<AdminStoreAccountDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public adminStoreAccountService: AdminStoreAccountService) {
        this.dataDetailStoreAccountResponseModel = this.data;
        this.forms();
        console.log("点击编辑传过来的当前商铺id数据", this.dataDetailStoreAccountResponseModel);
        this.storeAccountDetailUpdateRequestModel = {
            name: '',
            password: '',
            password_confirmation: '',
            mobile: '',
            email: '',
            level: 0,
            store_id: '',
            status: '',
            account_id: '',
            job_num: ''
        }
    }


    forms() {
        this.detaileForm = this.fb.group({
            name: [this.dataDetailStoreAccountResponseModel.name, [Validators.required, Validators.maxLength(64)]],
            password: [''],
            password_confirmation: [''],
            email: [this.dataDetailStoreAccountResponseModel.email],
            mobile: [this.dataDetailStoreAccountResponseModel.mobile, [Validators.required, isNumber]],
            level: [this.dataDetailStoreAccountResponseModel.level, [Validators.required]],
            store_id: [this.dataDetailStoreAccountResponseModel.store_id, [Validators.required]],
            status: [this.dataDetailStoreAccountResponseModel.status, [Validators.required]],
            job_num: [this.dataDetailStoreAccountResponseModel.job_num],
        });
        // 每次表单数据发生变化的时候更新错误信息
        this.detaileForm.valueChanges.subscribe(data => {
            this.onValueChanged(data);
        });
        // 初始化错误信息
        this.onValueChanged();
    }


    // 表单验证
    onValueChanged(data?: any) {
        // 如果表单不存在则返回
        if (!this.detaileForm) return;
        // 获取当前的表单
        const form = this.detaileForm;
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



    ngOnInit(): void {

    };

    setValue() {   //获取表单内容赋值给修改内容接口请求的数据模块
        this.storeAccountDetailUpdateRequestModel.name = this.detaileForm.value.name;
        this.storeAccountDetailUpdateRequestModel.password = this.detaileForm.value.password;
        this.storeAccountDetailUpdateRequestModel.password_confirmation = this.detaileForm.value.password_confirmation;
        this.storeAccountDetailUpdateRequestModel.mobile = this.detaileForm.value.mobile;
        this.storeAccountDetailUpdateRequestModel.email = this.detaileForm.value.email;
        this.storeAccountDetailUpdateRequestModel.level = this.detaileForm.value.level;
        this.storeAccountDetailUpdateRequestModel.store_id = this.detaileForm.value.store_id;
        this.storeAccountDetailUpdateRequestModel.status = this.detaileForm.value.status;
        // this.storeAccountDetailUpdateRequestModel.job_num = this.detaileForm.value.job_num;
    }

    update() {
        console.log("看看表单里面的输入内容", this.detaileForm.value)
        this.setValue();
        for (const key in this.detaileForm.controls) {  //验证表单输入内容不能为空
            this.detaileForm.controls[key].markAsDirty();
            this.detaileForm.controls[key].updateValueAndValidity();
        };
        if (this.detaileForm.valid) {
            this.storeAccountDetailUpdateRequestModel.account_id = this.dataDetailStoreAccountResponseModel.account_id;
            console.log("看看修改提交的model是什么", this.storeAccountDetailUpdateRequestModel, this.storeAccountDetailUpdateRequestModel.account_id);
            this.adminStoreAccountService.updateStoreAccount(this.storeAccountDetailUpdateRequestModel).subscribe(res => {
                console.log("res结果", res);
                if (res?.status_code) {
                    // alert("修改失败");
                }
                else {
                    // alert("修改成功");
                    this.dialogRef.close(1);
                }
            })
        }
    }

    //关闭弹窗
    close(): void {
        this.dialogRef.close();
    }


    //密码验证
    validateConfirmPassword(): void {
        setTimeout(() => this.detaileForm.controls.password_confirmation.updateValueAndValidity());
    };

    //确认密码与输入密码是否一致
    confirmValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { error: true, required: true };
        } else if (control.value !== this.detaileForm.controls.password.value) {
            return { password_confirmation: true, error: true };
        }
        return {};
    };



}

