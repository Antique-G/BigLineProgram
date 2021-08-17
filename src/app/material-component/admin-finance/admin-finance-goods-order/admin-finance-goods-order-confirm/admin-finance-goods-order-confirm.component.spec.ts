import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFinanceGoodsOrderConfirmComponent } from './admin-finance-goods-order-confirm.component';

describe('AdminFinanceGoodsOrderConfirmComponent', () => {
  let component: AdminFinanceGoodsOrderConfirmComponent;
  let fixture: ComponentFixture<AdminFinanceGoodsOrderConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFinanceGoodsOrderConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFinanceGoodsOrderConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
