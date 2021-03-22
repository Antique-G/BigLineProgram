import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderRefundWaysComponent } from './admin-order-refund-ways.component';

describe('AdminOrderRefundWaysComponent', () => {
  let component: AdminOrderRefundWaysComponent;
  let fixture: ComponentFixture<AdminOrderRefundWaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderRefundWaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderRefundWaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
