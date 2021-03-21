import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderRefundTurnoverDetailComponent } from './admin-order-refund-turnover-detail.component';

describe('AdminOrderRefundTurnoverDetailComponent', () => {
  let component: AdminOrderRefundTurnoverDetailComponent;
  let fixture: ComponentFixture<AdminOrderRefundTurnoverDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderRefundTurnoverDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderRefundTurnoverDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
