import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderRefundSaleApprovalRejectComponent } from './admin-order-refund-sale-approval-reject.component';

describe('AdminOrderRefundSaleApprovalRejectComponent', () => {
  let component: AdminOrderRefundSaleApprovalRejectComponent;
  let fixture: ComponentFixture<AdminOrderRefundSaleApprovalRejectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderRefundSaleApprovalRejectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderRefundSaleApprovalRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
