import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOrderGroupComponent } from './store-order-group.component';

describe('StoreOrderGroupComponent', () => {
  let component: StoreOrderGroupComponent;
  let fixture: ComponentFixture<StoreOrderGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreOrderGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreOrderGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
