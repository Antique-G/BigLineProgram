import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreGoodsProEditimgComponent } from './store-goods-pro-editimg.component';

describe('StoreGoodsProEditimgComponent', () => {
  let component: StoreGoodsProEditimgComponent;
  let fixture: ComponentFixture<StoreGoodsProEditimgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreGoodsProEditimgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreGoodsProEditimgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
