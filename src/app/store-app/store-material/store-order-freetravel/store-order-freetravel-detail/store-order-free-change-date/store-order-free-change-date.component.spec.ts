import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOrderFreeChangeDateComponent } from './store-order-free-change-date.component';

describe('StoreOrderFreeChangeDateComponent', () => {
  let component: StoreOrderFreeChangeDateComponent;
  let fixture: ComponentFixture<StoreOrderFreeChangeDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreOrderFreeChangeDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreOrderFreeChangeDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
