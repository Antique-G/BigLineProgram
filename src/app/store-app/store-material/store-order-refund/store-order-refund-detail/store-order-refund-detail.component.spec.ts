import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOrderRefundDetailComponent } from './store-order-refund-detail.component';

describe('StoreOrderRefundDetailComponent', () => {
  let component: StoreOrderRefundDetailComponent;
  let fixture: ComponentFixture<StoreOrderRefundDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreOrderRefundDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreOrderRefundDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
