import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFinanceFreeReqCashReviewComponent } from './admin-finance-free-req-cash-review.component';

describe('AdminFinanceFreeReqCashReviewComponent', () => {
  let component: AdminFinanceFreeReqCashReviewComponent;
  let fixture: ComponentFixture<AdminFinanceFreeReqCashReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFinanceFreeReqCashReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFinanceFreeReqCashReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
