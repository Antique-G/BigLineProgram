import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOrderGroupDetailShutoffComponent } from './store-order-group-detail-shutoff.component';

describe('StoreOrderGroupDetailShutoffComponent', () => {
  let component: StoreOrderGroupDetailShutoffComponent;
  let fixture: ComponentFixture<StoreOrderGroupDetailShutoffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreOrderGroupDetailShutoffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreOrderGroupDetailShutoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
