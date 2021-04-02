import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-store-certification-detail',
  templateUrl: './store-certification-detail.component.html',
  styleUrls: ['./store-certification-detail.component.css']
})
export class StoreCertificationDetailComponent implements OnInit {
  certificationForm!: FormGroup;


  constructor(public fb: FormBuilder, ) { 
    this.certificationForm = this.fb.group({
      supplier_name:[''],
      name: ['', [Validators.required]],
      id: ['', [Validators.required]],
      identificationNumber: ['', [Validators.required]],
      type: ['', [Validators.required]],
      bankCard: ['', [Validators.required]],
      bankNumber: ['', [Validators.required]],
      bankName: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

}
