import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderRefundSaleApprovalComponent } from './admin-order-refund-sale-approval.component';

describe('AdminOrderRefundSaleApprovalComponent', () => {
  let component: AdminOrderRefundSaleApprovalComponent;
  let fixture: ComponentFixture<AdminOrderRefundSaleApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderRefundSaleApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderRefundSaleApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
