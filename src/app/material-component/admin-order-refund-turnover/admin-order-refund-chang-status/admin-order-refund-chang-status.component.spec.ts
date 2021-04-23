import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderRefundChangStatusComponent } from './admin-order-refund-chang-status.component';

describe('AdminOrderRefundChangStatusComponent', () => {
  let component: AdminOrderRefundChangStatusComponent;
  let fixture: ComponentFixture<AdminOrderRefundChangStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderRefundChangStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderRefundChangStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
