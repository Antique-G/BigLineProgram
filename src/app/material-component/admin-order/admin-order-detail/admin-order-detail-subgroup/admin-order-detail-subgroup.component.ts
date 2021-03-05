import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-admin-order-detail-subgroup',
  templateUrl: './admin-order-detail-subgroup.component.html',
  styleUrls: ['./admin-order-detail-subgroup.component.css']
})
export class AdminOrderDetailSubgroupComponent implements OnInit {
  @Input() subGroupModel: any;   //父组件拿到的值
  cursubGroupModelValue: any[] = [];
  isSubgroup!: boolean;
  index = 0;

  // 表格
  checked = false;
  setOfCheckedId = new Set<number>();
  listOfParentData: any[] = [];
  isClosed: any;
  tabTitle: any;
  proCode: any;




  constructor(public message: NzMessageService,) { }

  ngOnInit(): void { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['subGroupModel']?.currentValue != undefined) {
      this.isClosed = changes['subGroupModel'].currentValue?.group_status;
      this.proCode = changes['subGroupModel'].currentValue?.product?.data?.code;
      this.tabTitle = changes['subGroupModel'].currentValue?.product_name;

      // 子团的值
      this.cursubGroupModelValue = changes['subGroupModel'].currentValue?.sub_group?.data;
      console.log("1111111", this.cursubGroupModelValue);
      // 赋值
      if (this.cursubGroupModelValue?.length === 0) {
        this.cursubGroupModelValue = [];
        this.isSubgroup = false;
      }
      else if (this.cursubGroupModelValue?.length != 0) {
        this.isSubgroup = true;
        this.cursubGroupModelValue.forEach((value: any, index: any) => {
          value['tabs'] = '子团' + (index + 1);
          value?.order?.data.forEach((value: any, index: any) => {
            value['expand'] = false; //展开属性
          });
          console.log("33435434", this.cursubGroupModelValue);
          this.listOfParentData = this.cursubGroupModelValue;
        })
      }
    }
  }




}
