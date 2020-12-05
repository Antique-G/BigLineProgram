import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminRegionService } from '../../../../services/admin/admin-region.service';




@Component({
  selector: 'app-admin-system-area-first',
  templateUrl: './admin-system-area-first.component.html',
  styleUrls: ['./admin-system-area-first.component.css']
})
export class AdminSystemAreaFirstComponent  implements OnInit  {
  nameForm: FormGroup;
  dataSource = [];
  page = 1;
  per_page = 10;
  total = 1;
  loading = true;
  keyword:any;
  parent_code: any;

// testing
  constructor(public fb: FormBuilder, public dialog: MatDialog, public router: Router,
    public adminRegionService: AdminRegionService) {
    this.nameForm = fb.group({
      storeId: new FormControl(' ')
    });
   }

   ngOnInit(): void {
    this.getData();
  }


  
  getData(): void {
    this.loading = true;
    this.adminRegionService.regionList(this.page, this.per_page, this.keyword, this.parent_code).subscribe((result: any) => {
      this.loading = false;
      this.total = result.total;   //总页数
      this.dataSource = result.data;
    });
    };
  
  changePageIndex(page:number ) {
    console.log("当前页",page);
    this.page = page;
    this.getData();
  }
   changePageSize(per_page:number) {
    console.log("一页显示多少",per_page);
    this.per_page = per_page;
     this.getData();
  }


  search(){
    this.keyword = this.nameForm.value.storeId;
    this.getData();
    console.log("this.keyword",this.keyword);

  }

  

  add(){
   
  }


  edit(index: any): void  {
   
  }


  nextLevel(element:any){
    this.router.navigate(['/admin/main/settingAreaSecond'])

  }

}





