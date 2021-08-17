import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreGoodsOrderDetailComponent } from './store-goods-order-detail.component';

describe('StoreGoodsOrderDetailComponent', () => {
  let component: StoreGoodsOrderDetailComponent;
  let fixture: ComponentFixture<StoreGoodsOrderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreGoodsOrderDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreGoodsOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
