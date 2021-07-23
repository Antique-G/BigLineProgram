import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzSafeAny } from "ng-zorro-antd/core/types";
import { RegisterRequestModel } from '../../../../interfaces/adminAdmin/admin-admin-model';
import { AdminAdminService } from '../../../../services/admin/admin-admin.service';
import { AdminRegionService } from '../../../../services/admin/admin-region.service';
import { AdminRoleService } from '../../../../services/admin/admin-role.service';
import { AdminStoreManageService } from '../../../../services/admin/admin-store-manage.service';


@Component({
    selector: 'app-admin-create',
    templateUrl: './admin-create.component.html',
    styleUrls: ['./admin-create.component.css']
})
export class AdminCreateComponent implements OnInit {
    addForm!: FormGroup;
    statusValue = '1';
    staffTypeValue = '0'
    registerRequestModel: RegisterRequestModel;
    listDataMap: any[] = [];

    listOfOption: any[] = [];
    listOfTagOptions: any[] = [];



    validationMessage: any = {
        account: {
            'maxlength': '用户名长度最多为32个字符',
            'required': '请输入用户名！'
        },
        password: {
            'maxlength': '密码长度最多为16个字符',
            'required': '请输入密码！'
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
        password: '',
        name: '',
        phoneNumber: '',
    };

    // 城市
    nzOptions: any[] | null = null;
    isDestination_city: any;






    constructor(public fb: FormBuilder, public adminStoreManageService: AdminStoreManageService,
        public adminAdminService: AdminAdminService, public adminRoleService: AdminRoleService, public adminRegionService: AdminRegionService) {

        this.forms();
        this.registerRequestModel = {
            account: '',
            password: '',
            password_confirmation: '',
            real_name: '',
            mobile: '',
            status: 1,
            staff_type: 0,
            region_code: '',
            role_id: '',
            job_num: '',
        }
    }

    forms() {
        // 校验手机
        const { mobile } = MyValidators;
        this.addForm = this.fb.group({
            // shop_id: ['', [Validators.required]],
            account: ['', [Validators.required, Validators.maxLength(32)]],
            password: ['', [Validators.required, Validators.maxLength(16)]],
            checkPassword: ['', [Validators.required, this.confirmationValidator]],
            name: ['', [Validators.required, Validators.maxLength(32)]],
            phoneNumber: ['', [Validators.required, mobile]],
            status: ['', [Validators.required]],
            staff_type: ['', [Validators.required]],
            region_code: ['', [Validators.required]],
            role_id: [[], [Validators.required]],
            job_num: ['']
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



    //  密码校验
    updateConfirmValidator(): void {
        Promise.resolve().then(() => this.addForm.controls.checkPassword.updateValueAndValidity());
    }
    confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (control.value !== this.addForm.controls.password.value) {
            return { confirm: true, error: true };
        }
        return {};
    };



    ngOnInit(): void {
        this.adminStoreManageService.storeManageList(1, 50, 1, '', '').subscribe(res => {
            console.log('res :>> ', res);
            this.listDataMap = res?.data;
            this.adminRegionService.getAllRegionList().subscribe(res => {
                this.nzOptions = res;
            })
        })
        this.adminRoleService.roleList(1, 50, '',).subscribe((result: any) => {
            this.listOfOption = result?.data;   //角色选项
            this.listOfOption = this.listOfOption.filter((item: any) => item.status == 1);
            console.log('过滤掉禁用的', this.listOfOption)

        });

    }

    setValue() {
        console.log('this.addForm.value', this.addForm.value)
        this.registerRequestModel.account = this.addForm.value.account;
        this.registerRequestModel.password = this.addForm.value.password;
        this.registerRequestModel.password_confirmation = this.addForm.value.checkPassword;
        this.registerRequestModel.real_name = this.addForm.value.name;
        this.registerRequestModel.mobile = this.addForm.value.phoneNumber
        this.registerRequestModel.status = this.addForm.value.status;
        this.registerRequestModel.staff_type = this.addForm.value.staff_type;
        this.registerRequestModel.region_code = this.isDestination_city;
        this.registerRequestModel.role_id = this.addForm.value.role_id;
        this.registerRequestModel.job_num = this.addForm.value.job_num;
    }


    // 城市
    onChangesdestinationCity(data: any): void {
        console.log("点击的结果是", data);
        if (data !== null) {
            this.isDestination_city = data[data.length - 1];

        }
    }

    // 城市
    onChangeRole(data: any): void {
        console.log("点击的结果是datadatadata", data);

    }



    add() {
        this.setValue();
        for (const i in this.addForm.controls) {
            this.addForm.controls[i].markAsDirty();
            this.addForm.controls[i].updateValueAndValidity();
        }
        if (this.addForm.valid) {
            console.log("提交的model是什么", this.registerRequestModel);
            this.adminAdminService.register(this.registerRequestModel).subscribe(res => {
                console.log("res结果", res);
                if (res === null) {
                    // alert("创建成功");

                }
                else {
                    // alert("创建失败，请重新填写")
                }
            })
        }
    }





}









// current locale is key of the MyErrorsOptions
export type MyErrorsOptions = { 'zh-cn': string; en: string } & Record<string, NzSafeAny>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;

export class MyValidators extends Validators {

    static mobile(control: AbstractControl): MyValidationErrors | null {
        const value = control.value;

        if (isEmptyInputValue(value)) {
            return null;
        }

        return isMobile(value) ? null : { mobile: { 'zh-cn': `手机号码格式不正确`, en: `Mobile phone number is not valid` } };
    }
}

function isEmptyInputValue(value: NzSafeAny): boolean {
    return value == null || value.length === 0;
}

function isMobile(value: string): boolean {
    return typeof value === 'string' && /(^1\d{10}$)/.test(value);
}
