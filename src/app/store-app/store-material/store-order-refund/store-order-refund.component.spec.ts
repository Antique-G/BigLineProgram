import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOrderRefundComponent } from './store-order-refund.component';

describe('StoreOrderRefundComponent', () => {
  let component: StoreOrderRefundComponent;
  let fixture: ComponentFixture<StoreOrderRefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreOrderRefundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreOrderRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
