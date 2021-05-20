import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOrderRequestMoneyComponent } from './store-order-request-money.component';

describe('StoreOrderRequestMoneyComponent', () => {
  let component: StoreOrderRequestMoneyComponent;
  let fixture: ComponentFixture<StoreOrderRequestMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreOrderRequestMoneyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreOrderRequestMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
