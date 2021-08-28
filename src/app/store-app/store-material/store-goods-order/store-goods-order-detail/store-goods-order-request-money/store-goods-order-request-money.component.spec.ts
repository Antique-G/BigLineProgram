import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreGoodsOrderRequestMoneyComponent } from './store-goods-order-request-money.component';

describe('StoreGoodsOrderRequestMoneyComponent', () => {
  let component: StoreGoodsOrderRequestMoneyComponent;
  let fixture: ComponentFixture<StoreGoodsOrderRequestMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreGoodsOrderRequestMoneyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreGoodsOrderRequestMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
