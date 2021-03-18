import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderRefundTurnoverComponent } from './admin-order-refund-turnover.component';

describe('AdminOrderRefundTurnoverComponent', () => {
  let component: AdminOrderRefundTurnoverComponent;
  let fixture: ComponentFixture<AdminOrderRefundTurnoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderRefundTurnoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderRefundTurnoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
