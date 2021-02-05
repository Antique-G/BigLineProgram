import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DataOrderDetail } from '../../../../../../interfaces/store/storeOrder/store-order-model';
import { StoreOrderService } from '../../../../../../services/store/store-order/store-order.service';
import { StoreOrderGroupDetailSubgroupMoveorderComponent } from './store-order-group-detail-subgroup-moveorder/store-order-group-detail-subgroup-moveorder.component';
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
  setOfCheckedId = new Set<number>();

  detailId: any;
  detailModel!: DataOrderDetail;


  constructor(public message: NzMessageService, public modal: NzModalService, public activatedRoute: ActivatedRoute,
    public storeOrderService: StoreOrderService,) {

  }

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

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }


  // 派遣导游
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

  // 移动订单
  moveOrder(data: any) {
    console.log('选择的tabs是 ', data);
    let newArray = [...this.setOfCheckedId];
    console.log('拿到的订单内容 ', newArray);
    if (newArray.length === 0) {
      this.message.create('error', `请选择订单`);
    }
    else {
      const editmodal = this.modal.create({
        nzTitle: '移动订单',
        nzContent: StoreOrderGroupDetailSubgroupMoveorderComponent,
        nzComponentParams: {
          data: [this.cursubGroupModelValue, data, newArray]
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
        this.activatedRoute.queryParams.subscribe(params => {
          console.log("params", params)
          this.detailId = JSON.parse(params["detailId"]);
          // 详情
          this.storeOrderService.getOrderGroupDetail(this.detailId).subscribe(res => {
            console.log("结果是", res.data);
            this.detailModel = res.data;
            this.cursubGroupModelValue = this.detailModel.sub_group.data;
            this.cursubGroupModelValue.forEach((value: any, index: any) => {
              value['tabs'] = '子团' + (index + 1);
              value?.order?.data.forEach((value: any, index: any) => {
                value['expand'] = false; //展开属性
              });
              console.log("33435434", this.cursubGroupModelValue);
            })
          })
        })
      })

    }

  }

}
