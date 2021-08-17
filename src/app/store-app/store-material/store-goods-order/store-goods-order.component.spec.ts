import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreGoodsOrderComponent } from './store-goods-order.component';

describe('StoreGoodsOrderComponent', () => {
  let component: StoreGoodsOrderComponent;
  let fixture: ComponentFixture<StoreGoodsOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreGoodsOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreGoodsOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
