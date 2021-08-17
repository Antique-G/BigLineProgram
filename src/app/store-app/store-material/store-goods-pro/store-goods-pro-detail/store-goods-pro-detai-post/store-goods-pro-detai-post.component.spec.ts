import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreGoodsProDetaiPostComponent } from './store-goods-pro-detai-post.component';

describe('StoreGoodsProDetaiPostComponent', () => {
  let component: StoreGoodsProDetaiPostComponent;
  let fixture: ComponentFixture<StoreGoodsProDetaiPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreGoodsProDetaiPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreGoodsProDetaiPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
