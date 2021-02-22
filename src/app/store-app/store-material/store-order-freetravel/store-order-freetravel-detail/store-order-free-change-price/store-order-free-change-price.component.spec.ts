import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOrderFreeChangePriceComponent } from './store-order-free-change-price.component';

describe('StoreOrderFreeChangePriceComponent', () => {
  let component: StoreOrderFreeChangePriceComponent;
  let fixture: ComponentFixture<StoreOrderFreeChangePriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreOrderFreeChangePriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreOrderFreeChangePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
