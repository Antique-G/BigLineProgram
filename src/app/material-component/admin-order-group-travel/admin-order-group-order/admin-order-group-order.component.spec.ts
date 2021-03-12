import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderGroupOrderComponent } from './admin-order-group-order.component';

describe('AdminOrderGroupOrderComponent', () => {
  let component: AdminOrderGroupOrderComponent;
  let fixture: ComponentFixture<AdminOrderGroupOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderGroupOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderGroupOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
