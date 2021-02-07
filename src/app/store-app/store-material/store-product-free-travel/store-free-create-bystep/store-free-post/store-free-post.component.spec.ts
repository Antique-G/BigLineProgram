import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFreePostComponent } from './store-free-post.component';

describe('StoreFreePostComponent', () => {
  let component: StoreFreePostComponent;
  let fixture: ComponentFixture<StoreFreePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreFreePostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFreePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
