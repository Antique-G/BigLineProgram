import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFinanceGoodsRequestMoneyComponent } from './admin-finance-goods-request-money.component';

describe('AdminFinanceGoodsRequestMoneyComponent', () => {
  let component: AdminFinanceGoodsRequestMoneyComponent;
  let fixture: ComponentFixture<AdminFinanceGoodsRequestMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFinanceGoodsRequestMoneyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFinanceGoodsRequestMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
