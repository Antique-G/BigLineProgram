import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreGoodsProComponent } from './store-goods-pro.component';

describe('StoreGoodsProComponent', () => {
  let component: StoreGoodsProComponent;
  let fixture: ComponentFixture<StoreGoodsProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreGoodsProComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreGoodsProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
