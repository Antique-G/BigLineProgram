import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreGoodsProEditpostComponent } from './store-goods-pro-editpost.component';

describe('StoreGoodsProEditpostComponent', () => {
  let component: StoreGoodsProEditpostComponent;
  let fixture: ComponentFixture<StoreGoodsProEditpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreGoodsProEditpostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreGoodsProEditpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
