import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-certifi-basic-info',
  templateUrl: './store-certifi-basic-info.component.html',
  styleUrls: ['./store-certifi-basic-info.component.css']
})
export class StoreCertifiBasicInfoComponent implements OnInit {
  detailForm!: FormGroup;

  constructor(public fb: FormBuilder,) {
    this.detailForm = this.fb.group({
      account:['']
    })
  }

  ngOnInit(): void {
  }

}
