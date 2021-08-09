import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreGoodsProDetailComponent } from './store-goods-pro-detail.component';

describe('StoreGoodsProDetailComponent', () => {
  let component: StoreGoodsProDetailComponent;
  let fixture: ComponentFixture<StoreGoodsProDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreGoodsProDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreGoodsProDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
