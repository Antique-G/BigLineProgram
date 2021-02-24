import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOrderGroupChangeDateComponent } from './store-order-group-change-date.component';

describe('StoreOrderGroupChangeDateComponent', () => {
  let component: StoreOrderGroupChangeDateComponent;
  let fixture: ComponentFixture<StoreOrderGroupChangeDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreOrderGroupChangeDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreOrderGroupChangeDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
