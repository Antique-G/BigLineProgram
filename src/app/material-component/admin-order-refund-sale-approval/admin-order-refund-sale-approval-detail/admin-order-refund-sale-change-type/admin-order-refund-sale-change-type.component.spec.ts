import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderRefundSaleChangeTypeComponent } from './admin-order-refund-sale-change-type.component';

describe('AdminOrderRefundSaleChangeTypeComponent', () => {
  let component: AdminOrderRefundSaleChangeTypeComponent;
  let fixture: ComponentFixture<AdminOrderRefundSaleChangeTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderRefundSaleChangeTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderRefundSaleChangeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
