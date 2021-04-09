import { NzModalService } from "ng-zorro-antd/modal";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { AdminInsuranceService } from "../../../services/admin/admin-insurance.service";
import { AdminInsuranceDetailComponent } from "./admin-insurance-detail/admin-insurance-detail.component";
import { AdminInsuranceStatusComponent } from "./admin-insurance-status/admin-insurance-status.component";
import { AdminInsuranceCreateComponent } from "./admin-insurance-create/admin-insurance-create.component";

@Component({
  selector: "app-admin-insurance",
  templateUrl: "./admin-insurance.component.html",
  styleUrls: ["./admin-insurance.component.css"],
})
export class AdminInsuranceComponent implements OnInit {
  searchForm: FormGroup;
  dataSource = [];
  page = 1;
  per_page = 20;
  total = 1;
  loading = true;
  name: any;
  status: any;

  constructor(
    public fb: FormBuilder, public adminInsuranceService: AdminInsuranceService, private modal: NzModalService) {
    this.searchForm = fb.group({
      status: [""],
      name: [""],
    });
  }

  ngOnInit(): void {
    this.getDataList();
  }


  //保险列表
  getDataList(): void {
    this.loading = true;
    this.adminInsuranceService.insuranceList(this.page, this.per_page, this.name, this.status).subscribe((result: any) => {
        console.log("保险列表接口返回什么", result);
        this.loading = false;
        this.total = result.total;
        this.dataSource = result.data;
      });
  }

  changePageIndex(page: number) {
    console.log("aaa", page);
    this.page = page;
    this.getDataList();
  }

  changePageSize(per_page: number) {
    console.log("bbb", per_page);
    this.per_page = per_page;
    this.getDataList();
  }
  
  search() {
    this.name = this.searchForm.value.name;
    this.status = this.searchForm.value.status;
    this.getDataList();
    console.log("value", this.searchForm.value);
  }

  edit(element: any) {
    console.log("当前id", element);
    const editmodal = this.modal.create({
      nzTitle: "更新保险",
      nzContent: AdminInsuranceDetailComponent,
      nzWidth:800,
      nzComponentParams: {
        data: element,
      },
      nzFooter: [
        {
          label: "更新",
          type: "primary",
          onClick: (componentInstance) => {
            componentInstance?.update();
          },
        },
      ],
    });
    editmodal.afterClose.subscribe((res) => {
      this.getDataList();
    });
  }

  statusEdit(element: any): void {
    console.log("id", element);
    this.adminInsuranceService .getAdminInsuranceDetail(element.id).subscribe((res) => {
        const statusmodal = this.modal.create({
          nzTitle: "修改保险状态",
          nzContent: AdminInsuranceStatusComponent,
          nzComponentParams: {
            data: res.data,
          },
          nzOnOk: (componentInstance) => {
            componentInstance.setStatus();
          },
        });
        statusmodal.afterClose.subscribe((res) => {
          this.getDataList();
        });
      });
  }

  add() {
    const addModal = this.modal.create({
      nzTitle: "添加保险",
      nzContent: AdminInsuranceCreateComponent,
      nzWidth:800,
      nzFooter: [
        {
          label: "添加",
          type: "primary",
          onClick: (componentInstance) => {
            componentInstance?.submitForm();
          },
        },
      ],
    });
    addModal.afterClose.subscribe((res) => {
      this.getDataList();
    });
  }

  delete(data: any) {
    this.modal.confirm({
      nzTitle: "<h4>提示</h4>",
      nzContent: "<h6>是否删除</h6>",
      nzOnOk: () =>
        this.adminInsuranceService.deleteInsurance(data.id).subscribe((res) => {
          this.getDataList();
        }),
    });
  }
}
