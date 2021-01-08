import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFreeNoticeComponent } from './store-free-notice.component';

describe('StoreFreeNoticeComponent', () => {
  let component: StoreFreeNoticeComponent;
  let fixture: ComponentFixture<StoreFreeNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreFreeNoticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFreeNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
