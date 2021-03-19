import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCommissionWithdrawComponent } from './admin-commission-withdraw.component';

describe('AdminCommissionWithdrawComponent', () => {
  let component: AdminCommissionWithdrawComponent;
  let fixture: ComponentFixture<AdminCommissionWithdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCommissionWithdrawComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCommissionWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
