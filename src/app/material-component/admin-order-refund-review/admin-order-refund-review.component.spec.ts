import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderRefundReviewComponent } from './admin-order-refund-review.component';

describe('AdminOrderRefundReviewComponent', () => {
  let component: AdminOrderRefundReviewComponent;
  let fixture: ComponentFixture<AdminOrderRefundReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderRefundReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderRefundReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
