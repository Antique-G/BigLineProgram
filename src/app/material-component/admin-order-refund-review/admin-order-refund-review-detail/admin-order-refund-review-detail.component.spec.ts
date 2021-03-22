import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderRefundReviewDetailComponent } from './admin-order-refund-review-detail.component';

describe('AdminOrderRefundReviewDetailComponent', () => {
  let component: AdminOrderRefundReviewDetailComponent;
  let fixture: ComponentFixture<AdminOrderRefundReviewDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderRefundReviewDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderRefundReviewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
