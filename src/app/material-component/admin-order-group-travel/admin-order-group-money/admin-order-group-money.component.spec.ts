import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderGroupMoneyComponent } from './admin-order-group-money.component';

describe('AdminOrderGroupMoneyComponent', () => {
  let component: AdminOrderGroupMoneyComponent;
  let fixture: ComponentFixture<AdminOrderGroupMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderGroupMoneyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderGroupMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
