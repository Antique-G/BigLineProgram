import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderGroupTravelComponent } from './admin-order-group-travel.component';

describe('AdminOrderGroupTravelComponent', () => {
  let component: AdminOrderGroupTravelComponent;
  let fixture: ComponentFixture<AdminOrderGroupTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderGroupTravelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderGroupTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
