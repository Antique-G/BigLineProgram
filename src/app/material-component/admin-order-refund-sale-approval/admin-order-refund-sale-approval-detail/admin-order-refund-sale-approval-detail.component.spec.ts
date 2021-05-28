import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderRefundSaleApprovalDetailComponent } from './admin-order-refund-sale-approval-detail.component';

describe('AdminOrderRefundSaleApprovalDetailComponent', () => {
  let component: AdminOrderRefundSaleApprovalDetailComponent;
  let fixture: ComponentFixture<AdminOrderRefundSaleApprovalDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderRefundSaleApprovalDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderRefundSaleApprovalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
