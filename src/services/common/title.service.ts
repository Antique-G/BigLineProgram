import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { map, filter } from "rxjs/operators";
 
@Injectable({
  providedIn: 'root'
})
export class TitleService {
 
  constructor(
    private router: Router,
    private titleService: Title
) {}



 
  public setTitle() {
    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.router)
      )
      .subscribe((event) => {
        const titles = this.getTitle(this.router.routerState, this.router.routerState.root);
        const title = titles[titles.length - 1];
        // console.log(title);
        if (title) {
          this.titleService.setTitle(title);
        }
      });
  }
 

  public getTitle(state:any, parent:any):any {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }
    if (state && parent) {
      data.push(...this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }


}