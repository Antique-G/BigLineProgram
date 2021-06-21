import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreGoodsProEditdetailComponent } from './store-goods-pro-editdetail.component';

describe('StoreGoodsProEditdetailComponent', () => {
  let component: StoreGoodsProEditdetailComponent;
  let fixture: ComponentFixture<StoreGoodsProEditdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreGoodsProEditdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreGoodsProEditdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
