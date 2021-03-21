import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderRefundEditComponent } from './admin-order-refund-edit.component';

describe('AdminOrderRefundEditComponent', () => {
  let component: AdminOrderRefundEditComponent;
  let fixture: ComponentFixture<AdminOrderRefundEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderRefundEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderRefundEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
