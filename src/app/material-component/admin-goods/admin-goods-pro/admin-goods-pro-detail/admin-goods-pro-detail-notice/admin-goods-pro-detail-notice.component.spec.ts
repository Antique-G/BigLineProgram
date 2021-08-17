import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGoodsProDetailNoticeComponent } from './admin-goods-pro-detail-notice.component';

describe('AdminGoodsProDetailNoticeComponent', () => {
  let component: AdminGoodsProDetailNoticeComponent;
  let fixture: ComponentFixture<AdminGoodsProDetailNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGoodsProDetailNoticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGoodsProDetailNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
