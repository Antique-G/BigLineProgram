import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderRefundChangeComponent } from './admin-order-refund-change.component';

describe('AdminOrderRefundChangeComponent', () => {
  let component: AdminOrderRefundChangeComponent;
  let fixture: ComponentFixture<AdminOrderRefundChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderRefundChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderRefundChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
