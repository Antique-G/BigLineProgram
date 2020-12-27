import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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



  @Output() tabIndex = new EventEmitter;     //往父组件穿下一个tab值


  constructor(public fb: FormBuilder, public storeRegionService: StoreRegionService,) {
    this.buildForm();
  }


  buildForm(): void {
    this.addForm = this.fb.group({
      earlier1: ['', [Validators.required]],
      earlier2: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }


  // 区域
  regionList() {
    this.storeRegionService.getAllRegionList().subscribe(res => {
      // console.log("结果是", res);
      this.nzOptions = res;
    })
  }


  onChanges(values: any): void {}

  nextTab(){
    this.tabIndex.emit(1);
  }
}
