import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOrderGrouptravelOrderComponent } from './store-order-grouptravel-order.component';

describe('StoreOrderGrouptravelOrderComponent', () => {
  let component: StoreOrderGrouptravelOrderComponent;
  let fixture: ComponentFixture<StoreOrderGrouptravelOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreOrderGrouptravelOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreOrderGrouptravelOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
