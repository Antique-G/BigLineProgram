import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOrderGroupMoneyComponent } from './store-order-group-money.component';

describe('StoreOrderGroupMoneyComponent', () => {
  let component: StoreOrderGroupMoneyComponent;
  let fixture: ComponentFixture<StoreOrderGroupMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreOrderGroupMoneyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreOrderGroupMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
