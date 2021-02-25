import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOrderGroupDetailChangeNumsComponent } from './store-order-group-detail-change-nums.component';

describe('StoreOrderGroupDetailChangeNumsComponent', () => {
  let component: StoreOrderGroupDetailChangeNumsComponent;
  let fixture: ComponentFixture<StoreOrderGroupDetailChangeNumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreOrderGroupDetailChangeNumsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreOrderGroupDetailChangeNumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
