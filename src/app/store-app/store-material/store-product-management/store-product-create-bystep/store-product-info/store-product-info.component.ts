import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StoreRegionService } from '../../../../../../services/store/store-region/store-region.service';

@Component({
  selector: 'app-store-product-info',
  templateUrl: './store-product-info.component.html',
  styleUrls: ['./store-product-info.component.css']
})
export class StoreProductInfoComponent implements OnInit {
  addForm!: FormGroup;

  // 区域联动
  nzOptions: any[] | null = null;
  values: any[] | null = null;


  time = new Date();

  formDataLocalStorage: any;

  @Output() tabIndex = new EventEmitter;     //往父组件穿下一个tab值


  constructor(public fb: FormBuilder, public storeRegionService: StoreRegionService,) {
    console.log("缓存的formData", JSON.parse(localStorage.getItem('formData')!))
    this.formDataLocalStorage = JSON.parse(localStorage.getItem('formData')!);
    this.buildForm();
  }


  buildForm(): void {
    if (this.formDataLocalStorage === null) {
      this.addForm = new FormGroup({
        title: new FormControl('', [Validators.required]),
        day: new FormControl('', [Validators.required]),
        dayTime: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required]),
        departureCity: new FormControl('', [Validators.required]),
        destinationCity: new FormControl('', [Validators.required]),
        confirm: new FormControl('', [Validators.required]),
        pay: new FormControl('', [Validators.required]),
        notice: new FormControl('', [Validators.required]),
        earlier1: new FormControl('', [Validators.required]),
        earlier2: new FormControl(null, [Validators.required]),
        name: new FormControl('', [Validators.required]),
      });
    }
    // 按下保存按钮后从缓存拿的值
    else {
      this.addForm = new FormGroup({
        title: new FormControl(this.formDataLocalStorage.title, [Validators.required]),
        day: new FormControl(this.formDataLocalStorage.day, [Validators.required]),
        dayTime: new FormControl(this.formDataLocalStorage.dayTime, [Validators.required]),
        phone: new FormControl(this.formDataLocalStorage.phone, [Validators.required]),
        departureCity: new FormControl(this.formDataLocalStorage.departureCity, [Validators.required]),
        destinationCity: new FormControl(this.formDataLocalStorage.destinationCity, [Validators.required]),
        confirm: new FormControl(this.formDataLocalStorage.confirm, [Validators.required]),
        pay: new FormControl(this.formDataLocalStorage.pay, [Validators.required]),
        notice: new FormControl(this.formDataLocalStorage.notice, [Validators.required]),
        earlier1: new FormControl(this.formDataLocalStorage.earlier1, [Validators.required]),
        earlier2: new FormControl(this.formDataLocalStorage.earlier2, [Validators.required]),
        name: new FormControl(this.formDataLocalStorage.name, [Validators.required]),
      });
    }


  }

  ngOnInit(): void {
    this.regionList();
  }


  // 区域
  regionList() {
    this.storeRegionService.getAllRegionList().subscribe(res => {
      // console.log("结果是", res);
      this.nzOptions = res;
    })
  }


  onChanges(values: any): void { }



  // 下一步，提交
  nextTab() {
    this.tabIndex.emit(1);
    localStorage.removeItem('formData');
  }


  // TODO:保存数据
  save() {
    console.log("保存的form", this.addForm.value);
    let formData = JSON.stringify(this.addForm.value);
    localStorage.setItem("formData", formData);
    var getLocalData = localStorage.getItem('formData')!;  // 读取字符串数据
    var jsonObj = JSON.parse(getLocalData);
    console.log("缓存拿到的jsonObj", jsonObj);  // 29
  }
}
