import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderDSInsComponent } from './admin-order-d-s-ins.component';

describe('AdminOrderDSInsComponent', () => {
  let component: AdminOrderDSInsComponent;
  let fixture: ComponentFixture<AdminOrderDSInsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderDSInsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderDSInsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
