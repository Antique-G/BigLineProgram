import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderRefundDetailComponent } from './admin-order-refund-detail.component';

describe('AdminOrderRefundDetailComponent', () => {
  let component: AdminOrderRefundDetailComponent;
  let fixture: ComponentFixture<AdminOrderRefundDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderRefundDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderRefundDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
