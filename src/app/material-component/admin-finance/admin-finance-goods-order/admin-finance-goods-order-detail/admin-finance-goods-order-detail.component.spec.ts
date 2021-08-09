import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFinanceGoodsOrderDetailComponent } from './admin-finance-goods-order-detail.component';

describe('AdminFinanceGoodsOrderDetailComponent', () => {
  let component: AdminFinanceGoodsOrderDetailComponent;
  let fixture: ComponentFixture<AdminFinanceGoodsOrderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFinanceGoodsOrderDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFinanceGoodsOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
