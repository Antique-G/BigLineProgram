import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreGoodsOrderMergeShipComponent } from './store-goods-order-merge-ship.component';

describe('StoreGoodsOrderMergeShipComponent', () => {
  let component: StoreGoodsOrderMergeShipComponent;
  let fixture: ComponentFixture<StoreGoodsOrderMergeShipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreGoodsOrderMergeShipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreGoodsOrderMergeShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
