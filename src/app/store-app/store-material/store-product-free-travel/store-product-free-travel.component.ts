import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StoreProductTreeTravelService } from '../../../../services/store/store-product-free-travel/store-product-tree-travel.service';
import { StoreProductService } from '../../../../services/store/store-product/store-product.service';
import { SetCommissionComponent } from '../common/set-commission/set-commission.component';


@Component({
  selector: 'app-store-product-free-travel',
  templateUrl: './store-product-free-travel.component.html',
  styleUrls: ['./store-product-free-travel.component.css']
})
export class StoreProductFreeTravelComponent implements OnInit {
  searchForm: FormGroup;
  checkStatus: any;
  title: any;
  few_days: any;
  code: any;
  status: any;
  tag: any;

  dataSource: any[] = [];   //1.4将数据添加到dataSource
  loading = true;
  page = 1;
  per_page = 20;
  total = 1;
  tagList: any[] = [];


  newDay: any
  newHour: any;
  newMin: any;

  isEar: any;
  setRewardModel: any;

  setQuery: any;


  constructor(public fb: FormBuilder, private freeTrvelService: StoreProductTreeTravelService, public router: Router,
    public dialog: MatDialog, private modal: NzModalService, public storeProductService: StoreProductService,
    private nzContextMenuService: NzContextMenuService) {
    this.searchForm = this.fb.group({
      checkStatus: [''],
      title: [''],
      few_days: [''],
      code: [''],
      status: [''],
      tag: [''],
    })
  }


  ngOnInit(): void {
    this.getTagList();
    // 将上次查询的筛选条件赋值
    let getSeatch = JSON.parse(localStorage.getItem("storeFreeSearch")!)
    this.status = getSeatch?.status ? getSeatch?.status : '';
    this.checkStatus = getSeatch?.check_status ? getSeatch?.check_status : '';
    this.title = getSeatch?.title ? getSeatch?.title : '';
    this.code = getSeatch?.code ? getSeatch?.code : '';
    this.few_days = getSeatch?.few_days ? getSeatch?.few_days : '';
    this.tag = getSeatch?.tag ? getSeatch?.tag : '';
    this.page = getSeatch?.page ? getSeatch?.page : 1;
    this.searchForm.patchValue({
      status: this.status,
      checkStatus: this.checkStatus,
      title: this.title,
      code: this.code,
      tag: this.tag,
      few_days: this.few_days,
    })
    this.getProductList();
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  closeMenu(): void {
    this.nzContextMenuService.close();
  }

  getTagList() {
    this.storeProductService.productTagList(2).subscribe(res => {
      console.log("标签", res.data);
      this.tagList = res.data;
    })
  }

  getProductList() {
    this.loading = true;
    this.freeTrvelService.GetFreeTravelList(this.page, this.per_page, this.checkStatus, this.title, this.few_days, this.code, this.status, this.tag).subscribe(res => {
      this.loading = false;
      console.log("结果是", res);
      this.total = res.total;   //总页数
      this.dataSource = res.data;

    })
  }

  changePageSize(per_page: number) {
    this.per_page = per_page;
    this.getProductList();
  }

  changePageIndex(page: number) {
    console.log("当前页", page);
    this.page = page;
    // 筛选条件存进cookie
    this.setQuery = { status: this.status, check_status: this.checkStatus, title: this.title, code: this.code, few_days: this.few_days, tag: this.tag, page: this.page }
    localStorage.setItem('storeFreeSearch', JSON.stringify(this.setQuery));
    this.getProductList();
  }

  search() {
    this.checkStatus = this.searchForm.value.checkStatus;
    this.title = this.searchForm.value.title;
    this.few_days = this.searchForm.value.few_days;
    this.code = this.searchForm.value.code;
    this.status = this.searchForm.value.status;
    this.tag = this.searchForm.value.tag;
    // 筛选条件存进cookie
    this.setQuery = { status: this.status, check_status: this.checkStatus, title: this.title, code: this.code, few_days: this.few_days, tag: this.tag, page: this.page }
    localStorage.setItem('storeFreeSearch', JSON.stringify(this.setQuery));
    this.getProductList();

  }

  // 审核
  checkStatusClick(data: any) {
    this.modal.confirm({
      nzTitle: '<h5>请确认操作?</h5>',
      nzContent: '提交审核',
      nzOnOk: () => {
        this.freeTrvelService.checkStatusFreeTravel(data.id, 1).subscribe(res => {
          console.log(res);
          this.getProductList();
        })
      }
    });
  }

  // 撤销审核
  revokeStatus(data: any) {
    this.modal.confirm({
      nzTitle: '<h5>请确认操作?</h5>',
      nzContent: '撤销审核',
      nzOnOk: () => {
        this.freeTrvelService.checkStatusFreeTravel(data.id, 0).subscribe(res => {
          console.log(res);
          this.getProductList();
        })
      }
    });
  }


  // 添加
  addProduct() {
    this.router.navigate(['/store/main/storeFreeTravel/create']);
  }


  // 查看详情
  edit(data: any) {
    this.router.navigate(['/store/main/storeFreeTravel/detail'], { queryParams: { detailId: data.id } });
  }


  // 报价
  goToQuoteClick(data: any) {
    console.log('data', data);
    let child_status = Number(data.reserve_children)
    // 处理时间，预计多久报名
    let minutes = data.earlier;
    this.newMin = Math.floor(minutes % 60);
    if (this.newMin === 0) {
      this.newHour = Math.floor(24 - minutes / 60 % 24);
    }
    else if (this.newMin != 0) {
      this.newMin = 60 - this.newMin;
      this.newHour = Math.floor(24 - minutes / 60 % 24);
    }
    this.newDay = format(new Date(), 'HH');
    console.log('2423423', this.newHour, new Date(), this.newMin, this.newDay, this.newHour <= this.newDay)
    if (this.newHour <= this.newDay) {
      this.isEar = Math.floor(minutes / 60 / 24) + 1;
    }
    else {
      this.isEar = Math.floor(minutes / 60 / 24);
    }
    this.router.navigate(['/store/main/storeFreeTravel/storeQuote'], { queryParams: { productId: data.id, type: 'freeTravel', earlier: this.isEar, proName: data.title, childStatus: child_status, few_nights: data?.few_nights } });
  }


  // 上下架操作
  up(data: any) {
    console.log("nadao", data);
    this.modal.confirm({
      nzTitle: '<h4>提示</h4>',
      nzContent: '<h6>请确认操作</h6>',
      nzOnOk: () =>
        this.freeTrvelService.UpDownFreeTravel(data.id).subscribe(res => {
          this.getProductList();
        })
    });
  }

  // 设置佣金
  setCommission(obj: any) {
    console.log(obj, '设置佣金');
    const addmodal = this.modal.create({
      nzTitle: '设置佣金',
      nzContent: SetCommissionComponent,
      nzComponentParams: {
        data: {
          id: obj.id,
          title: obj.title,
          day: obj.few_days

        }
      },
      nzFooter: [
        {
          label: '添加',
          type: 'primary',
          onClick: componentInstance => {
            let flag = componentInstance?.Add()
            if (flag) {
              let obj = componentInstance?.getValue()
              this.setRewardModel = obj;
              this.freeTrvelService.setReward(this.setRewardModel).subscribe(res => {
                console.log('res :>> ', res);
                if (res === null) {
                  setTimeout(() => this.modal.closeAll(), 1000);  //1s后消失
                }
              })
            }
          }
        }
      ]
    })
    addmodal.afterClose.subscribe(res => {
      this.getProductList();
    })
  }

   // 重置
   reset(){
    this.searchForm.patchValue({
      checkStatus:'',
      title: '',
      few_days: '',
      code: '',
      status: '',
      tag: '',
    })
  }
}
