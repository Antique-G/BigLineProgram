import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFreeTravelAddOrderComponent } from './admin-free-travel-add-order.component';

describe('AdminFreeTravelAddOrderComponent', () => {
  let component: AdminFreeTravelAddOrderComponent;
  let fixture: ComponentFixture<AdminFreeTravelAddOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFreeTravelAddOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFreeTravelAddOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
