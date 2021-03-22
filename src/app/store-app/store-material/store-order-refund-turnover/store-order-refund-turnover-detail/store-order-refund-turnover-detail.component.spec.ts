import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOrderRefundTurnoverDetailComponent } from './store-order-refund-turnover-detail.component';

describe('StoreOrderRefundTurnoverDetailComponent', () => {
  let component: StoreOrderRefundTurnoverDetailComponent;
  let fixture: ComponentFixture<StoreOrderRefundTurnoverDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreOrderRefundTurnoverDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreOrderRefundTurnoverDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
