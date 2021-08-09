import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreGoodsOrderDetailModifyComponent } from './store-goods-order-detail-modify.component';

describe('StoreGoodsOrderDetailModifyComponent', () => {
  let component: StoreGoodsOrderDetailModifyComponent;
  let fixture: ComponentFixture<StoreGoodsOrderDetailModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreGoodsOrderDetailModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreGoodsOrderDetailModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
