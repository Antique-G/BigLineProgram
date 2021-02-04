import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StoreOrderGroupDetailSubgroupSetguideComponent } from './store-order-group-detail-subgroup-setguide/store-order-group-detail-subgroup-setguide.component';

@Component({
  selector: 'app-store-order-group-detail-subgroup',
  templateUrl: './store-order-group-detail-subgroup.component.html',
  styleUrls: ['./store-order-group-detail-subgroup.component.css']
})



export class StoreOrderGroupDetailSubgroupComponent implements OnInit {
  @Input() subGroupModel: any;   //父组件拿到的值
  cursubGroupModelValue: any[] = [];
  isSubgroup!: boolean;
  index = 0;

  // 表格
  checked = false;
  setOfCheckedId = new Set<number>();
  listOfParentData: any[] = [];




  constructor(public message: NzMessageService,public modal: NzModalService) { }

  ngOnInit(): void { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['subGroupModel']?.currentValue != undefined) {
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


  closeTab({ index }: { index: number }): void {
    this.cursubGroupModelValue.splice(index, 1);
  }


  // 表格
  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
  }

  onAllChecked(checked: boolean): void {
    this.listOfParentData.filter(({ disabled }) => !disabled).forEach(({ id }) => this.updateCheckedSet(id, checked));

  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }


  setGuide(data: any) {
    console.log('object :>> ', data);
    const editmodal = this.modal.create({
      nzTitle: '派遣导游',
      nzContent: StoreOrderGroupDetailSubgroupSetguideComponent,
      nzComponentParams: {
        data: data
      },
      nzFooter: [
        {
          label: '提交',
          onClick: componentInstance => {
            componentInstance?.add()
          }
        }
      ]
    })
    editmodal.afterClose.subscribe(res => {
      
    })
  }
}
