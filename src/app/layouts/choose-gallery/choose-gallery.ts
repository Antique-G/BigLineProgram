import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonServiceService } from '../../../services/store/common-service/common-service.service';
import { StoreRegionService } from '../../../services/store/store-region/store-region.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
@Component({
  selector: 'choose-gallery',
  templateUrl: 'choose-gallery.html',
  styleUrls: ['choose-gallery.css']
})

export class ChooseGalleryComponent implements OnInit {
  addForm!: FormGroup;
  @Input() data: any



  constructor(private commonService: CommonServiceService, private storeRegionService: StoreRegionService
    , private msg: NzMessageService, private modalRef: NzModalRef) { }


  listOfData: any = []
  setOfCheckedId = new Set<number>();
  checked = false
  indeterminate = false;
  listOfCurrentPageData: [] = [];
  region_codes: any
  nzOptions: any[] | null = null;
  loading = true;
  keyword: any = ''
  page = 1;
  per_page = 20;
  total = 1;
  image_name: any
  type = 1
  region_code: any


  ngOnInit(): void {
    this.type = this.data;
    this.region_codes = localStorage.getItem("regionData")?.split(',');
    this.region_code = this.region_codes[this.region_codes.length - 1]
    console.log('object :>> ', this.region_codes);
    this.getRegionList();
    this.buildForm();


  }
  buildForm(): void {
    this.addForm = new FormGroup({
      keyword: new FormControl(''),
      region_code: new FormControl(''),
      image_name: new FormControl(''),
    });
  }

  // 区域
  getRegionList() {
    console.log(123);
    this.storeRegionService.getAllRegionList().subscribe(res => {
      console.log('this.nzOptions', this.nzOptions);
      this.nzOptions = res;
      this.getImgList()
    })
  }



  onDestChange(values: any): void {
    if (values !== null) {
      this.region_code = values[values.length - 1];
    }
  }



  getImgList() {
    this.commonService.getGalleryList(this.page, this.keyword, this.per_page, this.region_code, this.type, this.image_name).subscribe(res => {
      console.log('res', res);
      this.listOfData = res.data;
      this.loading = false;
      this.total = res.total
    })
  }


  getImgLists() {
    this.keyword = this.addForm.value.keyword;
    this.image_name = this.addForm.value.image_name;
    console.log('this.addForm.value.', this.addForm.value.region_code[this.addForm.value.region_code?.length - 1]);
    if(this.addForm.value.region_code[this.addForm.value.region_code?.length - 1]===undefined){
      this.region_code=''
    }
    else{
      this.region_code = this.addForm.value.region_code[this.addForm.value.region_code?.length - 1];
    }
    this.getImgList()

  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
    console.log(this.setOfCheckedId, 'updateCheckedSet');

    // const requestData = this.listOfData.filter((data:any) => this.setOfCheckedId.has(data));
    // console.log(requestData);
  }

  changePageSize(per_page: number) {
    this.per_page = per_page;
    this.getImgList();
  }

  changePageIndex(page: number) {
    console.log("当前页", page);
    this.page = page;
    this.getImgList();
  }

  onCurrentPageDataChange(listOfCurrentPageData: []): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item)) && !this.checked;

  }

  onAllChecked(checked: boolean): void {

    this.listOfCurrentPageData.forEach((item) => {
      this.updateCheckedSet(item, checked)
      // console.log(item,'item');
    });
    this.refreshCheckedStatus();

  }

  onItemChecked(id: any, checked: boolean): void {
    console.log(id, checked);
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  importImg() {

    let arr: any[] = [...this.setOfCheckedId]
    // if (arr.length > 10) {
    //   this.msg.error('图片不能引用超过10张');
    //   return
    // }

    this.modalRef.close(arr);
    console.log('arr :>> ', arr);
  }




}