import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFinanceFreeReqCashComponent } from './admin-finance-free-req-cash.component';

describe('AdminFinanceFreeReqCashComponent', () => {
  let component: AdminFinanceFreeReqCashComponent;
  let fixture: ComponentFixture<AdminFinanceFreeReqCashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFinanceFreeReqCashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFinanceFreeReqCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
