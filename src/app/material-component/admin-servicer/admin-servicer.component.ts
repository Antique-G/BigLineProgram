import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminServicerService } from '../../../services/admin/admin-servicer.service';
import { AdminSystemAreaCreateComponent } from '../admin-system-area/admin-system-area-create/admin-system-area-create.component';

@Component({
  selector: 'app-admin-servicer',
  templateUrl: './admin-servicer.component.html',
  styleUrls: ['./admin-servicer.component.css']
})
export class AdminServicerComponent implements OnInit {

  searchForm: FormGroup;
  dataSource = [];
  // parent: any;
  page = 1;
  per_page = 10;
  total = 1;
  loading = false;
  region_code: any;
  region_name: any;
  phone: any;

  
  constructor(public fb: FormBuilder, public dialog: MatDialog,public adminServicerService: AdminServicerService) { 
    this.searchForm = fb.group({
      region_code: ['' ],
      region_name: ['' ],
      phone: ['' ]
    })
  }

  ngOnInit(): void {
    this.getDataList();
  }

  getDataList(){
    this.loading = true;
    // this.adminServicerService.regionServiceList(this.page, this.per_page, this.region_code, this.region_name, this.phone).subscribe((result: any) => {
    //   console.log("result的结果是", result);
    //   this.loading = false;
    //   this.total = result.total;   //总页数
    //   this.dataSource = result.data;
    // });

  }


  changePageIndex(page: number) {
    this.page = page;
    this.getDataList();
  }
  changePageSize(per_page: number) {
    this.per_page = per_page;
    this.getDataList();
  }
  search() {
    this.region_code = this.searchForm.value.region_code,
    this.region_name = this.searchForm.value.region_name,
    this.phone = this.searchForm.value.phone,
    this.getDataList();
    console.log('value',this.searchForm.value)
  }
  
  add() {
    const dialogRef = this.dialog.open(AdminSystemAreaCreateComponent, {
      width: '550px',
      // data: this.parent
    });
    dialogRef.afterClosed().subscribe(result => {
      this.search();

    });

  }

  edit(data:any){
    console.log('编辑')
  }

  delete(data:any){
    console.log('删除')
  }
}
