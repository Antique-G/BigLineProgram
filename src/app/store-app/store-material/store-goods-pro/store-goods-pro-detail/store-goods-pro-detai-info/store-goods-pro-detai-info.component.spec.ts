import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreGoodsProDetaiInfoComponent } from './store-goods-pro-detai-info.component';

describe('StoreGoodsProDetaiInfoComponent', () => {
  let component: StoreGoodsProDetaiInfoComponent;
  let fixture: ComponentFixture<StoreGoodsProDetaiInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreGoodsProDetaiInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreGoodsProDetaiInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
