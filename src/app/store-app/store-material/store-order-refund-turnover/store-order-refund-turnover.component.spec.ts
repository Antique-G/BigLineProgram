import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOrderRefundTurnoverComponent } from './store-order-refund-turnover.component';

describe('StoreOrderRefundTurnoverComponent', () => {
  let component: StoreOrderRefundTurnoverComponent;
  let fixture: ComponentFixture<StoreOrderRefundTurnoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreOrderRefundTurnoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreOrderRefundTurnoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
