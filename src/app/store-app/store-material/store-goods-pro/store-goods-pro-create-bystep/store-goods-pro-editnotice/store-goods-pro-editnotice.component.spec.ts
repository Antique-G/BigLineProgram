import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreGoodsProEditnoticeComponent } from './store-goods-pro-editnotice.component';

describe('StoreGoodsProEditnoticeComponent', () => {
  let component: StoreGoodsProEditnoticeComponent;
  let fixture: ComponentFixture<StoreGoodsProEditnoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreGoodsProEditnoticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreGoodsProEditnoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
