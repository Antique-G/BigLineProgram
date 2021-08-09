import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreGoodsProCreateBystepComponent } from './store-goods-pro-create-bystep.component';

describe('StoreGoodsProCreateBystepComponent', () => {
  let component: StoreGoodsProCreateBystepComponent;
  let fixture: ComponentFixture<StoreGoodsProCreateBystepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreGoodsProCreateBystepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreGoodsProCreateBystepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
