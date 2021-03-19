import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderRefundReviewEditComponent } from './admin-order-refund-review-edit.component';

describe('AdminOrderRefundReviewEditComponent', () => {
  let component: AdminOrderRefundReviewEditComponent;
  let fixture: ComponentFixture<AdminOrderRefundReviewEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderRefundReviewEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderRefundReviewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
