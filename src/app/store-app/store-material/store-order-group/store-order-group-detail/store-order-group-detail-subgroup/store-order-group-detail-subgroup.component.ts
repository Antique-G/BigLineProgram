import { Component, Input, OnInit, SimpleChanges } from '@angular/core';


interface ParentItemData {
  key: number;
  name: string;
  platform: string;
  version: string;
  upgradeNum: number | string;
  creator: string;
  createdAt: string;
  expand: boolean;
}

interface ChildrenItemData {
  key: number;
  name: string;
  date: string;
  upgradeNum: string;
}


@Component({
  selector: 'app-store-order-group-detail-subgroup',
  templateUrl: './store-order-group-detail-subgroup.component.html',
  styleUrls: ['./store-order-group-detail-subgroup.component.css']
})



export class StoreOrderGroupDetailSubgroupComponent implements OnInit {
  @Input() subGroupModel: any;   //父组件拿到的值
  cursubGroupModelValue: any[] = [];
  proName: any;
  isSubgroup!: boolean;
  index = 0;

  // 表格
  checked = false;
  setOfCheckedId = new Set<number>();
  listOfParentData: any[] = [];




  constructor() { }

  ngOnInit(): void { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['subGroupModel']?.currentValue != undefined) {
      this.cursubGroupModelValue = changes['subGroupModel'].currentValue?.sub_group?.data;
      this.proName = changes['subGroupModel'].currentValue?.product_name;
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
          value['expand'] = false; //展开属性
          console.log("33435434", this.cursubGroupModelValue);
          this.listOfParentData = this.cursubGroupModelValue;
        })
      }
    }
  }


  closeTab({ index }: { index: number }): void {
    this.cursubGroupModelValue.splice(index, 1);
  }


  // 表格
  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
  }

  onAllChecked(checked: boolean): void {
    // this.dataSource.filter(({ disabled }) => !disabled).forEach(({ id }) => this.updateCheckedSet(id, checked));

  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }
}
