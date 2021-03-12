import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-free-detail-upload-stroke',
  templateUrl: './store-free-detail-upload-stroke.component.html',
  styleUrls: ['./store-free-detail-upload-stroke.component.css']
})
export class StoreFreeDetailUploadStrokeComponent implements OnInit {
  @Input() dataDetailModel: any;


  constructor() { }

  ngOnInit(): void {
  }

}
