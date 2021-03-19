import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DataOrderDetail, OrderSmsModel } from '../../../../../interfaces/store/storeOrder/store-order-model';
import { AdminOrderService } from '../../../../../services/admin/admin-order.service';
import { AODSubgroupMoveorderComponent } from './a-o-d-subgroup-moveorder/a-o-d-subgroup-moveorder.component';
import { AODSubgroupSendsmsComponent } from './a-o-d-subgroup-sendsms/a-o-d-subgroup-sendsms.component';
import { AODSubgroupSetguideComponent } from './a-o-d-subgroup-setguide/a-o-d-subgroup-setguide.component';

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
  setOfCheckedId = new Set<number>();

  detailId: any;
  detailModel!: DataOrderDetail;

  orderArray: any[] = [];
  orderSmsModel: OrderSmsModel;

  isClosed: any;
  tabTitle: any;
  proCode: any;





  constructor(public message: NzMessageService, public modal: NzModalService, public activatedRoute: ActivatedRoute,
    public dialog: MatDialog, public adminOrderService: AdminOrderService,) {
    this.orderSmsModel = {
      order_ids: []
    };
  }

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
            console.log('222222222 :>> ', value);
            value.member?.data.forEach((element: any) => {
              if (element.birthday === null) {
                let year = element.id_num.slice(6, 10);
                let month = element.id_num.slice(10, 12);
                let date = element.id_num.slice(12, 14);
                element.birthday = year + '-' + month + '-' + date;
              }
            });
          });
          console.log("33435434", this.cursubGroupModelValue);
        })
      }
    }
  }





  closeTab({ index }: { index: number }): void {
    console.log('object :>> ', index);
    console.log("1111", this.cursubGroupModelValue, this.cursubGroupModelValue[index], this.cursubGroupModelValue[index].order?.data.length === 0);
    if (this.cursubGroupModelValue[index].order?.data.length === 0) {
      this.modal.confirm({
        nzTitle: '<h4>提示</h4>',
        nzContent: '<h6>是否删除</h6>',
        nzOnOk: () =>
          this.adminOrderService.deleteSubGroup(this.cursubGroupModelValue[index].sub_group_id).subscribe(res => {
            console.log("res", res);
            this.cursubGroupModelValue.splice(index, 1);
            this.activatedRoute.queryParams.subscribe(params => {
              console.log("params", params)
              this.detailId = JSON.parse(params["detailId"]);
              // 详情
              this.adminOrderService.getOrderGroupDetail(this.detailId).subscribe(res => {
                console.log("结果是", res.data);
                this.detailModel = res.data;
                this.cursubGroupModelValue = this.detailModel.sub_group.data;
                this.cursubGroupModelValue.forEach((value: any, index: any) => {
                  value['tabs'] = '子团' + (index + 1);
                  value?.order?.data.forEach((value: any, index: any) => {
                    value['expand'] = false; //展开属性
                    value.member?.data.forEach((element: any) => {
                      if (element.birthday === null) {
                        let year = element.id_num.slice(6, 10);
                        let month = element.id_num.slice(10, 12);
                        let date = element.id_num.slice(12, 14);
                        element.birthday = year + '-' + month + '-' + date;
                      }
                    });
                  });
                  console.log("33435434", this.cursubGroupModelValue);
                })
              })
            })
          })
      })
    }
    else {
      this.message.create('error', `该子团有订单，不能删除`);

    }

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
      nzContent: AODSubgroupSetguideComponent,
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
      this.activatedRoute.queryParams.subscribe(params => {
        console.log("params", params)
        this.detailId = JSON.parse(params["detailId"]);
        // 详情
        this.adminOrderService.getOrderGroupDetail(this.detailId).subscribe(res => {
          console.log("结果是", res.data);
          this.detailModel = res.data;
          this.cursubGroupModelValue = this.detailModel.sub_group.data;
          this.cursubGroupModelValue.forEach((value: any, index: any) => {
            value['tabs'] = '子团' + (index + 1);
            value?.order?.data.forEach((value: any, index: any) => {
              value['expand'] = false; //展开属性
              value.member?.data.forEach((element: any) => {
                if (element.birthday === null) {
                  let year = element.id_num.slice(6, 10);
                  let month = element.id_num.slice(10, 12);
                  let date = element.id_num.slice(12, 14);
                  element.birthday = year + '-' + month + '-' + date;
                }
              });
            });
            console.log("33435434", this.cursubGroupModelValue);
          })
        })
      })
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
        nzContent: AODSubgroupMoveorderComponent,
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
          this.adminOrderService.getOrderGroupDetail(this.detailId).subscribe(res => {
            console.log("结果是", res.data);
            this.detailModel = res.data;
            this.cursubGroupModelValue = this.detailModel.sub_group.data;
            this.cursubGroupModelValue.forEach((value: any, index: any) => {
              value['tabs'] = '子团' + (index + 1);
              value?.order?.data.forEach((value: any, index: any) => {
                value['expand'] = false; //展开属性
                value.member?.data.forEach((element: any) => {
                  if (element.birthday === null) {
                    let year = element.id_num.slice(6, 10);
                    let month = element.id_num.slice(10, 12);
                    let date = element.id_num.slice(12, 14);
                    element.birthday = year + '-' + month + '-' + date;
                  }
                });
              });
              console.log("33435434", this.cursubGroupModelValue);
            })
          })
        })
      })

    }

  }


  // 发送出团短信通知
  sendSms(data: any): void {
    const dialogRef = this.dialog.open(AODSubgroupSendsmsComponent, {
      width: '800px',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      this.activatedRoute.queryParams.subscribe(params => {
        console.log("params", params)
        this.detailId = JSON.parse(params["detailId"]);
        // 详情
        this.adminOrderService.getOrderGroupDetail(this.detailId).subscribe(res => {
          console.log("结果是", res.data);
          this.detailModel = res.data;
          this.cursubGroupModelValue = this.detailModel.sub_group.data;
          this.cursubGroupModelValue.forEach((value: any, index: any) => {
            value['tabs'] = '子团' + (index + 1);
            value?.order?.data.forEach((value: any, index: any) => {
              value['expand'] = false; //展开属性
              value.member?.data.forEach((element: any) => {
                if (element.birthday === null) {
                  let year = element.id_num.slice(6, 10);
                  let month = element.id_num.slice(10, 12);
                  let date = element.id_num.slice(12, 14);
                  element.birthday = year + '-' + month + '-' + date;
                }
              });
            });
            console.log("33435434", this.cursubGroupModelValue);
          })
        })
      })

    });
  }


  // 发送订单
  sendOrderSms() {
    let newArray = [...this.setOfCheckedId];
    console.log('拿到的订单内容 ', newArray);
    if (newArray.length === 0) {
      this.message.create('error', `请选择订单`);
    }
    else {
      newArray.forEach((value: any) => {
        console.log('value是什么 ', value);
        this.orderArray.push(value.id);
        this.orderSmsModel.order_ids = this.orderArray;
        this.adminOrderService.orderSms(this.orderSmsModel).subscribe(res => {
          console.log('res ', res);
          if (res.status_code === 200) {
            this.message.create('success', `成功发送 ${res.success}条信息，${res.failed}条失败信息`);
          }
          else {
            this.message.create('error', ` ${res.message}`);
          }
        })

      })
    }
  }



  // 不成团关团短信通知
  sendClosedGroup() {
    let newArray = [...this.setOfCheckedId];
    console.log('拿到的订单内容 ', newArray);
    if (newArray.length === 0) {
      this.message.create('error', `请选择订单`);
    }
    else {
      newArray.forEach((value: any) => {
        console.log('value是什么 ', value);
        this.orderArray.push(value.id);
        this.orderSmsModel.order_ids = this.orderArray;
        this.adminOrderService.cancel(this.orderSmsModel).subscribe(res => {
          console.log('res ', res);
          if (res.status_code === 200) {
            this.message.create('success', `成功发送 ${res.success}条信息，${res.failed}条失败信息`);
          }
          else {
            this.message.create('error', ` ${res.message}`);
          }
        })

      })
    }
  }

}
