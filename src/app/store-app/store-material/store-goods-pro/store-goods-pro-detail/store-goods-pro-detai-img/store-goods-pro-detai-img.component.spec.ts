import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreGoodsProDetaiImgComponent } from './store-goods-pro-detai-img.component';

describe('StoreGoodsProDetaiImgComponent', () => {
  let component: StoreGoodsProDetaiImgComponent;
  let fixture: ComponentFixture<StoreGoodsProDetaiImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreGoodsProDetaiImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreGoodsProDetaiImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
