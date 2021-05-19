import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFinanceGroupReqMoneyComponent } from './admin-finance-group-req-money.component';

describe('AdminFinanceGroupReqMoneyComponent', () => {
  let component: AdminFinanceGroupReqMoneyComponent;
  let fixture: ComponentFixture<AdminFinanceGroupReqMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFinanceGroupReqMoneyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFinanceGroupReqMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
