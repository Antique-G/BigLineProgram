import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreGoodsOrderAddFreightComponent } from './store-goods-order-add-freight.component';

describe('StoreGoodsOrderAddFreightComponent', () => {
  let component: StoreGoodsOrderAddFreightComponent;
  let fixture: ComponentFixture<StoreGoodsOrderAddFreightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreGoodsOrderAddFreightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreGoodsOrderAddFreightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
