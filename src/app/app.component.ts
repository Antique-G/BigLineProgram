import { Component } from '@angular/core';
import { TitleService } from '../services/common/title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private common: TitleService
  ) { }
 
  ngOnInit() {
    //设置页面标题
    this.common.setTitle();

  }
}
