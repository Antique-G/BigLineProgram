import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOrderGroupChangePriceComponent } from './store-order-group-change-price.component';

describe('StoreOrderGroupChangePriceComponent', () => {
  let component: StoreOrderGroupChangePriceComponent;
  let fixture: ComponentFixture<StoreOrderGroupChangePriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreOrderGroupChangePriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreOrderGroupChangePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
