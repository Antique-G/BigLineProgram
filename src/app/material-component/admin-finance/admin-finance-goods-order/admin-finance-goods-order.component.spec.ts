import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFinanceGoodsOrderComponent } from './admin-finance-goods-order.component';

describe('AdminFinanceGoodsOrderComponent', () => {
  let component: AdminFinanceGoodsOrderComponent;
  let fixture: ComponentFixture<AdminFinanceGoodsOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFinanceGoodsOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFinanceGoodsOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
