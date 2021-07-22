import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StoreApplyService } from '../../../../../../services/store/store-apply/store-apply.service';

@Component({
    selector: 'app-atore-certifi-change-job-num',
    templateUrl: './atore-certifi-change-job-num.component.html',
    styleUrls: ['./atore-certifi-change-job-num.component.css']
})
export class AtoreCertifiChangeJobNumComponent implements OnInit {
    @Input() data: any;
    addForm!: FormGroup;
    storeAccountChangeJobModel: any;

    constructor(public fb: FormBuilder, public storeApplyService: StoreApplyService) {
        this.addForm = this.fb.group({
            job_num: ['',],
        });
        this.storeAccountChangeJobModel = {
            job_num:''
        }
    }

    ngOnInit(): void {
    }


    add() {
        this.storeAccountChangeJobModel.job_num = this.addForm.value.job_num;
        this.storeApplyService.changeJob(this.storeAccountChangeJobModel).subscribe(res => { })
        // this.storeApplyService.changeJob().subscribe(res => {
        //     console.log("res",res)
        // })
    }
}
