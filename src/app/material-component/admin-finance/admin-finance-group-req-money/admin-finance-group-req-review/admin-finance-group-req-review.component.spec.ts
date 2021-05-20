import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFinanceGroupReqReviewComponent } from './admin-finance-group-req-review.component';

describe('AdminFinanceGroupReqReviewComponent', () => {
  let component: AdminFinanceGroupReqReviewComponent;
  let fixture: ComponentFixture<AdminFinanceGroupReqReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFinanceGroupReqReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFinanceGroupReqReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
