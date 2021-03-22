import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderRefundConfirmComponent } from './admin-order-refund-confirm.component';

describe('AdminOrderRefundConfirmComponent', () => {
  let component: AdminOrderRefundConfirmComponent;
  let fixture: ComponentFixture<AdminOrderRefundConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderRefundConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderRefundConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
