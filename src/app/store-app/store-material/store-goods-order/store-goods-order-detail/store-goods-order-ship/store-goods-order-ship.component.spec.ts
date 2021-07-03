import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreGoodsOrderShipComponent } from './store-goods-order-ship.component';

describe('StoreGoodsOrderShipComponent', () => {
  let component: StoreGoodsOrderShipComponent;
  let fixture: ComponentFixture<StoreGoodsOrderShipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreGoodsOrderShipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreGoodsOrderShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
