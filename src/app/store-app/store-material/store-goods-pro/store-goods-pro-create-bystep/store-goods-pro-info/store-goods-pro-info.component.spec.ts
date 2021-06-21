import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreGoodsProInfoComponent } from './store-goods-pro-info.component';

describe('StoreGoodsProInfoComponent', () => {
  let component: StoreGoodsProInfoComponent;
  let fixture: ComponentFixture<StoreGoodsProInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreGoodsProInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreGoodsProInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
