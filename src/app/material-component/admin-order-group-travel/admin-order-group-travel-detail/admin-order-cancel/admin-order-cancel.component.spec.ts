import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderCancelComponent } from './admin-order-cancel.component';

describe('AdminOrderCancelComponent', () => {
  let component: AdminOrderCancelComponent;
  let fixture: ComponentFixture<AdminOrderCancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderCancelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
