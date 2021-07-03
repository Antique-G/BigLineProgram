import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProductFreeTravelOperateLogComponent } from './store-product-free-travel-operate-log.component';

describe('StoreProductFreeTravelOperateLogComponent', () => {
  let component: StoreProductFreeTravelOperateLogComponent;
  let fixture: ComponentFixture<StoreProductFreeTravelOperateLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreProductFreeTravelOperateLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductFreeTravelOperateLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
