import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-store-free-upload-stroke',
  templateUrl: './store-free-upload-stroke.component.html',
  styleUrls: ['./store-free-upload-stroke.component.css']
})
export class StoreFreeUploadStrokeComponent implements OnInit {
  @Input() dataDetailModel: any;



  constructor() { }

  ngOnInit(): void {
  }

}
