import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOrderGrouptravelDetailComponent } from './store-order-grouptravel-detail.component';

describe('StoreOrderGrouptravelDetailComponent', () => {
  let component: StoreOrderGrouptravelDetailComponent;
  let fixture: ComponentFixture<StoreOrderGrouptravelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreOrderGrouptravelDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreOrderGrouptravelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
