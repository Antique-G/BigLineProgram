import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOrderGrouptravelComponent } from './store-order-grouptravel.component';

describe('StoreOrderGrouptravelComponent', () => {
  let component: StoreOrderGrouptravelComponent;
  let fixture: ComponentFixture<StoreOrderGrouptravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreOrderGrouptravelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreOrderGrouptravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
