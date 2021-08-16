import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFinanceOrderReportComponent } from './admin-finance-order-report.component';

describe('AdminFinanceOrderReportComponent', () => {
  let component: AdminFinanceOrderReportComponent;
  let fixture: ComponentFixture<AdminFinanceOrderReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFinanceOrderReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFinanceOrderReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
