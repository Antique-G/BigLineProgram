import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreTravelDetailNoticeComponent } from './store-travel-detail-notice.component';

describe('StoreTravelDetailNoticeComponent', () => {
  let component: StoreTravelDetailNoticeComponent;
  let fixture: ComponentFixture<StoreTravelDetailNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreTravelDetailNoticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreTravelDetailNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
