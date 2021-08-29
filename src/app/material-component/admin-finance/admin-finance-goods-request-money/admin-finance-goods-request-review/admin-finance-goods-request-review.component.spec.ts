import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFinanceGoodsRequestReviewComponent } from './admin-finance-goods-request-review.component';

describe('AdminFinanceGoodsRequestReviewComponent', () => {
  let component: AdminFinanceGoodsRequestReviewComponent;
  let fixture: ComponentFixture<AdminFinanceGoodsRequestReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFinanceGoodsRequestReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFinanceGoodsRequestReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
